import React from 'react';
import { MARK_SVG, MARK_SVG_SMALL } from './markSvg';

/** The site mark (an inked K on a night tile), shared with the portfolio. */
export const Mark: React.FC<{ className?: string; small?: boolean }> = ({ className, small = true }) => (
  <span
    aria-hidden="true"
    className={`inline-block [&>svg]:block [&>svg]:size-full ${className ?? ''}`}
    dangerouslySetInnerHTML={{ __html: small ? MARK_SVG_SMALL : MARK_SVG }}
  />
);

const BULBS = ['#ffcf7a', '#ffb3c7', '#a7e3c4', '#bfdcff'];

/** String lights sagging along the top of the wall. Lit at night, plain glass by day. */
export const StringLights: React.FC = () => (
  <svg
    className="pointer-events-none fixed inset-x-0 top-0 z-0 h-16 w-full"
    viewBox="0 0 400 60"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path d="M-10 6 Q 50 40 110 8 T 230 8 T 350 8 T 470 8" fill="none" stroke="var(--ink)" strokeOpacity="0.55" strokeWidth="1" />
    {[
      [18, 18], [44, 27], [72, 25], [98, 14], [128, 19], [156, 27], [184, 24], [212, 13],
      [244, 19], [272, 27], [300, 24], [328, 13], [360, 19], [388, 26],
    ].map(([x, y], i) => (
      <ellipse
        key={x}
        className="bulb"
        style={{ '--c': BULBS[i % BULBS.length] } as React.CSSProperties}
        cx={x}
        cy={y + 4}
        rx="2.4"
        ry="3.4"
        stroke="var(--ink)"
        strokeWidth="0.8"
      />
    ))}
  </svg>
);

/** Kobi the koala peeking over an edge, paws first. Same character as the portfolio's desk. */
export const KobiPeek: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 120" className={className} aria-hidden="true" focusable="false">
    <g stroke="#1b1726" strokeWidth="5">
      <circle cx="46" cy="44" r="30" fill="#9ea3b0" />
      <circle cx="154" cy="44" r="30" fill="#9ea3b0" />
      <ellipse cx="100" cy="74" rx="58" ry="52" fill="#9ea3b0" />
    </g>
    <circle cx="48" cy="46" r="17" fill="#f0a8b8" />
    <circle cx="152" cy="46" r="17" fill="#f0a8b8" />
    <ellipse cx="100" cy="92" rx="34" ry="24" fill="#e3e5eb" opacity="0.6" />
    <g className="kobi-eyes">
      <circle cx="76" cy="66" r="7" fill="#1b1726" />
      <circle cx="124" cy="66" r="7" fill="#1b1726" />
      <circle cx="78.5" cy="63.5" r="2.2" fill="#fff" />
      <circle cx="126.5" cy="63.5" r="2.2" fill="#fff" />
    </g>
    <ellipse cx="100" cy="84" rx="15" ry="18" fill="#1b1726" />
    <ellipse cx="95" cy="77" rx="4" ry="3" fill="#fff" opacity="0.3" />
    <ellipse cx="66" cy="90" rx="9" ry="5" fill="#f0a8b8" opacity="0.8" />
    <ellipse cx="134" cy="90" rx="9" ry="5" fill="#f0a8b8" opacity="0.8" />
    {/* paws on the edge */}
    <g stroke="#1b1726" strokeWidth="5" fill="#9ea3b0">
      <ellipse cx="62" cy="118" rx="20" ry="12" />
      <ellipse cx="138" cy="118" rx="20" ry="12" />
    </g>
  </svg>
);
