import { PageHeader } from '@/components/layout/AppLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Table } from '@/components/ui/Table';
import { AISuggestion } from '@/components/ai/AICallout';
import { purchaseData } from '@/data/mockData';
import { Plus, Package, Clock, Users } from 'lucide-react';

const statusMap = {
  '待审批': { label: '待审批', type: 'high' as const },
  '已下单': { label: '已下单', type: 'ai' as const },
  '已收货': { label: '已收货', type: 'safe' as const },
  '已付款': { label: '已付款', type: 'default' as const },
};

export default function Purchase() {
  const d = purchaseData;

  return (
    <div className="space-y-5">
      <PageHeader
        title="采购管理"
        subtitle="采购订单、供应商协同与智能议价建议"
        action={<Button variant="primary"><Plus className="w-4 h-4" />新建采购单</Button>}
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted">本月订单总数</span>
            <Package className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-bold font-mono text-ink">{d.stats.totalOrders}</div>
        </Card>
        <Card hover>
          <div className="text-xs text-muted mb-1">本月采购金额</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-ink">{d.stats.monthAmount.toFixed(1)}</span>
            <span className="text-sm text-muted">万元</span>
          </div>
        </Card>
        <Card hover variant="leftBar" barColor="warn">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted">待审批订单</span>
            <Clock className="w-4 h-4 text-warn" />
          </div>
          <div className="text-2xl font-bold font-mono text-warn">{d.stats.pendingApproval}</div>
        </Card>
        <Card hover>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted">合作供应商</span>
            <Users className="w-4 h-4 text-accent2" />
          </div>
          <div className="text-2xl font-bold font-mono text-ink">{d.stats.supplierCount}</div>
        </Card>
      </div>

      {/* 采购订单列表 */}
      <Card>
        <CardHeader
          title="采购订单"
          subtitle="本月采购订单明细"
          action={<Button variant="secondary" size="sm">导出</Button>}
        />
        <Table
          columns={[
            { key: 'id', title: '订单编号' },
            { key: 'supplier', title: '供应商' },
            { key: 'date', title: '日期', width: '120px' },
            { key: 'items', title: '品项数', align: 'center', render: (r) => <span className="font-mono">{r.items}</span> },
            { key: 'amount', title: '金额(万)', align: 'right', render: (r) => <span className="font-mono font-semibold">{r.amount.toFixed(1)}</span> },
            {
              key: 'status', title: '状态', align: 'center',
              render: (r) => { const s = statusMap[r.status]; return <Tag type={s.type}>{s.label}</Tag>; },
            },
          ]}
          data={d.orders}
          rowKey={(r) => r.id}
        />
      </Card>

      {/* 供应商管理 + AI 建议 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3" variant="leftBar" barColor="accent">
          <CardHeader title="供应商管理" subtitle="核心供应商评级与履约情况" />
          <Table
            columns={[
              { key: 'name', title: '供应商' },
              {
                key: 'rating', title: '评级', align: 'center',
                render: (r) => <Tag type={r.rating === 'A' ? 'safe' : 'medium'}>{r.rating}级</Tag>,
              },
              { key: 'amount', title: '采购额(万)', align: 'right', render: (r) => <span className="font-mono font-semibold">{r.amount.toFixed(1)}</span> },
              {
                key: 'onTime', title: '准时率', align: 'center',
                render: (r) => (
                  <span className={r.onTime >= 90 ? 'text-ok font-mono font-semibold' : 'text-amber font-mono font-semibold'}>
                    {r.onTime}%
                  </span>
                ),
              },
            ]}
            data={d.suppliers}
            rowKey={(r) => r.name}
          />
        </Card>

        <Card className="lg:col-span-2" variant="leftBar" barColor="accent">
          <CardHeader title="AI 供应商优化建议" subtitle="基于采购历史与市场行情" action={<Tag type="ai">✦ AI</Tag>} />
          <div>
            {d.suppliers.map((s) => (
              <AISuggestion
                key={s.name}
                title={`${s.name} · ${s.rating}级供应商`}
                desc={s.aiSuggestion}
                agent="采购 Agent"
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
