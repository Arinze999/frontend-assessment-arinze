import { describe, expect, it } from 'vitest';
import { getDescriptionText, normalizeWorkKey } from './openlibrary';

describe('normalizeWorkKey', () => {
  it('returns a full work key when given a bare id', () => {
    expect(normalizeWorkKey('OL82563W')).toBe('/works/OL82563W');
  });

  it('keeps an already-normalized work key unchanged', () => {
    expect(normalizeWorkKey('/works/OL82563W')).toBe('/works/OL82563W');
  });
});

describe('getDescriptionText', () => {
  it('returns null when description is missing', () => {
    expect(getDescriptionText(undefined)).toBeNull();
  });

  it('returns string descriptions as-is', () => {
    expect(getDescriptionText('Plain description')).toBe('Plain description');
  });

  it('returns the value field for object descriptions', () => {
    expect(getDescriptionText({ value: 'Rich description' })).toBe(
      'Rich description',
    );
  });

  it('returns null when object descriptions do not have a value', () => {
    expect(getDescriptionText({})).toBeNull();
  });
});
