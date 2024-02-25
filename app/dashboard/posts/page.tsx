import ListArticleDashboard from "@/components/ListArticleDashboard";
import getArticlesByUserID from "@/libs/getArticlesByUserID";
import getAuthInfo from "@/libs/getAuthInfo";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Postingan | Aeroxee Blog",
  description: "Halaman handle postingan artikel",
};

type Props = {
  searchParams: {
    page?: number;
    q?: string;
    status?: "DRAFTED" | "PUBLISHED";
  };
};

export default async function Posts({ searchParams }: Props) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const user = await getAuthInfo(token?.value);

  const page = searchParams.page == undefined ? 1 : searchParams.page;
  const q = searchParams.q == undefined ? "" : searchParams.q;

  const status =
    searchParams.status == undefined ? "PUBLISHED" : searchParams.status;

  const articles = await getArticlesByUserID(user.user.id, page, q, status);

  return (
    <main className="pt-[100px] px-4 md:px-[100px]">
      <ListArticleDashboard user={user} articles={articles} />
    </main>
  );
}
