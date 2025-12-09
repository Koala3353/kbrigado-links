import React from 'react';
import { X, Download, Mail, Phone, Linkedin, MapPin } from 'lucide-react';

interface ResumeModalProps {
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ onClose }) => {

  // const contentRef = useRef<HTMLDivElement>(null); // Removed unused ref
  // const [isDownloading, setIsDownloading] = useState(false); // Removed unused state

  // handleDownload function removed as we are now using a static link


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white text-gray-900 w-full max-w-[850px] h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative">

        {/* Header Controls */}
        <div className="absolute top-4 right-4 flex gap-2 print:hidden z-10">
          <a
            href="/BRIGADO-Resume.pdf"
            download="BRIGADO-Resume.pdf"
            className="p-2 bg-gray-100 hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 rounded-full transition-colors shadow-sm flex items-center gap-2 px-4 no-underline"
            title="Download PDF Version"
          >
            <Download size={18} />
            <span className="text-sm font-medium hidden sm:inline">Download PDF</span>
          </a>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500 rounded-full transition-colors shadow-sm"
          >
            <X size={18} />
          </button>
        </div>

        {/* Resume Content - Scrollable Wrapper */}
        <div className="flex-1 overflow-y-auto bg-white">
          {/* Inner Content - Ref Target for PDF */}
          <div className="bg-white p-6 md:p-12 text-gray-800 font-serif leading-relaxed">

            {/* Resume Header */}
            <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
              <h1 className="text-3xl font-bold uppercase tracking-wide text-gray-900 mb-2">Keene Xander Y. Brigado</h1>
              <div className="flex flex-wrap justify-center gap-x-4 text-sm text-gray-700">
                <span className="flex items-center gap-1 whitespace-nowrap"><Phone size={12} /> +63 905 236 7965</span>
                <span className="hidden sm:inline">|</span>
                <span className="flex items-center gap-1 whitespace-nowrap"><Mail size={12} /> brigadokeene@gmail.com</span>
                <span className="hidden sm:inline">|</span>
                <span className="flex items-center gap-1 whitespace-nowrap"><Linkedin size={12} /> linkedin.com/in/keene-brigado</span>
                <span className="hidden sm:inline">|</span>
                <span className="flex items-center gap-1 whitespace-nowrap"><MapPin size={12} /> San Juan, Philippines</span>
              </div>
            </div>

            {/* Education */}
            <section className="mb-6 avoid-break">
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 text-gray-900">Education</h2>

              <div className="mb-4">
                <div className="flex justify-between font-bold">
                  <span>Ateneo de Manila University</span>
                  <span>Quezon City, NCR</span>
                </div>
                <div className="flex justify-between italic text-gray-700">
                  <span>Bachelor of Science in Management Engineering</span>
                  <span>June 2029</span>
                </div>
                <p className="text-sm mt-1 text-gray-600">Coursework includes: Calculus, Business Management, Decision Science.</p>
              </div>

              <div>
                <div className="flex justify-between font-bold">
                  <span>Grace Christian College (STEM - Engineering)</span>
                  <span>Quezon City, NCR</span>
                </div>
                <div className="flex justify-between italic text-gray-700">
                  <span>Top 4 in a batch of 100~ students; GPA: 96.17%, Honors class</span>
                  <span>June 2025</span>
                </div>
                <p className="text-sm mt-1 text-gray-600">Relevant Courses: AP Calculus, AP Statistics, AP Lit.</p>
              </div>
            </section>

            {/* Leadership Experience */}
            <section className="mb-6">
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 text-gray-900">Leadership Experience</h2>

              <div className="mb-4 avoid-break">
                <div className="flex justify-between">
                  <span className="font-bold">Ateneo Gabay 16th Scholars' Week</span>
                  <span className="text-gray-600">Ateneo de Manila University</span>
                </div>
                <div className="flex justify-between italic text-sm mb-1">
                  <span>Logistics Head</span>
                  <span>November 2025-Present</span>
                </div>
              </div>

              <div className="mb-4 avoid-break">
                <div className="flex justify-between">
                  <span className="font-bold">Grace Robotics Team</span>
                  <span className="text-gray-600">Grace Christian College</span>
                </div>
                <div className="flex justify-between italic text-sm mb-1">
                  <span>Team Leader</span>
                  <span>2023-2025</span>
                </div>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  <li>Led a 10-member robotics team, winning <strong>1st Place</strong> at FLL Philippines 2024, placing <strong>7th</strong> at FLL Open Europe 2024, and placing <strong>5th</strong> at FLL Philippines 2025.</li>
                  <li>Directed the development of an AI-powered analytics app and a sensor-based automation system, applying data insights to improve real-world functionality.</li>
                  <li>Organized project timelines and coordinated tasks across multiple technical subteams to ensure on-time delivery of competition requirements.</li>
                </ul>
              </div>

              <div className="mb-4 avoid-break">
                <div className="flex justify-between">
                  <span className="font-bold">Herodotus Club</span>
                  <span className="text-gray-600">Grace Christian College</span>
                </div>
                <div className="flex justify-between italic text-sm mb-1">
                  <span>President</span>
                  <span>August 2024-May 2025</span>
                </div>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1 mb-2">
                  <li>Led the school’s premier history and debate organization with <strong>100+ members</strong> across Grades 7–12.</li>
                  <li>Proposed new long-term initiatives to strengthen the organization’s future programs.</li>
                  <li>Coordinated with 3+ student organizations to plan and deliver collaborative events.</li>
                </ul>
                <div className="flex justify-between italic text-sm mb-1">
                  <span>Vice President</span>
                  <span>August 2023-May 2024</span>
                </div>
              </div>

              <div className="avoid-break">
                <div className="flex justify-between">
                  <span className="font-bold">Student Council</span>
                  <span className="text-gray-600">Grace Christian College</span>
                </div>
                <div className="flex justify-between italic text-sm mb-1">
                  <span>Cultural Chairman</span>
                  <span>August 2024-May 2025</span>
                </div>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  <li>Managed the trimestral bulletin board competition involving <strong>600+ students</strong> across Grades 7–12.</li>
                </ul>
              </div>
            </section>

            {/* Work Experience */}
            <section className="mb-6">
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 text-gray-900">Work Experience</h2>

              <div className="mb-4 avoid-break">
                <div className="flex justify-between">
                  <span className="font-bold">Klick n Code</span>
                  <span className="text-gray-600">Remote</span>
                </div>
                <div className="flex justify-between italic text-sm mb-1">
                  <span>Owner & Founder</span>
                  <span>January 2021-Present</span>
                </div>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  <li>Developed analytics tools, web apps, and automation bots improving efficiency and engagement; delivered clear client communication and earned <strong>$3,000 within a total of 100 hours</strong>.</li>
                </ul>
              </div>

              <div className="mb-4 avoid-break">
                <div className="flex justify-between">
                  <span className="font-bold">The Little Baker Kitchen</span>
                  <span className="text-gray-600">Remote</span>
                </div>
                <div className="flex justify-between italic text-sm mb-1">
                  <span>Web Solutions Engineer</span>
                  <span>June 2024-August 2025</span>
                </div>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  <li>Engineered a dynamic, responsive website featuring a content hub to streamline the customer journey.</li>
                  <li>Optimized site functionality for lead generation, resulting in a 25% increase in inquiries and 35% growth in site traffic.</li>
                </ul>
              </div>

              <div className="mb-4 avoid-break">
                <div className="flex justify-between">
                  <span className="font-bold">Amada Corporation</span>
                  <span className="text-gray-600">Remote</span>
                </div>
                <div className="flex justify-between italic text-sm mb-1">
                  <span>Data Processing Consultant</span>
                  <span>June 2025-July 2025</span>
                </div>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  <li>Designed and deployed automated data solutions, reducing payroll cycles by 97% (8 hours to 15 minutes).</li>
                  <li>Developed ETL pipelines to standardize multi-format data and ensure audit-ready compliance with Philippine labor laws (13th-month pay).</li>
                </ul>
              </div>

              <div className="avoid-break">
                <div className="flex justify-between">
                  <span className="font-bold">Primer Group of Companies</span>
                  <span className="text-gray-600">Manila, NCR</span>
                </div>
                <div className="flex justify-between italic text-sm mb-1">
                  <span>Intern (Admin - Engineering dept.)</span>
                  <span>June 2025-July 2025</span>
                </div>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  <li>Automated reports with Google Apps Script, streamlining data collection and improving workflows, resulting in a <strong>60% reduction</strong> in processing time.</li>
                </ul>
              </div>
            </section>

            {/* General Experience */}
            <section className="mb-6">
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 text-gray-900">General Experience</h2>

              <div className="mb-2 avoid-break">
                <div className="flex justify-between text-sm">
                  <span className="font-bold">TEDxAteneoDeManilaU</span>
                  <span className="italic">November 2025-Present</span>
                </div>
                <div className="text-sm text-gray-700">Stakeholder Management Associate</div>
              </div>

              <div className="mb-2 avoid-break">
                <div className="flex justify-between text-sm">
                  <span className="font-bold">Ateneo Celadon</span>
                  <span className="italic">September 2025-Present</span>
                </div>
                <div className="text-sm text-gray-700">Recruitment & Secretariat Core + OSR Analyst | Celaball '26</div>
                <div className="text-sm text-gray-700">Operations Core + OSR Analyst | Rose Sale '26</div>
                <ul className="list-disc ml-5 text-xs text-gray-600 mt-1">
                  <li>Created the project’s pre-order website and managed all logistical trackers.</li>
                  <li>Led onsite operations and produced a data-driven sustainability report.</li>
                </ul>
                <div className="text-sm text-gray-700 mt-1">Junior Analyst | Organization Strategies & Research Department</div>
              </div>

              <div className="mb-2 avoid-break">
                <div className="flex justify-between text-sm">
                  <span className="font-bold">Council of Organizations of Ateneo</span>
                  <span className="italic">September 2025-Present</span>
                </div>
                <div className="text-sm text-gray-700">Administrative Officer | Office of the Secretary-General</div>
              </div>

              <div className="mb-2 avoid-break">
                <div className="flex justify-between text-sm">
                  <span className="font-bold">SOBO</span>
                  <span className="italic">April 2024-May 2024</span>
                </div>
                <div className="text-sm text-gray-700">Co-Founder & Student Entrepreneur</div>
                <ul className="list-disc ml-5 text-xs text-gray-600 mt-1">
                  <li>Managed end-to-end operations for a pop-up retail stall.</li>
                  <li>Generated a PHP 50,000+ net profit in three days.</li>
                </ul>
              </div>
            </section>

            {/* Activities & Awards */}
            <section className="mb-6 avoid-break">
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 text-gray-900">Activities & Awards</h2>

              <div className="mb-2">
                <div className="flex justify-between">
                  <span className="font-bold text-sm">Top 25 Semifinalist | Ateneo Challenge for Transformational Sustainability</span>
                  <span className="italic text-sm">October 2025</span>
                </div>
                <p className="text-sm text-gray-700">Selected as a top team nationwide for developing sustainability solutions in partnership with Nestlé.</p>
              </div>

              <div className="mb-2">
                <div className="flex justify-between">
                  <span className="font-bold text-sm">Archer Achiever</span>
                  <span className="italic text-sm">May 2025</span>
                </div>
                <p className="text-sm text-gray-700">Recognized as a Top 100 Scorer on the DLSU College Admission Test.</p>
              </div>

              <div>
                <div className="flex justify-between">
                  <span className="font-bold text-sm">Director’s List</span>
                  <span className="italic text-sm">March 2025</span>
                </div>
                <p className="text-sm text-gray-700">Recognized for holistic excellence in academics, leadership, and character (Top 150 ACET performance).</p>
              </div>
            </section>

            {/* Skills */}
            <section className="avoid-break">
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 text-gray-900">Skills</h2>
              <div className="text-sm text-gray-700">
                <p className="mb-1"><span className="font-bold">Technical:</span> Excel, Google Suite & Apps Script, Java, Python, Javascript, HTML/CSS, SQLite, MongoDB, PowerBI</p>
                <p><span className="font-bold">Languages:</span> English, Tagalog, Mandarin, Fookien</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};