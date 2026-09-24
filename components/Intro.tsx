import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const EASE = [0.23, 1, 0.32, 1] as const;
const HOLD_MS = 900;

interface IntroProps {
  onDone: () => void;
}

// Short branded loader: monogram, a filling bar, then the curtain lifts.
export const Intro: React.FC<IntroProps> = ({ onDone }) => {
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = window.setTimeout(onDone, reduce ? 0 : HOLD_MS);
    return () => window.clearTimeout(t);
  }, [onDone, reduce]);

  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-center justify-center bg-bg"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-5">
        <motion.span
          className="font-mono text-2xl font-semibold tracking-tight text-fg"
          initial={{ opacity: 0, filter: 'blur(6px)', transform: 'translateY(6px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)', transform: 'translateY(0px)' }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          KB<span className="text-accent">.</span>
        </motion.span>
        <div className="h-[2px] w-24 overflow-hidden rounded-full bg-line">
          <motion.div
            className="h-full w-full origin-left bg-accent"
            initial={{ transform: 'scaleX(0)' }}
            animate={{ transform: 'scaleX(1)' }}
            transition={{ duration: HOLD_MS / 1000 - 0.1, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
};
