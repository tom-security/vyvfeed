import { FeedHeader } from "@/components/feed/FeedHeader";
import { FeedList } from "@/components/feed/FeedList";
import { getMockArticlesByCategory } from "@/lib/mock-articles";

export const metadata = {
  title: "IA",
};

export default function IaPage() {
  const articles = getMockArticlesByCategory("ia").sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  return (
    <>
      <FeedHeader
        eyebrow="Board"
        title="IA"
        description="Modèles, agents, recherche fondamentale et applications — l'actualité de l'intelligence artificielle."
        count={articles.length}
      />
      <FeedList articles={articles} />
    </>
  );
}
