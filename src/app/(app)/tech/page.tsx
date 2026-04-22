import { FeedHeader } from "@/components/feed/FeedHeader";
import { FeedList } from "@/components/feed/FeedList";
import { getFeedArticles } from "@/lib/feed-articles";

export const metadata = {
  title: "Tech",
};

export default async function TechPage() {
  const articles = await getFeedArticles("tech");
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
