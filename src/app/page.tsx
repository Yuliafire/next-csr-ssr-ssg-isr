'use client';

import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useUser } from '@/lib/hooks';
import type { FormData } from '@/types';
import UserCard from '@/components/ui/userCard/UserCard';
import Modal from '@/components/ui/modal/Modal';
import Form from '@/components/ui/form/Form';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { users, isLoading, isError, isValidating } = useUser();

  const handleFormSubmit: SubmitHandler<FormData> = () => {
    setIsModalOpen(false);
  };

  let content = null;
  if (isLoading || isValidating) {
    content = (
      <motion.div
        key="skeleton"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {[... new Array(10)].map((_, index) => (
          <motion.div
            key={`skeleton-${index}`}
            className="bg-white p-6 rounded-lg shadow-md animate-pulse"
          >
            <div className="h-6 w-32 bg-blue-200 rounded mb-4"></div>
            <div className="h-4 w-48 bg-blue-200 rounded mb-2"></div>
            <div className="h-4 w-36 bg-blue-200 rounded"></div>
          </motion.div>
        ))}
      </motion.div>
    );
  } else if (isError) {
    content = (
      <motion.div
        key="error"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center text-red-500"
      >
        Failed to load users: {isError.message}
      </motion.div>
    );
  } else {
    content = (
      <motion.div
        key="data"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {users?.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <UserCard user={user} />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Toaster position="top-right" />

      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12 px-4 bg-blue-600 text-white shadow-lg"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Home Page (CSR)
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-blue-100">
          Users fetched client-side with SWR in Next.js App Router.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Submit Data
        </motion.button>
      </motion.section>

      <section className="container mx-auto px-4 py-8" aria-busy={isLoading}>
        <AnimatePresence mode="wait">{content}</AnimatePresence>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Submit Profile Update"
      >
        <Form onSubmit={handleFormSubmit} />
      </Modal>
    </div>
  );
}
