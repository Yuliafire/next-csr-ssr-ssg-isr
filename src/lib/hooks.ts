'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetcher, mutationFetcher } from '@/lib/api';
import type { User } from '@/types';

export function useUser() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<User[]>(
    "https://jsonplaceholder.typicode.com/users",
    fetcher,
    {
      revalidateOnFocus: false, // Disable if causing loops
      dedupingInterval: 5000,
    }
  );
  return { data, error, isLoading, isValidating, mutate };
}


export function usePostData() {
  const { trigger, isMutating } = useSWRMutation(
    'https://jsonplaceholder.typicode.com/posts',
    mutationFetcher,
    {
      onSuccess: () => {
        // Optional: Invalidate user cache if needed
        // mutate("https://jsonplaceholder.typicode.com/users");
      },
    }
  );

  return { triggerPost: trigger, isSubmitting: isMutating };
}
