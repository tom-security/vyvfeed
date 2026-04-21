"use client";

import { useEffect, useMemo, useState } from "react";
import { FeedHeader } from "@/components/feed/FeedHeader";
import { FeedList } from "@/components/feed/FeedList";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { readSaved, subscribeSaved } from "@/lib/saved";

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState<string[] | null>(null);

  useEffect(() => {
    setSavedIds(readSaved());
    return subscribeSaved(() => setSavedIds(readSaved()));
  }, []);

  const articles = useMemo(() => {
    if (!savedIds) return [];
    return MOCK_ARTICLES.filter((a) => savedIds.includes(a.id)).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }, [savedIds]);

  return (
    <>
      <FeedHeader
        eyebrow="Lecture"
        title="Favoris"
        description="Les articles que vous avez sauvegardés. Stockés localement dans votre navigateur — aucun compte requis."
        count={savedIds === null ? undefined : articles.length}
      />
      {savedIds === null ? (
        <div className="flex flex-1 items-center justify-center px-8 py-16">
          <p className="text-sm text-vyvfeed-muted">Chargement…</p>
        </div>
      ) : (
        <FeedList
          articles={articles}
          emptyState={
            <div className="max-w-md text-center">
              <h2 className="text-lg font-semibold text-vyvfeed-text">
                Aucun favori pour le moment
              </h2>
              <p className="mt-2 text-sm text-vyvfeed-muted">
                Cliquez sur l&apos;icône signet en haut à droite d&apos;un article pour
                l&apos;ajouter à vos favoris.
              </p>
            </div>
          }
        />
      )}
    </>
  );
}
