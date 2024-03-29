import FormEditArticle from "@/components/FormEditArticle";
import { getAllCategories } from "@/libs/categories";
import getArticle from "@/libs/getArticle";
import getAuthInfo from "@/libs/getAuthInfo";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type Props = {
  params: { username: string; slug: string };
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const article = await getArticle(params.username, params.slug);

  return {
    title: `Edit ${article.article.title} | Aeroxee Blog`,
  };
}

export default async function Create({ params }: Props) {
  const categories = await getAllCategories();
  const article = await getArticle(params.username, params.slug);

  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const thisUser = await getAuthInfo(token?.value);

  if (thisUser.user.id !== article.article.user_id) {
    notFound();
  }

  return (
    <main className="pt-[100px] px-4 md:px-[100px] flex flex-col md:flex-row gap-4 pb-[100px]">
      <div className="w-full md:w-7/12">
        <h1 className="text-center text-2xl font-extrabold text-sky-600">
          Edit Artikel Baru
        </h1>

        <FormEditArticle categories={categories} article={article} />
      </div>

      <div className="w-full md:w-5/12 mt-10 md:mt-0 hidden md:block">
        <article
          id="results-article"
          className="prose prose-sm prose-slate dark:prose-invert fixed top-[100px] overflow-auto h-[450px]"
        ></article>
      </div>
    </main>
  );
}
