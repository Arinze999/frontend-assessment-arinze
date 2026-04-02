'use client';

export default function BookDetailError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="container py-16">
      <div className="rounded-3xl border border-red-400/20 bg-red-400/10 p-8 text-center">
        <h1 className="text-3xl font-semibold text-white">
          Unable to load this book
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Something went wrong while loading the book details. Please try again.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </main>
  );
}