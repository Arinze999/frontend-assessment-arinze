type BooksEmptyStateProps = {
  query: string;
};

export default function BooksEmptyState({ query }: BooksEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center">
      <h2 className="text-xl font-semibold text-white">No books found</h2>
      <p className="mt-2 text-sm text-slate-300">
        {query
          ? `No results matched "${query}". Try a different keyword or remove the filter.`
          : 'No books were returned for this view.'}
      </p>
    </div>
  );
}