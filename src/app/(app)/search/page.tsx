"use client";

import { useMemo, useState } from "react";
import { FeedHeader } from "@/components/feed/FeedHeader";
import { FeedList } from "@/components/feed/FeedList";
import { SearchIcon } from "@/components/ui/Icons";
import { MOCK_ARTICLES } from "@/lib/mock-articles";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return MOCK_ARTICLES.filter((a) => {
      const haystack = [a.title, a.excerpt, ...a.bullets, a.sourceName]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    }).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }, [query]);

  return (
    <>
      <FeedHeader
        eyebrow="Outils"
        title="Recherche"
        description="Recherche full-text dans les titres, résumés Claude et sources."
      />
      <div className="border-b border-vyvfeed-border px-8 pb-6 pt-4">
        <div className="relative max-w-2xl">
          <SearchIcon
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-vyvfeed-muted"
          />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Mistral, ransomware, Bun, Vision Pro…"
            className="w-full rounded-lg border border-vyvfeed-border bg-vyvfeed-surface py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-vyvfeed-accent focus:bg-white focus:ring-2 focus:ring-vyvfeed-accent/20"
          />
        </div>
        {query.trim() ? (
          <p className="mt-3 text-xs text-vyvfeed-muted">
            {results.length} résultat{results.length > 1 ? "s" : ""} pour «&nbsp;
            {query}&nbsp;»
          </p>
        ) : null}
      </div>
      {query.trim() ? (
        <FeedList
          articles={results}
          emptyState={
            <p className="text-sm text-vyvfeed-muted">
              Aucun résultat pour «&nbsp;{query}&nbsp;».
            </p>
          }
        />
      ) : (
        <div className="flex flex-1 items-center justify-center px-8 py-16">
          <p className="max-w-md text-center text-sm text-vyvfeed-muted">
            Tapez quelques mots pour explorer les 10 derniers articles agrégés
            par VYVFEED.
          </p>
        </div>
      )}
    </>
  );
}
