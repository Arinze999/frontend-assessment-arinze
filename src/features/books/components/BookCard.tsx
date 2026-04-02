import Link from 'next/link';
import { BookCardItem } from '@/types/openlibrary';
import BookCover from './BookCover';

type BookCardProps = {
  book: BookCardItem;
};

export default function BookCard({ book }: BookCardProps) {
  const authorText =
    book.author_names.length > 0 ? book.author_names.join(', ') : 'Unknown author';

  return (
    <Link
      href={`/books/${encodeURIComponent(book.work_key.replace('/works/', ''))}`}
      className="group overflow-hidden rounded-2xl border border-(--border) bg-(--card) transition hover:-translate-y-1 hover:border-sky-400/40 hover:shadow-[0_10px_35px_rgba(0,0,0,0.25)]"
    >
      <div className="relative aspect-3/4 w-full">
        <BookCover title={book.title} coverId={book.cover_id} />
      </div>

      <div className="space-y-3 p-4">
        <div className="space-y-1">
          <h2 className="line-clamp-2 text-lg font-semibold text-white transition group-hover:text-sky-200">
            {book.title}
          </h2>
          <p className="line-clamp-2 text-sm text-slate-300">{authorText}</p>
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
    </Link>
  );
}