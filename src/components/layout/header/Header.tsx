'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home (CSR)' },
    { href: '/static', label: 'Static (SSG)' },
    { href: '/server', label: 'Server (SSR)' },
    { href: '/isr', label: 'ISR' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight">
          <Link
            href="/"
            className="hover:text-blue-100 transition-colors duration-300"
          >
            Next App
          </Link>
        </div>

        <ul className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <motion.li
              key={link.href}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={link.href}
                className="relative text-sm font-medium hover:text-blue-100 transition-colors duration-300 px-2 py-1 rounded-md hover:bg-blue-700/50"
              >
                {link.label}

                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </motion.li>
          ))}
        </ul>

        <button
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-2"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-blue-700/90 backdrop-blur-sm"
          >
            <ul className="flex flex-col items-center space-y-4 py-4">
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white hover:text-blue-100 transition-colors duration-300 px-4 py-2 rounded-md hover:bg-blue-600/50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
