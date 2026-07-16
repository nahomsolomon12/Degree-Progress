import { Check, Circle, Clock, Pencil, Trash2 } from 'lucide-react';
import type { Course, CourseStatus } from '../types';

const STATUS_ORDER: CourseStatus[] = ['not-started', 'in-progress', 'completed'];

const STATUS_META: Record<CourseStatus, { label: string; color: string; icon: typeof Check }> = {
  'not-started': { label: 'Not started', color: 'var(--text-muted)', icon: Circle },
  'in-progress': { label: 'In progress', color: 'var(--status-warning)', icon: Clock },
  completed: { label: 'Completed', color: 'var(--status-good)', icon: Check },
};

interface CourseCardProps {
  course: Course;
  onCycleStatus: (id: string) => void;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

export function CourseCard({ course, onCycleStatus, onEdit, onDelete }: CourseCardProps) {
  const meta = STATUS_META[course.status];
  const Icon = meta.icon;

  return (
    <div
      className="flex items-start gap-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-1)] p-3 transition-colors hover:bg-[var(--surface-2)] sm:gap-3"
      style={{ borderLeft: `3px solid ${meta.color}` }}
    >
      <button
        onClick={() => onCycleStatus(course.id)}
        title={`Mark as ${STATUS_ORDER[(STATUS_ORDER.indexOf(course.status) + 1) % STATUS_ORDER.length]}`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform active:scale-95 sm:hover:scale-110"
        style={{ backgroundColor: `${meta.color}22`, color: meta.color }}
      >
        <Icon size={16} />
      </button>

      <div className="min-w-0 flex-1 pt-1 sm:pt-0.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="shrink-0 rounded bg-[var(--surface-2)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
            {course.code}
          </span>
          <span className="break-words text-sm font-medium leading-snug text-white">{course.title}</span>
        </div>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
          <span>{course.credits} credits</span>
          <span>&middot;</span>
          <span style={{ color: meta.color }}>{meta.label}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          onClick={() => onEdit(course)}
          title="Edit course"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-0)] hover:text-white"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(course.id)}
          title="Delete course"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-0)] hover:text-[var(--status-critical)]"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
