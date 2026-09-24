import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from '@phosphor-icons/react';

export const Toast: React.FC<{ message: string | null }> = ({ message }) => (
  <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4" role="status" aria-live="polite">
    <AnimatePresence>
      {message && (
        <motion.div
          key={message}
          className="flex items-center gap-2 rounded-full bg-fg px-4 py-2.5 text-sm font-medium text-bg shadow-lg"
          initial={{ opacity: 0, transform: 'translateY(12px) scale(0.96)' }}
          animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
          exit={{ opacity: 0, transform: 'translateY(6px) scale(0.98)', transition: { duration: 0.15 } }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        >
          <Check size={16} weight="bold" className="text-accent" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
