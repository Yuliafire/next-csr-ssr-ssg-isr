import { motion } from 'framer-motion';
import type { User } from '@/types';

interface UserCardProps {
readonly user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="border border-gray-200 rounded-lg p-6 bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <h2 className="text-xl font-semibold text-blue-600 mb-2">{user.name}</h2>
      <p className="text-gray-600 mb-1">{user.email}</p>
    </motion.div>
  );
}
