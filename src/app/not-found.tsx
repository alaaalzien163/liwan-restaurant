import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="bg-surface flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <p className="text-primary-500 text-7xl font-bold">404</p>
        <h1 className="text-text-primary mt-4 text-2xl font-semibold">
          Page not found
        </h1>
        <p className="text-text-secondary mt-2">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/dashboard"
          className="bg-primary-500 hover:bg-primary-600 mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
