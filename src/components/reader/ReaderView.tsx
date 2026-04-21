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
import { ReaderControls } from "./ReaderControls";

type Props = {
  article: MockArticle;
};

export function ReaderView({ article }: Props) {
  const [fontSize, setFontSize] = useState(17);
  const [dark, setDark] = useState(false);

  const pageBg = dark ? "bg-[#0B1220] text-[#E2E8F0]" : "bg-vyvfeed-bg text-vyvfeed-text";
  const headerBorder = dark ? "border-white/10" : "border-vyvfeed-border";
  const muted = dark ? "text-white/60" : "text-vyvfeed-muted";
  const sourceButton = dark
    ? "border-white/15 bg-white/5 hover:border-vyvfeed-accent hover:text-vyvfeed-accent"
    : "border-vyvfeed-border bg-white hover:border-vyvfeed-accent hover:text-vyvfeed-accent";

  return (
    <div className={`min-h-screen w-full transition-colors ${pageBg}`}>
      <header
        className={`flex h-16 items-center justify-between border-b px-6 ${headerBorder}`}
      >
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
            dark ? "text-white/70 hover:text-white" : "text-vyvfeed-muted hover:text-vyvfeed-text"
          }`}
        >
          <ArrowLeftIcon size={15} />
          <span>Retour au feed</span>
        </Link>
        <div className={dark ? "opacity-90" : ""}>
          <Logo />
        </div>
        <div className="w-[110px]" aria-hidden="true" />
      </header>

      <div className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto w-full max-w-[680px]">
          <ReaderControls
            fontSize={fontSize}
            onFontSize={setFontSize}
            dark={dark}
            onToggleDark={() => setDark((v) => !v)}
          />

          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs">
            <CategoryBadge category={article.category} />
            <span className={`font-medium ${dark ? "text-white" : "text-vyvfeed-text"}`}>
              {article.sourceName}
            </span>
            <span className={muted}>·</span>
            <time className={muted} dateTime={article.publishedAt}>
              {formatFullDate(article.publishedAt)}
            </time>
            <span className={muted}>·</span>
            <span className={muted}>{article.readingTimeMin} min de lecture</span>
            <div className="ml-auto">
              <BookmarkButton articleId={article.id} />
            </div>
          </div>

          <h1
            className={`font-serif font-bold leading-tight tracking-tight ${
              dark ? "text-white" : "text-vyvfeed-text"
            }`}
            style={{ fontSize: `${fontSize + 17}px` }}
          >
            {article.title}
          </h1>

          <SummaryBlock bullets={article.bullets} dark={dark} />

          <div
            className="font-serif leading-[1.75]"
            style={{ fontSize: `${fontSize}px` }}
          >
            <ReaderProse html={article.contentHtml} dark={dark} />
          </div>

          <div className={`mt-12 border-t pt-8 ${headerBorder}`}>
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium transition-colors ${sourceButton}`}
            >
              Ouvrir la source originale
              <ExternalLinkIcon size={14} />
            </a>
          </div>

          <footer className={`mt-16 text-center text-xs ${muted}`}>
            Un produit{" "}
            <a
              href="https://vyvox.fr"
              target="_blank"
              rel="noreferrer"
              className={`font-semibold transition-colors ${
                dark ? "text-white hover:text-vyvfeed-accent" : "text-vyvfeed-text hover:text-vyvfeed-accent"
              }`}
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

function ReaderProse({ html, dark }: { html: string; dark: boolean }) {
  const proseClass = dark
    ? "[&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-sans [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_p]:my-4 [&_p]:text-white/85"
    : "[&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-sans [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-vyvfeed-text [&_p]:my-4 [&_p]:text-vyvfeed-text";
  return <div className={proseClass} dangerouslySetInnerHTML={{ __html: html }} />;
}
