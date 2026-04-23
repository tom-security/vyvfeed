import type { Article, Category } from "@prisma/client";
import {
  getMockArticleBySlug,
  getMockArticlesByCategory,
  getMockArticlesSorted,
} from "./mock-articles";
import type { MockArticle } from "./mock-articles";
import { CATEGORY_QUOTAS, type CategorySlug } from "./constants";

function estimateReadingTime(content: string | null): number {
  if (!content) return 3;
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

function parseBullets(summary: string | null): [string, string, string] {
  if (summary) {
    try {
      const parsed = JSON.parse(summary) as { bullets?: unknown };
      if (
        Array.isArray(parsed.bullets) &&
        parsed.bullets.length >= 3 &&
        parsed.bullets.every((b) => typeof b === "string")
      ) {
        return [
          parsed.bullets[0] as string,
          parsed.bullets[1] as string,
          parsed.bullets[2] as string,
        ];
      }
    } catch {
      // fall through to default
    }
  }
  return [
    "Résumé en cours de génération.",
    "Revenez dans quelques heures.",
    "Le contenu sera disponible sous peu.",
  ];
}

function extractExcerpt(contentRaw: string | null): string {
  if (!contentRaw) return "";
  return contentRaw.replace(/<[^>]*>/g, "").trim().slice(0, 220);
}

export function mapArticle(a: Article): MockArticle {
  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    url: a.url,
    sourceName: a.sourceName,
    category: a.category as CategorySlug,
    publishedAt: a.publishedAt.toISOString(),
    readingTimeMin: estimateReadingTime(a.contentRaw),
    bullets: parseBullets(a.summary),
    excerpt: extractExcerpt(a.contentRaw),
    contentHtml: a.contentClean ?? "",
    contentRaw: a.contentRaw,
  };
}

// Interleave the three category batches tech → ia → cyber → tech → ia → ...
// Each input list must already be sorted by publishedAt desc so that slot i
// always holds that category's i-th most recent article.
function roundRobin(
  tech: Article[],
  ia: Article[],
  cyber: Article[],
): Article[] {
  const result: Article[] = [];
  const maxLen = Math.max(tech.length, ia.length, cyber.length);
  for (let i = 0; i < maxLen; i++) {
    if (tech[i]) result.push(tech[i]);
    if (ia[i]) result.push(ia[i]);
    if (cyber[i]) result.push(cyber[i]);
  }
  return result;
}

// Fetch the N most recent articles per category in parallel, then interleave
// them round-robin (tech → ia → cyber → ...). A global date sort would let
// tech — more numerous and often more recent — dominate the top of the feed.
export async function getBalancedArticles(): Promise<Article[]> {
  const { prisma } = await import("./prisma");
  const [tech, ia, cyber] = await Promise.all([
    prisma.article.findMany({
      where: { category: "tech" satisfies Category },
      orderBy: { publishedAt: "desc" },
      take: CATEGORY_QUOTAS.tech,
    }),
    prisma.article.findMany({
      where: { category: "ia" satisfies Category },
      orderBy: { publishedAt: "desc" },
      take: CATEGORY_QUOTAS.ia,
    }),
    prisma.article.findMany({
      where: { category: "cyber" satisfies Category },
      orderBy: { publishedAt: "desc" },
      take: CATEGORY_QUOTAS.cyber,
    }),
  ]);
  return roundRobin(tech, ia, cyber);
}

export async function getFeedArticles(
  category?: CategorySlug,
): Promise<MockArticle[]> {
  if (!process.env.DATABASE_URL) {
    return category
      ? getMockArticlesByCategory(category)
      : getMockArticlesSorted();
  }

  try {
    // Dynamic import prevents PrismaClient instantiation at module-eval time
    // when DATABASE_URL is present but DB is unreachable (e.g. build without postgres).
    if (category) {
      const { prisma } = await import("./prisma");
      const rows = await prisma.article.findMany({
        where: { category: category as Category },
        orderBy: { publishedAt: "desc" },
        take: 50,
      });
      if (rows.length > 0) return rows.map(mapArticle);
    } else {
      const rows = await getBalancedArticles();
      if (rows.length > 0) return rows.map(mapArticle);
    }
  } catch {
    // DB unavailable — fall through to mock data
  }

  return category
    ? getMockArticlesByCategory(category)
    : getMockArticlesSorted();
}

export async function getArticleBySlug(
  slug: string,
): Promise<MockArticle | null> {
  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("./prisma");
      const row = await prisma.article.findUnique({ where: { slug } });
      if (row) return mapArticle(row);
    } catch {
      // DB unavailable — fall through to mock lookup
    }
  }
  return getMockArticleBySlug(slug) ?? null;
}
