import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { summarizeArticle } from "@/lib/summarize";

export const dynamic = "force-dynamic";

const BATCH_SIZE = 50;

export async function GET() {
  return NextResponse.json(
    { error: "Method Not Allowed. Use POST to trigger summarization." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

export async function POST() {
  let summarized = 0;
  const errors: string[] = [];

  const articles = await prisma.article.findMany({
    where: {
      summary: null,
      OR: [{ contentClean: { not: null } }, { contentRaw: { not: null } }],
    },
    orderBy: { publishedAt: "desc" },
    take: BATCH_SIZE,
    select: {
      id: true,
      contentClean: true,
      contentRaw: true,
    },
  });

  for (const article of articles) {
    const content = article.contentClean ?? article.contentRaw ?? "";
    if (!content.trim()) continue;

    try {
      const bullets = await summarizeArticle(content);
      await prisma.article.update({
        where: { id: article.id },
        data: {
          summary: JSON.stringify({ bullets }),
          summarizedAt: new Date(),
        },
      });
      summarized++;
    } catch (err) {
      errors.push(
        `${article.id}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  return NextResponse.json({ summarized, errors });
}
