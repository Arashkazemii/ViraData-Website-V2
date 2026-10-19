import { MAX_CONTACT_BYTES, sendContactEmail, validateContact } from "../../../lib/contact-server";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; reset: number }>();

function json(status: number, error: string) {
  return Response.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  try {
    const parsedOrigin = new URL(origin || "");
    if (!host || !["http:", "https:"].includes(parsedOrigin.protocol) || parsedOrigin.host !== host)
      return json(403, "forbidden");
  } catch { return json(403, "forbidden"); }
  if (!request.headers.get("content-type")?.startsWith("application/json")) return json(415, "content_type");
  const length = Number(request.headers.get("content-length"));
  if (length > MAX_CONTACT_BYTES) return json(413, "too_large");

  let raw: string;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json(400, "invalid");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_CONTACT_BYTES) {
        await reader.cancel();
        return json(413, "too_large");
      }
      chunks.push(value);
    }
    raw = new TextDecoder().decode(Buffer.concat(chunks));
  } catch { return json(400, "invalid"); }

  let data: unknown;
  try { data = JSON.parse(raw); } catch { return json(400, "invalid"); }
  if (!data || typeof data !== "object" || Array.isArray(data)) return json(400, "invalid");
  const payload = data as Record<string, unknown>;
  if (payload.website) return json(400, "invalid");
  const input = validateContact(payload);
  if (!input) return json(400, "invalid");

  const ip = request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() || "unknown";
  const now = Date.now();
  if (attempts.size > 2000) {
    for (const [key, value] of attempts) if (value.reset <= now) attempts.delete(key);
    if (attempts.size > 2000) attempts.delete(attempts.keys().next().value!);
  }
  const current = attempts.get(ip);
  const next = !current || current.reset <= now
    ? { count: 1, reset: now + WINDOW_MS }
    : { count: current.count + 1, reset: current.reset };
  attempts.set(ip, next);
  if (next.count > MAX_ATTEMPTS) return json(429, "rate_limited");

  try {
    if (!(await sendContactEmail(input))) return json(502, "delivery_failed");
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Contact delivery failed", (error as { code?: string })?.code || "unknown");
    return json(502, "delivery_failed");
  }
}
