import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = process.env.BACKEND_API_URL || 'https://pyq-scrapper.onrender.com';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'all'; // 'all' | 'papers' | 'tables'
  const search = searchParams.get('search') || '';

  try {
    let targetUrl = `${EXTERNAL_API_URL}/api/pyq`;
    if (type === 'papers') {
      targetUrl = `${EXTERNAL_API_URL}/api/pyq/papers`;
    } else if (type === 'tables') {
      targetUrl = `${EXTERNAL_API_URL}/api/pyq/tables${search ? `?search=${encodeURIComponent(search)}` : ''}`;
    }

    const response = await fetch(targetUrl, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `External scraper returned status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in /api/pyq proxy route:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch PYQ data from upstream server' },
      { status: 500 }
    );
  }
}
