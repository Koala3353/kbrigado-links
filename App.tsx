import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import {
  DownloadSimple,
  FacebookLogo,
  FileText,
  InstagramLogo,
  ShareNetwork,
  TelegramLogo,
  UserPlus,
} from '@phosphor-icons/react';
import { CONTACT, LINKS, PROFILE, SOCIALS, buildVCard } from './constants';
import { SocialIcon } from './types';
import { Intro } from './components/Intro';
import { LinkRow } from './components/LinkRow';
import { ResumeDialog } from './components/ResumeDialog';
import { ThemeToggle } from './components/ThemeToggle';
import { Toast } from './components/Toast';

const SOCIAL_ICONS: Record<SocialIcon, React.ElementType> = {
  facebook: FacebookLogo,
  telegram: TelegramLogo,
  instagram: InstagramLogo,
};

const INTRO_KEY = 'intro-seen';

function introAlreadySeen(): boolean {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1';
  } catch {
    return false;
  }
}

// The inline viewer only makes sense where browsers render PDFs in a frame.
function canEmbedPdf(): boolean {
  return window.matchMedia('(min-width: 768px) and (pointer: fine)').matches;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, transform: 'translateY(12px)' },
  show: { opacity: 1, transform: 'translateY(0px)', transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

const App: React.FC = () => {
  const reduce = useReducedMotion();
  const [showIntro, setShowIntro] = useState(() => !introAlreadySeen());
  const [showResume, setShowResume] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number>(undefined);

  const finishIntro = useCallback(() => {
    setShowIntro(false);
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* ignore */
    }
  }, []);

  const notify = useCallback((message: string) => {
    window.clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const copy = useCallback(
    async (value: string, message = 'Copied to clipboard') => {
      try {
        await navigator.clipboard.writeText(value);
        notify(message);
      } catch {
        notify("Couldn't copy. Long-press to copy instead");
      }
    },
    [notify]
  );

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: PROFILE.shortName, url: PROFILE.pageUrl });
      } catch {
        /* user dismissed the share sheet */
      }
      return;
    }
    copy(PROFILE.pageUrl, 'Link copied');
  };

  const saveContact = () => {
    const blob = new Blob([buildVCard()], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Keene_Brigado.vcf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    notify('Contact card downloaded');
  };

  const openResume = (e: React.MouseEvent) => {
    if (!canEmbedPdf()) return; // let the link open the PDF natively
    e.preventDefault();
    setShowResume(true);
  };

  const revealed = !showIntro;

  return (
    <>
      <div className="backdrop" aria-hidden="true" />

      <AnimatePresence>{showIntro && <Intro onDone={finishIntro} />}</AnimatePresence>

      <motion.main
        className="relative mx-auto flex min-h-[100dvh] w-full max-w-[460px] flex-col px-4 pb-10 pt-6 sm:pt-10"
        variants={container}
        initial={reduce ? false : 'hidden'}
        animate={revealed ? 'show' : 'hidden'}
      >
        <motion.header variants={item} className="flex items-center justify-between">
          <span className="font-mono text-sm font-semibold tracking-tight">
            KB<span className="text-accent">.</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={share}
              className="press grid size-10 place-items-center rounded-full border border-line bg-surface text-muted hover:text-fg"
              aria-label="Share this page"
            >
              <ShareNetwork size={18} weight="bold" />
            </button>
            <ThemeToggle />
          </div>
        </motion.header>

        <section className="mt-10 flex flex-col gap-5" aria-label="Profile">
          <motion.div variants={item} className="flex items-center gap-4">
            <img
              src={PROFILE.avatar}
              alt={PROFILE.name}
              width={80}
              height={80}
              className="size-20 shrink-0 rounded-full object-cover ring-1 ring-line"
            />
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold leading-tight">{PROFILE.shortName}</h1>
              <p className="mt-1 text-sm text-muted">{PROFILE.role}</p>
            </div>
          </motion.div>

          <motion.p variants={item} className="text-[15px] leading-relaxed text-muted">
            {PROFILE.bio}
          </motion.p>

          <motion.div variants={item}>
            <button
              type="button"
              onClick={saveContact}
              className="press inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg hover:bg-accent-hover"
            >
              <UserPlus size={18} weight="bold" />
              Save contact
            </button>
          </motion.div>
        </section>

        <motion.section
          variants={item}
          className="mt-8 rounded-2xl border border-line bg-surface p-4"
          aria-labelledby="resume-heading"
        >
          <div className="flex items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
              <FileText size={20} weight="duotone" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id="resume-heading" className="text-[15px] font-medium leading-snug">Résumé</h2>
              <p className="text-sm text-subtle">Education, experience, and skills</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={openResume}
              className="press flex items-center justify-center rounded-full border border-line bg-bg px-4 py-2 text-sm font-medium hover:border-subtle"
            >
              View
            </a>
            <a
              href={PROFILE.resume}
              download="Keene-Brigado-Resume.pdf"
              className="press flex items-center justify-center gap-1.5 rounded-full border border-line bg-bg px-4 py-2 text-sm font-medium hover:border-subtle"
            >
              <DownloadSimple size={16} weight="bold" />
              Download
            </a>
          </div>
        </motion.section>

        <motion.ul
          variants={item}
          className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface"
          aria-label="Links"
        >
          {LINKS.map((link) => (
            <LinkRow key={link.id} link={link} onCopy={(v) => copy(v, 'Email copied')} />
          ))}
        </motion.ul>

        <motion.footer variants={item} className="mt-auto flex flex-col items-center gap-4 pt-12">
          <div className="flex items-center gap-1">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press grid size-11 place-items-center rounded-full text-subtle hover:bg-surface hover:text-fg"
                  aria-label={`${s.name} (opens in a new tab)`}
                >
                  <Icon size={20} weight="bold" />
                </a>
              );
            })}
          </div>
          <p className="text-xs text-subtle">
            © {new Date().getFullYear()} {PROFILE.name} ·{' '}
            <a href={`mailto:${CONTACT.email}`} className="underline-offset-4 hover:text-fg hover:underline">
              Say hi
            </a>
          </p>
        </motion.footer>
      </motion.main>

      <AnimatePresence>{showResume && <ResumeDialog onClose={() => setShowResume(false)} />}</AnimatePresence>

      <Toast message={toast} />
    </>
  );
};

export default App;
