import { cn } from '@/lib/utils';
import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'leftBar';
  barColor?: 'accent' | 'warn' | 'ok' | 'amber';
  hover?: boolean;
}

const barColorMap = {
  accent: 'border-l-accent',
  warn: 'border-l-warn',
  ok: 'border-l-ok',
  amber: 'border-l-amber',
};

export function Card({ children, variant = 'default', barColor = 'accent', hover = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-bg2 border border-rule rounded-card p-5 shadow-card',
        variant === 'leftBar' && cn('border-l-4', barColorMap[barColor]),
        hover && 'card-hover cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-h3 text-ink">{title}</h3>
        {subtitle && <p className="text-xs text-muted mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
