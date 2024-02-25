"use client";

export default function SearchForm() {
  return (
    <div className="mb-4">
      <form action="" method="GET">
        <input
          type="search"
          className="px-4 py-1 w-full dark:bg-transparent border border-gray-300 dark:border-gray-600 rounded-md"
          placeholder="Pencarian..."
          name="q"
          id="q"
        />
      </form>
    </div>
  );
}
