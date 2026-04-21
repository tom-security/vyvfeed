import Parser from "rss-parser";
import { RSS_SOURCES, type RssSource } from "./constants";

const parser = new Parser();

export type ParsedFeedItem = {
  title: string;
  url: string;
  publishedAt: Date;
  contentRaw: string | null;
};

export async function fetchFeed(rssUrl: string): Promise<ParsedFeedItem[]> {
  const feed = await parser.parseURL(rssUrl);
  return feed.items
    .filter((item): item is typeof item & { link: string } => !!item.link)
    .map((item) => ({
      title: item.title ?? "",
      url: item.link,
      publishedAt: item.isoDate ? new Date(item.isoDate) : new Date(),
      contentRaw:
        (item as { content?: string }).content ?? item.contentSnippet ?? null,
    }));
}

export async function fetchAllFeeds(): Promise<
  Array<{ source: RssSource; items: ParsedFeedItem[] }>
> {
  const results = await Promise.allSettled(
    RSS_SOURCES.map(async (source) => ({
      source,
      items: await fetchFeed(source.url),
    })),
  );
  return results
    .filter(
      (r): r is PromiseFulfilledResult<{ source: RssSource; items: ParsedFeedItem[] }> =>
        r.status === "fulfilled",
    )
    .map((r) => r.value);
}
