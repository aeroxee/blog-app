"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import Alert from "./Alert";

import { setCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";

export default function FormLogin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<"success" | "error">("error");

  const searchParams = useSearchParams();

  useEffect(() => {
    const redirect_to = searchParams.get("redirect_to");
    if (redirect_to) {
      setShowAlert(true);
      setAlertMessage(
        "Harap login terlebih dahulu jika anda ingin mengakses halaman dashboard."
      );
      setAlertType("error");
    }
  }, [searchParams]);

  const handleLoginForm = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const response = await fetch(`${process.env.SERVER_API_URL}/v1/get-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();
    if (data.status == "error") {
      setShowAlert(true);
      setAlertMessage(data.message);
      setIsLoading(false);
      return;
    } else if (data.status == "success") {
      const token = data.token;
      console.log(token);
      setCookie("token", token, {
        maxAge: 60 * 60 * 24,
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
      });
      const redirect_to = searchParams.get("redirect_to");
      if (!redirect_to) {
        window.location.href = "/";
      } else {
        window.location.href = redirect_to;
      }
      return;
    }
  };

  return (
    <main className="w-full min-h-screen relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[96%] md:w-[30%] mx-auto border border-gray-300">
        <div className="p-5">
          <h1 className="font-extrabold text-2xl mb-3">Login Akun</h1>
          <form action="" method="post" onSubmit={handleLoginForm}>
            <Alert
              type={alertType}
              open={showAlert}
              onClose={() => setShowAlert(!showAlert)}
            >
              {alertMessage}
            </Alert>
            <div className="grid grid-cols-1">
              <div className="flex flex-col mb-2">
                <label htmlFor="username" className="text-gray-600 text-sm">
                  Username/email
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="w-full p-1 border border-gray-300 text-gray-600 rounded-sm outline-sky-600 dark:bg-transparent dark:text-white"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="flex flex-col mb-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-gray-600 text-sm">
                    Password
                  </label>
                  <Link href={"#"} className="text-xs text-sky-600 underline">
                    Lupa sandi?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full p-1 border border-gray-300 text-gray-600 rounded-sm outline-sky-600 dark:bg-transparent dark:text-white"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="text-sm text-white bg-sky-600 hover:bg-sky-700 outline-none rounded-sm py-2 flex items-center justify-center gap-3 mb-2"
              >
                {isLoading && (
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                )}
                Login
              </button>
              <Link href="/register" className="text-sky-600 underline">
                Belum mempunyai akun, daftar disini!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
