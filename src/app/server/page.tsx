import { fetchUsers } from '@/lib/api';
import type { User } from '@/types';
import ClientPage from '@/components/pages/ClientPage';

export const dynamic = 'force-dynamic';

export default async function ServerPage() {
  const users: User[] = await fetchUsers('no-store');
  return <ClientPage users={users} title="Server Page (SSR)" pageType="SSR" />;
}
