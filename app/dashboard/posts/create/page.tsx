import FormCreateArticle from "@/components/FormCreateArticle";
import { getAllCategories } from "@/libs/categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buat Artikel | Aeroxee Blog",
  description: "Buat artikel baru",
};

export default async function Create() {
  const categories = await getAllCategories();

  return (
    <main className="pt-[100px] px-4 md:px-[100px] flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-5/12">
        <h1 className="text-center text-2xl font-extrabold text-sky-600">
          Buat Artikel Baru
        </h1>

        <FormCreateArticle categories={categories} />
      </div>

      <div className="w-full md:w-7/12 mt-10 md:mt-0 hidden md:block">
        <article
          id="results-article"
          className="prose prose-sm prose-slate dark:prose-invert"
        ></article>
      </div>
    </main>
  );
}
