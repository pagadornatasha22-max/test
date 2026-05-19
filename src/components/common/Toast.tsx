import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const bgColors = {
    success: 'bg-emerald-900/95 text-white border-emerald-700',
    error: 'bg-rose-950/95 text-white border-rose-800',
    info: 'bg-stone-900/95 text-white border-stone-700',
  };

  return (
    <div className={`pointer-events-auto flex items-center p-4 rounded-2xl shadow-xl border backdrop-blur-xs transition-all duration-300 animate-slide-up space-x-3 ${bgColors[toast.type]}`}>
      {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
      {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
      {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
      
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      
      <button
        onClick={() => onRemove(toast.id)}
        className="p-1 rounded-lg hover:bg-white/20 transition-colors"
      >
        <X className="w-4 h-4 text-white/80" />
      </button>
    </div>
  );
};
