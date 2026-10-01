"use client";

import { useCallback, useEffect, useState } from "react";
import type { Curation } from "@/lib/curation";
import { projectDomains, type ProjectDomain } from "@/content/domains";
import type { Project } from "@/content/portfolio";

type AdminData = {
  curation: Curation;
  currentProjects: Project[];
  storageReady: boolean;
};
type BrowserRepository = {
  repository: string;
  snapshot: { description: string | null };
};

export function AdminProjects() {
  const [data, setData] = useState<AdminData | null>(null);
  const [repository, setRepository] = useState("");
  const [newDomains, setNewDomains] = useState<ProjectDomain[]>([]);
  const [editedDomains, setEditedDomains] = useState<
    Record<string, ProjectDomain[]>
  >({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [browserRepositories, setBrowserRepositories] = useState<
    BrowserRepository[]
  >([]);
  const [browserOpen, setBrowserOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/projects", {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Could not load the private editor");
      setData((await response.json()) as AdminData);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not load the private editor",
      );
    }
  }, []);
  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  async function mutate(input: {
    action: string;
    repository: string;
    domains?: ProjectDomain[];
    direction?: string;
  }) {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Save failed");
      setMessage("Saved to your portfolio repository.");
      await load();
      return true;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed");
      return false;
    } finally {
      setBusy(false);
    }
  }

  function toggleDomain(current: ProjectDomain[], domain: ProjectDomain) {
    return current.includes(domain)
      ? current.filter((item) => item !== domain)
      : [...current, domain];
  }

  async function browseRepositories() {
    if (browserOpen) {
      setBrowserOpen(false);
      return;
    }
    setBrowserOpen(true);
    try {
      const response = await fetch("/api/admin/repositories", {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Could not load GitHub repositories");
      const result = (await response.json()) as {
        repositories: BrowserRepository[];
      };
      setBrowserRepositories(result.repositories);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not load GitHub repositories",
      );
    }
  }

  if (!data)
    return <div className="admin-panel">Loading projects… {message}</div>;
  return (
    <div className="admin-panel">
      {!data.storageReady && (
        <p className="admin-setup">
          Saving is unavailable until the repository-scoped{" "}
          <code>GITHUB_CONTENT_TOKEN</code> is configured on the server. Public
          pages remain available.
        </p>
      )}
      <div className="admin-add">
        <div>
          <h2>+ Add a GitHub project</h2>
          <p>
            Choose one of your public repositories or paste a GitHub URL.
            Project details come from GitHub.
          </p>
          <button
            type="button"
            className="admin-browse"
            onClick={() => void browseRepositories()}
            aria-expanded={browserOpen}
          >
            {browserOpen
              ? "Close repository list"
              : "Browse my GitHub repositories"}
          </button>
          {browserOpen && (
            <div className="admin-repository-browser">
              {browserRepositories
                .filter(
                  (item) =>
                    !data.currentProjects.some(
                      (project) =>
                        project.sourceUrl.toLowerCase() ===
                        `https://github.com/${item.repository}`.toLowerCase(),
                    ),
                )
                .map((item) => (
                  <button
                    key={item.repository}
                    type="button"
                    onClick={() => {
                      setRepository(item.repository);
                      setBrowserOpen(false);
                    }}
                  >
                    <strong>{item.repository}</strong>
                    <small>{item.snapshot.description}</small>
                  </button>
                ))}
            </div>
          )}
        </div>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (
              await mutate({ action: "add", repository, domains: newDomains })
            ) {
              setRepository("");
              setNewDomains([]);
            }
          }}
        >
          <label htmlFor="admin-repo">Repository</label>
          <input
            id="admin-repo"
            value={repository}
            onChange={(event) => setRepository(event.target.value)}
            placeholder="https://github.com/owner/repository"
            required
          />
          <div className="admin-domain-picker" aria-label="Project domains">
            {projectDomains.map((domain) => (
              <label key={domain}>
                <input
                  type="checkbox"
                  checked={newDomains.includes(domain)}
                  onChange={() =>
                    setNewDomains((current) => toggleDomain(current, domain))
                  }
                />
                {domain}
              </label>
            ))}
          </div>
          <button type="submit" disabled={busy || !data.storageReady}>
            Add project
          </button>
        </form>
      </div>
      <div className="admin-list-head">
        <h2>Visible projects</h2>
        <span>
          New public repositories are added automatically in creation order. You
          can hide or reorder them here.
        </span>
      </div>
      <div className="admin-list">
        {data.currentProjects.map((project, position) => {
          const entry = data.curation.projects.find(
            (item) =>
              item.repository.toLowerCase() ===
              project.sourceUrl
                .replace("https://github.com/", "")
                .toLowerCase(),
          );
          const id = project.sourceUrl.replace("https://github.com/", "");
          const selected = editedDomains[id] ?? entry?.domains ?? [];
          return (
            <article key={id} className="admin-project">
              <span className="admin-position">
                {String(position + 1).padStart(2, "0")}
              </span>
              <div className="admin-project-main">
                <strong>{project.title}</strong>
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {id} ↗
                </a>
                <p>{project.description}</p>
                <div className="admin-domain-picker">
                  {projectDomains.map((domain) => (
                    <label key={domain}>
                      <input
                        type="checkbox"
                        checked={selected.includes(domain)}
                        onChange={() =>
                          setEditedDomains((current) => ({
                            ...current,
                            [id]: toggleDomain(selected, domain),
                          }))
                        }
                      />
                      {domain}
                    </label>
                  ))}
                </div>
              </div>
              <div className="admin-project-actions">
                <button
                  type="button"
                  disabled={busy || !data.storageReady || position === 0}
                  onClick={() =>
                    void mutate({
                      action: "move",
                      repository: id,
                      direction: "up",
                    })
                  }
                  aria-label={`Move ${project.title} up`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={
                    busy ||
                    !data.storageReady ||
                    position === data.currentProjects.length - 1
                  }
                  onClick={() =>
                    void mutate({
                      action: "move",
                      repository: id,
                      direction: "down",
                    })
                  }
                  aria-label={`Move ${project.title} down`}
                >
                  ↓
                </button>
                <button
                  type="button"
                  disabled={busy || !data.storageReady || !entry}
                  onClick={() =>
                    void mutate({
                      action: "domains",
                      repository: id,
                      domains: selected,
                    })
                  }
                >
                  Save domains
                </button>
                <button
                  type="button"
                  disabled={busy || !data.storageReady}
                  onClick={() =>
                    void mutate({ action: "hide", repository: id })
                  }
                >
                  Remove from site
                </button>
              </div>
            </article>
          );
        })}
      </div>
      {data.curation.hiddenRepositories.length > 0 && (
        <div className="admin-hidden">
          <h2>Removed from site</h2>
          {data.curation.hiddenRepositories.map((id) => (
            <div key={id}>
              <span>{id}</span>
              <button
                type="button"
                disabled={busy || !data.storageReady}
                onClick={() => void mutate({ action: "show", repository: id })}
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      )}
      <p className="admin-message" role="status">
        {message}
      </p>
    </div>
  );
}
