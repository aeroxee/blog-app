"use client";

import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Props = {
  user: any;
};

export default function FormChangeUserInfo({ user }: Props) {
  const [firstName, setFirstName] = useState<string>(user.user.first_name);
  const [lastName, setLastName] = useState<string>(user.user.last_name);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setAvatar(files[0]);
    }
  };

  const router = useRouter();

  const token = getCookie("token");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    if (avatar !== null) {
      formData.append("avatar", avatar as Blob);
    }

    const response = await fetch(
      `${process.env.SERVER_API_URL}/v1/user/change-info`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      window.alert("Berhasil memperbaharui info.");
      router.refresh();
      return;
    } else {
      window.alert(data.message);
      router.refresh();
      return;
    }
  };

  return (
    <form
      action=""
      method="PUT"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="first_name">Nama depan</label>
        <input
          type="text"
          className="p-2 border border-gray-300 dark:border-gray-600 dark:bg-transparent rounded-md"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="first_name">Nama belakang</label>
        <input
          type="text"
          className="p-2 border border-gray-300 dark:border-gray-600 dark:bg-transparent rounded-md"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="first_name">Avatar</label>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          className="p-2 border border-gray-300 dark:border-gray-600 dark:bg-transparent rounded-md"
          onChange={handleChangeAvatar}
        />
        {user.user.avatar !== null && (
          <Link
            href={`${process.env.SERVER_API_URL}/${user.user.avatar}`}
            className="text-xs text-sky-600 underline"
          >
            {user.user.avatar}
          </Link>
        )}
      </div>

      <button
        type="submit"
        className="text-white px-4 py-1 bg-sky-600 hover:bg-sky-700 rounded-md"
      >
        Simpan
      </button>
    </form>
  );
}
