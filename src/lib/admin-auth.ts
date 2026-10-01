import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "kavya_portfolio_admin";
export const OAUTH_STATE_COOKIE = "kavya_portfolio_oauth_state";
const ADMIN_GITHUB_ID = 178926947;
const SESSION_SECONDS = 60 * 60 * 24 * 7;

function secret() {
  const value = process.env.AUTH_SECRET;
  return value && value.length >= 32 ? value : null;
}

function sign(payload: string) {
  const key = secret();
  if (!key) return null;
  return createHmac("sha256", key).update(payload).digest("base64url");
}

export function newOAuthState() {
  return randomBytes(24).toString("base64url");
}

export function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function createAdminSession(githubId: number) {
  if (githubId !== ADMIN_GITHUB_ID) return null;
  const payload = Buffer.from(
    JSON.stringify({
      id: githubId,
      exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS,
    }),
  ).toString("base64url");
  const signature = sign(payload);
  return signature ? `${payload}.${signature}` : null;
}

export function isAdminSession(cookie: string | undefined) {
  if (!cookie) return false;
  const [payload, signature, extra] = cookie.split(".");
  if (!payload || !signature || extra) return false;
  const expected = sign(payload);
  if (!expected || !safeEqual(signature, expected)) return false;
  try {
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { id?: number; exp?: number };
    return (
      decoded.id === ADMIN_GITHUB_ID &&
      typeof decoded.exp === "number" &&
      decoded.exp > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}

export const adminCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_SECONDS,
};
