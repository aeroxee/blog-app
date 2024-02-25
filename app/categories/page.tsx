import { getAllCategories } from "@/libs/categories";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kategori | Aeroxee Blog",
  description: "Kumpulan kategori-kategori yang tersedia di Aeroxee Blog",
};

export default async function Categories() {
  const categories = await getAllCategories();

  return (
    <main className="pt-[100px] w-[96%] md:w-[60%] mx-auto">
      <h1 className="text-2xl text-sky-600 font-bold text-center">
        Kategori Aeroxee Blog
      </h1>

      <div className="mt-10	grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.categories.map((category: any, index: number) => (
          <Link key={index} href="" legacyBehavior prefetch={false}>
            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-md hover:bg-black/20 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold mb-2">{category.title}</h4>
                  <p className="text-xs text-gray-500 font-extralight">
                    {category.description}
                  </p>
                </div>
                <span className="text-2xl">{category.articles.length}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
