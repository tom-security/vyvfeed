"use client";

import Link from "next/link";
import type { MockArticle } from "@/lib/mock-articles";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { ArrowLeftIcon, ExternalLinkIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { formatFullDate } from "@/lib/format";
import { SummaryBlock } from "./SummaryBlock";

const PREVIEW_MAX_CHARS = 800;

type Props = {
  article: MockArticle;
};

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildPreview(article: MockArticle): { text: string; truncated: boolean } {
  const source = article.contentHtml?.trim() || article.excerpt || "";
  const text = stripHtml(source);
  if (text.length <= PREVIEW_MAX_CHARS) {
    return { text, truncated: false };
  }
  return { text: `${text.slice(0, PREVIEW_MAX_CHARS).trimEnd()}…`, truncated: true };
}

export function ReaderView({ article }: Props) {
  const hasSummary =
    Array.isArray(article.bullets) &&
    article.bullets.length === 3 &&
    !article.bullets[0].startsWith("Résumé en cours");

  const { text: previewText, truncated } = buildPreview(article);

  return (
    <div className="min-h-screen w-full bg-vyvfeed-bg text-vyvfeed-text">
      <header className="flex h-16 items-center justify-between border-b border-vyvfeed-border px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-vyvfeed-muted transition-colors hover:text-vyvfeed-text"
        >
          <ArrowLeftIcon size={15} />
          <span>Retour au feed</span>
        </Link>
        <Logo />
        <div className="w-[110px]" aria-hidden="true" />
      </header>

      <div className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto w-full max-w-[680px]">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs">
            <CategoryBadge category={article.category} />
            <span className="font-medium text-vyvfeed-text">
              {article.sourceName}
            </span>
            <div className="ml-auto">
              <BookmarkButton articleId={article.id} />
            </div>
          </div>

          <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {article.title}
          </h1>

          {hasSummary ? (
            <SummaryBlock bullets={article.bullets} dark={false} />
          ) : null}

          {previewText ? (
            <div className="relative mt-8">
              <p className="font-serif text-[17px] leading-[1.75] text-vyvfeed-text">
                {previewText}
              </p>
              {truncated ? (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-vyvfeed-bg"
                />
              ) : null}
            </div>
          ) : null}

          <div className="mt-10 flex justify-center">
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-vyvfeed-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-600"
            >
              Lire l&apos;article complet
              <ExternalLinkIcon size={14} />
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-vyvfeed-border pt-6 text-xs text-vyvfeed-muted">
            <span className="font-medium text-vyvfeed-text">
              {article.sourceName}
            </span>
            <span>·</span>
            <time dateTime={article.publishedAt}>
              {formatFullDate(article.publishedAt)}
            </time>
            <span>·</span>
            <span>{article.readingTimeMin} min de lecture</span>
          </div>

          <footer className="mt-16 text-center text-xs text-vyvfeed-muted">
            Un produit{" "}
            <a
              href="https://vyvox.fr"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-vyvfeed-text transition-colors hover:text-vyvfeed-accent"
            >
              VYVOX
            </a>{" "}
            — Agence Web Premium Lyon
          </footer>
        </div>
      </div>
    </div>
  );
}
