import { FeedHeader } from "@/components/feed/FeedHeader";
import { FeedList } from "@/components/feed/FeedList";
import { getMockArticlesByCategory } from "@/lib/mock-articles";

export const metadata = {
  title: "Cyber",
};

export default function CyberPage() {
  const articles = getMockArticlesByCategory("cyber").sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
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
