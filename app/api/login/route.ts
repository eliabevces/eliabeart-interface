// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/app/lib/api';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const data = await login(username, password);

    if (data && data.access_token) {
      const cookieStore = cookies();
      cookieStore.set('access_token', data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return NextResponse.json({ message: 'Login successful' });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: 'Login failed', details: errorMessage }, { status: 500 });
  }
}
