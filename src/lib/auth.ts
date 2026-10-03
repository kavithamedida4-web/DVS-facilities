import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "dvs_admin_session";
const SESSION_SECRET = process.env.ADMIN_PASSWORD || "dvs-facilities-secret-key-2026";

export function createSessionToken(email: string): string {
  const payload = JSON.stringify({
    email,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  const base64Payload = Buffer.from(payload).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(base64Payload)
    .digest("base64url");
  return `${base64Payload}.${signature}`;
}

export function verifySessionToken(token: string): { valid: boolean; email?: string } {
  try {
    const [base64Payload, signature] = token.split(".");
    if (!base64Payload || !signature) return { valid: false };

    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(base64Payload)
      .digest("base64url");

    if (signature !== expectedSignature) return { valid: false };

    const data = JSON.parse(Buffer.from(base64Payload, "base64url").toString());
    if (data.exp && Date.now() > data.exp) return { valid: false };

    return { valid: true, email: data.email };
  } catch {
    return { valid: false };
  }
}

export async function getAdminSession(): Promise<{ authenticated: boolean; email?: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return { authenticated: false };

  const verified = verifySessionToken(token);
  return { authenticated: verified.valid, email: verified.email };
}
