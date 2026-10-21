import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import {
  DownloadSimple,
  Eye,
  FacebookLogo,
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
import { KobiPeek, Mark, StringLights } from './components/Desk';

const SOCIAL_ICONS: Record<SocialIcon, React.ElementType> = {
  facebook: FacebookLogo,
  telegram: TelegramLogo,
  instagram: InstagramLogo,
};

const INTRO_KEY = 'intro-seen';

/** Resting tilt of each link card, in degrees, so the stack looks hand-placed. */
const TILTS = [-0.8, 0.6, -0.4, 0.7];

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
      <StringLights />

      <AnimatePresence>{showIntro && <Intro onDone={finishIntro} />}</AnimatePresence>

      <motion.main
        className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col px-5 pb-10 pt-12 sm:pt-16"
        variants={container}
        initial={reduce ? false : 'hidden'}
        animate={revealed ? 'show' : 'hidden'}
      >
        <motion.header variants={item} className="flex items-center justify-between">
          <a href={CONTACT.portfolio} className="flex items-center gap-2.5" aria-label="Keene Brigado's portfolio">
            <Mark className="size-10 transition-transform duration-300 hover:-rotate-6" />
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-on-wall-muted">Keene&apos;s links</span>
          </a>
          <div className="flex items-center gap-2.5">
            <button type="button" onClick={share} className="chunky sticker size-10" aria-label="Share this page">
              <ShareNetwork size={18} weight="bold" />
            </button>
            <ThemeToggle />
          </div>
        </motion.header>

        <section className="mt-10 flex flex-col gap-5" aria-label="Profile">
          <motion.div variants={item} className="flex items-center gap-5">
            {/* a polaroid taped to the wall */}
            <div className="relative shrink-0 -rotate-3 border-2 border-ink bg-white p-1.5 pb-5 shadow-[0_4px_0_var(--ink)]">
              <span className="tape -top-2.5 left-1/2 -translate-x-1/2 -rotate-6" aria-hidden="true" />
              <img src={PROFILE.avatar} alt={PROFILE.name} width={84} height={84} className="size-[84px] object-cover" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-[2.1rem] font-semibold leading-[0.95] tracking-[-0.01em]">
                {PROFILE.shortName}
              </h1>
              <p className="mt-2 font-mono text-[0.7rem] uppercase leading-snug tracking-[0.1em] text-on-wall-muted">
                {PROFILE.role}
              </p>
            </div>
          </motion.div>

          <motion.p variants={item} className="inline-flex w-fit items-center gap-2.5 rounded-full border-2 border-ink bg-paper px-3.5 py-1.5 text-[13px] font-medium text-ink">
            <span className="lamp-dot" aria-hidden="true" />
            {PROFILE.status}
          </motion.p>

          <motion.p variants={item} className="text-[15.5px] leading-relaxed text-on-wall-muted">
            {PROFILE.bio}
          </motion.p>

          <motion.div variants={item}>
            <button
              type="button"
              onClick={saveContact}
              className="chunky inline-flex items-center gap-2 rounded-full bg-lamp px-5 py-2.5 text-[15px] font-semibold text-ink"
            >
              <UserPlus size={18} weight="bold" />
              Save my contact
            </button>
          </motion.div>
        </section>

        {/* the résumé: a sheet of ruled notebook paper */}
        <motion.section
          variants={item}
          className="paper ruled relative mt-9 rotate-[0.6deg] py-4 pl-14 pr-4"
          aria-labelledby="resume-heading"
        >
          <span className="tape -top-2.5 right-6 rotate-[5deg]" aria-hidden="true" />
          <h2 id="resume-heading" className="font-display text-[1.35rem] font-semibold leading-tight">
            Résumé
          </h2>
          <p className="text-sm text-ink-soft">One page: school, work, and wins.</p>
          <div className="mt-3.5 flex flex-wrap gap-2.5">
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={openResume}
              className="chunky inline-flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-sm font-semibold"
            >
              <Eye size={16} weight="bold" />
              Read it
            </a>
            <a
              href={PROFILE.resume}
              download="Keene-Brigado-Resume.pdf"
              className="chunky inline-flex items-center gap-1.5 rounded-full bg-matcha px-4 py-2 text-sm font-semibold"
            >
              <DownloadSimple size={16} weight="bold" />
              Download
            </a>
          </div>
        </motion.section>

        {/* links: a stack of index cards, with Kobi peeking over the top one */}
        <motion.div variants={item} className="relative mt-[4.5rem]">
          <p
            className="font-display absolute -top-[3.4rem] right-[6.6rem] rounded-2xl rounded-br-sm border-2 border-ink bg-paper px-3 py-1 text-sm font-medium text-ink"
            aria-hidden="true"
          >
            Pick a card
          </p>
          <KobiPeek className="pointer-events-none absolute -top-[3.3rem] right-4 z-10 w-[5.5rem]" />
          <ul className="flex flex-col gap-3.5" aria-label="Links">
            {LINKS.map((link, i) => (
              <LinkRow key={link.id} link={link} tilt={TILTS[i % TILTS.length]} onCopy={(v) => copy(v, 'Email copied')} />
            ))}
          </ul>
        </motion.div>

        <motion.footer variants={item} className="mt-auto flex flex-col items-center gap-4 pt-14">
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chunky sticker size-11"
                  aria-label={`${s.name} (opens in a new tab)`}
                >
                  <Icon size={20} weight="bold" />
                </a>
              );
            })}
          </div>
          <p className="text-xs text-on-wall-muted">
            © {new Date().getFullYear()} {PROFILE.name} ·{' '}
            <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4 hover:text-on-wall">
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
