import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type TagType = 'high' | 'medium' | 'safe' | 'ai' | 'default';

interface TagProps {
  type?: TagType;
  children: ReactNode;
  className?: string;
}

const typeMap: Record<TagType, string> = {
  high: 'bg-warn-soft text-warn',
  medium: 'bg-amber-soft text-amber',
  safe: 'bg-ok-soft text-ok',
  ai: 'bg-accent-soft text-accent',
  default: 'bg-bg text-muted',
};

const labelMap: Record<TagType, string> = {
  high: 'P0 高危',
  medium: 'P1 关注',
  safe: 'P2 安全',
  ai: '✦ AI',
  default: '',
};

export function Tag({ type = 'default', children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded text-2xs font-mono font-semibold',
        typeMap[type],
        className,
      )}
    >
      {children ?? labelMap[type]}
    </span>
  );
}

export function RiskTag({ level }: { level: 'high' | 'medium' | 'resolved' }) {
  const config = {
    high: { type: 'high' as const, label: '● 高危' },
    medium: { type: 'medium' as const, label: '● 关注' },
    resolved: { type: 'safe' as const, label: '● 已解除' },
  };
  const c = config[level];
  return <Tag type={c.type}>{c.label}</Tag>;
}
