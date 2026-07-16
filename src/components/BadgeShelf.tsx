import {
  BookOpen,
  Cpu,
  Flag,
  Footprints,
  GraduationCap,
  Rocket,
  Server,
  Trophy,
  type LucideIcon,
} from 'lucide-react';
import type { Badge } from '../lib/gamification';

const ICONS: Record<string, LucideIcon> = {
  footprints: Footprints,
  trophy: Trophy,
  flag: Flag,
  rocket: Rocket,
  'book-open': BookOpen,
  server: Server,
  cpu: Cpu,
  'graduation-cap': GraduationCap,
};

export function BadgeShelf({ badges }: { badges: Badge[] }) {
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-1)] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-white">Badges</h2>
        <span className="text-xs tabular-nums text-[var(--text-muted)]">
          {earnedCount} / {badges.length}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3">
        {badges.map((badge) => {
          const Icon = ICONS[badge.icon] ?? Trophy;
          return (
            <div
              key={badge.id}
              title={`${badge.label} — ${badge.description}`}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all ${
                badge.earned
                  ? 'border-[var(--accent-blue)]/40 bg-[var(--surface-2)]'
                  : 'border-[var(--border-hairline)] opacity-40 grayscale'
              }`}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                  background: badge.earned
                    ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-aqua))'
                    : 'var(--surface-2)',
                }}
              >
                <Icon size={18} color={badge.earned ? 'white' : 'var(--text-muted)'} />
              </div>
              <span className="text-[10px] font-medium leading-tight text-[var(--text-secondary)]">
                {badge.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
