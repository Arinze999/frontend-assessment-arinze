'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-red-400/20 bg-red-400/10 p-8 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-red-200">
          Something went wrong
        </p>

        <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
          We hit an unexpected error
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-300 md:text-base">
          An unexpected issue prevented this part of the app from loading properly.
          You can try again, go back to the homepage, or refresh the page.
        </p>

        {error.digest ? (
          <p className="mt-4 text-xs text-slate-400">
            Error reference: {error.digest}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:opacity-90"
          >
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-sky-400/40 hover:bg-white/10"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}