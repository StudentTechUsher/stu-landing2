import type { HTMLAttributes } from 'react';

export type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export const Badge = ({ className = '', children, ...props }: BadgeProps) => (
  <span
    className={`inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 ${className}`}
    {...props}
  >
    {children}
  </span>
);
