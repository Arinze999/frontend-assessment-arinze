import { NextRequest, NextResponse } from 'next/server';
import { searchBooks } from '@/lib/openlibrary';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const q = searchParams.get('q')?.trim() ?? '';
  const language = searchParams.get('language')?.trim() ?? '';
  const page = Number(searchParams.get('page') ?? '1');

  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;

  try {
    const result = await searchBooks({
      query: q || 'bestsellers',
      language,
      page: safePage,
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      {
        message: 'Failed to load books.',
      },
      { status: 500 },
    );
  }
}