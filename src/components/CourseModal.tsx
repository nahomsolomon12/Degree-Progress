import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';
import type { Course, CourseStatus } from '../types';
import { CATEGORIES } from '../types';

interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: Course) => void;
}

const STATUS_OPTIONS: { value: CourseStatus; label: string }[] = [
  { value: 'not-started', label: 'Not started' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
];

function emptyCourse(): Course {
  return {
    id: crypto.randomUUID(),
    code: '',
    title: '',
    credits: 3,
    category: CATEGORIES[0],
    status: 'not-started',
  };
}

export function CourseModal({ course, isOpen, onClose, onSave }: CourseModalProps) {
  const [form, setForm] = useState<Course>(course ?? emptyCourse());

  useEffect(() => {
    if (isOpen) {
      setForm(course ?? emptyCourse());
    }
  }, [course, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-1)] p-5 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">{course ? 'Edit Course' : 'Add Course'}</h2>
              <button
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (!form.title.trim() || !form.code.trim()) return;
                onSave(form);
              }}
            >
              <div className="grid grid-cols-3 gap-3">
                <Field label="Code" className="col-span-1">
                  <input
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    className="input"
                    placeholder="C300"
                    required
                  />
                </Field>
                <Field label="Credits" className="col-span-2">
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={form.credits}
                    onChange={(e) => setForm({ ...form, credits: Number(e.target.value) || 0 })}
                    className="input"
                    required
                  />
                </Field>
              </div>

              <Field label="Course title">
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="input"
                  placeholder="Data Structures & Algorithms I"
                  required
                />
              </Field>

              <Field label="Category">
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="input"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as CourseStatus })}
                  className="input"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-[var(--border-hairline)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-2)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg px-4 py-2 text-xs font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-aqua))' }}
                >
                  {course ? 'Save Changes' : 'Add Course'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1 text-xs text-[var(--text-muted)] ${className}`}>
      {label}
      {children}
    </label>
  );
}
