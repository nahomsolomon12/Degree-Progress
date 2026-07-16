import { Check, CircleDashed, Clock } from 'lucide-react';
import type { Course } from '../types';
import { CATEGORIES } from '../types';

interface CategoryBreakdownProps {
  courses: Course[];
}

function summarize(courses: Course[], category: string) {
  const inCat = courses.filter((c) => c.category === category);
  const total = inCat.reduce((s, c) => s + c.credits, 0);
  const completed = inCat.filter((c) => c.status === 'completed').reduce((s, c) => s + c.credits, 0);
  const inProgress = inCat.filter((c) => c.status === 'in-progress').reduce((s, c) => s + c.credits, 0);
  const remaining = total - completed - inProgress;
  return { total, completed, inProgress, remaining };
}

export function CategoryBreakdown({ courses }: CategoryBreakdownProps) {
  const rows = CATEGORIES.map((category) => ({ category, ...summarize(courses, category) })).filter(
    (r) => r.total > 0,
  );

  return (
    <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-1)] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-white">Progress by Category</h2>
        <Legend />
      </div>
      <div className="flex flex-col gap-4">
        {rows.map((row) => (
          <div key={row.category}>
            <div className="mb-1.5 flex items-baseline justify-between text-xs">
              <span className="font-medium text-[var(--text-secondary)]">{row.category}</span>
              <span className="tabular-nums text-[var(--text-muted)]">
                {row.completed + row.inProgress} / {row.total} cr
              </span>
            </div>
            <div className="flex h-3.5 w-full gap-[2px] overflow-hidden rounded-full bg-[var(--surface-2)]">
              {row.completed > 0 && (
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(row.completed / row.total) * 100}%`, backgroundColor: 'var(--status-good)' }}
                  title={`Completed: ${row.completed} credits`}
                />
              )}
              {row.inProgress > 0 && (
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(row.inProgress / row.total) * 100}%`, backgroundColor: 'var(--status-warning)' }}
                  title={`In progress: ${row.inProgress} credits`}
                />
              )}
              {row.remaining > 0 && (
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(row.remaining / row.total) * 100}%`, backgroundColor: 'var(--surface-2)' }}
                  title={`Remaining: ${row.remaining} credits`}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)]">
      <span className="flex items-center gap-1">
        <Check size={12} style={{ color: 'var(--status-good)' }} /> Completed
      </span>
      <span className="flex items-center gap-1">
        <Clock size={12} style={{ color: 'var(--status-warning)' }} /> In progress
      </span>
      <span className="flex items-center gap-1">
        <CircleDashed size={12} className="text-[var(--text-muted)]" /> Remaining
      </span>
    </div>
  );
}
