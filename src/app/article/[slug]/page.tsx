import { cache } from "react";
import { notFound } from "next/navigation";
import { ReaderView } from "@/components/reader/ReaderView";
import { mapArticle } from "@/lib/feed-articles";
import { getMockArticleBySlug } from "@/lib/mock-articles";
import type { MockArticle } from "@/lib/mock-articles";
import { summarizeArticle } from "@/lib/summarize";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

const loadArticle = cache(async (slug: string): Promise<MockArticle | null> => {
  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("@/lib/prisma");
      const row = await prisma.article.findUnique({ where: { slug } });
      if (!row) return null;

      const content = row.contentClean ?? row.contentRaw ?? "";
      if (!row.summary && content.trim()) {
        try {
          const bullets = await summarizeArticle(content);
          const updated = await prisma.article.update({
            where: { id: row.id },
            data: {
              summary: JSON.stringify({ bullets }),
              summarizedAt: new Date(),
            },
          });
          return mapArticle(updated);
        } catch {
          // Summarization failed — fall through to article without summary
        }
      }

      return mapArticle(row);
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
