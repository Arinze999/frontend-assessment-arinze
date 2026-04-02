import { BookCardItem } from "@/types/openlibrary";

export function mergeUniqueBooks(
  currentBooks: BookCardItem[],
  incomingBooks: BookCardItem[],
) {
  const seen = new Set(currentBooks.map((book) => book.work_key));
  const merged = [...currentBooks];

  for (const book of incomingBooks) {
    if (!seen.has(book.work_key)) {
      seen.add(book.work_key);
      merged.push(book);
    }
  }

  return merged;
}