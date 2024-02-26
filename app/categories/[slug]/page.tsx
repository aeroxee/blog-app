import { getCategoryBySlug } from "@/libs/categories";
import stripHtmlAndTruncate from "@/libs/truncate";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }

  return {
    title: `${category.category.title} | Aeroxee Blog`,
  };
}

export default async function CategoriesSlug({ params }: Props) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="pt-[100px] w-[96%] md:w-[60%] mx-auto pb-[100px]">
      <h1 className="text-2xl text-sky-600 font-bold text-center">
        {category.category.title}
      </h1>

      <div className="mt-10	grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.category.articles.map((article: any, index: number) => (
          <Link key={index} href="" legacyBehavior prefetch={false}>
            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-md hover:bg-black/20 cursor-pointer">
              <div>
                <h4 className="text-lg font-bold mb-2">{article.title}</h4>
                <p className="text-xs text-gray-500 font-extralight">
                  {stripHtmlAndTruncate(article.content, 20)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
