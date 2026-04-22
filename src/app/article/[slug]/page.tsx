import { notFound } from "next/navigation";
import { ReaderView } from "@/components/reader/ReaderView";
import { getArticleBySlug } from "@/lib/feed-articles";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata(props: PageProps<"/article/[slug]">) {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article introuvable" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
    },
  };
}

export default async function ArticlePage(props: PageProps<"/article/[slug]">) {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  return <ReaderView article={article} />;
}
