import Link from "next/link";
import { FeedHeader } from "@/components/feed/FeedHeader";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { SparkleIcon } from "@/components/ui/Icons";
import { getMockArticlesSorted } from "@/lib/mock-articles";
import { formatShortDate } from "@/lib/format";

export const metadata = {
  title: "Digest hebdo",
};

export default function DigestPage() {
  const top10 = getMockArticlesSorted().slice(0, 10);

  return (
    <>
      <FeedHeader
        eyebrow="Newsletter"
        title="Digest de la semaine"
        description="Les 10 articles les plus marquants — envoyés chaque lundi à 8h00. Aperçu de l'édition prête à partir."
      />
      <div className="grid flex-1 gap-8 px-8 py-8 lg:grid-cols-[1fr_320px]">
        <section className="flex flex-col gap-4">
          {top10.map((article, i) => (
            <article
              key={article.id}
              className="flex gap-4 rounded-xl border border-vyvfeed-border bg-vyvfeed-bg p-5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-vyvfeed-surface font-mono text-sm font-semibold text-vyvfeed-muted">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-center gap-3 text-xs">
                  <CategoryBadge category={article.category} />
                  <span className="font-medium text-vyvfeed-text">
                    {article.sourceName}
                  </span>
                  <span className="text-vyvfeed-muted">·</span>
                  <time className="text-vyvfeed-muted" dateTime={article.publishedAt}>
                    {formatShortDate(article.publishedAt)}
                  </time>
                </div>
                <h2 className="text-base font-semibold leading-snug text-vyvfeed-text">
                  <Link
                    href={`/article/${article.slug}`}
                    className="transition-colors hover:text-vyvfeed-accent"
                  >
                    {article.title}
                  </Link>
                </h2>
                <div className="mt-1 flex items-start gap-2 text-sm text-vyvfeed-muted">
                  <SparkleIcon size={12} className="mt-1 text-vyvfeed-accent" />
                  <span>{article.bullets[0]}</span>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="flex flex-col gap-4 rounded-xl border border-vyvfeed-border bg-vyvfeed-surface p-6 lg:sticky lg:top-6 lg:self-start">
          <h2 className="text-lg font-semibold text-vyvfeed-text">
            Recevoir le digest
          </h2>
          <p className="text-sm text-vyvfeed-muted">
            Chaque lundi à 8h00, le top 10 de la semaine dans votre boîte mail.
            Gratuit, sans suivi, désabonnement en un clic.
          </p>
          <form className="flex flex-col gap-2">
            <label htmlFor="digest-email" className="sr-only">
              Adresse email
            </label>
            <input
              id="digest-email"
              type="email"
              required
              placeholder="vous@exemple.fr"
              className="w-full rounded-md border border-vyvfeed-border bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-vyvfeed-accent focus:ring-2 focus:ring-vyvfeed-accent/20"
            />
            <button
              type="submit"
              className="rounded-md bg-vyvfeed-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-vyvfeed-accent/90"
            >
              S&apos;abonner
            </button>
          </form>
          <p className="text-xs text-vyvfeed-muted">
            Un produit{" "}
            <a
              href="https://vyvox.fr"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-vyvfeed-text hover:text-vyvfeed-accent"
            >
              VYVOX
            </a>{" "}
            — Agence Web Premium Lyon.
          </p>
        </aside>
      </div>
    </>
  );
}
