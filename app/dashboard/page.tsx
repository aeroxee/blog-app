import getAuthInfo from "@/libs/getAuthInfo";
import { faBook, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard | Aeroxee Blog",
  description: "Halaman dashboard",
};

export default async function Dashbord() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const user = await getAuthInfo(token?.value);

  return (
    <main className="pt-[100px] px-4 md:px-[100px]">
      <h1 className="text-sky-600 text-2xl">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <div
          className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-black/30"
          title="Artikel"
        >
          <FontAwesomeIcon icon={faBook} size="2x" />
          <span className="text-xl font-extralight">
            {user.user.articles.length}
          </span>
        </div>
        <div
          className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-black/30"
          title="Komentar"
        >
          <FontAwesomeIcon icon={faComment} size="2x" />
          <span className="text-xl font-extralight">
            {user.user.comments.length}
          </span>
        </div>
      </div>
    </main>
  );
}
