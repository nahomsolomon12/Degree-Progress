import { GraduationCap, Plus, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onAddCourse: () => void;
  onReset: () => void;
}

export function Header({ onAddCourse, onReset }: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-[var(--border-hairline)] pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-aqua))' }}
        >
          <GraduationCap size={22} color="white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Degree Progress</h1>
          <p className="text-xs text-[var(--text-muted)]">B.S. Computer Science &middot; WGU</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--border-hairline)] px-3 py-2.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-2)] sm:flex-none sm:py-2"
        >
          <RotateCcw size={14} className="shrink-0" />
          <span className="whitespace-nowrap">Reset to defaults</span>
        </button>
        <button
          onClick={onAddCourse}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-900/20 transition-transform hover:scale-[1.03] active:scale-[0.98] sm:flex-none sm:py-2"
          style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-aqua))' }}
        >
          <Plus size={14} className="shrink-0" />
          <span className="whitespace-nowrap">Add Course</span>
        </button>
      </div>
    </header>
  );
}
