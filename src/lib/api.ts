import type { User } from '@/types';

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export const mutationFetcher = async (
  url: string,
  { arg }: { arg: FormData }
) => {
  const res = await fetch(url, {
    method: 'POST',
    body: arg, 
  });
  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(`HTTP error! Status: ${res.status}, Details: ${errorData}`);
  }
  return res.json();
};

export async function fetchUsers(
  cacheOption: RequestCache = 'force-cache'
): Promise<User[]> {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/users?_limit=10',
    { cache: cacheOption }
  );
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return res.json();
}
