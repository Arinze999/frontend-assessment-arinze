'use client';

import Spinner from '@/components/Spinner';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { buildQueryString } from '@/utils/build-books-querry-string';

type BooksSearchBarProps = {
  initialQuery: string;
  initialLanguage: string;
};

export default function BooksSearchBar({
  initialQuery,
  initialLanguage,
}: BooksSearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(initialQuery);
  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setLanguage(initialLanguage);
  }, [initialLanguage]);

  const currentQueryString = useMemo(
    () => buildQueryString(initialQuery, initialLanguage),
    [initialQuery, initialLanguage],
  );

  const hasActiveFilters = Boolean(query.trim() || language.trim());

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const nextQueryString = buildQueryString(query, language);

      if (nextQueryString === currentQueryString) {
        return;
      }

      const nextUrl = nextQueryString
        ? `${pathname}?${nextQueryString}`
        : pathname;

      startTransition(() => {
        router.replace(nextUrl, { scroll: false });
      });
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [query, language, pathname, router, currentQueryString]);

  const handleReset = () => {
    setQuery('');
    setLanguage('');

    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  };

  return (
    <div className="grid gap-3 rounded-2xl border border-(--border) bg-(--card) p-4 md:grid-cols-[1fr_220px_auto]">
      <label className="space-y-2">
        <span className="text-sm text-slate-300">Search books</span>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title, keyword, or topic"
          className="w-full rounded-xl border border-white/10 bg-[#0d1526] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm text-slate-300">Language</span>
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#0d1526] px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
        >
          <option value="">All languages</option>
          <option value="eng">English</option>
          <option value="fre">French</option>
          <option value="spa">Spanish</option>
          <option value="ger">German</option>
        </select>
      </label>

      <div className="flex items-end">
        <button
          type="button"
          onClick={handleReset}
          disabled={!hasActiveFilters && !isPending}
          className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-200 transition hover:border-sky-400/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
        >
          Reset
        </button>
      </div>

      {isPending ? (
        <div className="md:col-span-3">
          <Spinner
            size="sm"
            label="Updating results..."
            className="text-xs text-slate-400"
          />
        </div>
      ) : null}
    </div>
  );
}
