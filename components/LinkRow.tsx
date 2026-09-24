import React from 'react';
import { ArrowUpRight, Briefcase, Copy, Envelope, GithubLogo, LinkedinLogo } from '@phosphor-icons/react';
import { LinkIcon, LinkItem } from '../types';

const ICONS: Record<LinkIcon, React.ElementType> = {
  portfolio: Briefcase,
  linkedin: LinkedinLogo,
  github: GithubLogo,
  mail: Envelope,
};

interface LinkRowProps {
  link: LinkItem;
  onCopy: (value: string) => void;
}

export const LinkRow: React.FC<LinkRowProps> = ({ link, onCopy }) => {
  const Icon = ICONS[link.icon];
  const external = link.url.startsWith('http');

  return (
    <li className="group relative flex items-center gap-4 px-4 py-3.5 transition-colors duration-150 hover:bg-surface-2/60">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-2 text-fg transition-colors duration-150 group-hover:bg-accent-soft group-hover:text-accent">
        <Icon size={20} weight="duotone" />
      </span>
      <a
        href={link.url}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="min-w-0 flex-1 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-[-2px] focus-visible:after:outline-accent"
      >
        <span className="block text-[15px] font-medium leading-snug">{link.title}</span>
        <span className="block truncate text-sm text-subtle">{link.description}</span>
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
      {link.copy ? (
        <button
          type="button"
          onClick={() => onCopy(link.copy!)}
          className="press relative z-10 grid size-9 shrink-0 place-items-center rounded-full text-subtle hover:bg-surface hover:text-fg"
          aria-label={`Copy ${link.title.toLowerCase()} address`}
        >
          <Copy size={18} weight="bold" />
        </button>
      ) : (
        <ArrowUpRight
          size={18}
          weight="bold"
          className="shrink-0 text-subtle transition-transform duration-200 ease-(--ease-out-strong) group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
          aria-hidden="true"
        />
      )}
    </li>
  );
};
