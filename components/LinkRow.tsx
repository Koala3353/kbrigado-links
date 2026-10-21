import React from 'react';
import { ArrowUpRight, Briefcase, Copy, Envelope, GithubLogo, LinkedinLogo } from '@phosphor-icons/react';
import { LinkIcon, LinkItem } from '../types';

const ICONS: Record<LinkIcon, React.ElementType> = {
  portfolio: Briefcase,
  linkedin: LinkedinLogo,
  github: GithubLogo,
  mail: Envelope,
};

/** Each card gets its own coloured tab, like a labelled index card. */
const TABS: Record<LinkIcon, { bg: string; fg: string }> = {
  portfolio: { bg: 'var(--lamp)', fg: 'var(--ink)' },
  linkedin: { bg: 'var(--blue)', fg: '#ffffff' },
  github: { bg: 'var(--ink)', fg: 'var(--paper)' },
  mail: { bg: 'var(--matcha)', fg: 'var(--ink)' },
};

interface LinkRowProps {
  link: LinkItem;
  /** Slight resting tilt, in degrees. */
  tilt: number;
  onCopy: (value: string) => void;
}

/** One link as an index card on the desk. The whole card is the link; email also has a copy button. */
export const LinkRow: React.FC<LinkRowProps> = ({ link, tilt, onCopy }) => {
  const Icon = ICONS[link.icon];
  const tab = TABS[link.icon];
  const external = link.url.startsWith('http');

  return (
    <li
      className="card-tilt paper group relative flex items-center gap-3.5 overflow-hidden py-3 pl-3 pr-3.5"
      style={{ '--tilt': `${tilt}deg` } as React.CSSProperties}
    >
      <span
        className="grid size-11 shrink-0 place-items-center rounded-xl border-2 border-ink"
        style={{ background: tab.bg, color: tab.fg }}
      >
        <Icon size={22} weight="bold" />
      </span>
      <a
        href={link.url}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="min-w-0 flex-1 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[0.9rem] focus-visible:after:outline-3 focus-visible:after:outline-offset-2 focus-visible:after:outline-lamp"
      >
        <span className="font-display block text-[1.1rem] font-semibold leading-tight">{link.title}</span>
        <span className="block truncate text-sm text-ink-soft">{link.description}</span>
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
      {link.copy ? (
        <button
          type="button"
          onClick={() => onCopy(link.copy!)}
          className="chunky sticker relative z-10 size-9 shrink-0 bg-paper-2"
          aria-label={`Copy ${link.title.toLowerCase()} address`}
        >
          <Copy size={17} weight="bold" />
        </button>
      ) : (
        <ArrowUpRight
          size={20}
          weight="bold"
          className="shrink-0 transition-transform duration-200 ease-(--ease-out-strong) group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </li>
  );
};
