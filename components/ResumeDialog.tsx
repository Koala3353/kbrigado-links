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
      <div className="absolute inset-0 bg-[#0e1230]/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        className="paper relative flex h-[88dvh] w-full max-w-4xl flex-col overflow-hidden"
        initial={{ opacity: 0, transform: 'translateY(12px) scale(0.97)' }}
        animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
        exit={{ opacity: 0, transform: 'translateY(6px) scale(0.98)', transition: { duration: 0.15 } }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="flex items-center justify-between gap-3 border-b-2 border-ink px-4 py-3">
          <h2 id="resume-title" className="font-display text-lg font-semibold">Résumé</h2>
          <div className="flex items-center gap-2">
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="chunky hidden items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 text-sm font-semibold sm:flex"
            >
              <ArrowSquareOut size={16} weight="bold" /> New tab
            </a>
            <a
              href={PROFILE.resume}
              download="Keene-Brigado-Resume.pdf"
              className="chunky flex items-center gap-1.5 rounded-full bg-matcha px-3 py-1.5 text-sm font-semibold"
            >
              <DownloadSimple size={16} weight="bold" /> Download
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="chunky sticker size-8"
              aria-label="Close résumé"
            >
              <X size={18} weight="bold" />
            </button>
          </div>
        </div>
        <iframe src={PROFILE.resume} title="Keene Brigado's résumé" className="h-full w-full flex-1 bg-paper-2" />
      </motion.div>
    </motion.div>
  );
};
