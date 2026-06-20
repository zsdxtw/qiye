import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface AICalloutProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

/** AI 摘要卡片 - 深色渐变背景 */
export function AICallout({ children, className, title = '智擎 AI · 经营摘要' }: AICalloutProps) {
  return (
    <div className={cn('bg-ai-gradient rounded-card p-6 text-dark-ink relative overflow-hidden', className)}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-accent2 text-lg">✦</span>
          <span className="text-2xs font-mono font-semibold text-accent2 uppercase tracking-wider">{title}</span>
          <span className="ml-auto text-2xs text-dark-muted font-mono">● 实时</span>
        </div>
        <div className="text-dark-ink leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

interface AISuggestionProps {
  title: string;
  desc: string;
  impact?: string;
  agent?: string;
  onExecute?: () => void;
}

/** AI 建议项 - 左侧箭头 + 一键执行 */
export function AISuggestion({ title, desc, impact, agent, onExecute }: AISuggestionProps) {
  return (
    <div className="flex gap-3 py-3 border-b border-rule last:border-b-0">
      <span className="text-accent font-bold mt-0.5">▸</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-semibold text-ink">{title}</h4>
          {agent && (
            <span className="text-2xs font-mono text-accent bg-accent-soft px-1.5 py-0.5 rounded">
              {agent}
            </span>
          )}
        </div>
        <p className="text-xs text-muted leading-relaxed mb-2">{desc}</p>
        {impact && (
          <p className="text-xs text-ok font-medium mb-2">预期收益：{impact}</p>
        )}
        <button
          onClick={onExecute}
          className="text-xs text-accent font-semibold hover:underline"
        >
          一键执行 →
        </button>
      </div>
    </div>
  );
}

interface AIHighlightProps {
  value: string;
  label: string;
  tone?: 'ok' | 'warn' | 'amber' | 'default';
}

const toneMap = {
  ok: 'text-ok',
  warn: 'text-warn',
  amber: 'text-amber',
  default: 'text-white',
};

/** AI 摘要中的高亮数字 */
export function AIHighlight({ value, label, tone = 'default' }: AIHighlightProps) {
  return (
    <div className="inline-flex flex-col mr-4">
      <span className={cn('text-lg font-bold font-mono', toneMap[tone])}>{value}</span>
      <span className="text-2xs text-dark-muted">{label}</span>
    </div>
  );
}
