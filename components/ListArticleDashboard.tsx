"use client";

import stripHtmlAndTruncate from "@/libs/truncate";
import Link from "next/link";
import { Key } from "react";
import ActionArticle from "./ActionArticle";

type Props = {
  articles: any;
  user: any;
};

export default function ListArticleDashboard({ articles, user }: Props) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-sky-600 text-2xl">Postingan Anda</h1>
        <Link
          href="/dashboard/posts/create"
          className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white"
        >
          Tambah Postingan
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <Link
          href="/dashboard/posts?status=DRAFTED"
          className="px-4 py-1 bg-sky-600 hover:bg-sky-700 rounded-md text-white"
        >
          Status Draft
        </Link>
        <Link
          href="/dashboard/posts?status=PUBLISHED"
          className="px-4 py-1 bg-sky-600 hover:bg-sky-700 rounded-md text-white"
        >
          Status Publish
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {articles.articles.map((article: any, index: Key) => (
          <div
            key={index}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-4 md:p-2 group relative"
          >
            <h5 className="text-lg font-bold">{article.title}</h5>
            <hr className="my-2" />
            <p className="text-sm font-light">
              {stripHtmlAndTruncate(article.content, 20)}
            </p>

            <ActionArticle username={user.user.username} slug={article.slug} />
          </div>
        ))}
      </div>
    </>
  );
}
