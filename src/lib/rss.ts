import Parser from "rss-parser";
import { RSS_SOURCES, type RssSource } from "./constants";

const parser = new Parser();

export type ParsedFeedItem = {
  title: string;
  url: string;
  publishedAt: Date;
  contentRaw: string | null;
};

function isHackerNewsSource(source: RssSource): boolean {
  return (
    source.url.includes("hnrss.org") ||
    source.url.includes("news.ycombinator.com") ||
    source.name === "Hacker News"
  );
}

function isHackerNewsUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return host === "news.ycombinator.com" || host.endsWith(".ycombinator.com");
  } catch {
    return false;
  }
}

// HN RSS items embed the real article URL in a description block like:
//   Article URL: <a href="https://real.example.com/post">...</a>
//   Comments URL: <a href="https://news.ycombinator.com/item?id=123">...</a>
//   Points: 42
//   # Comments: 17
function extractHnArticleUrl(description: string | null): string | null {
  if (!description) return null;
  const withHref = description.match(
    /Article URL:\s*<a[^>]*href=["']([^"']+)["']/i,
  );
  if (withHref?.[1]) return withHref[1];
  const plain = description.match(/Article URL:\s*(https?:\/\/\S+)/i);
  if (plain?.[1]) return plain[1];
  return null;
}

export async function fetchFeed(source: RssSource): Promise<ParsedFeedItem[]> {
  const feed = await parser.parseURL(source.url);
  const isHn = isHackerNewsSource(source);

  return feed.items
    .filter((item): item is typeof item & { link: string } => !!item.link)
    .map((item) => {
      const description =
        (item as { content?: string }).content ?? item.contentSnippet ?? null;

      let url = item.link;
      let contentRaw: string | null = description;

      if (isHn) {
        // Prefer the real article URL over item.link (which may point to
        // the HN comments page).
        const realUrl = extractHnArticleUrl(description);
        if (realUrl && !isHackerNewsUrl(realUrl)) {
          url = realUrl;
        }
        // HN description is metadata only — never store it as reader content.
        contentRaw = null;
      }

      return {
        title: item.title ?? "",
        url,
        publishedAt: item.isoDate ? new Date(item.isoDate) : new Date(),
        contentRaw,
      };
    })
    // Drop items that still resolve to an HN comments URL: we have no real
    // article to show, so ingestion would just create a dead entry.
    .filter((item) => !isHackerNewsUrl(item.url));
}

export async function fetchAllFeeds(): Promise<
  Array<{ source: RssSource; items: ParsedFeedItem[] }>
> {
  const results = await Promise.allSettled(
    RSS_SOURCES.map(async (source) => ({
      source,
      items: await fetchFeed(source),
    })),
  );
  return results
    .filter(
      (r): r is PromiseFulfilledResult<{ source: RssSource; items: ParsedFeedItem[] }> =>
        r.status === "fulfilled",
    )
    .map((r) => r.value);
}
