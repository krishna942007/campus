import React from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

export type StatusBadgeVariant = 
  | 'OFFICIAL' 
  | 'AI_ADVISORY' 
  | 'ON_TRACK' 
  | 'ATTENTION' 
  | 'HIGH_RISK'
  | 'GOLD';

interface StatusBadgeProps {
  variant: StatusBadgeVariant;
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  variant,
  label,
  className = ''
}) => {
  switch (variant) {
    case 'OFFICIAL':
      return (
        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#E6F4ED] text-[#159A72] text-[10px] font-bold border border-[#159A72]/20 ${className}`}>
          <ShieldCheck className="w-3 h-3 text-[#159A72]" />
          <span>{label || 'OFFICIAL ERP RECORD'}</span>
        </span>
      );
    case 'AI_ADVISORY':
      return (
        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#EFE7D8] text-[#10253A] text-[10px] font-bold border border-[#C99632]/30 ${className}`}>
          <Sparkles className="w-3 h-3 text-[#C99632]" />
          <span>{label || 'AI GUIDANCE • ADVISORY'}</span>
        </span>
      );
    case 'ON_TRACK':
      return (
        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#E6F4ED] text-[#159A72] text-[10px] font-bold ${className}`}>
          <CheckCircle2 className="w-3 h-3 text-[#159A72]" />
          <span>{label || 'ON TRACK'}</span>
        </span>
      );
    case 'ATTENTION':
      return (
        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#C88A16] text-[10px] font-bold ${className}`}>
          <AlertTriangle className="w-3 h-3 text-[#C88A16]" />
          <span>{label || 'ATTENTION NEEDED'}</span>
        </span>
      );
    case 'HIGH_RISK':
      return (
        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#FEE2E2] text-[#C65353] text-[10px] font-bold ${className}`}>
          <AlertCircle className="w-3 h-3 text-[#C65353]" />
          <span>{label || 'HIGH RISK'}</span>
        </span>
      );
    case 'GOLD':
      return (
        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#C99632] text-white text-[10px] font-bold ${className}`}>
          <span>{label || 'PREMIUM'}</span>
        </span>
      );
    default:
      return null;
  }
};
