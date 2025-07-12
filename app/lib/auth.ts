// lib/auth.ts (para App Router)
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { User } from '@/app/types/auth';
import { verifyAuthAndFetchUser } from '@lib/api';

interface GetUserOptions {
  redirectTo?: string;
  allowUnauthenticated?: boolean;
}

export async function getUser(options: GetUserOptions = {}): Promise<User | null> {
  const { redirectTo = '/login', allowUnauthenticated = false } = options;
  const cookieStore = cookies();

  const tokenCookie = cookieStore.get('access_token');

  if (!tokenCookie?.value) {
    if (allowUnauthenticated) return null;
    console.log('App Router: No auth token found, redirecting.');
    redirect(redirectTo);
  }

  const user = await verifyAuthAndFetchUser(tokenCookie.value);

  if (!user) {
    if (allowUnauthenticated) return null;
    console.log('App Router: Token validation failed or no user, redirecting.');
    redirect(redirectTo);
  }

  return user;
}