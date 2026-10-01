import { NextRequest, NextResponse } from "next/server";
import { newOAuthState, OAUTH_STATE_COOKIE } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (
    !clientId ||
    !process.env.GITHUB_OAUTH_CLIENT_SECRET ||
    !process.env.AUTH_SECRET ||
    process.env.AUTH_SECRET.length < 32
  ) {
    return NextResponse.redirect(new URL("/admin?error=setup", request.url));
  }
  const state = newOAuthState();
  const callback = new URL("/api/auth/github/callback", request.url).toString();
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", callback);
  authorize.searchParams.set("scope", "read:user");
  authorize.searchParams.set("state", state);
  const response = NextResponse.redirect(authorize);
  response.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 600,
  });
  return response;
}
