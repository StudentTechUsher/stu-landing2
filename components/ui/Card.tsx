import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
  footer?: ReactNode;
}

export const Card = ({ header, footer, className = '', children, ...props }: CardProps) => {
  return (
    <article
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${className}`}
      {...props}
    >
      {header ? <div className="mb-4 border-b border-slate-100 pb-4">{header}</div> : null}
      <div>{children}</div>
      {footer ? <div className="mt-4 border-t border-slate-100 pt-4">{footer}</div> : null}
    </article>
  );
};
