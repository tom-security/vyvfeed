import { FeedHeader } from "@/components/feed/FeedHeader";
import { FeedList } from "@/components/feed/FeedList";
import { getFeedArticles } from "@/lib/feed-articles";

export const metadata = {
  title: "IA",
};

export default async function IaPage() {
  const articles = await getFeedArticles("ia");
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
