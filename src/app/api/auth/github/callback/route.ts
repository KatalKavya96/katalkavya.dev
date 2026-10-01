import { NextRequest, NextResponse } from "next/server";
import {
  adminCookieOptions,
  createAdminSession,
  OAUTH_STATE_COOKIE,
  safeEqual,
  SESSION_COOKIE,
} from "@/lib/admin-auth";

type TokenResponse = { access_token?: string; token_type?: string };
type GitHubViewer = { id?: number; login?: string };

export async function GET(request: NextRequest) {
  const fail = (reason: string) =>
    NextResponse.redirect(new URL(`/admin?error=${reason}`, request.url));
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const stored = request.cookies.get(OAUTH_STATE_COOKIE)?.value;
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (
    !code ||
    !state ||
    !stored ||
    !safeEqual(state, stored) ||
    !clientId ||
    !clientSecret
  )
    return fail("auth");

  try {
    const callback = new URL(
      "/api/auth/github/callback",
      request.url,
    ).toString();
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: callback,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(7000),
      },
    );
    if (!tokenResponse.ok) return fail("auth");
    const token = (await tokenResponse.json()) as TokenResponse;
    if (!token.access_token) return fail("auth");
    const viewerResponse = await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token.access_token}`,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(7000),
    });
    if (!viewerResponse.ok) return fail("auth");
    const viewer = (await viewerResponse.json()) as GitHubViewer;
    const session = viewer.id ? createAdminSession(viewer.id) : null;
    if (!session) return fail("not-allowed");
    const response = NextResponse.redirect(new URL("/admin", request.url));
    response.cookies.set(SESSION_COOKIE, session, adminCookieOptions);
    response.cookies.set(OAUTH_STATE_COOKIE, "", { path: "/", maxAge: 0 });
    return response;
  } catch {
    return fail("auth");
  }
}
