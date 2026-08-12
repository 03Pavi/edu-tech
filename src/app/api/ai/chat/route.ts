import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = 'https://pyq-scrapper.onrender.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${EXTERNAL_API_URL}/api/ai/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `AI service returned status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in /api/ai/chat route:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'AI Chat service error' },
      { status: 500 }
    );
  }
}
