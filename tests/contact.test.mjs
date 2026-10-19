import assert from "node:assert/strict";
import test from "node:test";
import {
  CONTACT_RECIPIENT, escapeHtml, sendContactEmail, validateContact,
} from "../lib/contact-server.ts";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  organization: "Analytical Engines",
  phone: "+1 555 123 4567",
  topic: "analytics",
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

test("validates required fields and rejects invalid email, topic, and phone", () => {
  assert.deepEqual(validateContact(valid), valid);
  for (const patch of [
    { name: "A" }, { email: "bad\nBcc:evil@example.com" },
    { topic: "unknown" }, { phone: "call me" }, { message: "short" },
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
  assert.match(sent.html, /&lt;script&gt;/);
  assert.doesNotMatch(sent.html, /<script>/);
  assert.equal(await sendContactEmail(valid, { sendMail: async () => ({ accepted: ["other@example.com"] }) }, environment), false);
});

test("does not deliver without SMTP configuration or on transport failure", async () => {
  await assert.rejects(sendContactEmail(valid, { sendMail: async () => ({ accepted: [CONTACT_RECIPIENT] }) }, {}));
  await assert.rejects(sendContactEmail(valid, { sendMail: async () => { throw new Error("SMTP down"); } }, environment));
});
