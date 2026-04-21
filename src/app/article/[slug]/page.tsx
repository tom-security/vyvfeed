import { notFound } from "next/navigation";
import { ReaderView } from "@/components/reader/ReaderView";
import { getMockArticleBySlug, MOCK_ARTICLES } from "@/lib/mock-articles";

export function generateStaticParams() {
  return MOCK_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<"/article/[slug]">) {
  const { slug } = await props.params;
  const article = getMockArticleBySlug(slug);
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
  const article = getMockArticleBySlug(slug);
  if (!article) notFound();
  return <ReaderView article={article} />;
}
