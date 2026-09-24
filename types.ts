export type LinkIcon = 'portfolio' | 'linkedin' | 'github' | 'mail';
export type SocialIcon = 'facebook' | 'telegram' | 'instagram';

export interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: LinkIcon;
  /** Value copied by the row's copy button, if it has one. */
  copy?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: SocialIcon;
}
