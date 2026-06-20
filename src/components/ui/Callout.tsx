import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CalloutProps {
  variant?: 'info' | 'warn' | 'ok' | 'ai';
  title?: string;
  children: ReactNode;
  className?: string;
}

const variantMap = {
  info: { bar: 'border-l-accent', bg: 'bg-accent-soft/40', title: 'text-accent' },
  warn: { bar: 'border-l-warn', bg: 'bg-warn-soft/40', title: 'text-warn' },
  ok: { bar: 'border-l-ok', bg: 'bg-ok-soft/40', title: 'text-ok' },
  ai: { bar: 'border-l-accent', bg: 'bg-ai-gradient', title: 'text-white' },
};

export function Callout({ variant = 'info', title, children, className }: CalloutProps) {
  const v = variantMap[variant];
  const isAi = variant === 'ai';
  return (
    <div
      className={cn(
        'border-l-4 rounded-r-card-sm p-4',
        v.bar,
        v.bg,
        isAi && 'text-dark-ink',
        className,
      )}
    >
      {title && (
        <div className={cn('font-semibold mb-1.5 flex items-center gap-1.5', isAi ? 'text-white' : v.title)}>
          {isAi && <span className="text-accent2">✦</span>}
          {title}
        </div>
      )}
      <div className={cn('text-sm leading-relaxed', isAi ? 'text-dark-ink' : 'text-ink')}>{children}</div>
    </div>
  );
}
