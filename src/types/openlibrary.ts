export type OpenLibrarySearchBook = {
  key: string;
  title: string;
  author_name?: string[];
  author_key?: string[];
  cover_i?: number;
  first_publish_year?: number;
  language?: string[];
  subject?: string[];
  edition_count?: number;
  ratings_average?: number;
  want_to_read_count?: number;
  already_read_count?: number;
  currently_reading_count?: number;
  publisher?: string[];
  isbn?: string[];
};

export type OpenLibrarySearchResponse = {
  numFound: number;
  start: number;
  docs: OpenLibrarySearchBook[];
};

export type BookCardItem = {
  work_key: string;
  title: string;
  author_names: string[];
  cover_id: number | null;
  first_publish_year: number | null;
  edition_count: number | null;
  language_codes: string[];
};

export type SearchBooksParams = {
  query: string;
  page?: number;
  language?: string;
};

export type BookDetailsResponse = {
  key: string;
  title: string;
  description?: string | { value?: string };
  covers?: number[];
  subjects?: string[];
  subject_places?: string[];
  subject_times?: string[];
  first_publish_date?: string;
  authors?: Array<{
    author: {
      key: string;
    };
    type?: {
      key: string;
    };
  }>;
};

export type AuthorDetailsResponse = {
  key: string;
  name: string;
  bio?: string | { value?: string };
  photos?: number[];
  birth_date?: string;
  death_date?: string;
};

export type BookDetailViewModel = {
  work_key: string;
  title: string;
  description: string | null;
  cover_id: number | null;
  subjects: string[];
  first_publish_date: string | null;
  authors: Array<{
    key: string;
    name: string;
  }>;
};