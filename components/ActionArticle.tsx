"use client";

import deleteArticle from "@/libs/deleteArticle";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  username: string;
  slug: string;
};

export default function ActionArticle({ username, slug }: Props) {
  const token = getCookie("token");

  const router = useRouter();

  const handleDeleteArticle = async (username: string, slug: string) => {
    const confirm = window.confirm(
      "Apakah anda yakin untuk menghapus artikel ini?"
    );
    if (confirm) {
      const d = await deleteArticle(token, username, slug);
      if (d) {
        alert("Berhasil menghapus satu artikel.");
        router.refresh();
      } else {
        alert("Gagal menghapus artikel.");
        router.refresh();
      }
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:bg-gray-500/60 transition-all duration-300 ease-in-out">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
        <Link
          href={`/posts/${username}/${slug}`}
          className="text-white text-sm px-4 py-1 bg-sky-600 hover:bg-sky-700 rounded-sm"
        >
          Lihat
        </Link>
        <Link
          href={`/dashboard/posts/edit/${username}/${slug}`}
          className="text-white text-sm px-4 py-1 bg-green-600 hover:bg-green-700 rounded-sm"
        >
          Edit
        </Link>
        <button
          type="button"
          className="text-white text-sm px-4 py-1 bg-rose-600 hover:bg-rose-700 rounded-sm"
          onClick={() => handleDeleteArticle(username, slug)}
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
