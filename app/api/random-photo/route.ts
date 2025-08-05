import { NextResponse } from 'next/server';

export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      return NextResponse.json({ error: 'API URL not configured' }, { status: 500 });
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/images/random", {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch random photo' }, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
