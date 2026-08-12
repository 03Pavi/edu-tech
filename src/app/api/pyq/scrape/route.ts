import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = 'https://pyq-scrapper.onrender.com';

export async function POST(request: Request) {
  try {
    const response = await fetch(`${EXTERNAL_API_URL}/api/pyq/scrape`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `Live scrape failed with status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in /api/pyq/scrape route:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error triggering scrape' },
      { status: 500 }
    );
  }
}
