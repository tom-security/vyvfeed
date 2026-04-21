import Link from "next/link";
import type { MockArticle } from "@/lib/mock-articles";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { ExternalLinkIcon, SparkleIcon } from "@/components/ui/Icons";
import { formatFullDate } from "@/lib/format";

type Props = {
  article: MockArticle | null;
};

export function PreviewPanel({ article }: Props) {
  if (!article) {
    return (
      <aside className="hidden w-[360px] shrink-0 border-l border-vyvfeed-border bg-vyvfeed-surface px-6 py-12 lg:block">
        <p className="text-sm text-vyvfeed-muted">
          Survolez un article dans la colonne centrale pour afficher un aperçu.
        </p>
      </aside>
    );
  }

  return (
    <aside className="hidden w-[360px] shrink-0 border-l border-vyvfeed-border bg-vyvfeed-surface lg:block lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
      <div className="flex flex-col gap-5 px-6 py-8">
        <div className="flex items-center gap-3 text-xs">
          <CategoryBadge category={article.category} />
          <span className="font-medium text-vyvfeed-text">{article.sourceName}</span>
        </div>

        <h3 className="text-xl font-semibold leading-snug text-vyvfeed-text">
          {article.title}
        </h3>

        <time className="text-xs text-vyvfeed-muted" dateTime={article.publishedAt}>
          {formatFullDate(article.publishedAt)}
        </time>

        <div className="rounded-lg border border-vyvfeed-border bg-white px-4 py-3">
          <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-vyvfeed-accent">
            <SparkleIcon size={12} />
            <span>Résumé Claude</span>
          </div>
          <ul className="flex flex-col gap-1.5 text-sm leading-relaxed text-vyvfeed-text">
            {article.bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-vyvfeed-accent"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="font-serif text-[15px] leading-relaxed text-vyvfeed-text">
          {article.excerpt}
        </p>

        <div className="flex flex-col gap-2">
          <Link
            href={`/article/${article.slug}`}
            className="inline-flex items-center justify-center rounded-md bg-vyvfeed-text px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-vyvfeed-text/90"
          >
            Ouvrir le reader
          </Link>
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-vyvfeed-border bg-white px-4 py-2.5 text-sm font-medium text-vyvfeed-text transition-colors hover:border-vyvfeed-accent hover:text-vyvfeed-accent"
          >
            Source originale
            <ExternalLinkIcon size={13} />
          </a>
        </div>
      </div>
    </aside>
  );
}
