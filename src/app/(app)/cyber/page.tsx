import { FeedHeader } from "@/components/feed/FeedHeader";
import { FeedList } from "@/components/feed/FeedList";
import { getFeedArticles } from "@/lib/feed-articles";

export const metadata = {
  title: "Cyber",
};

export default async function CyberPage() {
  const articles = await getFeedArticles("cyber");
  return (
    <>
      <FeedHeader
        eyebrow="Board"
        title="Cyber"
        description="Vulnérabilités, ransomwares, supply chain — l'actualité cybersécurité côté défense et offense."
        count={articles.length}
      />
      <FeedList articles={articles} />
    </>
  );
}
