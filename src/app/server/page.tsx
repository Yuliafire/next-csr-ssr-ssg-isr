import { fetchUsersSSR } from '@/lib/api';
import type { User } from '@/types';
import ClientPage from '@/components/pages/client/ClientPage';

export const dynamic = 'force-dynamic';

export default async function ServerPage() {
  const users: User[] = await fetchUsersSSR();
  return <ClientPage users={users} title="Server Page (SSR)" pageType="SSR" />;
}
