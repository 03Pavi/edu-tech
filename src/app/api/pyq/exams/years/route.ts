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

export async function GET() {
  try {
    const data = await fetchFromUpstream('/api/pyq/exams/years');
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in /api/pyq/exams/years proxy:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch exams and years' },
      { status: 500 }
    );
  }
}
