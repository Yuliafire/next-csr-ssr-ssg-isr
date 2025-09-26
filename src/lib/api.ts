import type { User } from '@/types';

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export const mutationFetcher = (url: string, { arg }: { arg: FormData }) =>
  fetch(url, {
    method: 'POST',
    body: arg,
  }).then((res) => res.json());

export async function fetchUsers(): Promise<User[]> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
      cache: 'force-cache',
    });
    return await res.json();
  } catch (error) {
    console.error('Fetch users error:', error);
    return [];
  }
}

export async function fetchUsersSSR(): Promise<User[]> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Fetch users error:', error);
    return [];
  }
}
