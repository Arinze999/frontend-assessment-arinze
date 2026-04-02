import { BookDetailViewModel } from '@/types/openlibrary';
import BookBreadcrumbs from './BookBreadcrumbs';
import BookCover from './BookCover';
import RichTextViewer from '@/components/RichTextViewer';
import BackToResultsButton from './BackToResultsButton';

type BookDetailViewProps = {
  book: BookDetailViewModel;
};

export default function BookDetailView({ book }: BookDetailViewProps) {
  const authorNames =
    book.authors.length > 0
      ? book.authors.map((author) => author.name).join(', ')
      : 'Unknown author';

  return (
    <main className="container py-10 md:py-14">
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <BackToResultsButton />
        </div>

        <BookBreadcrumbs title={book.title} />

        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-3xl border h-fit border-(--border) bg-(--card)">
            <div className="relative aspect-3/4 w-full">
              <BookCover
                title={book.title}
                coverId={book.cover_id}
                eager
                size="L"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
                Book detail
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                {book.title}
              </h1>

              <p className="text-base text-slate-300 md:text-lg">
                {authorNames}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                First published: {book.first_publish_date ?? 'Unknown'}
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                {book.subjects.length} subjects
              </span>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Description</h2>
              <RichTextViewer
                content={book.description}
                className="max-w-3xl"
              />
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Subjects</h2>

              {book.subjects.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {book.subjects.slice(0, 20).map((subject) => (
                    <span
                      key={subject}
                      className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1.5 text-xs text-sky-100"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400">No subjects available.</p>
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
