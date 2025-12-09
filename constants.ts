import { UserProfile, LinkItem } from './types';

export const RESUME_CONTENT = `Keene Xander Y. Brigado
+63 905 236 7965 | brigadokeene@gmail.com | linkedin.com/in/keene-brigado | San Juan, Philippines

Education
Ateneo de Manila University
Bachelor of Science in Management Engineering
Coursework includes: Calculus, Business Management, Decision Science.
Quezon City, NCR (June 2029)

Grace Christian College (STEM - Engineering)
Top 4 in a batch of 100~ students; GPA: 96.17%, Honors class
Relevant Courses: AP Calculus, AP Statistics, AP Lit.
Quezon City, NCR (June 2025)

Leadership Experience
Ateneo Gabay 16th Scholars’ Week
Logistics Head (November 2025-Present)

Grace Robotics Team
Team Leader (2023-2025)
- Led a 10-member robotics team, winning 1st Place at FLL Philippines 2024, placing 7th at FLL Open Europe 2024, and placing 5th at FLL Philippines 2025.
- Directed the development of an AI-powered analytics app and a sensor-based automation system, applying data insights to improve real-world functionality.
- Organized project timelines and coordinated tasks across multiple technical subteams to ensure on-time delivery of competition requirements.

Herodotus Club
President (August 2024-May 2025)
- Led the school’s premier history and debate organization with 100+ members across Grades 7–12.
- Proposed new long-term initiatives to strengthen the organization’s future programs.
- Coordinated with 3+ student organizations to plan and deliver collaborative events.
Vice President (August 2023-May 2024)

Student Council
Cultural Chairman (August 2024-May 2025)
- Managed the trimestral bulletin board competition involving 600+ students across Grades 7–12.

Work Experience
Klick n Code
Owner & Founder (January 2021-Present)
- Developed analytics tools, web apps, and automation bots improving efficiency and engagement; delivered clear client communication and earned $3,000 within a total of 100 hours.

The Little Baker Kitchen
Web Solutions Engineer (June 2024-August 2025)
- Engineered a dynamic, responsive website featuring a content hub to streamline the customer journey.
- Optimized site functionality for lead generation, resulting in a 25% increase in inquiries and 35% growth in site traffic.

Amada Corporation
Data Processing Consultant (June 2025-July 2025)
- Designed and deployed automated data solutions, reducing payroll cycles by 97% (8 hours to 15 minutes).
- Developed ETL pipelines to standardize multi-format data and ensure audit-ready compliance with Philippine labor laws (13th-month pay).

Primer Group of Companies
Intern (Admin - Engineering dept.) (June 2025-July 2025)
- Automated reports with Google Apps Script, streamlining data collection and improving workflows, resulting in a 60% reduction in processing time.

General Experience
TEDxAteneoDeManilaU
Stakeholder Management Associate (November 2025-Present)

Ateneo Celadon
Recruitment & Secretariat Core + OSR Analyst | Celaball '26 (September 2025-Present)
Operations Core + OSR Analyst | Rose Sale '26 (September 2025-Present)
- Created the project’s pre-order website and managed all logistical trackers for inventory, sales, and distribution.
- Led onsite operations and produced a data-driven sustainability report to evaluate project impact.
Junior Analyst | Organization Strategies & Research Department (September 2025-Present)

Council of Organizations of Ateneo
Administrative Officer | Office of the Secretary-General (September 2025-Present)

SOBO
Co-Founder & Student Entrepreneur (April 2024-May 2024)
- Managed end-to-end operations for a pop-up retail stall selling food, beverages, and merchandise.
- Generated a PHP 50,000+ net profit in three days by driving high-volume sales.

Activities & Awards
Top 25 Semifinalist | Ateneo Challenge for Transformational Sustainability (October 2025)
- Selected as a top team nationwide for developing sustainability solutions in partnership with Nestlé.

Archer Achiever (May 2025)
- Recognized as a Top 100 Scorer on the DLSU College Admission Test.

Director’s List (March 2025)
- Recognized for holistic excellence in academics, leadership, and character, achieved as a top scholar with exceptional ACET performance (Top 150) and consistent extracurricular leadership.

Skills
Technical: Excel, Google Suite & Apps Script, Java, Python, Javascript, HTML/CSS, SQLite, MongoDB, PowerBI
Languages: English, Tagalog, Mandarin, Fookien`;

export const INITIAL_PROFILE: UserProfile = {
  name: "Keene Brigado",
  role: "Management Engineering Student & Developer",
  bio: "Currently pursuing a BS in Management Engineering at Ateneo de Manila University. I combine business acumen with technical expertise to build scalable web applications and intuitive user experiences.",
  avatarUrl: "", 
  theme: 'dark',
};

export const INITIAL_LINKS: LinkItem[] = [
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