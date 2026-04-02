import { BookCardItem } from '@/types/openlibrary';
import BookCard from './BookCard';

type BooksGridProps = {
  books: BookCardItem[];
};

export default function BooksGrid({ books }: BooksGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.work_key} book={book} />
      ))}
    </div>
  );
}
