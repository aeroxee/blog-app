import ListArticle from "@/components/ListArticle";
import PopularArticle from "@/components/PopularArticle";
import SearchForm from "@/components/SearchForm";
import getArticles from "@/libs/getArticles";
import getPopularArticles from "@/libs/getPopularArticles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Aeroxee Blog",
  description: "Blog",
};

type Props = {
  searchParams: {
    page?: number;
    q?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page == undefined ? 1 : searchParams.page;
  const q = searchParams.q == undefined ? "" : searchParams.q;
  const articles = await getArticles(page, q);

  const popularArticles = await getPopularArticles();

  return (
    <>
      <main className="pt-[100px] px-4 md:px-[100px] pb-[100px]">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-8/12">
            <h1 className="text-3xl font-extrabold mb-3">Aeroxee Blog</h1>
            <SearchForm />

            {q != "" && (
              <h1 className="text-2xl">
                Hasil pencarian dari `<strong>{q}</strong>`
              </h1>
            )}

            <ListArticle articles={articles} q={q} />
          </div>

          {/* TODO:  */}
          <div className="w-full md:w-4/12">
            <h1 className="text-2xl font-bold">Artikel terpopuler</h1>
            <PopularArticle articles={popularArticles} />
          </div>
        </div>
      </main>
    </>
  );
}
