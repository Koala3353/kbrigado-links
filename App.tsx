import React, { useState } from 'react';
import { INITIAL_PROFILE, INITIAL_LINKS } from './constants';
import { UserProfile, LinkItem } from './types';
import { LinkCard } from './components/LinkCard';
import { ResumeModal } from './components/ResumeModal';
import { Icon } from './components/Icon';
import { Plus, UserPlus } from 'lucide-react';

const App: React.FC = () => {
  const [profile] = useState<UserProfile>(INITIAL_PROFILE);
  const [links, setLinks] = useState<LinkItem[]>(INITIAL_LINKS);
  const [isEditing, setIsEditing] = useState(false);
  const [showResume, setShowResume] = useState(false);

  const deleteLink = (id: string) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      setLinks(prev => prev.filter(l => l.id !== id));
    }
  };

  const addNewLink = () => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: 'New Link',
      url: 'https://',
      icon: 'globe',
      description: 'Description here',
      active: true
    };
    setLinks([newLink, ...links]);
  };

  const updateLink = (updatedLink: LinkItem) => {
    setLinks(prev => prev.map(l => l.id === updatedLink.id ? updatedLink : l));
  };

  const handleEditLinkRequest = (link: LinkItem) => {
    const newTitle = prompt("Enter title", link.title);
    if (newTitle === null) return;
    const newUrl = prompt("Enter URL", link.url);
    if (newUrl === null) return;
    const newDesc = prompt("Enter description", link.description || "");

    updateLink({
      ...link,
      title: newTitle || link.title,
      url: newUrl || link.url,
      description: newDesc || link.description
    });
  };

  const handleLinkAction = (url: string) => {
    if (url === '#resume') {
      setShowResume(true);
    }
  };

  const handleSaveContact = () => {
    const vcfContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Keene Xander Y. Brigado',
      'N:Brigado;Keene;Xander Y.;;',
      'ORG:Kolmi',
      'TITLE:Founder',
      `NOTE:${profile.bio}`,
      'TEL;TYPE=CELL:+639052367965',
      'item1.TEL:09052367965',
      'item1.X-ABLabel:Viber',
      'EMAIL;TYPE=WORK:brigadokeene@gmail.com',
      'item4.URL:https://linkedin.com/in/keene-brigado',
      'item4.X-ABLabel:LinkedIn',
      'item2.URL:https://www.facebook.com/rainingfishyyy/',
      'item2.X-ABLabel:Facebook',
      'item3.URL:https://t.me/kbrigado',
      'item3.X-ABLabel:Telegram',
      'ADR;TYPE=WORK:;;San Juan;Philippines;;;',
      'END:VCARD'
    ].join('\n');

    const blob = new Blob([vcfContent], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Keene_Brigado.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const footerSocials = [
    { name: 'facebook', url: 'https://www.facebook.com/rainingfishyyy/' },
    { name: 'telegram', url: 'https://t.me/kbrigado' },
    { name: 'instagram', url: 'https://www.instagram.com/xan.keene/' },
  ];

  // Split featured (Kolmi) from the rest
  const featuredLink = links.find(l => l.id === 'kolmi');
  const otherLinks = links.filter(l => l.id !== 'kolmi');

  return (
    <div className="animated-bg min-h-screen text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-white">
      <div className="relative z-10 max-w-[480px] mx-auto px-5 py-20 flex flex-col items-center">

        {/* ── Profile Section ── */}
        <div className="w-full flex flex-col items-center text-center mb-10">

          {profile.avatarUrl ? (
            <div className="avatar-ring mb-6 fade-up fade-up-1">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover block"
              />
            </div>
          ) : (
            <div className="mb-6 fade-up fade-up-1">
              {/* Initials avatar fallback */}
              <div className="avatar-ring">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-2xl font-bold text-cyan-400">
                  KB
                </div>
              </div>
            </div>
          )}

          <div className="fade-up fade-up-2">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
              {profile.name}
            </h1>
            <div className="flex justify-center mb-4">
              <span className="role-badge">{profile.role}</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-sm font-light">
              {profile.bio}
            </p>

            <button
              onClick={handleSaveContact}
              className="btn-save mt-6"
              id="save-contact-btn"
            >
              <UserPlus size={16} />
              <span>Save Contact</span>
            </button>
          </div>
        </div>

        {/* ── Featured: Kolmi Card ── */}
        {featuredLink && (
          <div className="w-full mb-4 fade-up fade-up-3">
            <FeaturedCard link={featuredLink} />
          </div>
        )}

        {/* ── Divider ── */}
        <div className="divider w-full fade-up fade-up-3" />

        {/* ── Edit Controls ── */}
        {isEditing && (
          <div className="w-full mb-4 flex gap-3 animate-in fade-in zoom-in-95 duration-300">
            <button
              onClick={addNewLink}
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-dashed border-white/15 rounded-xl text-slate-400 text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={15} />
              Add Link
            </button>
          </div>
        )}

        {/* ── Links Section ── */}
        <div className="w-full space-y-3 fade-up fade-up-4">
          {otherLinks.map((link, i) => (
            <LinkCard
              key={link.id}
              link={link}
              isEditing={isEditing}
              onEdit={handleEditLinkRequest}
              onDelete={deleteLink}
              onAction={handleLinkAction}
            />
          ))}

          {otherLinks.length === 0 && !isEditing && (
            <div className="text-center p-8 border border-dashed border-white/10 rounded-xl text-slate-600 bg-white/3">
              No links yet. Add some to get started!
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <footer className="mt-16 w-full flex flex-col items-center gap-5">
          <div className="flex items-center justify-center gap-7">
            {footerSocials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label={social.name}
              >
                <Icon name={social.name} size={19} />
              </a>
            ))}
          </div>
          <div className="text-slate-600 text-xs tracking-wider uppercase font-medium">
            © {new Date().getFullYear()} {profile.name}
          </div>
        </footer>

      </div>

      {showResume && (
        <ResumeModal onClose={() => setShowResume(false)} />
      )}
    </div>
  );
};

/** ── Featured Kolmi card — stands out with cyan tint and NFC badge ── */
const FeaturedCard: React.FC<{ link: LinkItem }> = ({ link }) => (
  <a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    className="glass-card featured block p-5 flex items-center justify-between group"
    id="kolmi-featured-card"
    aria-label="Visit Kolmi – NFC Contact Cards"
  >
    <div className="flex items-center gap-4">
      <div className="icon-bubble accent group-hover:bg-cyan-500/25 transition-colors">
        <Icon name={link.icon} size={20} />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-white font-semibold text-base">{link.title}</span>
          <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
            Startup
          </span>
        </div>
        <p className="text-slate-400 text-sm">{link.description}</p>
      </div>
    </div>
    <div className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300 ml-3 shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
    </div>
  </a>
);

export default App;