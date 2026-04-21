import { Resend } from "resend";
import { prisma } from "./prisma";
import { DIGEST_ITEM_COUNT, SITE_URL } from "./constants";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function buildWeeklyTop(limit: number = DIGEST_ITEM_COUNT) {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return prisma.article.findMany({
    where: { publishedAt: { gte: weekAgo } },
    orderBy: [{ readCount: "desc" }, { publishedAt: "desc" }],
    take: limit,
  });
}

export async function sendDigestTo(
  email: string,
  articles: Awaited<ReturnType<typeof buildWeeklyTop>>,
) {
  return resend.emails.send({
    from: "VYVFEED <digest@vyvfeed.vyvox.fr>",
    to: email,
    subject: "VYVFEED — Top 10 de la semaine",
    html: renderDigestHtml(articles),
  });
}

function renderDigestHtml(
  articles: Awaited<ReturnType<typeof buildWeeklyTop>>,
): string {
  const items = articles
    .map(
      (a) => `
    <li style="margin-bottom:16px;">
      <a href="${SITE_URL}/article/${a.slug}" style="color:#0F172A;text-decoration:none;">
        <strong>${escapeHtml(a.title)}</strong>
      </a>
      <div style="color:#64748B;font-size:13px;">${escapeHtml(a.sourceName)}</div>
    </li>`,
    )
    .join("");

  return `<!doctype html><html lang="fr"><body style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#fff;color:#0F172A;">
  <h1 style="margin:0 0 24px;font-weight:900;">
    <span style="color:#0F172A;">VYV</span><span style="color:#0EA5E9;">FEED</span>
    <span style="font-weight:400;font-size:14px;color:#64748B;margin-left:8px;">Top 10 de la semaine</span>
  </h1>
  <ul style="list-style:none;padding:0;margin:0;">${items}</ul>
  <hr style="border:none;border-top:1px solid #E2E8F0;margin:32px 0;" />
  <p style="color:#64748B;font-size:13px;text-align:center;">
    Un produit VYVOX — Agence Web Premium Lyon — <a href="https://vyvox.fr" style="color:#0EA5E9;">vyvox.fr</a>
  </p>
</body></html>`;
}

function escapeHtml(s: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return s.replace(/[&<>"']/g, (c) => map[c]!);
}
