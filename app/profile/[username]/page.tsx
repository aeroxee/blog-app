import getAuthInfo from "@/libs/getAuthInfo";
import { getUserFromUsername } from "@/libs/getUser";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { username: string };
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const user = await getUserFromUsername(params.username);
  if (!user) {
    notFound();
  }

  return {
    title: `Profile ${user.user.username} | Aeroxee Blog`,
    description: "Halaman pengguna dari aeroxee blog.",
  };
}

export default async function Profile({ params }: Props) {
  const user = await getUserFromUsername(params.username);

  if (!user) {
    notFound();
  }

  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const thisUser = await getAuthInfo(token?.value);

  return (
    <main className="pt-[100px] w-[96%] md:w-[60%] mx-auto pb-[100px]">
      <div className="flex items-center justify-center my-5">
        <div className="text-center">
          {user.user.avatar !== null ? (
            <Image
              src={`${process.env.SERVER_API_URL}/${user.user.avatar}`}
              alt={user.user.username}
              width={1200}
              height={800}
              className="w-[200px] h-[200px] rounded-full mb-2"
            />
          ) : (
            <Image
              src={`${process.env.SERVER_API_URL}/media/profile/default_avatar.png`}
              alt={user.user.username}
              width={1200}
              height={800}
              className="w-[200px] h-[200px] rounded-full mb-2"
            />
          )}
          <h4 className="text-lg capitalize text-sky-600">
            {user.user.first_name} {user.user.last_name}
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5">
        <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-xl p-5">
          <h4 className="text-lg font-extralight">Artikel</h4>
          <span className="text-xl font-extrabold">
            {user.user.articles.length}
          </span>
        </div>
        <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-xl p-5">
          <h4 className="text-lg font-extralight">Komentar</h4>
          <span className="text-xl font-extrabold">
            {user.user.comments.length}
          </span>
        </div>
      </div>

      {thisUser !== null && (
        <>
          {thisUser.user.username === user.user.username && (
            <div className="flex items-center justify-center">
              <Link
                href={`/profile/${thisUser.user.username}/change`}
                className="text-white px-4 p-1 bg-sky-600 hover:bg-sky-700 rounded-md"
              >
                Ubah Profile
              </Link>
            </div>
          )}
        </>
      )}
    </main>
  );
}
