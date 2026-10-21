import nodemailer from "nodemailer";

export const CONTACT_RECIPIENT = "vp.sales@viradataco.com";
export const MAX_CONTACT_BYTES = 12_000;

export type ContactInput = {
  name: string;
  email: string;
  organization: string;
  phone: string;
  message: string;
};

const emailPattern = /^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/;
const phonePattern = /^[+\d\s().-]+$/;

function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length <= max && !/[\u0000-\u001f\u007f]/.test(trimmed.replace(/\r?\n/g, ""))
    ? trimmed
    : null;
}

export function validateContact(value: unknown): ContactInput | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  const name = clean(data.name, 120);
  const email = clean(data.email, 254);
  const organization = clean(data.organization, 160);
  const phone = clean(data.phone, 40);
  const message = clean(data.message, 4000);
  if (
    !name || name.length < 2 ||
    !email || !emailPattern.test(email) ||
    organization === null || phone === null ||
    (phone && !phonePattern.test(phone)) ||
    !message || message.length < 12
  ) return null;
  return { name, email, organization, phone, message };
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character] || character);
}

type MailTransport = Pick<ReturnType<typeof nodemailer.createTransport>, "sendMail">;

export async function sendContactEmail(
  input: ContactInput,
  transport?: MailTransport,
  environment: NodeJS.ProcessEnv = process.env,
): Promise<boolean> {
  const host = environment.SMTP_HOST;
  const port = Number(environment.SMTP_PORT);
  const user = environment.SMTP_USER;
  const pass = environment.SMTP_PASS;
  const from = environment.SMTP_FROM;
  const secure = environment.SMTP_SECURE;
  if (!host || !Number.isInteger(port) || port < 1 || port > 65535 ||
      !user || !pass || !from || !emailPattern.test(from) ||
      (secure !== "true" && secure !== "false")) {
    throw new Error("SMTP configuration incomplete");
  }
  const sender = transport ?? nodemailer.createTransport({
    host, port, secure: secure === "true", requireTLS: secure === "false",
    auth: { user, pass },
  });
  const fields = [
    ["Full name", input.name], ["Business email", input.email],
    ["Organization", input.organization || "—"], ["Phone", input.phone || "—"],
    ["Message", input.message],
  ];
  const result = await sender.sendMail({
    from,
    to: CONTACT_RECIPIENT,
    replyTo: input.email,
    subject: "New message from ViraData website",
    text: fields.map(([label, value]) => `${label}: ${value}`).join("\n\n"),
    html: fields.map(([label, value]) =>
      `<p><strong>${label}:</strong> ${escapeHtml(value).replace(/\n/g, "<br>")}</p>`
    ).join(""),
  });
  return result.accepted.some((recipient: string) =>
    recipient.toLowerCase() === CONTACT_RECIPIENT.toLowerCase()
  );
}
