'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetcher, mutationFetcher } from '@/lib/api';
import type { User } from '@/types';

export function useUser() {
  const { data, error, isLoading, isValidating } = useSWR<User[]>(
    'https://jsonplaceholder.typicode.com/users',
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    users: data,
    isLoading,
    isError: error,
    isValidating,
  };
}

export function usePostData() {
  const { trigger, isMutating } = useSWRMutation(
    'https://jsonplaceholder.typicode.com/posts',
    mutationFetcher,
  );

  return { triggerPost: trigger, isSubmitting: isMutating };
}
