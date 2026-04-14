import { UserProfile, LinkItem } from './types';

export const INITIAL_PROFILE: UserProfile = {
  name: "Keene Brigado",
  role: "Management Engineering Student & Developer",
  bio: "Currently pursuing a BS in Management Engineering at Ateneo de Manila University. I combine business acumen with technical expertise to build scalable web applications and intuitive user experiences.",
  avatarUrl: "",
  theme: 'dark',
};

export const INITIAL_LINKS: LinkItem[] = [
  {
    id: 'kolmi',
    title: 'Kolmi — NFC Contact Cards',
    url: 'https://kolmi.vercel.app/',
    icon: 'nfc',
    description: 'Get your smart NFC business card today',
    active: true,
  },
  {
    id: 'resume',
    title: 'View Resume',
    url: '#resume',
    icon: 'file-text',
    description: 'Education, Work Experience & Skills',
    active: true,
  },
  {
    id: '1',
    title: 'Portfolio Website',
    url: 'https://koala3353.github.io/portfolio/',
    icon: 'globe',
    description: 'View my projects and experiences',
    active: true,
  },
  {
    id: '2',
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/keene-brigado/',
    icon: 'linkedin',
    description: 'Connect with me professionally',
    active: true,
  },
  {
    id: '3',
    title: 'GitHub',
    url: 'https://github.com/koala3353',
    icon: 'github',
    description: 'Check out my code repositories',
    active: true,
  },
  {
    id: '4',
    title: 'Email Me',
    url: 'mailto:brigadokeene@gmail.com',
    icon: 'mail',
    description: 'brigadokeene@gmail.com',
    active: true,
  }
];