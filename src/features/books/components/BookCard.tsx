import Link from 'next/link';
import { BookCardItem } from '@/types/openlibrary';
import BookCover from './BookCover';

type BookCardProps = {
  book: BookCardItem;
};

export default function BookCard({ book }: BookCardProps) {
  const authorText =
    book.author_names.length > 0
      ? book.author_names.join(', ')
      : 'Unknown author';

  const workId = book.work_key.replace('/works/', '');

  const shortWorkId = workId.slice(0, 8).toUpperCase();
  const authorCount = book.author_names.length;
  const languageCount = book.language_codes.length;
  const coverStatus = book.cover_id ? 'Cover available' : 'No cover';

  return (
    <Link
      href={`/books/${workId}`}
      prefetch
      className="group block overflow-hidden rounded-2xl border border-(--border) bg-(--card) transition-all duration-300 ease-out hover:-translate-y-1 hover:border-sky-400/40 hover:shadow-[0_10px_35px_rgba(0,0,0,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 active:-translate-y-0.5"
    >
      <div className="relative aspect-3/4 w-full overflow-hidden">
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-110 group-active:scale-110">
          <BookCover title={book.title} coverId={book.cover_id} />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-black/75 opacity-10 transition-opacity duration-500 ease-out group-hover:opacity-100 group-active:opacity-100" />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
          <div className="flex max-w-[85%] translate-y-6 flex-col items-center justify-center text-center opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-active:translate-y-0 group-active:opacity-100">
            <h3 className="line-clamp-3 text-lg font-semibold text-white md:text-xl">
              {book.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm text-slate-200">
              {authorText}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-200">
              <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 backdrop-blur-sm">
                {book.first_publish_year ?? 'Year unknown'}
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 backdrop-blur-sm">
                {book.edition_count ?? 0} editions
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-sky-200">
              Click to view more
            </p>
          </div>
        </div>
      </div>

      <div className="relative p-4">
        <div className="space-y-3 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:opacity-0 group-active:-translate-y-2 group-active:opacity-0">
          <div className="space-y-1">
            <h2 className="line-clamp-2 truncate text-lg font-semibold text-white transition-colors duration-300 group-hover:text-sky-200 group-active:text-sky-200">
              {book.title}
            </h2>
            <p className="line-clamp-2 text-sm text-slate-300 truncate">{authorText}</p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="rounded-full border border-white/10 px-2 py-1">
              {book.first_publish_year ?? 'Year unknown'}
            </span>
            <span className="rounded-full border border-white/10 px-2 py-1">
              {book.edition_count ?? 0} editions
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-4 top-4 flex translate-y-3 flex-col gap-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-active:translate-y-0 group-active:opacity-100">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-2 py-1 text-center text-sky-200">
              ID: {shortWorkId}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-center text-slate-200">
              {authorCount} author{authorCount === 1 ? '' : 's'}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-center text-slate-200">
              {languageCount} language{languageCount === 1 ? '' : 's'}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-center text-slate-200">
              {coverStatus}
            </span>
          </div>

          <p className="text-center text-xs text-slate-300">
            Explore more details about this book
          </p>
        </div>
      </div>
    </Link>
  );
}
