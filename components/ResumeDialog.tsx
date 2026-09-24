import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowSquareOut, DownloadSimple, X } from '@phosphor-icons/react';
import { PROFILE } from '../constants';

interface ResumeDialogProps {
  onClose: () => void;
}

export const ResumeDialog: React.FC<ResumeDialogProps> = ({ onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        className="relative flex h-[88dvh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
        initial={{ opacity: 0, transform: 'translateY(12px) scale(0.97)' }}
        animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
        exit={{ opacity: 0, transform: 'translateY(6px) scale(0.98)', transition: { duration: 0.15 } }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <h2 id="resume-title" className="text-sm font-semibold">Résumé</h2>
          <div className="flex items-center gap-2">
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="press hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm font-medium text-muted hover:text-fg sm:flex"
            >
              <ArrowSquareOut size={16} weight="bold" /> New tab
            </a>
            <a
              href={PROFILE.resume}
              download="Keene-Brigado-Resume.pdf"
              className="press flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-sm font-medium text-accent-fg hover:bg-accent-hover"
            >
              <DownloadSimple size={16} weight="bold" /> Download
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="press grid size-8 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-fg"
              aria-label="Close résumé"
            >
              <X size={18} weight="bold" />
            </button>
          </div>
        </div>
        <iframe src={PROFILE.resume} title="Keene Brigado's résumé" className="h-full w-full flex-1 bg-surface-2" />
      </motion.div>
    </motion.div>
  );
};
