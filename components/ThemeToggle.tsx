import React, { useEffect, useState } from 'react';
import { Desktop, Moon, Sun } from '@phosphor-icons/react';

type Pref = 'system' | 'light' | 'dark';
const ORDER: Pref[] = ['system', 'light', 'dark'];
const LABEL: Record<Pref, string> = { system: 'System theme', light: 'Light theme', dark: 'Dark theme' };

function readPref(): Pref {
  try {
    const v = localStorage.getItem('theme');
    return v === 'light' || v === 'dark' ? v : 'system';
  } catch {
    return 'system';
  }
}

function apply(pref: Pref) {
  const dark = pref === 'dark' || (pref === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
}

export const ThemeToggle: React.FC = () => {
  const [pref, setPref] = useState<Pref>(readPref);

  useEffect(() => {
    apply(pref);
    try {
      localStorage.setItem('theme', pref);
    } catch {
      /* storage blocked: theme still applies for this visit */
    }
    if (pref !== 'system') return;
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => apply('system');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [pref]);

  const next = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length];
  const Icon = pref === 'light' ? Sun : pref === 'dark' ? Moon : Desktop;

  return (
    <button
      type="button"
      onClick={() => setPref(next)}
      className="press grid size-10 place-items-center rounded-full border border-line bg-surface text-muted hover:text-fg"
      aria-label={`${LABEL[pref]}. Switch to ${LABEL[next].toLowerCase()}`}
      title={LABEL[pref]}
    >
      <Icon size={18} weight="bold" />
    </button>
  );
};
