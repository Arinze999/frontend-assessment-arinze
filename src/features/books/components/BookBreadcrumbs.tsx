import Link from 'next/link';

type BookBreadcrumbsProps = {
  title: string;
};

export default function BookBreadcrumbs({ title }: BookBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-sm text-slate-400"
    >
      <Link href="/" className="transition hover:text-white">
        Home
      </Link>
      <span>/</span>
      <span className="text-slate-300">Books</span>
      <span>/</span>
      <span className="max-w-60 truncate text-white">{title}</span>
    </nav>
  );
}