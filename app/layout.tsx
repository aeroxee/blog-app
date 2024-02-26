import Navbar from "@/components/Navbar";
import getAuthInfo from "@/libs/getAuthInfo";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cookies } from "next/headers";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/styles.css";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "600", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aeroxee Blog",
  description:
    "Aeroxee Blog adalah website yang menyediakan pembuatan blog pribadi.",
  authors: {
    name: "Fajri Fath",
    url: "https://github.com/Aeroxee",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const user = await getAuthInfo(token?.value);

  return (
    <html lang="id">
      <body className="dark:text-white dark:bg-gray-900" style={poppins.style}>
        <Navbar user={user} />
        <div className="pb-[50px]">{children}</div>
      </body>
    </html>
  );
}
