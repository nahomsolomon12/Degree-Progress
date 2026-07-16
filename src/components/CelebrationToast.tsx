import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export interface ToastItem {
  id: string;
  title: string;
  subtitle: string;
}

export function CelebrationToast({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex flex-col-reverse gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="flex items-center gap-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-1)] px-4 py-3 shadow-2xl"
            style={{ boxShadow: '0 8px 30px rgba(57, 135, 229, 0.25)' }}
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-aqua))' }}
            >
              <Sparkles size={16} color="white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{toast.title}</div>
              <div className="text-xs text-[var(--text-muted)]">{toast.subtitle}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
