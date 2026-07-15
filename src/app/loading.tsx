export default function LoadingPage() {
  return (
    <div className="bg-surface flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="border-primary-200 border-t-primary-600 h-8 w-8 animate-spin rounded-full border-2" />
        <p className="text-text-tertiary text-sm">Loading...</p>
      </div>
    </div>
  );
}
