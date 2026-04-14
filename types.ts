export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: 'linkedin' | 'github' | 'globe' | 'mail' | 'twitter' | 'instagram' | 'code' | 'file-text' | 'nfc' | 'facebook' | 'telegram';
  description?: string;
  active: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  theme: 'dark' | 'light' | 'glass';
}