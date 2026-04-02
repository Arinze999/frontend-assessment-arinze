import BooksGridSkeleton from '@/features/books/components/BooksGridSkeleton';

export default function HomeLoading() {
  return (
    <main className="container py-10 md:py-14">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
          Content Explorer
        </p>

        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Discover books and authors with a fast, searchable Open Library
          explorer.
        </h1>

        <p className="max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
          Browse books, search by keyword, filter results, and open a detail
          page with richer metadata.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-(--border) bg-(--card) p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_220px]">
          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
            <div className="h-12 w-full animate-pulse rounded-xl bg-white/10" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
            <div className="h-12 w-full animate-pulse rounded-xl bg-white/10" />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <BooksGridSkeleton />
      </section>
    </main>
  );
}
