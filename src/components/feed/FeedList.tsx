"use client";

import { useState } from "react";
import type { MockArticle } from "@/lib/mock-articles";
import { ArticleCard } from "./ArticleCard";
import { PreviewPanel } from "./PreviewPanel";

type Props = {
  articles: MockArticle[];
  emptyState?: React.ReactNode;
};

export function FeedList({ articles, emptyState }: Props) {
  const [hovered, setHovered] = useState<MockArticle | null>(articles[0] ?? null);

  if (articles.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-8 py-16">
        {emptyState ?? (
          <p className="text-sm text-vyvfeed-muted">Aucun article pour le moment.</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col gap-3 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            active={hovered?.id === article.id}
            onHover={setHovered}
          />
        ))}
      </div>
      <PreviewPanel article={hovered} />
    </div>
  );
}
