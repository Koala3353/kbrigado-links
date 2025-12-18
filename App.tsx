import React, { useState } from 'react';
import { INITIAL_PROFILE, INITIAL_LINKS } from './constants';
import { UserProfile, LinkItem } from './types';
import { LinkCard } from './components/LinkCard';
import { ProfileEditor } from './components/ProfileEditor';
import { ResumeModal } from './components/ResumeModal';
import { Icon } from './components/Icon';
import { Settings, Plus, Sparkles, CheckCircle2, UserPlus } from 'lucide-react';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [links, setLinks] = useState<LinkItem[]>(INITIAL_LINKS);
  const [isEditing, setIsEditing] = useState(false);
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [showResume, setShowResume] = useState(false);

  const handleProfileSave = (newProfile: UserProfile) => {
    setProfile(newProfile);
    setShowProfileEditor(false);
  };

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
      'ORG:Klick n Code',
      'TITLE:Owner & Founder',
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

  return (
    <div className="min-h-screen animated-bg text-gray-100 font-sans selection:bg-indigo-500/30 selection:text-white">

      <div className="max-w-xl mx-auto min-h-screen px-6 py-20 flex flex-col items-center">

        {/* Profile Section */}
        <div className="w-full flex flex-col items-center text-center mb-12 relative z-10">
          {profile.avatarUrl ? (
            <div className="relative group mb-6">
              <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 shadow-2xl ring-1 ring-white/10">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full rounded-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              {isEditing && (
                <button
                  onClick={() => setShowProfileEditor(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
                >
                  <Settings size={24} />
                </button>
              )}
            </div>
          ) : (
            // Spacer if no avatar, to prevent layout jumpiness or just keep spacing nice
            <div className="h-8"></div>
          )}

          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl font-bold tracking-tight text-white mb-3 flex items-center gap-2.5">
              {profile.name}
              <span className="text-indigo-400" title="Verified">
                <CheckCircle2 size={20} fill="currentColor" className="text-indigo-400/20" />
              </span>
            </h1>
            <p className="text-indigo-300/80 text-sm font-semibold tracking-widest uppercase mb-5 bg-indigo-500/5 px-3 py-1 rounded-full border border-indigo-500/10">
              {profile.role}
            </p>
            <p className="text-gray-400 max-w-md leading-relaxed text-base font-light">
              {profile.bio}
            </p>

            <button
              onClick={handleSaveContact}
              className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-full font-medium transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5"
            >
              <UserPlus size={18} />
              <span>Save Contact</span>
            </button>
          </div>
        </div>

        {/* Edit Controls */}
        {isEditing && (
          <div className="w-full mb-8 flex gap-3 animate-in fade-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowProfileEditor(true)}
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-dashed border-white/20 rounded-xl text-sm font-medium transition-colors flex items-center justify-center text-gray-300"
            >
              <Sparkles size={16} className="mr-2 text-indigo-400" />
              AI Profile Editor
            </button>
            <button
              onClick={addNewLink}
              className="flex-1 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 border border-dashed border-indigo-500/30 rounded-xl text-indigo-300 text-sm font-medium transition-colors flex items-center justify-center"
            >
              <Plus size={16} className="mr-2" />
              Add Link
            </button>
          </div>
        )}

        {/* Links Section */}
        <div className="w-full space-y-4 relative z-10">
          {links.map((link) => (
            <LinkCard
              key={link.id}
              link={link}
              isEditing={isEditing}
              onEdit={handleEditLinkRequest}
              onDelete={deleteLink}
              onAction={handleLinkAction}
            />
          ))}

          {links.length === 0 && (
            <div className="text-center p-8 border border-dashed border-white/10 rounded-xl text-gray-500 bg-white/5">
              No links yet. Add some to get started!
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="flex justify-center items-center gap-6 mb-4">
            {footerSocials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-400 transition-all duration-300 hover:-translate-y-1"
                aria-label={social.name}
              >
                <Icon name={social.name} size={20} />
              </a>
            ))}
          </div>
          <div className="text-gray-600 text-xs tracking-wider uppercase font-medium">
            © {new Date().getFullYear()} {profile.name}
          </div>
        </footer>

      </div>

      {showProfileEditor && (
        <ProfileEditor
          profile={profile}
          onSave={handleProfileSave}
          onClose={() => setShowProfileEditor(false)}
        />
      )}

      {showResume && (
        <ResumeModal onClose={() => setShowResume(false)} />
      )}
    </div>
  );
};

export default App;