/* eslint-disable prettier/prettier */

import ArticleForm from "./_components/ArticleForm";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

async function AddProduct(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;

  return (
    <section className="grid gap-6 px-4 py-8 mx-auto max-w-6xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground-500">
          Create new article
        </h1>
      </div>
      <ArticleForm />
    </section>
  );
}

export default AddProduct;
