export function buildQueryString(query: string, language: string) {
  const params = new URLSearchParams();

  if (query.trim()) {
    params.set('q', query.trim());
  }

  if (language.trim()) {
    params.set('language', language.trim());
  }

  return params.toString();
}