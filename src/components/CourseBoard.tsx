import { useMemo, useState } from 'react';
import type { Course, CourseStatus } from '../types';
import { CATEGORIES } from '../types';
import { CourseCard } from './CourseCard';

type Filter = 'all' | CourseStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'not-started', label: 'Not started' },
  { key: 'in-progress', label: 'In progress' },
  { key: 'completed', label: 'Completed' },
];

interface CourseBoardProps {
  courses: Course[];
  onCycleStatus: (id: string) => void;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

export function CourseBoard({ courses, onCycleStatus, onEdit, onDelete }: CourseBoardProps) {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? courses : courses.filter((c) => c.status === filter)),
    [courses, filter],
  );

  const grouped = useMemo(() => {
    return CATEGORIES.map((category) => ({
      category,
      courses: filtered.filter((c) => c.category === category),
    })).filter((g) => g.courses.length > 0);
  }, [filtered]);

  return (
    <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-1)] p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold tracking-wide text-white">Course Plan</h2>
        <div className="flex flex-wrap gap-1 rounded-lg bg-[var(--surface-2)] p-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                filter === f.key ? 'bg-[var(--accent-blue)] text-white' : 'text-[var(--text-muted)] hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {grouped.length === 0 && (
        <p className="py-8 text-center text-sm text-[var(--text-muted)]">No courses match this filter.</p>
      )}

      <div className="flex flex-col gap-6">
        {grouped.map((group) => (
          <div key={group.category}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              {group.category}
              <span className="ml-2 font-normal normal-case text-[var(--text-muted)]/70">
                ({group.courses.length})
              </span>
            </h3>
            <div className="flex flex-col gap-2">
              {group.courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onCycleStatus={onCycleStatus}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
