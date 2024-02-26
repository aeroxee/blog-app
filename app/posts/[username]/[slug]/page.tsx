import FormComment from "@/components/FormComment";
import PopularArticle from "@/components/PopularArticle";
import { getCategoryById } from "@/libs/categories";
import getArticle from "@/libs/getArticle";
import getAuthInfo from "@/libs/getAuthInfo";
import { getComment } from "@/libs/getComment";
import getMoment from "@/libs/getMoment";
import getPopularArticles from "@/libs/getPopularArticles";
import { getUserFromID } from "@/libs/getUser";
import {
  faBook,
  faClock,
  faEye,
  faPenAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string; username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const username = params.username;

  const article = await getArticle(username, slug);
  if (!article) {
    notFound();
  }

  return {
    title: article.article.title + " | Aeroxee",
  };
}

export default async function Page({ params, searchParams }: Props) {
  const article = await getArticle(params.username, params.slug);

  if (!article) {
    notFound();
  }

  const category = await getCategoryById(article.article.category_id);

  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const userAuthInfo = await getAuthInfo(token?.value);

  const thisUser = userAuthInfo !== null ? userAuthInfo.user : null;

  const owner = await getUserFromID(article.article.user_id);

  const popularArticles = await getPopularArticles();

  const comments = await getComment(params.username, params.slug);

  const commentElement = await Promise.all(
    comments.comments.map(async (comment: any, index: any) => {
      const userFromId = await getUserFromID(comment.user_id);

      return (
        <div
          className={`p-4 border-b border-b-gray-300 dark:border-b-gray-600 relative group`}
          key={index}
        >
          <div className="flex items-center gap-2 mb-3">
            <Link href="" legacyBehavior prefetch={false}>
              <button
                type="button"
                className="text-lg text-sky-600 hover:text-sky-700 capitalize"
              >
                {userFromId.user.first_name} {userFromId.user.last_name}
              </button>
            </Link>

            <div className="flex items-center gap-1 text-sm text-gray-500 font-extralight">
              <FontAwesomeIcon icon={faClock} />
              <span>{getMoment(comment.updated_at)}</span>
            </div>
          </div>

          <div
            className="prose prose-sm dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          ></div>

          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-4">
              {thisUser !== null && (
                <>
                  {thisUser.id === comment.user_id && (
                    <>
                      <button
                        type="button"
                        className="px-4 py-1 text-white bg-green-600 hover:bg-green-700 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="px-4 py-1 text-white bg-rose-600 hover:bg-rose-700 rounded-md"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      );
    })
  );

  return (
    <>
      <main className="pt-[100px] px-5 md:px-[100px]">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-8/12">
            <div className="border-b border-b-gray-300 dark:border-b-gray-600 mb-4">
              <h1 className="text-3xl font-bold">{article.article.title}</h1>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faClock} />
                  {getMoment(article.article.created_at)}
                </div>
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faUser} />
                  <Link
                    href={`/profile/${owner.user.username}`}
                    className="text-sky-600 hover:underline"
                  >
                    {owner.user.username}
                  </Link>
                </div>
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faEye} />
                  {article.article.views}
                </div>
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faBook} />
                  <Link
                    href={`/categories/${category.category.slug}`}
                    className="text-sky-600 hover:underline"
                  >
                    {category.category.title}
                  </Link>
                </div>
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faPenAlt} />
                  {article.article.status}
                </div>
              </div>
            </div>

            <div
              className="prose dark:prose-invert"
              id="content"
              dangerouslySetInnerHTML={{ __html: article.article.content }}
            ></div>

            <hr className="my-10" />

            {/* Comment */}
            <section id="comments" className="mt-10">
              <h1 className="text-2xl font-extrabold mb-4">Komentar</h1>

              <FormComment
                article_id={article.article.id}
                slug={article.article.slug}
                username={owner.user.username}
                thisUser={thisUser}
              />

              <div className="flex flex-col">{commentElement}</div>
            </section>
            {/* Comment */}
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
