/* eslint-disable prettier/prettier */

import ArticleDetail from "./_components/ArticleDetail";

import Container from "@/components/shared/Container";
import { fetchArticle } from "@/services/ArticleService";

type Params = Promise<{ articleId: string }>;

export default async function ArticleDetailsPage({
  params,
}: {
  params: Params;
}) {
  const { articleId } = await params;

  const data = await fetchArticle(articleId);

  if (!data?.success) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
        <h1 className="text-lg font-semibold">Article not found! </h1>
      </div>
    );
  }

  return (
    <Container>
      <ArticleDetail article={data?.data} />
    </Container>
  );
}
