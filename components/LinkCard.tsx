import React from 'react';
import { LinkItem } from '../types';
import { Icon } from './Icon';
import { Edit2, Trash2 } from 'lucide-react';

interface LinkCardProps {
  link: LinkItem;
  isEditing: boolean;
  onEdit: (link: LinkItem) => void;
  onDelete: (id: string) => void;
  onAction?: (actionId: string) => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, isEditing, onEdit, onDelete, onAction }) => {
  if (isEditing) {
    return (
      <div className="glass-card p-4 flex items-center justify-between group">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="icon-bubble">
            <Icon name={link.icon} className="text-slate-300" size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium truncate text-sm">{link.title}</h3>
            <p className="text-slate-500 text-xs truncate mt-0.5">{link.url}</p>
          </div>
        </div>
        <div className="flex gap-1 ml-3 shrink-0">
          <button
            onClick={() => onEdit(link)}
            className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
            aria-label="Edit link"
          >
            <Edit2 size={15} />
          </button>
          <button
            onClick={() => onDelete(link.id)}
            className="p-2 hover:bg-red-500/15 rounded-lg text-slate-500 hover:text-red-400 transition-colors"
            aria-label="Delete link"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    if (link.url.startsWith('#')) {
      e.preventDefault();
      if (onAction) {
        onAction(link.url);
      }
    }
  };

  const isResume = link.icon === 'file-text';

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="glass-card block p-4 flex items-center justify-between group"
      aria-label={link.title}
    >
      <div className="flex items-center gap-4">
        <div className={`icon-bubble ${isResume ? 'accent' : ''} group-hover:border-white/15 transition-colors`}>
          <Icon
            name={link.icon}
            size={18}
            className={isResume ? '' : 'text-slate-300 group-hover:text-white transition-colors'}
          />
        </div>
        <div>
          <h3 className="text-white font-semibold text-[15px] leading-snug">{link.title}</h3>
          {link.description && (
            <p className="text-slate-500 text-xs mt-0.5 group-hover:text-slate-400 transition-colors">
              {link.description}
            </p>
          )}
        </div>
      </div>
      <div className="text-slate-600 group-hover:text-slate-300 group-hover:translate-x-1 transition-all duration-300 ml-3 shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
      </div>
    </a>
  );
};