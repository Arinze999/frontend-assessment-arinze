import { describe, expect, it } from 'vitest';
import { parseBooksSearchParams } from './search-params';

describe('parseBooksSearchParams', () => {
  it('returns safe defaults for empty params', () => {
    expect(parseBooksSearchParams({})).toEqual({
      q: '',
      language: '',
      page: 1,
    });
  });

  it('trims values and parses a valid page', () => {
    expect(
      parseBooksSearchParams({
        q: '  game of thrones  ',
        language: '  eng ',
        page: '3',
      }),
    ).toEqual({
      q: 'game of thrones',
      language: 'eng',
      page: 3,
    });
  });

  it('falls back to page 1 for invalid page values', () => {
    expect(
      parseBooksSearchParams({
        q: 'test',
        language: 'eng',
        page: '-2',
      }),
    ).toEqual({
      q: 'test',
      language: 'eng',
      page: 1,
    });
  });

  it('uses the first value when array params are provided', () => {
    expect(
      parseBooksSearchParams({
        q: [' dune ', 'ignored'],
        language: [' eng ', 'spa'],
        page: ['4', '7'],
      }),
    ).toEqual({
      q: 'dune',
      language: 'eng',
      page: 4,
    });
  });
});