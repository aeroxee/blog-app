import { getCategoryById } from "@/libs/categories";
import getMoment from "@/libs/getMoment";
import { getUserFromID } from "@/libs/getUser";
import stripHtmlAndTruncate from "@/libs/truncate";
import {
  faBook,
  faClock,
  faEye,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Key } from "react";

type Props = {
  articles: any;
  q?: string;
};

export default async function ListArticle({ articles, q }: Props) {
  const articleElement = await Promise.all(
    articles.articles.map(async (article: any, index: Key) => {
      const userFromId = await getUserFromID(article.user_id);
      const category = await getCategoryById(article.category_id);

      return (
        <>
          <article
            key={index}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-sm"
          >
            <Link
              href={`/posts/${userFromId.user.username}/${article.slug}`}
              prefetch={false}
              legacyBehavior
            >
              <a className="text-lg text-sky-600 font-bold mb-2">
                {article.title}
              </a>
            </Link>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="flex gap-1 items-center">
                <FontAwesomeIcon icon={faClock} />
                <span>{getMoment(article.created_at)}</span>
              </div>
              <div className="flex gap-1 items-center">
                <FontAwesomeIcon icon={faUser} />
                <Link href="/" legacyBehavior prefetch={false}>
                  <span className="text-sky-600 underline cursor-pointer">
                    {userFromId.user.username}
                  </span>
                </Link>
              </div>
              <div className="flex gap-1 items-center">
                <FontAwesomeIcon icon={faEye} />
                <span className="">{article.views}</span>
              </div>
              <div className="flex gap-1 items-center">
                <FontAwesomeIcon icon={faBook} />
                <Link
                  href={`/categories/${category.category.slug}`}
                  legacyBehavior
                  prefetch={false}
                >
                  <span className="text-sky-600 underline cursor-pointer">
                    {category.category.title}
                  </span>
                </Link>
              </div>
            </div>
            <figcaption className="text-sm mt-2">
              {stripHtmlAndTruncate(article.content, 20)}
            </figcaption>
          </article>
        </>
      );
    })
  );

  return (
    <section id="listArticles">
      {articles.articles.length == 0 ? (
        <h1 className="text-rose-600 text-2xl">Artikel kosong</h1>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
          {articleElement}
        </div>
      )}

      {q == "" && (
        <div className="flex items-center justify-around mt-4">
          <Link
            href={`/home?page=${articles.prev_page}`}
            legacyBehavior
            prefetch={false}
          >
            <button
              type="button"
              className={`px-4 py-1 text-white ${
                articles.prev_page == 0
                  ? "bg-sky-500"
                  : "bg-sky-600 hover:bg-sky-700 active:bg-sky-600"
              } rounded-md`}
              disabled={articles.prev_page == 0}
            >
              Prev
            </button>
          </Link>
          <Link
            href={`/home?page=${articles.next_page}`}
            legacyBehavior
            prefetch={false}
          >
            <button
              type="button"
              className={`px-4 py-1 text-white ${
                articles.articles.length == 0
                  ? "bg-sky-500"
                  : "bg-sky-600 hover:bg-sky-700 active:bg-sky-600"
              } rounded-md`}
              disabled={articles.articles.length == 0}
            >
              Next
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}
