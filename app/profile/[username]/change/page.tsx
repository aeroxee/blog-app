import FormChangeUserInfo from "@/components/FormChangeUserInfo";
import getAuthInfo from "@/libs/getAuthInfo";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type Props = {
  params: { username: string };
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const user = await getAuthInfo(token?.value);

  if (params.username !== user.user.username) {
    notFound();
  }

  return {
    title: `Profile ${user.user.username} | Aeroxee Blog`,
    description: "Halaman pengguna dari aeroxee blog.",
  };
}

export default async function Profile({ params }: Props) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const user = await getAuthInfo(token?.value);

  if (params.username !== user.user.username) {
    notFound();
  }

  return (
    <main className="pt-[100px] w-[96%] md:w-[60%] mx-auto pb-[100px]">
      <h1 className="text-2xl font-extrabold">
        {user.user.first_name} {user.user.last_name}
      </h1>

      <div className="mt-5">
        <FormChangeUserInfo user={user} />
      </div>
    </main>
  );
}
