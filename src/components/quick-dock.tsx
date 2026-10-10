"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dock, DockIcon } from "@/components/reference-interactions";

const dockItems = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Projects", href: "/projects", icon: "projects" },
  { label: "Open source", href: "/open-source", icon: "source" },
  { label: "Coding", href: "/coding", icon: "coding" },
  { label: "Contact", href: "/contact", icon: "contact" },
] as const;

function DockGlyph({ name }: { name: (typeof dockItems)[number]["icon"] }) {
  if (name === "home") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m4 10 8-6 8 6v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1Z" />
      </svg>
    );
  }
  if (name === "projects") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="7" height="7" rx="2" />
        <rect x="13" y="4" width="7" height="7" rx="2" />
        <rect x="4" y="13" width="7" height="7" rx="2" />
        <rect x="13" y="13" width="7" height="7" rx="2" />
      </svg>
    );
  }
  if (name === "source") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="6" cy="5" r="2" />
        <circle cx="18" cy="7" r="2" />
        <circle cx="8" cy="19" r="2" />
        <path d="M7.7 6.1 16.2 6.8M6.7 6.8 7.7 17M16.8 8.7 9.4 17.6" />
      </svg>
    );
  }
  if (name === "coding") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m9 6-6 6 6 6M15 6l6 6-6 6M14 4l-4 16" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4zM4 7l8 6 8-6" />
    </svg>
  );
}

export function QuickDock() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="quick-dock-shell" aria-label="Quick navigation">
      <Dock className="quick-dock">
        {dockItems.map((item) => {
          const active = pathname === item.href;
          return (
            <DockIcon key={item.href} className="quick-dock-item">
              <Link
                href={item.href}
                className={active ? "is-active" : undefined}
                aria-current={active ? "page" : undefined}
                aria-label={item.label}
              >
                <DockGlyph name={item.icon} />
                <span role="tooltip">{item.label}</span>
              </Link>
            </DockIcon>
          );
        })}
      </Dock>
    </nav>
  );
}
