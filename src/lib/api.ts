import type { User } from '@/types';

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export const mutationFetcher = async (
  url: string,
  { arg }: { arg: FormData }
) => {
  const text = arg.get('text') as string;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: text || 'Default Title',
      body: text || 'Default Body',
      userId: 1,
    }),
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return res.json();
};

export async function fetchUsers(
  cacheOption: RequestCache = 'force-cache'
): Promise<User[]> {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/users?_limit=5',
    { cache: cacheOption }
  );
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return res.json();
}
