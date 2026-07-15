"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-surface flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <p className="text-danger-500 text-7xl font-bold">500</p>
        <h1 className="text-text-primary mt-4 text-2xl font-semibold">
          Something went wrong
        </h1>
        <p className="text-text-secondary mt-2">
          {error.message || "An unexpected error occurred"}
        </p>
        <button
          type="button"
          onClick={reset}
          className="bg-primary-500 hover:bg-primary-600 mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
