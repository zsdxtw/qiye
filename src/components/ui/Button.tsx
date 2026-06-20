import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variantMap = {
  primary: 'bg-accent text-white hover:bg-accent/90 shadow-sm',
  secondary: 'bg-bg2 text-ink border border-rule hover:bg-bg',
  text: 'text-accent hover:bg-accent-soft',
};

const sizeMap = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2 text-sm',
  lg: 'px-6 py-2.5 text-base',
};

export function Button({ variant = 'primary', size = 'md', children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-card-sm font-semibold transition-all duration-150',
        'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-1',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantMap[variant],
        sizeMap[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
