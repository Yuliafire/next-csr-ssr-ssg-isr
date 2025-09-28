import { fetchUsers } from '@/lib/api';
import type { User } from '@/types';
import ClientPage from '@/components/pages/ClientPage';

export const revalidate = 60;

export default async function ISRPage() {
  const users: User[] = await fetchUsers();

  return <ClientPage users={users} title="ISR Page" pageType="ISR" />;
}
