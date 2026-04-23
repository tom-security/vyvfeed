import { NextResponse } from "next/server";
import type { Category } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  CATEGORY_QUOTAS,
  RSS_SOURCES,
  type CategorySlug,
} from "@/lib/constants";
import { fetchAllFeeds } from "@/lib/rss";
import { extractArticle } from "@/lib/reader";

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

        // Best-effort full-content extraction via Readability.js.
        // Never blocks ingest: any failure (network, parsing, timeout) falls
        // through with contentClean=null, and the article is still stored.
        let contentClean: string | null = null;
        try {
          const extracted = await extractArticle(item.url);
          if (extracted?.content) {
            const textLen = (extracted.textContent ?? "").trim().length;
            // Below 200 chars of plain text, the extraction is unusable
            // (paywall stub, cookie banner, JS-only page, empty shell).
            if (textLen >= 200) {
              contentClean = extracted.content;
            }
          }
        } catch {
          // Swallow — ingest continues without the cleaned content.
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
            contentClean,
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

  // Per-category purge: keep the N most recent per slot (17/17/16).
  // A global cap would let tech overflow and starve IA/Cyber from the feed,
  // so we enforce the balance at the storage layer itself.
  const quotaEntries = Object.entries(CATEGORY_QUOTAS) as [
    CategorySlug,
    number,
  ][];
  for (const [slug, keep] of quotaEntries) {
    const toDelete = await prisma.article.findMany({
      where: { category: slug as Category },
      orderBy: { publishedAt: "desc" },
      skip: keep,
      select: { id: true },
    });
    if (toDelete.length > 0) {
      await prisma.article.deleteMany({
        where: { id: { in: toDelete.map((a) => a.id) } },
      });
    }
  }

  // TEMP DIAGNOSTIC: count how many stored articles have Readability content
  // vs only the RSS snippet. Remove once extraction rate is validated.
  const withClean = await prisma.article.count({
    where: { contentClean: { not: null } },
  });
  const totalAfter = await prisma.article.count();
  const diagnostic = {
    articlesTotal: totalAfter,
    articlesWithContentClean: withClean,
    articlesWithoutContentClean: totalAfter - withClean,
  };
  console.log("[ingest] content extraction stats:", diagnostic);

  return NextResponse.json({ ingested, skipped, errors, diagnostic });
}
