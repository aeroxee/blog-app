import Link from "next/link";

export default function Footer() {
  return (
    <div className="absolute bottom-0 w-full p-4 text-center border-t border-t-gray-300 dark:border-t-gray-600">
      &copy;Copyright 2024{" "}
      <Link href="/" className="text-sky-600 underline">
        Aeroxee Blog
      </Link>
    </div>
  );
}
