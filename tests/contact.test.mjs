import assert from "node:assert/strict";
import test from "node:test";
import {
  CONTACT_RECIPIENT, escapeHtml, sendContactEmail, validateContact,
} from "../lib/contact-server.ts";

import { POST } from "../app/api/contact/route.ts";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  organization: "Analytical Engines",
  phone: "+1 555 123 4567",
  message: "We need a clear dashboard for our team.",
};
const environment = {
  SMTP_HOST: "smtp.example.com",
  SMTP_PORT: "587",
  SMTP_SECURE: "false",
  SMTP_USER: "sender@example.com",
  SMTP_PASS: "test-only-password",
  SMTP_FROM: "sender@example.com",
};

test("validates a request without topic and rejects invalid required fields", () => {
  assert.deepEqual(validateContact(valid), valid);
  assert.deepEqual(validateContact({ ...valid, topic: "legacy" }), valid);
  for (const patch of [
    { name: "A" }, { email: "bad\nBcc:evil@example.com" },
    { phone: "call me" }, { message: "short" },
  ]) assert.equal(validateContact({ ...valid, ...patch }), null);
});

test("escapes visitor HTML", () => {
  assert.equal(escapeHtml(`<script x="'">&`), "&lt;script x=&quot;&#39;&quot;&gt;&amp;");
});

test("uses verified sender, visitor Reply-To, and accepts only intended recipient", async () => {
  let sent;
  const transport = { sendMail: async (message) => {
    sent = message;
    return { accepted: [CONTACT_RECIPIENT], rejected: [] };
  } };
  const input = { ...valid, message: "Please review <script>alert(1)</script>" };
  assert.equal(await sendContactEmail(input, transport, environment), true);
  assert.equal(sent.from, environment.SMTP_FROM);
  assert.equal(sent.to, CONTACT_RECIPIENT);
  assert.equal(sent.replyTo, valid.email);
  assert.equal(sent.subject, "New message from ViraData website");
  assert.doesNotMatch(sent.text, /Request topic/);
  assert.doesNotMatch(sent.html, /Request topic/);
  assert.match(sent.html, /&lt;script&gt;/);
  assert.doesNotMatch(sent.html, /<script>/);
  assert.equal(await sendContactEmail(valid, { sendMail: async () => ({ accepted: ["other@example.com"] }) }, environment), false);
});

test("does not deliver without SMTP configuration or on transport failure", async () => {
  await assert.rejects(sendContactEmail(valid, { sendMail: async () => ({ accepted: [CONTACT_RECIPIENT] }) }, {}));
  await assert.rejects(sendContactEmail(valid, { sendMail: async () => { throw new Error("SMTP down"); } }, environment));
});


test("API accepts no topic and reports honest failure when SMTP is unavailable", async () => {
  const names = ["SMTP_HOST", "SMTP_PORT", "SMTP_SECURE", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];
  const saved = Object.fromEntries(names.map(name => [name, process.env[name]]));
  const request = data => new Request("https://viradataco.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://viradataco.com", Host: "viradataco.com" },
    body: JSON.stringify(data),
  });
  try {
    for (const name of names) delete process.env[name];
    for (const patch of [{ name: "A" }, { email: "bad" }, { message: "short" }, { website: "spam" }]) {
      const response = await POST(request({ ...valid, ...patch }));
      assert.equal(response.status, 400);
      assert.deepEqual(await response.json(), { error: "invalid" });
    }
    const response = await POST(request(valid));
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { error: "delivery_failed" });
    assert.equal(response.headers.get("Cache-Control"), "no-store");
  } finally {
    for (const name of names) {
      if (saved[name] === undefined) delete process.env[name];
      else process.env[name] = saved[name];
    }
  }
});
