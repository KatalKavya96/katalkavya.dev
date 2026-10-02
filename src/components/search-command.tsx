"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/content/site";
import { profiles, projects } from "@/content/portfolio";

type SearchItem = { title: string; href: string; description: string };

const pages: SearchItem[] = navItems.map((item) => ({
  title: item.label,
  href: item.href,
  description: "Page",
}));
const profileItems: SearchItem[] = profiles.map((profile) => ({
  title: profile.platform,
  href: profile.url,
  description: `Profile · ${profile.handle}`,
}));
const fallbackProjects: SearchItem[] = projects.map((project) => ({
  title: project.title,
  href: project.sourceUrl,
  description: `Project · ${project.category}`,
}));

export function SearchCommand() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [projectItems, setProjectItems] = useState(fallbackProjects);
  const [open, setOpen] = useState(false);
  const show = () => {
    if (!dialog.current?.open) dialog.current?.showModal();
    setOpen(true);
    input.current?.focus();
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!dialog.current?.open) dialog.current?.showModal();
        setOpen(true);
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (dialog.current?.open) dialog.current.close();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    let active = true;
    void fetch("/api/search")
      .then(async (response) =>
        response.ok ? ((await response.json()) as SearchItem[]) : null,
      )
      .then((items) => {
        if (active && items) setProjectItems(items);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [open]);

  const items = [...pages, ...projectItems, ...profileItems]
    .filter((item) =>
      `${item.title} ${item.description}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    )
    .slice(0, 9);
  const close = () => {
    dialog.current?.close();
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      <button
        className="header-search"
        type="button"
        onClick={show}
        aria-label="Search pages, projects, and coding profiles"
      >
        <kbd>⌘ K</kbd>
        <span>Search anything...</span>
      </button>
      <dialog
        ref={dialog}
        className="search-dialog"
        onClose={() => {
          setOpen(false);
          setQuery("");
        }}
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
        aria-label="Search the portfolio"
      >
        <div className="search-panel">
          <div className="search-input-wrap">
            <span aria-hidden="true">⌕</span>
            <input
              ref={input}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects, profiles, pages..."
              aria-label="Search query"
            />
            <button type="button" onClick={close} aria-label="Close search">
              Esc
            </button>
          </div>
          <div className="search-results">
            {items.length ? (
              items.map((item) =>
                item.href.startsWith("/") ? (
                  <Link
                    key={`${item.href}-${item.title}`}
                    href={item.href}
                    onClick={close}
                  >
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </span>
                    <b aria-hidden="true">↗</b>
                  </Link>
                ) : (
                  <a
                    key={`${item.href}-${item.title}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                  >
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </span>
                    <b aria-hidden="true">↗</b>
                  </a>
                ),
              )
            ) : (
              <p>No matches yet.</p>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
