'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useToast, ToastItem, ToastVariant } from '@/lib/toast/toastContext';

const ICONS: Record<ToastVariant, React.ElementType> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const COLORS: Record<ToastVariant, string> = {
  success: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  error: 'text-red-400 border-red-500/30 bg-red-500/10',
  warning: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  info: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
};

function ToastCard({ item }: { item: ToastItem }) {
  const { dismiss } = useToast();
  const Icon = ICONS[item.variant];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`flex items-start gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl min-w-[280px] max-w-[380px] ${COLORS[item.variant]}`}
    >
      <Icon size={18} className="mt-0.5 shrink-0" />
      <p className="flex-1 text-sm font-medium text-white/90 leading-snug">{item.message}</p>
      <button
        onClick={() => dismiss(item.id)}
        className="text-white/40 hover:text-white/80 transition-colors mt-0.5 shrink-0"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

export default function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastCard item={t} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
