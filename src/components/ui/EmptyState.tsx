import React from 'react';

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
          <Icon size={24} className="text-white/30" />
        </div>
      )}
      <p className="text-white/70 font-semibold text-base mb-1">{title}</p>
      {description && <p className="text-white/40 text-sm max-w-xs">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
