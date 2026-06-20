import { PageHeader } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tag, RiskTag } from '@/components/ui/Tag';
import { riskData } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { AlertTriangle, ShieldCheck, TrendingDown, Clock } from 'lucide-react';

type RiskLevel = 'high' | 'medium' | 'resolved';
type RiskItem = {
  id: string;
  level: RiskLevel;
  title: string;
  time: string;
  description: string;
  analysis: string;
  impact: string;
  actions: { label: string; type: 'primary' | 'secondary' }[];
};

export default function RiskCenter() {
  const { counts, items } = riskData;

  return (
    <div className="space-y-5">
      <PageHeader
        title="风险预警中心"
        subtitle="AI 实时监测经营数据，自动识别并分级推送风险信号"
        action={
          <div className="flex items-center gap-2">
            <Tag type="high">高危 {counts.high}</Tag>
            <Tag type="medium">关注 {counts.medium}</Tag>
            <Tag type="safe">已解除 {counts.resolved}</Tag>
          </div>
        }
      />

      <div className="space-y-4">
        {items.map((risk) => (
          <RiskCard key={risk.id} risk={risk} />
        ))}
      </div>
    </div>
  );
}

function RiskCard({ risk }: { risk: RiskItem }) {
  const isHigh = risk.level === 'high';
  const isMedium = risk.level === 'medium';
  const isResolved = risk.level === 'resolved';

  return (
    <Card
      className={cn(
        'animate-slide-in-right',
        isHigh && 'bg-risk-high text-dark-ink border-0',
        isMedium && 'bg-risk-medium text-dark-ink border-0',
        isResolved && 'opacity-70',
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {isHigh && <AlertTriangle className="w-5 h-5 text-warn" />}
          {isMedium && <TrendingDown className="w-5 h-5 text-amber" />}
          {isResolved && <ShieldCheck className="w-5 h-5 text-ok" />}
          <h3 className={cn('text-h3', (isHigh || isMedium) && 'text-white')}>{risk.title}</h3>
          <RiskTag level={risk.level} />
        </div>
        <div className={cn('flex items-center gap-1 text-2xs font-mono', (isHigh || isMedium) ? 'text-dark-muted' : 'text-muted')}>
          <Clock className="w-3 h-3" />
          {risk.time}
        </div>
      </div>

      <p className={cn('text-sm mb-4', (isHigh || isMedium) ? 'text-dark-ink' : 'text-ink')}>{risk.description}</p>

      <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 rounded-card-sm', (isHigh || isMedium) ? 'bg-white/5' : 'bg-bg')}>
        <div>
          <div className={cn('text-2xs font-mono font-semibold uppercase mb-1.5 flex items-center gap-1', (isHigh || isMedium) ? 'text-accent2' : 'text-accent')}>
            <span>✦</span> 归因分析
          </div>
          <p className={cn('text-xs leading-relaxed', (isHigh || isMedium) ? 'text-dark-ink' : 'text-muted')}>{risk.analysis}</p>
        </div>
        <div>
          <div className={cn('text-2xs font-mono font-semibold uppercase mb-1.5 flex items-center gap-1', (isHigh || isMedium) ? 'text-amber' : 'text-amber')}>
            <span>⚠</span> 影响测算
          </div>
          <p className={cn('text-xs leading-relaxed', (isHigh || isMedium) ? 'text-dark-ink' : 'text-muted')}>{risk.impact}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {risk.actions.map((a, i) => (
          <Button key={i} variant={a.type === 'primary' ? 'primary' : 'secondary'} size="sm">
            {a.label}
          </Button>
        ))}
        {!isResolved && (
          <span className={cn('ml-auto text-2xs font-mono', (isHigh || isMedium) ? 'text-dark-muted' : 'text-muted')}>
            需人工确认
          </span>
        )}
      </div>
    </Card>
  );
}
