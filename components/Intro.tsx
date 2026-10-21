import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MARK_SVG } from './markSvg';

const HOLD_MS = 1350;

interface IntroProps {
  onDone: () => void;
}

// Short branded intro, same as the portfolio's: the K draws itself, the spark lights, the curtain lifts.
export const Intro: React.FC<IntroProps> = ({ onDone }) => {
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = window.setTimeout(onDone, reduce ? 0 : HOLD_MS);
    return () => window.clearTimeout(t);
  }, [onDone, reduce]);

  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-center justify-center bg-[radial-gradient(60%_55%_at_32%_28%,rgb(255_207_122/0.16),transparent_70%),radial-gradient(90%_80%_at_60%_40%,#2a3263,#1b2140_75%)]"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
      onClick={onDone}
      aria-hidden="true"
    >
      <div className="intro-mark w-28 drop-shadow-[0_18px_40px_rgb(8_10_25/0.55)]" dangerouslySetInnerHTML={{ __html: MARK_SVG }} />
    </motion.div>
  );
};
