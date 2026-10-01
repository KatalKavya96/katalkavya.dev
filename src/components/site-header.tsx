"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="header-inner page-width">
        <Link className="brand" href="/" aria-label="Kavya Katal, home">
          K<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={
                pathname === item.href ? "nav-link active" : "nav-link"
              }
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/contact">
          Let&apos;s connect <span aria-hidden="true">↗</span>
        </Link>
        <details className="mobile-menu" key={pathname}>
          <summary aria-label="Open navigation menu">
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact">Let&apos;s connect ↗</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
