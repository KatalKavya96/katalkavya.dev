import type { Metadata } from "next";
import { cookies } from "next/headers";
import { isAdminSession, SESSION_COOKIE } from "@/lib/admin-auth";
import { AdminProjects } from "@/components/admin-projects";

export const metadata: Metadata = {
  title: "Private portfolio editor",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const cookieStore = await cookies();
  const authenticated = isAdminSession(cookieStore.get(SESSION_COOKIE)?.value);
  const { error } = await searchParams;
  return (
    <main id="main" className="admin-page page-width">
      <span className="eyebrow eyebrow-green">
        <span aria-hidden="true" /> PRIVATE EDITOR
      </span>
      <h1>Portfolio curation.</h1>
      {authenticated ? (
        <>
          <p>
            Choose the projects, domains, and display order. Changes save to
            your portfolio repository.
          </p>
          <form action="/api/auth/logout" method="post">
            <button className="admin-signout" type="submit">
              Sign out
            </button>
          </form>
          <AdminProjects />
        </>
      ) : (
        <div className="admin-login">
          <p>
            This editor is available only to Kavya Katal’s verified GitHub
            account.
          </p>
          {error && (
            <span className="admin-error">
              {error === "setup"
                ? "GitHub sign-in has not been configured yet."
                : error === "not-allowed"
                  ? "This GitHub account does not have access."
                  : "Sign-in could not be completed."}
            </span>
          )}
          <a className="button button-primary" href="/api/auth/github/start">
            Sign in with GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </main>
  );
}
