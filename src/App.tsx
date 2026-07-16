import { useEffect, useRef, useState } from 'react';
import { BadgeShelf } from './components/BadgeShelf';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { CelebrationToast, type ToastItem } from './components/CelebrationToast';
import { CourseBoard } from './components/CourseBoard';
import { CourseModal } from './components/CourseModal';
import { Header } from './components/Header';
import { StatsPanel } from './components/StatsPanel';
import { SEED_COURSES } from './data/courses';
import { useLocalStorage } from './hooks/useLocalStorage';
import { fireCelebration, fireConfetti } from './lib/confetti';
import { getBadges, getLevelInfo } from './lib/gamification';
import type { Course, CourseStatus } from './types';

const STATUS_ORDER: CourseStatus[] = ['not-started', 'in-progress', 'completed'];

function App() {
  const [courses, setCourses] = useLocalStorage<Course[]>('wgu-degree-courses', SEED_COURSES);
  const [modalCourse, setModalCourse] = useState<Course | null | undefined>(undefined);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const totalCredits = courses.reduce((s, c) => s + c.credits, 0);
  const completedCredits = courses.filter((c) => c.status === 'completed').reduce((s, c) => s + c.credits, 0);
  const inProgressCredits = courses.filter((c) => c.status === 'in-progress').reduce((s, c) => s + c.credits, 0);
  const overallPercent = totalCredits > 0 ? (completedCredits / totalCredits) * 100 : 0;

  const levelInfo = getLevelInfo(completedCredits);
  const badges = getBadges(courses, totalCredits);

  const prevLevel = useRef(levelInfo.level);
  const prevEarnedIds = useRef(new Set(badges.filter((b) => b.earned).map((b) => b.id)));
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      prevLevel.current = levelInfo.level;
      prevEarnedIds.current = new Set(badges.filter((b) => b.earned).map((b) => b.id));
      return;
    }

    const newToasts: ToastItem[] = [];

    if (levelInfo.level > prevLevel.current) {
      newToasts.push({
        id: `level-${levelInfo.level}-${Date.now()}`,
        title: `Level ${levelInfo.level} reached!`,
        subtitle: levelInfo.title,
      });
      fireConfetti();
    }
    prevLevel.current = levelInfo.level;

    const nowEarned = badges.filter((b) => b.earned);
    for (const badge of nowEarned) {
      if (!prevEarnedIds.current.has(badge.id)) {
        newToasts.push({
          id: `badge-${badge.id}-${Date.now()}`,
          title: `Badge unlocked: ${badge.label}`,
          subtitle: badge.description,
        });
        if (badge.id === 'degree-complete') {
          fireCelebration();
        } else {
          fireConfetti();
        }
      }
    }
    prevEarnedIds.current = new Set(nowEarned.map((b) => b.id));

    if (newToasts.length > 0) {
      setToasts((t) => [...t, ...newToasts]);
      newToasts.forEach((toast) => {
        setTimeout(() => {
          setToasts((t) => t.filter((x) => x.id !== toast.id));
        }, 4200);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelInfo.level, badges.map((b) => b.earned).join(',')]);

  function handleCycleStatus(id: string) {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const nextIndex = (STATUS_ORDER.indexOf(c.status) + 1) % STATUS_ORDER.length;
        return { ...c, status: STATUS_ORDER[nextIndex] };
      }),
    );
  }

  function handleSaveCourse(course: Course) {
    setCourses((prev) => {
      const exists = prev.some((c) => c.id === course.id);
      return exists ? prev.map((c) => (c.id === course.id ? course : c)) : [...prev, course];
    });
    setModalCourse(undefined);
  }

  function handleDeleteCourse(id: string) {
    if (!confirm('Delete this course? This cannot be undone.')) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }

  function handleReset() {
    if (!confirm('Reset all courses back to the default template? Your edits will be lost.')) return;
    setCourses(SEED_COURSES);
  }

  return (
    <div className="mx-auto flex min-h-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
      <Header onAddCourse={() => setModalCourse(null)} onReset={handleReset} />

      <StatsPanel
        levelInfo={levelInfo}
        completedCredits={completedCredits}
        inProgressCredits={inProgressCredits}
        totalCredits={totalCredits}
        overallPercent={overallPercent}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <BadgeShelf badges={badges} />
        </div>
        <div className="lg:col-span-3">
          <CategoryBreakdown courses={courses} />
        </div>
      </div>

      <CourseBoard
        courses={courses}
        onCycleStatus={handleCycleStatus}
        onEdit={(course) => setModalCourse(course)}
        onDelete={handleDeleteCourse}
      />

      <footer className="pb-4 pt-2 text-center text-xs text-[var(--text-muted)]">
        Progress is saved locally in your browser. Click a course's status icon to cycle it, or use the pencil to
        edit details.
      </footer>

      <CourseModal
        course={modalCourse ?? null}
        isOpen={modalCourse !== undefined}
        onClose={() => setModalCourse(undefined)}
        onSave={handleSaveCourse}
      />

      <CelebrationToast toasts={toasts} />
    </div>
  );
}

export default App;
