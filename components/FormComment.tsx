"use client";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCookie } from "cookies-next";
import { FormEvent, useState } from "react";
import Alert from "./Alert";

type CommentProps = {
  article_id: number;
  username: string;
  slug: string;
  thisUser: any;
};

export default function FormComment({
  article_id,
  username,
  slug,
  thisUser,
}: CommentProps) {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "error">("error");

  const token = getCookie("token");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch(
      `${process.env.SERVER_API_URL}/v1/articles/${username}/${slug}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          text: text,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setShowAlert(true);
      setAlertMessage("Ada suatu kesalahan pada server.");
      setAlertType("error");
      setIsLoading(false);
    }

    if (data.status === "error") {
      setShowAlert(true);
      setAlertMessage(data.message);
      setAlertType("error");
      setIsLoading(false);
      return;
    } else if (data.status === "success") {
      setShowAlert(true);
      setAlertMessage(
        "Komentar anda berhasil ditambahkan. Butuh waktu untuk melihat komentar anda di bawah."
      );
      setAlertType("success");
      setIsLoading(false);

      // delete text in textarea
      setText("");
      return;
    }
  };

  return (
    <>
      {thisUser !== null ? (
        <form action="" method="post" onSubmit={handleSubmit}>
          <Alert
            type={alertType}
            onClose={() => setShowAlert(false)}
            open={showAlert}
            title="Pemberitahuan..."
          >
            {alertMessage}
          </Alert>

          <div className="flex flex-col gap-2">
            <textarea
              name="text"
              id="text"
              className="dark:bg-transparent border border-gray-300 dark:border-gray-600 rounded-sm p-2"
              placeholder="Kirim komentar anda"
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></textarea>
            <button
              type="submit"
              className="text-white px-4 py-1 bg-sky-600 hover:bg-sky-700 rounded-sm flex gap-2 items-center justify-center"
            >
              {isLoading && (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              )}
              Kirim
            </button>
          </div>
        </form>
      ) : (
        <h1 className="text-rose-600 text-lg">
          Silahkan login untuk berkomentar.
        </h1>
      )}

      <hr className="my-5" />
    </>
  );
}
