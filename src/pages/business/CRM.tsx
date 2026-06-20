import { PageHeader } from '@/components/layout/AppLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Table } from '@/components/ui/Table';
import { Callout } from '@/components/ui/Callout';
import { crmData } from '@/data/mockData';
import { Plus, Users, UserCheck, AlertTriangle, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

const levelMap = {
  S: { label: 'S 级', type: 'ai' as const },
  A: { label: 'A 级', type: 'safe' as const },
  B: { label: 'B 级', type: 'medium' as const },
};

function churnBarColor(risk: number) {
  if (risk > 60) return 'bg-warn';
  if (risk >= 40) return 'bg-amber';
  return 'bg-ok';
}

function churnTextColor(risk: number) {
  if (risk > 60) return 'text-warn';
  if (risk >= 40) return 'text-amber';
  return 'text-ok';
}

export default function CRM() {
  const d = crmData;

  return (
    <div className="space-y-5">
      <PageHeader
        title="客户管理"
        subtitle="客户画像、流失预警与智能挽回"
        action={<Button variant="primary"><Plus className="w-4 h-4" />新增客户</Button>}
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted">客户总数</span>
            <Users className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-bold font-mono text-ink">{d.stats.total}</div>
        </Card>
        <Card hover>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted">活跃客户</span>
            <UserCheck className="w-4 h-4 text-ok" />
          </div>
          <div className="text-2xl font-bold font-mono text-ok">{d.stats.active}</div>
        </Card>
        <Card hover variant="leftBar" barColor="warn">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted">流失风险客户</span>
            <AlertTriangle className="w-4 h-4 text-warn" />
          </div>
          <div className="text-2xl font-bold font-mono text-warn">{d.stats.churnRisk}</div>
        </Card>
        <Card hover>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted">本月新增</span>
            <UserPlus className="w-4 h-4 text-accent2" />
          </div>
          <div className="text-2xl font-bold font-mono text-ink">{d.stats.monthNew}</div>
        </Card>
      </div>

      {/* 客户列表 */}
      <Card>
        <CardHeader title="客户列表" subtitle="客户交易与流失风险评估" action={<Button variant="secondary" size="sm">导出</Button>} />
        <Table
          columns={[
            { key: 'name', title: '客户名称', render: (r) => <span className="font-medium text-ink">{r.name}</span> },
            { key: 'contact', title: '联系人' },
            { key: 'lastOrder', title: '最近下单', width: '120px' },
            { key: 'totalAmount', title: '累计金额(万)', align: 'right', render: (r) => <span className="font-mono font-semibold">{r.totalAmount.toFixed(1)}</span> },
            {
              key: 'churnRisk', title: '流失风险', align: 'center',
              render: (r) => (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-20 h-1.5 bg-rule rounded-full overflow-hidden">
                    <div className={cn('h-full rounded-full', churnBarColor(r.churnRisk))} style={{ width: `${r.churnRisk}%` }} />
                  </div>
                  <span className={cn('text-xs font-mono font-semibold', churnTextColor(r.churnRisk))}>{r.churnRisk}%</span>
                </div>
              ),
            },
            {
              key: 'level', title: '等级', align: 'center',
              render: (r) => {
                const l = levelMap[r.level as keyof typeof levelMap];
                return <Tag type={l.type}>{l.label}</Tag>;
              },
            },
          ]}
          data={d.customers}
          rowKey={(r) => r.id}
          rowClassName={(r) => (r.churnRisk > 60 ? 'bg-warn-soft/20' : '')}
        />
      </Card>

      {/* AI 挽回话术 */}
      <Callout variant="ai" title="智擎 AI · 客户挽回话术（东方零售 · 流失风险 72%）">
        <p className="leading-relaxed">{d.retentionScript}</p>
        <div className="flex items-center gap-2 mt-4">
          <Button size="sm" variant="primary">一键外呼</Button>
          <Button size="sm" variant="secondary">复制话术</Button>
        </div>
      </Callout>
    </div>
  );
}
