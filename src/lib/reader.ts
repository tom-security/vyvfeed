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
  timeoutMs = 10_000,
): Promise<ExtractedArticle | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": "VYVFEEDBot/1.0 (+https://vyvfeed.vyvox.fr)",
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
