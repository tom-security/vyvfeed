import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export type ExtractedArticle = {
  title: string | null;
  content: string | null;
  textContent: string | null;
  excerpt: string | null;
};

function isUrlLike(value: string): boolean {
  return /^https?:\/\//i.test(value.trim());
}

function isHackerNewsUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return host === "news.ycombinator.com" || host.endsWith(".ycombinator.com");
  } catch {
    return false;
  }
}

function looksLikeHnMetadata(text: string): boolean {
  // HN RSS items wrap all the metadata in one block — if all three markers
  // are present, this is never a real article.
  return (
    /Article URL:/i.test(text) &&
    /Comments URL:/i.test(text) &&
    /Points:/i.test(text)
  );
}

export async function extractArticle(
  url: string,
  timeoutMs = 8_000,
): Promise<ExtractedArticle | null> {
  // HN comments page: Readability would either fail or return the thread
  // structure — never the underlying article. Bail out before hitting network.
  if (isHackerNewsUrl(url)) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      headers: {
        // Some news sites (NYT, Wired, MIT TR) return 403/empty to non-browser UAs.
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
      },
      signal: controller.signal,
    });
    if (!res.ok) return null;

    const html = await res.text();
    if (!html || html.trim().length === 0) return null;

    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const parsed = reader.parse();
    if (!parsed) return null;

    const content = (parsed.content ?? "").trim();
    const textContent = (parsed.textContent ?? "").trim();

    // Guard against degenerate extractions: empty result, bare URL, or leaked
    // HN metadata block if a feed relayed HN items through another domain.
    if (!content || !textContent) return null;
    if (isUrlLike(textContent)) return null;
    if (looksLikeHnMetadata(textContent)) return null;

    return {
      title: parsed.title ?? null,
      content,
      textContent,
      excerpt: parsed.excerpt ?? null,
    };
  } catch {
    // Fetch aborted, JSDOM/Readability threw, or malformed HTML — caller sees null.
    return null;
  } finally {
    clearTimeout(timer);
  }
}
