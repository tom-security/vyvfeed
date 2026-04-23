"use client";

import Link from "next/link";
import { useState } from "react";
import type { MockArticle } from "@/lib/mock-articles";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { ArrowLeftIcon, ExternalLinkIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { formatFullDate } from "@/lib/format";
import { SummaryBlock } from "./SummaryBlock";
import { ReaderControls, type FontLevel } from "./ReaderControls";

const PREVIEW_MAX_CHARS = 2000;

const FONT_CLASSES: Record<FontLevel, string> = {
  0: "text-base",
  1: "text-lg",
  2: "text-xl",
};

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

function buildPreview(article: MockArticle): {
  text: string;
  truncated: boolean;
} {
  const source = article.contentHtml?.trim() || article.excerpt || "";
  const text = stripHtml(source);
  if (text.length <= PREVIEW_MAX_CHARS) {
    return { text, truncated: false };
  }
  return {
    text: `${text.slice(0, PREVIEW_MAX_CHARS).trimEnd()}…`,
    truncated: true,
  };
}

export function ReaderView({ article }: Props) {
  const [level, setLevel] = useState<FontLevel>(1);
  const [dark, setDark] = useState(false);

  const hasSummary =
    Array.isArray(article.bullets) &&
    article.bullets.length === 3 &&
    !article.bullets[0].startsWith("Résumé en cours");

  const { text: previewText, truncated } = buildPreview(article);

  const pageBg = dark
    ? "bg-[#0F172A] text-[#E2E8F0]"
    : "bg-vyvfeed-bg text-vyvfeed-text";
  const headerBorder = dark ? "border-white/10" : "border-vyvfeed-border";
  const muted = dark ? "text-white/60" : "text-vyvfeed-muted";
  const title = dark ? "text-white" : "text-vyvfeed-text";
  const body = dark ? "text-[#E2E8F0]" : "text-vyvfeed-text";
  const fadeTo = dark ? "to-[#0F172A]" : "to-vyvfeed-bg";
  const ctaBtn = dark
    ? "bg-vyvfeed-accent text-white hover:bg-sky-400"
    : "bg-vyvfeed-accent text-white hover:bg-sky-600";
  const backLink = dark
    ? "text-white/70 hover:text-white"
    : "text-vyvfeed-muted hover:text-vyvfeed-text";

  return (
    <div className={`min-h-screen w-full transition-colors ${pageBg}`}>
      <header
        className={`flex h-16 items-center justify-between border-b px-6 ${headerBorder}`}
      >
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${backLink}`}
        >
          <ArrowLeftIcon size={15} />
          <span>Retour au feed</span>
        </Link>
        <div className={dark ? "opacity-90" : ""}>
          <Logo />
        </div>
        <div className="w-[110px]" aria-hidden="true" />
      </header>

      <div className="px-4 py-10 pb-32 sm:px-6 sm:py-14">
        <div className="mx-auto w-full max-w-[680px]">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs">
            <CategoryBadge category={article.category} />
            <span className={`font-medium ${title}`}>{article.sourceName}</span>
            <div className="ml-auto">
              <BookmarkButton articleId={article.id} />
            </div>
          </div>

          <h1
            className={`font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl ${title}`}
          >
            {article.title}
          </h1>

          {hasSummary ? (
            <SummaryBlock bullets={article.bullets} dark={dark} />
          ) : null}

          {previewText ? (
            <div className="relative mt-8">
              <p
                className={`font-serif leading-[1.75] ${FONT_CLASSES[level]} ${body}`}
              >
                {previewText}
              </p>
              {truncated ? (
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent ${fadeTo}`}
                />
              ) : null}
            </div>
          ) : null}

          <div className="mt-10 flex justify-center">
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold shadow-sm transition-colors ${ctaBtn}`}
            >
              Lire l&apos;article complet
              <ExternalLinkIcon size={14} />
            </a>
          </div>

          <div
            className={`mt-12 flex flex-wrap items-center gap-2 border-t pt-6 text-xs ${headerBorder} ${muted}`}
          >
            <span className={`font-medium ${title}`}>{article.sourceName}</span>
            <span>·</span>
            <time dateTime={article.publishedAt}>
              {formatFullDate(article.publishedAt)}
            </time>
            <span>·</span>
            <span>{article.readingTimeMin} min de lecture</span>
          </div>

          <footer className={`mt-16 text-center text-xs ${muted}`}>
            Un produit{" "}
            <a
              href="https://vyvox.fr"
              target="_blank"
              rel="noreferrer"
              className={`font-semibold transition-colors ${
                dark
                  ? "text-white hover:text-vyvfeed-accent"
                  : "text-vyvfeed-text hover:text-vyvfeed-accent"
              }`}
            >
              VYVOX
            </a>{" "}
            — Agence Web Premium Lyon
          </footer>
        </div>
      </div>

      <ReaderControls
        level={level}
        onLevelChange={setLevel}
        dark={dark}
        onToggleDark={() => setDark((v) => !v)}
      />
    </div>
  );
}
