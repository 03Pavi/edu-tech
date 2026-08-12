import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3000';

async function fetchFromUpstream(path: string) {
  const res = await fetch(`${EXTERNAL_API_URL}${path}`, {
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
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  try {
    const data = await fetchFromUpstream(`/api/pyq/exams/${slug}`);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`Error in /api/pyq/exams/${slug} proxy:`, error);
    return NextResponse.json(
      { success: false, error: error.message || `Failed to fetch data for exam ${slug}` },
      { status: 500 }
    );
  }
}
