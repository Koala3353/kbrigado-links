import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ onClose }) => {
  const resumeUrl = `${import.meta.env.BASE_URL}BRIGADO-Resume.pdf`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white text-gray-900 w-full max-w-5xl h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative">

        {/* Header Controls */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">Resume Preview</h2>
          <div className="flex gap-2">
            <a
              href={resumeUrl}
              download="BRIGADO-Resume.pdf"
              className="p-2 bg-white hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 border border-gray-200 rounded-md transition-colors shadow-sm flex items-center gap-2 px-3 text-sm font-medium no-underline"
              title="Download PDF"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Download</span>
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 border border-gray-200 rounded-md transition-colors shadow-sm text-sm font-medium flex items-center gap-2 px-3 no-underline"
              title="Open in New Tab"
            >
              <ExternalLink size={16} />
              <span className="hidden sm:inline">Open New Tab</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 bg-white hover:bg-red-50 text-gray-500 hover:text-red-500 border border-gray-200 rounded-md transition-colors shadow-sm"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-gray-100 relative">
          <iframe
            src={resumeUrl}
            className="w-full h-full border-0"
            title="Resume Preview"
          />
        </div>
      </div>
    </div>
  );
};