import { fetchUsers } from '@/lib/api';
import type { User } from '@/types';
import ClientPage from '@/components/pages/client/ClientPage';

// Ensure SSG
export const dynamic = 'force-static';

export default async function StaticPage() {
  const users: User[] = await fetchUsers();

  return <ClientPage users={users} title="Static Page (SSG)" pageType="SSG" />;
}
