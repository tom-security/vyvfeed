import { type NextRequest, NextResponse } from "next/server";
import type { Category } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getBalancedArticles, mapArticle } from "@/lib/feed-articles";

export const dynamic = "force-dynamic";

const VALID_CATEGORIES = new Set(["tech", "ia", "cyber"]);

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const categoryParam = sp.get("category");
  const page = Math.max(1, parseInt(sp.get("page") ?? "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(sp.get("limit") ?? "20", 10)));
  const skip = (page - 1) * limit;

  // Single-category query: standard pagination on the filtered set.
  if (categoryParam && VALID_CATEGORIES.has(categoryParam)) {
    const where = { category: categoryParam as Category };
    const [rows, total] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.article.count({ where }),
    ]);
    return NextResponse.json({
      articles: rows.map(mapArticle),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  }

  // No category: balanced fetch across all three (17/17/16), then paginate
  // the merged result in memory. The balanced set never exceeds 50 articles.
  const balanced = await getBalancedArticles();
  const total = balanced.length;
  const rows = balanced.slice(skip, skip + limit);
  return NextResponse.json({
    articles: rows.map(mapArticle),
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}
