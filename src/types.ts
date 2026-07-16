export type CourseStatus = 'completed' | 'in-progress' | 'not-started';

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  category: string;
  status: CourseStatus;
  notes?: string;
}

export const CATEGORIES = [
  'General Education',
  'IT Fundamentals',
  'Core Computer Science',
  'Capstone & Electives',
] as const;

export type Category = (typeof CATEGORIES)[number];
