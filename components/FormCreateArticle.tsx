"use client";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCookie } from "cookies-next";
import { FormEvent, useState } from "react";
import Alert from "./Alert";
import Editor from "./Editor";

type Props = {
  categories: any;
};

// const CustomEditorNOSSR = dynamic(() => import("@/components/CustomEditor"), {
//   ssr: false,
// });

export default function FormCreateArticle({ categories }: Props) {
  const [categoryId, setCategoryId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<"success" | "error">("error");
  const [alertMessage, setAlertMesage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const token = getCookie("token");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const results = document.querySelector("#results-article");
    if (!results) return;
    const content = results.innerHTML;

    const response = await fetch(`${process.env.SERVER_API_URL}/v1/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        category_id: categoryId,
        title: title,
        content: content,
        status: status,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (data.status === "success") {
      setShowAlert(true);
      setAlertMesage(data.message);
      setAlertType("success");
      setIsLoading(false);
      return;
    } else {
      setShowAlert(true);
      setAlertMesage(data.message);
      setAlertType("error");
      setIsLoading(false);
      return;
    }
  };

  return (
    <form action="" method="post" onSubmit={handleSubmit}>
      <Alert
        open={showAlert}
        onClose={() => setShowAlert(false)}
        type={alertType}
        title="Pemberitahuan"
      >
        {alertMessage}
      </Alert>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="category">Kategori</label>
        <select
          name="category"
          id="category"
          className="w-full px-4 py-1 bg-white dark:bg-transparent border border-gray-300 dark:border-gray-600"
          onChange={(e) => setCategoryId(parseInt(e.target.value))}
          defaultValue={"DEFAULT"}
          required
        >
          <option value="DEFAULT" disabled>
            Pilih kategori
          </option>
          {categories.categories.map((category: any, index: number) => (
            <option key={index} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="title">Judul</label>
        <input
          type="text"
          name="title"
          className="w-full px-4 py-1 bg-white dark:bg-transparent border border-gray-300 dark:border-gray-600"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="content">Konten</label>
        <Editor />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          className="w-full px-4 py-1 bg-white dark:bg-transparent border border-gray-300 dark:border-gray-600"
          onChange={(e) => setStatus(e.target.value)}
          defaultValue={"DEFAULT"}
          required
        >
          <option value="DEFAULT" disabled>
            Pilih status
          </option>
          <option value="DRAFTED" selected>
            Draft
          </option>
          <option value="PUBLISHED">Publish</option>
        </select>
      </div>

      <button
        type="submit"
        className="text-white px-4 py-1 bg-sky-600 hover:bg-sky-700 rounded-md flex gap-2"
      >
        {isLoading && (
          <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
        )}
        Buat Artikel
      </button>
    </form>
  );
}
