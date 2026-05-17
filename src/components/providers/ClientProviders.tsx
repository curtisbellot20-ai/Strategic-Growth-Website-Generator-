'use client';
import { ToastProvider } from '@/lib/toast/toastContext';
import ToastContainer from '@/components/ui/Toast';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <ToastContainer />
    </ToastProvider>
  );
}
