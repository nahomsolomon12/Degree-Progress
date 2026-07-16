import type { Course } from '../types';

// Filler / placeholder plan — edit freely to match your actual WGU BSCS degree plan.
// 34 courses, 117 total credits.
export const SEED_COURSES: Course[] = [
  // General Education — 8 courses, 26 credits
  { id: 'g100', code: 'G100', title: 'Composition: Academic Writing', credits: 3, category: 'General Education', status: 'completed' },
  { id: 'g110', code: 'G110', title: 'Composition: Advanced Writing', credits: 3, category: 'General Education', status: 'completed' },
  { id: 'g120', code: 'G120', title: 'Communication Foundations', credits: 3, category: 'General Education', status: 'completed' },
  { id: 'g130', code: 'G130', title: 'Quantitative Literacy', credits: 4, category: 'General Education', status: 'completed' },
  { id: 'g140', code: 'G140', title: 'Human Experience: Humanities', credits: 3, category: 'General Education', status: 'completed' },
  { id: 'g150', code: 'G150', title: 'Value & Ethics in the Digital Age', credits: 3, category: 'General Education', status: 'not-started' },
  { id: 'g160', code: 'G160', title: 'Natural Sciences Survey', credits: 4, category: 'General Education', status: 'not-started' },
  { id: 'g170', code: 'G170', title: 'Critical Thinking & Info Literacy', credits: 3, category: 'General Education', status: 'not-started' },

  // IT Fundamentals — 6 courses, 21 credits
  { id: 'f200', code: 'F200', title: 'IT Foundations', credits: 4, category: 'IT Fundamentals', status: 'in-progress' },
  { id: 'f210', code: 'F210', title: 'Networks & Security Fundamentals', credits: 4, category: 'IT Fundamentals', status: 'not-started' },
  { id: 'f220', code: 'F220', title: 'Business of IT — Applications', credits: 3, category: 'IT Fundamentals', status: 'not-started' },
  { id: 'f230', code: 'F230', title: 'Scripting & Programming Foundations', credits: 4, category: 'IT Fundamentals', status: 'not-started' },
  { id: 'f240', code: 'F240', title: 'Cloud Fundamentals', credits: 3, category: 'IT Fundamentals', status: 'not-started' },
  { id: 'f250', code: 'F250', title: 'Linux Foundations', credits: 3, category: 'IT Fundamentals', status: 'not-started' },

  // Core Computer Science — 16 courses, 54 credits
  { id: 'c300', code: 'C300', title: 'Data Structures & Algorithms I', credits: 4, category: 'Core Computer Science', status: 'not-started' },
  { id: 'c310', code: 'C310', title: 'Data Structures & Algorithms II', credits: 4, category: 'Core Computer Science', status: 'not-started' },
  { id: 'c320', code: 'C320', title: 'Discrete Mathematics', credits: 3, category: 'Core Computer Science', status: 'not-started' },
  { id: 'c330', code: 'C330', title: 'Object-Oriented Programming', credits: 4, category: 'Core Computer Science', status: 'not-started' },
  { id: 'c340', code: 'C340', title: 'Software Engineering Practices', credits: 3, category: 'Core Computer Science', status: 'not-started' },
  { id: 'c350', code: 'C350', title: 'Database Systems', credits: 3, category: 'Core Computer Science', status: 'not-started' },
  { id: 'c360', code: 'C360', title: 'Operating Systems Foundations', credits: 3, category: 'Core Computer Science', status: 'not-started' },
  { id: 'c370', code: 'C370', title: 'Computer Architecture', credits: 3, category: 'Core Computer Science', status: 'not-started' },
  { id: 'c380', code: 'C380', title: 'Web Development Foundations', credits: 3, category: 'Core Computer Science', status: 'not-started' },
  { id: 'c390', code: 'C390', title: 'Mobile Application Development', credits: 3, category: 'Core Computer Science', status: 'not-started' },
  { id: 'c400', code: 'C400', title: 'Algorithms & Complexity', credits: 4, category: 'Core Computer Science', status: 'not-started' },
  { id: 'c410', code: 'C410', title: 'Artificial Intelligence Foundations', credits: 4, category: 'Core Computer Science', status: 'not-started' },
  { id: 'c420', code: 'C420', title: 'Machine Learning Foundations', credits: 4, category: 'Core Computer Science', status: 'not-started' },
  { id: 'c430', code: 'C430', title: 'Systems Analysis & Design', credits: 3, category: 'Core Computer Science', status: 'not-started' },
  { id: 'c440', code: 'C440', title: 'Secure Software Design', credits: 3, category: 'Core Computer Science', status: 'not-started' },
  { id: 'c450', code: 'C450', title: 'Cloud Application Development', credits: 3, category: 'Core Computer Science', status: 'not-started' },

  // Capstone & Electives — 4 courses, 16 credits
  { id: 'p500', code: 'P500', title: 'Software Engineering Capstone I', credits: 4, category: 'Capstone & Electives', status: 'not-started' },
  { id: 'p510', code: 'P510', title: 'Software Engineering Capstone II', credits: 4, category: 'Capstone & Electives', status: 'not-started' },
  { id: 'p520', code: 'P520', title: 'IT Elective: Emerging Technologies', credits: 4, category: 'Capstone & Electives', status: 'not-started' },
  { id: 'p530', code: 'P530', title: 'Professional Portfolio & Career Prep', credits: 4, category: 'Capstone & Electives', status: 'not-started' },
];

export const TOTAL_CREDITS = SEED_COURSES.reduce((sum, c) => sum + c.credits, 0);
