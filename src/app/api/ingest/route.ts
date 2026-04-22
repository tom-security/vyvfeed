import { NextResponse } from "next/server";
import type { Category } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { RSS_SOURCES } from "@/lib/constants";
import { fetchAllFeeds } from "@/lib/rss";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { error: "Method Not Allowed. Use POST to trigger ingestion." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

function slugify(title: string, url: string): string {
  const base = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);

  // Short hash of the URL ensures uniqueness even for same-title articles
  let h = 0;
  for (let i = 0; i < url.length; i++) {
    h = (Math.imul(31, h) + url.charCodeAt(i)) | 0;
  }
  return `${base}-${(h >>> 0).toString(36).slice(0, 6)}`;
}

export async function POST() {
  let ingested = 0;
  let skipped = 0;
  const errors: string[] = [];

  // Ensure every RSS source has a matching row in DB
  for (const src of RSS_SOURCES) {
    await prisma.source.upsert({
      where: { rssUrl: src.url },
      create: {
        name: src.name,
        rssUrl: src.url,
        category: src.category as Category,
      },
      update: {
        name: src.name,
        category: src.category as Category,
      },
    });
  }

  const feeds = await fetchAllFeeds();

  for (const { source, items } of feeds) {
    const dbSource = await prisma.source.findUnique({
      where: { rssUrl: source.url },
    });
    if (!dbSource) continue;

    for (const item of items) {
      try {
        const exists = await prisma.article.findUnique({
          where: { url: item.url },
          select: { id: true },
        });
        if (exists) {
          skipped++;
          continue;
        }

        await prisma.article.create({
          data: {
            title: item.title,
            url: item.url,
            slug: slugify(item.title || "article", item.url),
            sourceName: dbSource.name,
            sourceId: dbSource.id,
            category: dbSource.category,
            publishedAt: item.publishedAt,
            contentRaw: item.contentRaw,
          },
        });
        ingested++;
      } catch (err) {
        errors.push(
          `${item.url}: ${err instanceof Error ? err.message : String(err)}`,
        );
      }
    }

    await prisma.source.update({
      where: { id: dbSource.id },
      data: { lastFetched: new Date() },
    });
  }

  return NextResponse.json({ ingested, skipped, errors });
}
