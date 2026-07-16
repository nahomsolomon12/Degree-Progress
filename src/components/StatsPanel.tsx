import { motion } from 'framer-motion';
import type { LevelInfo } from '../lib/gamification';
import { ProgressRing } from './ProgressRing';

interface StatsPanelProps {
  levelInfo: LevelInfo;
  completedCredits: number;
  inProgressCredits: number;
  totalCredits: number;
  overallPercent: number;
}

export function StatsPanel({
  levelInfo,
  completedCredits,
  inProgressCredits,
  totalCredits,
  overallPercent,
}: StatsPanelProps) {
  const remaining = totalCredits - completedCredits - inProgressCredits;

  return (
    <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-1)] p-5">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <ProgressRing percent={overallPercent} completedCredits={completedCredits} totalCredits={totalCredits} size={168} />

        <div className="flex w-full flex-1 flex-col gap-4">
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Level {levelInfo.level}</span>
              <span className="text-xs tabular-nums text-[var(--text-muted)]">
                {levelInfo.xpIntoLevel} / {levelInfo.xpForNextLevel} XP
              </span>
            </div>
            <h3 className="mt-0.5 text-lg font-bold text-white">{levelInfo.title}</h3>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-aqua))' }}
                initial={{ width: 0 }}
                animate={{ width: `${levelInfo.progressPct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <StatChip label="Completed" value={completedCredits} color="var(--status-good)" />
            <StatChip label="In progress" value={inProgressCredits} color="var(--status-warning)" />
            <StatChip label="Remaining" value={remaining} color="var(--text-muted)" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatChip({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-xl bg-[var(--surface-2)] px-2 py-2.5">
      <div className="text-lg font-bold tabular-nums" style={{ color }}>
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">{label}</div>
    </div>
  );
}
