import { FeedHeader } from "@/components/feed/FeedHeader";
import { FeedList } from "@/components/feed/FeedList";
import { getMockArticlesSorted } from "@/lib/mock-articles";

export default function HomePage() {
  const articles = getMockArticlesSorted();
  return (
    <>
      <FeedHeader
        eyebrow="Feed principal"
        title="Tous les articles"
        description="Veille premium Tech · IA · Cyber, agrégée toutes les heures depuis dix sources et résumée par Claude."
        count={articles.length}
      />
      <FeedList articles={articles} />
    </>
  );
}
