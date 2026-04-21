import { notFound } from "next/navigation";
import { FeedHeader } from "@/components/feed/FeedHeader";
import { FeedList } from "@/components/feed/FeedList";
import {
  getMockArticlesByCategory,
  getMockArticlesSorted,
} from "@/lib/mock-articles";
import type { CategorySlug } from "@/lib/constants";

const KNOWN_BOARDS: Record<string, { title: string; description: string; category?: CategorySlug }> = {
  all: {
    title: "Tous les articles",
    description: "Toutes les sources, toutes les catégories.",
  },
  tech: {
    title: "Tech",
    description: "Produits, plateformes, langages, infra.",
    category: "tech",
  },
  ia: {
    title: "IA",
    description: "Modèles, agents, recherche fondamentale.",
    category: "ia",
  },
  cyber: {
    title: "Cyber",
    description: "Vulnérabilités, ransomwares, supply chain.",
    category: "cyber",
  },
};

export default async function BoardPage(props: PageProps<"/board/[slug]">) {
  const { slug } = await props.params;
  const board = KNOWN_BOARDS[slug];
  if (!board) notFound();

  const articles = (
    board.category ? getMockArticlesByCategory(board.category) : getMockArticlesSorted()
  ).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <>
      <FeedHeader
        eyebrow="Board"
        title={board.title}
        description={board.description}
        count={articles.length}
      />
      <FeedList articles={articles} />
    </>
  );
}
