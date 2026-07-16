import type { Course } from '../types';

export const CREDITS_PER_LEVEL = 15;

export const LEVEL_TITLES = [
  'Freshman Spark',
  'Code Cadet',
  'Logic Apprentice',
  'Systems Trainee',
  'Algorithm Adept',
  'Software Journeyman',
  'Architecture Ace',
  'Capstone Champion',
];

export interface LevelInfo {
  level: number;
  title: string;
  xpIntoLevel: number;
  xpForNextLevel: number;
  progressPct: number;
}

export function getLevelInfo(completedCredits: number): LevelInfo {
  const level = Math.floor(completedCredits / CREDITS_PER_LEVEL) + 1;
  const xpIntoLevel = completedCredits % CREDITS_PER_LEVEL;
  const title = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
  return {
    level,
    title,
    xpIntoLevel,
    xpForNextLevel: CREDITS_PER_LEVEL,
    progressPct: (xpIntoLevel / CREDITS_PER_LEVEL) * 100,
  };
}

export interface Badge {
  id: string;
  label: string;
  description: string;
  icon: string;
  earned: boolean;
}

export function getBadges(courses: Course[], totalCredits: number): Badge[] {
  const completed = courses.filter((c) => c.status === 'completed');
  const completedCredits = completed.reduce((s, c) => s + c.credits, 0);
  const pct = totalCredits > 0 ? (completedCredits / totalCredits) * 100 : 0;

  const byCategory = (category: string) => courses.filter((c) => c.category === category);
  const allDone = (category: string) => {
    const inCat = byCategory(category);
    return inCat.length > 0 && inCat.every((c) => c.status === 'completed');
  };

  return [
    {
      id: 'first-step',
      label: 'First Step',
      description: 'Complete your first course',
      icon: 'footprints',
      earned: completed.length >= 1,
    },
    {
      id: 'quarter',
      label: 'Quarter Century',
      description: 'Reach 25% of total credits',
      icon: 'trophy',
      earned: pct >= 25,
    },
    {
      id: 'halfway',
      label: 'Halfway Hero',
      description: 'Reach 50% of total credits',
      icon: 'flag',
      earned: pct >= 50,
    },
    {
      id: 'home-stretch',
      label: 'Home Stretch',
      description: 'Reach 75% of total credits',
      icon: 'rocket',
      earned: pct >= 75,
    },
    {
      id: 'gen-ed-grad',
      label: 'Gen Ed Grad',
      description: 'Finish all General Education courses',
      icon: 'book-open',
      earned: allDone('General Education'),
    },
    {
      id: 'it-foundations',
      label: 'IT Foundations Set',
      description: 'Finish all IT Fundamentals courses',
      icon: 'server',
      earned: allDone('IT Fundamentals'),
    },
    {
      id: 'core-conqueror',
      label: 'Core Conqueror',
      description: 'Finish all Core Computer Science courses',
      icon: 'cpu',
      earned: allDone('Core Computer Science'),
    },
    {
      id: 'degree-complete',
      label: 'Degree Complete',
      description: 'Finish 100% of your credits',
      icon: 'graduation-cap',
      earned: pct >= 100,
    },
  ];
}
