import FormChangeUserInfo from "@/components/FormChangeUserInfo";
import getAuthInfo from "@/libs/getAuthInfo";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata(
  _params: any,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const user = await getAuthInfo(token?.value);

  return {
    title: `Profile ${user.user.username} | Aeroxee Blog`,
    description: "Halaman pengguna dari aeroxee blog.",
  };
}

export default async function Profile() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const user = await getAuthInfo(token?.value);

  return (
    <main className="pt-[100px] w-[96%] md:w-[60%] mx-auto">
      <h1 className="text-2xl font-extrabold">
        {user.user.first_name} {user.user.last_name}
      </h1>

      <div className="mt-5">
        <FormChangeUserInfo user={user} />
      </div>
    </main>
  );
}
