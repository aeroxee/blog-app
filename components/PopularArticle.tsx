import getMoment from "@/libs/getMoment";
import { getUserFromID } from "@/libs/getUser";
import stripHtmlAndTruncate from "@/libs/truncate";
import { faClock, faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
  articles: any;
};

export default async function PopularArticle({ articles }: Props) {
  const listArticles = await Promise.all(
    articles.articles.map(async (article: any, index: number) => {
      const userFromID = await getUserFromID(article.user_id);
      return (
        <div
          key={index}
          className="p-3 border-b border-b-gray-300 dark:border-b-gray-600"
        >
          <Link
            href={`/posts/${userFromID.user.username}/${article.slug}`}
            legacyBehavior
            prefetch={false}
          >
            <a className="text-sm font-bold text-sky-600 hover:text-sky-700">
              {article.title}
            </a>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FontAwesomeIcon icon={faClock} />
              <span>{getMoment(article.created_at)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FontAwesomeIcon icon={faUser} />
              <span>{userFromID.user.username}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FontAwesomeIcon icon={faEye} />
              <span>{article.views}</span>
            </div>
          </div>
          <p className="text-xs font-light">
            {stripHtmlAndTruncate(article.content, 10)}
          </p>
        </div>
      );
    })
  );

  return <div className="flex flex-col">{listArticles}</div>;
}
