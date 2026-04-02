import Link from 'next/link';

export default function BookNotFoundPage() {
  return (
    <main className="container py-16">
      <div className="rounded-3xl border border-white/10 bg-(--card) p-8 text-center">
        <h1 className="text-3xl font-semibold text-white">Book not found</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          We could not find the book you requested. It may have been removed, renamed,
          or temporarily unavailable from the upstream API.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-sky-400 px-5 py-3 text-sm font-medium text-slate-950 transition hover:opacity-90"
        >
          Back to explorer
        </Link>
      </div>
    </main>
  );
}