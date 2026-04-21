import { FeedHeader } from "@/components/feed/FeedHeader";
import { FeedList } from "@/components/feed/FeedList";
import { getMockArticlesByCategory } from "@/lib/mock-articles";

export const metadata = {
  title: "Tech",
};

export default function TechPage() {
  const articles = getMockArticlesByCategory("tech").sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  return (
    <>
      <FeedHeader
        eyebrow="Board"
        title="Tech"
        description="Produits, plateformes, langages, infra — l'industrie tech vue depuis les sources de référence."
        count={articles.length}
      />
      <FeedList articles={articles} />
    </>
  );
}
