import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BookDetailView from '@/features/books/components/BookDetailView';
import { getBookDetails, getCoverImageUrl } from '@/lib/openlibrary';

type BookDetailPageProps = {
  params: Promise<{
    workId: string;
  }>;
};

export async function generateMetadata(
  props: BookDetailPageProps,
): Promise<Metadata> {
  try {
    const { workId } = await props.params;
    const book = await getBookDetails(workId);

    const description =
      book.description?.slice(0, 160) ||
      `Explore details, subjects, and authors for ${book.title}.`;

    const coverUrl = book.cover_id
      ? getCoverImageUrl(book.cover_id, 'L')
      : null;

    return {
      title: `${book.title} | Book Explorer`,
      description,
      openGraph: {
        title: `${book.title} | Book Explorer`,
        description,
        images: coverUrl ? [{ url: coverUrl }] : [],
      },
    };
  } catch {
    return {
      title: 'Book not found | Book Explorer',
      description: 'The requested book could not be loaded.',
    };
  }
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { workId } = await params;

  let book;

  try {
    book = await getBookDetails(workId);
  } catch {
    notFound();
  }
  

  return <BookDetailView book={book} />;
}
