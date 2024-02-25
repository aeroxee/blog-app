"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Alert from "./Alert";

export default function FormRegister() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "error">("error");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoginForm = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    // check password confirmation
    if (password1 !== password2) {
      setIsLoading(false);
      setShowAlert(true);
      setAlertMessage("Harap masukkan password yang sama.");
      setAlertType("error");
      return;
    }

    const response = await fetch(`${process.env.SERVER_API_URL}/v1/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password2,
      }),
    });

    const data = await response.json();
    if (data.status == "error") {
      setShowAlert(true);
      setAlertMessage(data.message);
      setIsLoading(false);
      setAlertType("success");
      return;
    } else if (data.status == "success") {
      setShowAlert(true);
      setAlertMessage(data.message);
      setAlertType("success");
      setIsLoading(false);
      return;
    }
  };

  return (
    <main className="w-full h-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[96%] md:w-[50%] mx-auto border border-gray-300">
        <div className="p-5">
          <h1 className="font-extrabold text-2xl mb-3">Register Akun</h1>
          <form action="" method="post" onSubmit={handleLoginForm}>
            <Alert
              type={alertType}
              open={showAlert}
              onClose={() => setShowAlert(!showAlert)}
            >
              {alertMessage}
            </Alert>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex flex-col mb-2">
                <label htmlFor="first_name" className="text-gray-600 text-sm">
                  Nama depan
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="w-full p-1 border border-gray-300 text-gray-600 rounded-sm outline-sky-600 dark:bg-transparent dark:text-white"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="last_name" className="text-gray-600 text-sm">
                  Nama belakang
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="w-full p-1 border border-gray-300 text-gray-600 rounded-sm outline-sky-600 dark:bg-transparent dark:text-white"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="username" className="text-gray-600 text-sm">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="w-full p-1 border border-gray-300 text-gray-600 rounded-sm outline-sky-600 dark:bg-transparent dark:text-white"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="email" className="text-gray-600 text-sm">
                  Alamat email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full p-1 border border-gray-300 text-gray-600 rounded-sm outline-sky-600 dark:bg-transparent dark:text-white"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="password1" className="text-gray-600 text-sm">
                  Password
                </label>
                <input
                  type="password"
                  name="password1"
                  id="password1"
                  className="w-full p-1 border border-gray-300 text-gray-600 rounded-sm outline-sky-600 dark:bg-transparent dark:text-white"
                  onChange={(e) => setPassword1(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="password2" className="text-gray-600 text-sm">
                  Konfirmasi password
                </label>
                <input
                  type="password"
                  name="password2"
                  id="password2"
                  className="w-full p-1 border border-gray-300 text-gray-600 rounded-sm outline-sky-600 dark:bg-transparent dark:text-white"
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1">
              <button
                type="submit"
                className="text-sm text-white bg-sky-600 hover:bg-sky-700 outline-none rounded-sm py-2 flex items-center justify-center gap-3 mb-2"
              >
                {isLoading && (
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                )}
                Daftar
              </button>
              <Link href="/login" className="text-sky-600 underline">
                Sudah mempunyai akun, login disini!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
