import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastNotification: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success' || !toast.type;
          const isWarning = toast.type === 'warning';
          const isError = toast.type === 'error';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pointer-events-auto bg-[#FFFDF8] border border-[#E2D7C6] rounded-2xl p-4 shadow-xl flex items-start space-x-3.5 relative overflow-hidden"
            >
              {/* Left Color Accent Bar */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  isSuccess ? 'bg-[#15803D]' : isWarning ? 'bg-[#D97706]' : isError ? 'bg-[#B91C1C]' : 'bg-[#123B63]'
                }`} 
              />

              <div className="pl-1 shrink-0 pt-0.5">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#15803D]" />}
                {isWarning && <AlertCircle className="w-5 h-5 text-[#D97706]" />}
                {isError && <AlertCircle className="w-5 h-5 text-[#B91C1C]" />}
                {!isSuccess && !isWarning && !isError && <Info className="w-5 h-5 text-[#123B63]" />}
              </div>

              <div className="flex-1 min-w-0 pr-4">
                <h4 className="text-xs font-extrabold text-[#102A43] tracking-tight">{toast.title}</h4>
                <p className="text-xs text-[#5A6E7F] mt-0.5 leading-relaxed">{toast.message}</p>
              </div>

              <button
                onClick={() => onDismiss(toast.id)}
                className="text-[#5A6E7F] hover:text-[#102A43] p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
