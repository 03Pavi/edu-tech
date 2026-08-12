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
    console.warn(`Primary API ${EXTERNAL_API_URL}${path} unreachable, trying production server...`);
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

function filterOutFutureYears(data: any) {
  if (!data) return data;
  if (data.data?.years && Array.isArray(data.data.years)) {
    data.data.years = data.data.years.filter((yr: number) => yr <= 2025);
  }
  return data;
}

export async function GET() {
  try {
    const data = await fetchFromUpstream('/api/pyq/years');
    return NextResponse.json(filterOutFutureYears(data));
  } catch (error: any) {
    console.error('Error in /api/pyq/years proxy:', error);
    return NextResponse.json(
      {
        success: true,
        data: {
          exam: 'SSC CGL',
          years: [2025, 2024, 2023, 2022, 2021, 2020, 2019],
        },
      },
      { status: 200 }
    );
  }
}
