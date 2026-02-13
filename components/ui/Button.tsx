import { forwardRef, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#12f987] text-[#0a1f1a] ring-1 ring-[#0fd978]/20 hover:bg-[#0ed978] hover:ring-[#0fd978]/35 shadow-[0_16px_30px_-18px_rgba(10,31,26,0.65)]',
  secondary:
    'bg-white text-[#18372e] ring-1 ring-[#bdd0c8] hover:bg-[#eef5f2] hover:ring-[#9ab9ad] shadow-[0_10px_25px_-22px_rgba(10,31,26,0.7)]',
  ghost: 'bg-transparent text-[#27443b] hover:bg-[#e9f2ee]'
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-base'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={`inline-flex items-center justify-center rounded-xl font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  )
);

Button.displayName = 'Button';
