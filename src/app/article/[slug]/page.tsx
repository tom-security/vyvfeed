import { cache } from "react";
import { notFound } from "next/navigation";
import { ReaderView } from "@/components/reader/ReaderView";
import { mapArticle } from "@/lib/feed-articles";
import { getMockArticleBySlug } from "@/lib/mock-articles";
import type { MockArticle } from "@/lib/mock-articles";
import { summarizeArticle } from "@/lib/summarize";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

function isUsableContent(content: string | null | undefined): boolean {
  if (!content) return false;
  const trimmed = content.trim();
  if (trimmed.length === 0) return false;
  // Reject degenerate content that's just a URL — never shown as article body.
  if (/^https?:\/\/\S+$/i.test(trimmed)) return false;
  return true;
}

const loadArticle = cache(async (slug: string): Promise<MockArticle | null> => {
  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("@/lib/prisma");
      const row = await prisma.article.findUnique({ where: { slug } });
      if (!row) return null;

      // Guard: any non-usable contentClean (null, empty, URL-only) is scrubbed
      // before mapping, so ReaderView never has to guess.
      const safeRow = isUsableContent(row.contentClean)
        ? row
        : { ...row, contentClean: null };

      const summaryInput = safeRow.contentClean ?? safeRow.contentRaw ?? "";
      if (!safeRow.summary && summaryInput.trim()) {
        try {
          const bullets = await summarizeArticle(summaryInput);
          const updated = await prisma.article.update({
            where: { id: safeRow.id },
            data: {
              summary: JSON.stringify({ bullets }),
              summarizedAt: new Date(),
            },
          });
          return mapArticle({ ...updated, contentClean: safeRow.contentClean });
        } catch {
          // Summarization failed — fall through to article without summary
        }
      }

      return mapArticle(safeRow);
    } catch {
      // DB unavailable — fall through to mock lookup
    }
  }
  return getMockArticleBySlug(slug) ?? null;
});

export async function generateMetadata(props: PageProps<"/article/[slug]">) {
  const { slug } = await props.params;
  const article = await loadArticle(slug);
  if (!article) return { title: "Article introuvable" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
    },
  };
}

export default async function ArticlePage(props: PageProps<"/article/[slug]">) {
  const { slug } = await props.params;
  const article = await loadArticle(slug);
  if (!article) notFound();
  return <ReaderView article={article} />;
}
