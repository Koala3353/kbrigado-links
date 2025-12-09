import React, { useState } from 'react';
import { UserProfile } from '../types';
import { generateEnhancedBio } from '../services/gemini';
import { Sparkles, X, Loader2, Save } from 'lucide-react';

interface ProfileEditorProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onClose: () => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, onSave, onClose }) => {
  const [editedProfile, setEditedProfile] = useState(profile);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIEnhance = async (tone: 'professional' | 'casual' | 'tech') => {
    setIsGenerating(true);
    const newBio = await generateEnhancedBio(editedProfile.bio, editedProfile.role, tone);
    setEditedProfile(prev => ({ ...prev, bio: newBio }));
    setIsGenerating(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-white font-semibold text-lg">Edit Profile</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wider">Avatar URL</label>
            <input 
              name="avatarUrl"
              value={editedProfile.avatarUrl}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wider">Display Name</label>
            <input 
              name="name"
              value={editedProfile.name}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wider">Role / Job Title</label>
            <input 
              name="role"
              value={editedProfile.role}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between items-end mb-1">
              <label className="block text-xs font-medium text-white/60 uppercase tracking-wider">Bio</label>
              <div className="flex gap-1">
                 {isGenerating ? (
                   <span className="flex items-center text-xs text-indigo-400"><Loader2 className="animate-spin mr-1" size={12}/> Thinking...</span>
                 ) : (
                   <div className="flex gap-1">
                     <button onClick={() => handleAIEnhance('professional')} className="text-[10px] bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 px-2 py-0.5 rounded flex items-center transition-colors">
                       <Sparkles size={10} className="mr-1" /> Pro
                     </button>
                     <button onClick={() => handleAIEnhance('casual')} className="text-[10px] bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 px-2 py-0.5 rounded flex items-center transition-colors">
                       <Sparkles size={10} className="mr-1" /> Casual
                     </button>
                   </div>
                 )}
              </div>
            </div>
            <textarea 
              name="bio"
              value={editedProfile.bio}
              onChange={handleChange}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
            <p className="text-xs text-white/40 mt-1">Use the AI buttons to rewrite your bio instantly.</p>
          </div>
        </div>

        <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end">
          <button 
            onClick={() => onSave(editedProfile)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center"
          >
            <Save size={16} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
