import {
  AuthorDetailsResponse,
  BookCardItem,
  BookDetailsResponse,
  BookDetailViewModel,
  OpenLibrarySearchResponse,
  SearchBooksParams,
} from '@/types/openlibrary';

const OPEN_LIBRARY_BASE_URL = 'https://openlibrary.org';
const OPEN_LIBRARY_COVERS_BASE_URL = 'https://covers.openlibrary.org';

const SEARCH_FIELDS = [
  'key',
  'title',
  'author_name',
  'author_key',
  'cover_i',
  'first_publish_year',
  'language',
  'edition_count',
].join(',');

function buildSearchUrl({ query, page = 1, language }: SearchBooksParams) {
  const params = new URLSearchParams();

  params.set('q', query.trim() || 'bestsellers');
  params.set('page', String(page));
  params.set('limit', '20');
  params.set('fields', SEARCH_FIELDS);

  if (language) {
    params.set('language', language);
  }

  return `${OPEN_LIBRARY_BASE_URL}/search.json?${params.toString()}`;
}

type FetchJsonOptions = {
  retries?: number;
  cache?: RequestCache;
  revalidate?: number;
};

async function fetchJson<T>(
  url: string,
  options: FetchJsonOptions = {},
): Promise<T> {
  const { retries = 2, cache = 'force-cache', revalidate } = options;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
      cache,
      next: revalidate ? { revalidate } : undefined,
    });

    if (!response.ok) {
      if (
        (response.status === 503 ||
          response.status === 502 ||
          response.status === 504) &&
        retries > 0
      ) {
        await wait(800);
        return fetchJson<T>(url, { ...options, retries: retries - 1 });
      }

      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    if (retries > 0) {
      await wait(800);
      return fetchJson<T>(url, { ...options, retries: retries - 1 });
    }

    throw error;
  }
}

export async function searchBooks(params: SearchBooksParams): Promise<{
  books: BookCardItem[];
  total: number;
  next_page: number | null;
}> {
  const data = await fetchJson<OpenLibrarySearchResponse>(
    buildSearchUrl(params),
      {
      cache: 'no-store',
    },
  );

  const books = data.docs.map(mapSearchDocToBookCardItem);

  const currentPage = params.page ?? 1;
  const loadedCount = data.start + data.docs.length;
  const next_page = loadedCount < data.numFound ? currentPage + 1 : null;

  return {
    books,
    total: data.numFound,
    next_page,
  };
}

export async function getBookDetails(
  workKey: string,
): Promise<BookDetailViewModel> {
  const normalizedWorkKey = normalizeWorkKey(workKey);

  const work = await fetchJson<BookDetailsResponse>(
    `${OPEN_LIBRARY_BASE_URL}${normalizedWorkKey}.json`,
    {
      cache: 'force-cache',
      revalidate: 300,
    },
  );

  const authors = await Promise.all(
    (work.authors ?? []).map(async (entry) => {
      const author = await fetchJson<AuthorDetailsResponse>(
        `${OPEN_LIBRARY_BASE_URL}${entry.author.key}.json`,
        {
          cache: 'force-cache',
          revalidate: 300,
        },
      );

      return {
        key: author.key,
        name: author.name,
      };
    }),
  );

  return {
    work_key: work.key,
    title: work.title,
    description: getDescriptionText(work.description),
    cover_id: work.covers?.[0] ?? null,
    subjects: work.subjects ?? [],
    first_publish_date: work.first_publish_date ?? null,
    authors,
  };
}

export function getCoverImageUrl(
  coverId: number | null,
  size: 'S' | 'M' | 'L' = 'M',
) {
  if (!coverId) {
    return null;
  }

  return `${OPEN_LIBRARY_COVERS_BASE_URL}/b/id/${coverId}-${size}.jpg`;
}

function mapSearchDocToBookCardItem(
  doc: OpenLibrarySearchResponse['docs'][number],
): BookCardItem {
  return {
    work_key: doc.key,
    title: doc.title,
    author_names: doc.author_name ?? [],
    cover_id: doc.cover_i ?? null,
    first_publish_year: doc.first_publish_year ?? null,
    edition_count: doc.edition_count ?? null,
    language_codes: doc.language ?? [],
  };
}

export function normalizeWorkKey(workKey: string) {
  return workKey.startsWith('/works/') ? workKey : `/works/${workKey}`;
}

export function getDescriptionText(
  description: BookDetailsResponse['description'],
): string | null {
  if (!description) {
    return null;
  }

  if (typeof description === 'string') {
    return description;
  }

  return description.value ?? null;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
