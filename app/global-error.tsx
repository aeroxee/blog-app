"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-[10000] bg-white dark:bg-gray-900">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-center">
              <h1 className="mb-4 text-6xl font-semibold text-red-500">
                Server Error
              </h1>
              <p className="mb-4 text-lg text-gray-600">
                Something went wrong!: {error.message}
              </p>
              <div className="animate-bounce">
                <svg
                  className="mx-auto h-16 w-16 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <p className="mt-4 text-gray-600">
                Let&apos;s get you back{" "}
                <button
                  type="button"
                  onClick={() => reset()}
                  className="text-blue-500"
                >
                  home
                </button>
                .
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
