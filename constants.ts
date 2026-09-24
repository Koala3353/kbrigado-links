import { LinkItem, SocialLink } from './types';

// Single source of truth for everything personal on the page, including the vCard.
export const PROFILE = {
  name: 'Keene Xander Brigado',
  shortName: 'Keene Brigado',
  role: 'Management Engineering, Ateneo de Manila',
  bio: 'I help teams rethink how their work gets done, using operations, code, and AI. Consulted for Ritual Matcha Co. and GoRocky.',
  avatar: `${import.meta.env.BASE_URL}avatar.jpg`,
  resume: `${import.meta.env.BASE_URL}BRIGADO-Resume.pdf`,
  pageUrl: 'https://koala3353.github.io/kbrigado-links/',
};

export const CONTACT = {
  email: 'brigadokeene@gmail.com',
  phone: '+639052367965',
  org: 'Klick n Code',
  title: 'Owner & Founder',
  city: 'San Juan',
  country: 'Philippines',
  linkedin: 'https://www.linkedin.com/in/keene-brigado/',
  github: 'https://github.com/Koala3353',
  portfolio: 'https://koala3353.github.io/portfolio/',
  facebook: 'https://www.facebook.com/rainingfishyyy/',
  telegram: 'https://t.me/kbrigado',
  instagram: 'https://www.instagram.com/xan.keene/',
};

export const LINKS: LinkItem[] = [
  { id: 'portfolio', title: 'Portfolio', description: 'Projects and case studies', url: CONTACT.portfolio, icon: 'portfolio' },
  { id: 'linkedin', title: 'LinkedIn', description: 'Connect professionally', url: CONTACT.linkedin, icon: 'linkedin' },
  { id: 'github', title: 'GitHub', description: 'Code and open-source work', url: CONTACT.github, icon: 'github' },
  { id: 'email', title: 'Email', description: CONTACT.email, url: `mailto:${CONTACT.email}`, icon: 'mail', copy: CONTACT.email },
];

export const SOCIALS: SocialLink[] = [
  { name: 'Facebook', url: CONTACT.facebook, icon: 'facebook' },
  { name: 'Telegram', url: CONTACT.telegram, icon: 'telegram' },
  { name: 'Instagram', url: CONTACT.instagram, icon: 'instagram' },
];

export function buildVCard(): string {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${PROFILE.name}`,
    'N:Brigado;Keene Xander;;;',
    `ORG:${CONTACT.org}`,
    `TITLE:${CONTACT.title}`,
    `NOTE:${PROFILE.bio}`,
    `TEL;TYPE=CELL:${CONTACT.phone}`,
    `EMAIL;TYPE=WORK:${CONTACT.email}`,
    `URL:${PROFILE.pageUrl}`,
    `item1.URL:${CONTACT.linkedin}`,
    'item1.X-ABLabel:LinkedIn',
    `item2.URL:${CONTACT.portfolio}`,
    'item2.X-ABLabel:Portfolio',
    `item3.URL:${CONTACT.telegram}`,
    'item3.X-ABLabel:Telegram',
    `item4.URL:${CONTACT.facebook}`,
    'item4.X-ABLabel:Facebook',
    `ADR;TYPE=WORK:;;;${CONTACT.city};;;${CONTACT.country}`,
    'END:VCARD',
  ].join('\r\n');
}
