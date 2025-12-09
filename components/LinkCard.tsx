import React from 'react';
import { LinkItem } from '../types';
import { Icon } from './Icon';
import { ExternalLink, Edit2, Trash2 } from 'lucide-react';

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
      <div className="glass-panel p-4 rounded-xl mb-4 flex items-center justify-between group">
        <div className="flex items-center space-x-4 overflow-hidden">
          <div className="p-2 bg-white/10 rounded-lg">
            <Icon name={link.icon} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium truncate">{link.title}</h3>
            <p className="text-white/60 text-xs truncate">{link.url}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(link)}
            className="p-2 hover:bg-white/10 rounded-full text-white/80 transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => onDelete(link.id)}
            className="p-2 hover:bg-red-500/20 rounded-full text-red-400 transition-colors"
          >
            <Trash2 size={16} />
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

  return (
    <a 
      href={link.url}
      target="_blank" 
      rel="noopener noreferrer"
      onClick={handleClick}
      className="block group mb-4 relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors z-0"></div>
      <div className="glass-panel p-4 flex items-center justify-between relative z-10 border border-white/10 group-hover:border-white/30">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-xl transition-colors ${link.icon === 'file-text' ? 'bg-indigo-500/20 text-indigo-300 group-hover:bg-indigo-500/40' : 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-white group-hover:from-indigo-500/40 group-hover:to-purple-500/40'}`}>
            <Icon name={link.icon} className="text-current" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{link.title}</h3>
            {link.description && (
              <p className="text-white/70 text-sm mt-0.5">{link.description}</p>
            )}
          </div>
        </div>
        <div className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
          <ExternalLink size={20} />
        </div>
      </div>
    </a>
  );
};