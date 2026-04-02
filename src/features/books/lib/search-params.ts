export type BooksPageSearchParams = {
  q: string;
  language: string;
  page: number;
};

type RawSearchParams = {
  q?: string | string[];
  language?: string | string[];
  page?: string | string[];
};

function getSingleValue(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return value ?? '';
}

export function parseBooksSearchParams(
  searchParams: RawSearchParams,
): BooksPageSearchParams {
  const q = getSingleValue(searchParams.q).trim();
  const language = getSingleValue(searchParams.language).trim();
  const rawPage = getSingleValue(searchParams.page).trim();

  const parsedPage = Number(rawPage);
  const page =
    Number.isFinite(parsedPage) && parsedPage > 0
      ? Math.floor(parsedPage)
      : 1;

  return {
    q,
    language,
    page,
  };
}