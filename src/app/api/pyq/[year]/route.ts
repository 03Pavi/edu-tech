import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = process.env.BACKEND_API_URL || 'https://pyq-scrapper.onrender.com';
const FALLBACK_API_URL = 'https://pyq-scrapper.onrender.com';

async function fetchFromUpstream(path: string) {
  try {
    const res = await fetch(`${EXTERNAL_API_URL}${path}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 300 },
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn(`Primary API ${EXTERNAL_API_URL}${path} unreachable, trying fallback...`);
  }

  const res = await fetch(`${FALLBACK_API_URL}${path}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`Upstream API failed with status ${res.status}`);
  }
  return await res.json();
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  const resolvedParams = await params;
  const year = resolvedParams.year;

  try {
    const data = await fetchFromUpstream(`/api/pyq/${year}`);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`Error in /api/pyq/${year} proxy:`, error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch year breakdown' },
      { status: 500 }
    );
  }
}
