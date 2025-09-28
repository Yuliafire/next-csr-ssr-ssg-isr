'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
  title?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
  title = 'Modal',
}: ModalProps) {
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    modalRef.current.focus();
    document.body.style.overflow = 'hidden';

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        style={{ cursor: 'pointer' }}
        aria-label="Close modal by clicking outside"
      /> 
      <div
        ref={modalRef}
        className="bg-gradient-to-br from-blue-300 to-blue-900 rounded-lg p-12 max-w-md w-full relative shadow-lg"
        onClick={(e) => e.stopPropagation()}
        tabIndex={0}
        role="document"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClose();
          }
        }}
      >
        {title && (
          <h2
            id="modal-title"
            className="text-xl font-bold text-center text-white mb-4"
          >
            {title}
          </h2>
        )}
        {showCloseButton && (
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close modal"
            data-testid="modal-close-button"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
