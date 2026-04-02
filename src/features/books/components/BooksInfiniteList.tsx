'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Spinner from '@/components/Spinner';
import BooksGrid from './BooksGrid';
import { BookCardItem } from '@/types/openlibrary';
import { mergeUniqueBooks } from '@/utils/merge-unique-books';

type BooksInfiniteListProps = {
  initialBooks: BookCardItem[];
  initialNextPage: number | null;
  totalBooks: number;
  query: string;
  language: string;
};

type BooksApiResponse = {
  books: BookCardItem[];
  total: number;
  next_page: number | null;
};

export default function BooksInfiniteList({
  initialBooks,
  initialNextPage,
  totalBooks,
  query,
  language,
}: BooksInfiniteListProps) {
  const [books, setBooks] = useState(initialBooks);
  const [nextPage, setNextPage] = useState<number | null>(initialNextPage);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState('');
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setBooks(initialBooks);
    setNextPage(initialNextPage);
    setLoadMoreError('');
    setIsLoadingMore(false);
  }, [initialBooks, initialNextPage, query, language]);

  const requestUrl = useMemo(() => {
    const params = new URLSearchParams();

    if (query.trim()) {
      params.set('q', query.trim());
    }

    if (language.trim()) {
      params.set('language', language.trim());
    }

    const queryString = params.toString();

    return queryString ? `/api/books?${queryString}` : '/api/books';
  }, [query, language]);

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target || !nextPage || isLoadingMore) {
      return;
    }

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];

        if (!entry?.isIntersecting) {
          return;
        }

        observer.unobserve(target);
        setIsLoadingMore(true);
        setLoadMoreError('');

        try {
          const url = new URL(requestUrl, window.location.origin);
          url.searchParams.set('page', String(nextPage));

          const response = await fetch(url.toString(), {
            method: 'GET',
          });

          if (!response.ok) {
            throw new Error('Failed to load more books.');
          }

          const data = (await response.json()) as BooksApiResponse;

          setBooks((currentBooks) =>
            mergeUniqueBooks(currentBooks, data.books),
          );
          setNextPage(data.next_page);
        } catch {
          setLoadMoreError(
            'Could not load more books. Please scroll again to retry.',
          );
        } finally {
          setIsLoadingMore(false);
        }
      },
      {
        rootMargin: '300px 0px',
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [requestUrl, nextPage, isLoadingMore]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 rounded-2xl border border-(--border) bg-(--card) px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-300">
          Loaded books:{' '}
          <span className="font-semibold text-white">
            {books.length.toLocaleString()}
          </span>
        </p>

        <p className="text-sm text-slate-400">
          Total books:{' '}
          <span className="font-semibold text-white">
            {totalBooks?.toLocaleString()}
          </span>
        </p>
      </div>

      <BooksGrid books={books} />

      <div
        ref={loadMoreRef}
        className="flex min-h-12 items-center justify-center"
      >
        {isLoadingMore ? (
          <Spinner
            size="sm"
            label="Loading more books..."
            className="text-sm text-slate-400"
          />
        ) : loadMoreError ? (
          <p className="text-sm text-red-300">{loadMoreError}</p>
        ) : nextPage ? (
          <p className="text-sm text-slate-500">Scroll to load more</p>
        ) : (
          <p className="text-sm text-slate-500">No more books to load</p>
        )}
      </div>
    </div>
  );
}
