import React from 'react';
import { Github, Globe, Linkedin, Mail, Twitter, Instagram, Code, ExternalLink, FileText, Facebook, Send, Nfc } from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className, size = 20 }) => {
  switch (name) {
    case 'github': return <Github className={className} size={size} />;
    case 'linkedin': return <Linkedin className={className} size={size} />;
    case 'globe': return <Globe className={className} size={size} />;
    case 'mail': return <Mail className={className} size={size} />;
    case 'twitter': return <Twitter className={className} size={size} />;
    case 'instagram': return <Instagram className={className} size={size} />;
    case 'code': return <Code className={className} size={size} />;
    case 'file-text': return <FileText className={className} size={size} />;
    case 'facebook': return <Facebook className={className} size={size} />;
    case 'telegram': return <Send className={className} size={size} />;
    case 'nfc': return <Nfc className={className} size={size} />;
    default: return <ExternalLink className={className} size={size} />;
  }
};