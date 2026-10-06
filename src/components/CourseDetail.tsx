import { ArrowLeft, Check, Circle, ListChecks } from 'lucide-react';
import { CHECKLIST_ITEMS } from '../data/courseChecklist';
import type { Course, CourseChecklist } from '../types';

interface CourseDetailProps {
  course: Course;
  checklist: CourseChecklist;
  onToggleChecklist: (courseId: string, itemIndex: number) => void;
  onCompleteCourse: (courseId: string, completed: boolean) => void;
  onBack: () => void;
}

export function CourseDetail({
  course,
  checklist,
  onToggleChecklist,
  onCompleteCourse,
  onBack,
}: CourseDetailProps) {
  const checklistComplete = CHECKLIST_ITEMS.every((_, index) => checklist[index] === true);

  return (
    <main className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-1)] p-5 sm:p-7">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-xs font-medium text-[var(--text-muted)] hover:text-white"
      >
        <ArrowLeft size={15} />
        Back to course plan
      </button>

      <div className="mb-6 flex flex-col gap-3 border-b border-[var(--border-hairline)] pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded bg-[var(--surface-2)] px-1.5 py-0.5 font-mono text-xs text-[var(--text-muted)]">
              {course.code}
            </span>
            <span className="text-xs text-[var(--text-muted)]">{course.credits} credits</span>
          </div>
          <h1 className="text-xl font-semibold text-white">{course.title}</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">{course.category}</p>
        </div>
        <div className="rounded-lg bg-[var(--surface-2)] px-3 py-2 text-xs text-[var(--text-secondary)]">
          {Object.values(checklist).filter(Boolean).length}/{CHECKLIST_ITEMS.length} steps complete
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {CHECKLIST_ITEMS.map((item, index) => {
          const checked = checklist[index] === true;
          return (
            <label
              key={item}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                checked
                  ? 'border-[var(--accent-aqua)]/40 bg-[var(--accent-aqua)]/10'
                  : 'border-[var(--border-hairline)] bg-[var(--surface-2)] hover:border-[var(--accent-blue)]/60'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleChecklist(course.id, index)}
                className="sr-only"
              />
              <span className={checked ? 'text-[var(--accent-aqua)]' : 'text-[var(--text-muted)]'}>
                {checked ? <Check size={18} /> : <Circle size={18} />}
              </span>
              <span className={`text-sm leading-relaxed ${checked ? 'text-[var(--text-secondary)] line-through' : 'text-white'}`}>
                <span className="mr-2 text-xs text-[var(--text-muted)]">{index + 1}.</span>
                {item}
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-2)] p-4">
        <label className={`flex items-start gap-3 ${checklistComplete ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
          <input
            type="checkbox"
            checked={course.status === 'completed'}
            disabled={!checklistComplete}
            onChange={(event) => onCompleteCourse(course.id, event.target.checked)}
            className="sr-only"
          />
          <span
            className={
              course.status === 'completed'
                ? 'text-[var(--status-good)]'
                : checklistComplete
                  ? 'text-[var(--text-muted)]'
                  : 'text-[var(--status-neutral)]'
            }
          >
            {course.status === 'completed' ? <Check size={20} /> : <Circle size={20} />}
          </span>
          <span>
            <span className="flex items-center gap-2 text-sm font-semibold text-white">
              <ListChecks size={15} />
              Mark course complete
            </span>
            <span className="mt-1 block text-xs text-[var(--text-muted)]">
              {checklistComplete
                ? 'All study-plan steps are complete. Check this box to add the course credits to your progress.'
                : 'Complete every study-plan step before marking this course complete.'}
            </span>
          </span>
        </label>
      </div>
    </main>
  );
}
