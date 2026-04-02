export const dynamic = 'force-dynamic';

import RefreshButton from '@/components/RefreshButton';
import BooksSearchBar from '@/features/books/components/BookSearchBar';
import BooksEmptyState from '@/features/books/components/BooksEmptyState';
import BooksInfiniteList from '@/features/books/components/BooksInfiniteList';
import { parseBooksSearchParams } from '@/features/books/lib/search-params';
import { searchBooks } from '@/lib/openlibrary';

type HomePageProps = {
  searchParams: Promise<{
    q?: string | string[];
    language?: string | string[];
    page?: string | string[];
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const { q, language, page } = parseBooksSearchParams(resolvedSearchParams);

  let result: {
    books: Awaited<ReturnType<typeof searchBooks>>['books'];
    total: number;
    next_page: number | null;
  } | null = null;

  let hasError = false;

  try {
    result = await searchBooks({
      query: q || 'bestsellers',
      language,
      page,
    });
  } catch {
    hasError = true;
  }

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

      <section className="mt-8">
        <BooksSearchBar initialQuery={q} initialLanguage={language} />
      </section>

      {hasError ? (
        <section className="mt-8 rounded-2xl border border-red-400/20 bg-red-400/10 p-6">
          <h2 className="text-lg font-semibold text-white">
            We could not load books right now
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            The Open Library API is temporarily unavailable. Please try again in
            a moment.
          </p>

          <RefreshButton />
        </section>
      ) : (
        <>
          <section className="mt-8">
            {result && result.books.length > 0 ? (
              <BooksInfiniteList
                initialBooks={result.books}
                initialNextPage={result.next_page}
                totalBooks={result.total}
                query={q}
                language={language}
              />
            ) : (
              <BooksEmptyState query={q} />
            )}
          </section>
        </>
      )}
    </main>
  );
}
