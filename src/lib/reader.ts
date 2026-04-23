import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export type ExtractedArticle = {
  title: string | null;
  content: string | null;
  textContent: string | null;
  excerpt: string | null;
};

export async function extractArticle(
  url: string,
  timeoutMs = 8_000,
): Promise<ExtractedArticle | null> {
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
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const parsed = reader.parse();
    if (!parsed) return null;

    return {
      title: parsed.title ?? null,
      content: parsed.content ?? null,
      textContent: parsed.textContent ?? null,
      excerpt: parsed.excerpt ?? null,
    };
  } finally {
    clearTimeout(timer);
  }
}
