"use client";

import Link from "next/link";
import type { MockArticle } from "@/lib/mock-articles";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { SparkleIcon } from "@/components/ui/Icons";
import { formatShortDate } from "@/lib/format";

type Props = {
  article: MockArticle;
  active?: boolean;
  onHover?: (article: MockArticle) => void;
};

export function ArticleCard({ article, active, onHover }: Props) {
  return (
    <article
      onMouseEnter={() => onHover?.(article)}
      onFocus={() => onHover?.(article)}
      className={`group relative flex flex-col gap-3 rounded-xl border bg-vyvfeed-bg px-5 py-5 transition-all ${
        active
          ? "border-vyvfeed-accent/40 shadow-[0_2px_12px_rgba(14,165,233,0.08)]"
          : "border-vyvfeed-border hover:border-vyvfeed-accent/30 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-3 text-xs">
        <CategoryBadge category={article.category} />
        <span className="font-medium text-vyvfeed-text">{article.sourceName}</span>
        <span className="text-vyvfeed-muted">·</span>
        <time className="text-vyvfeed-muted" dateTime={article.publishedAt}>
          {formatShortDate(article.publishedAt)}
        </time>
        <span className="text-vyvfeed-muted">·</span>
        <span className="text-vyvfeed-muted">{article.readingTimeMin} min</span>
        <div className="ml-auto">
          <BookmarkButton articleId={article.id} />
        </div>
      </div>

      <h2 className="text-[17px] font-semibold leading-snug text-vyvfeed-text">
        <Link
          href={`/article/${article.slug}`}
          className="outline-none transition-colors after:absolute after:inset-0 after:content-[''] hover:text-vyvfeed-accent focus-visible:text-vyvfeed-accent"
        >
          {article.title}
        </Link>
      </h2>

      <div className="rounded-lg border border-vyvfeed-border bg-vyvfeed-surface px-4 py-3">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-vyvfeed-accent">
          <SparkleIcon size={12} />
          <span>Résumé Claude</span>
        </div>
        <ul className="flex flex-col gap-1.5 text-sm leading-relaxed text-vyvfeed-text">
          {article.bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-vyvfeed-accent" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
