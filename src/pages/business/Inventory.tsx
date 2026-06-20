import { PageHeader } from '@/components/layout/AppLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Table } from '@/components/ui/Table';
import { Chart } from '@/components/charts/Chart';
import { AISuggestion } from '@/components/ai/AICallout';
import { inventoryData } from '@/data/mockData';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EChartsOption } from 'echarts';

const statusMap = {
  normal: { label: '正常', type: 'safe' as const },
  slow: { label: '滞销', type: 'high' as const },
  expiring: { label: '临期', type: 'medium' as const },
};

export default function Inventory() {
  const d = inventoryData;

  const topItems = [...d.items].sort((a, b) => b.value - a.value).slice(0, 6);

  const topValueOption: EChartsOption = {
    tooltip: { trigger: 'axis', formatter: '{b}: {c} 万' },
    grid: { top: 20, right: 16, bottom: 70, left: 48, containLabel: true },
    xAxis: {
      type: 'category',
      data: topItems.map((i) => i.name),
      axisLabel: { color: '#5B6478', fontSize: 10, rotate: 30, interval: 0 },
      axisLine: { lineStyle: { color: '#E3E7F0' } },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#E3E7F0', type: 'dashed' } },
      axisLabel: { color: '#5B6478' },
    },
    series: [
      {
        type: 'bar',
        data: topItems.map((i) => ({
          value: i.value,
          itemStyle: {
            color: i.status === 'slow' ? '#E0584C' : i.status === 'expiring' ? '#E08A1E' : '#4F46E5',
            borderRadius: [4, 4, 0, 0],
          },
        })),
        barWidth: '50%',
      },
    ],
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="库存管理"
        subtitle="库存周转、滞销预警与智能补货建议"
        action={<Button variant="primary"><Plus className="w-4 h-4" />新增盘点</Button>}
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover>
          <div className="text-xs text-muted mb-1">库存总价值</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-ink">{d.stats.totalValue.toFixed(1)}</span>
            <span className="text-sm text-muted">万元</span>
          </div>
        </Card>
        <Card hover>
          <div className="text-xs text-muted mb-1">库存周转率</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-ink">{d.stats.turnover}</span>
            <span className="text-sm text-muted">次/年</span>
          </div>
        </Card>
        <Card hover variant="leftBar" barColor="warn">
          <div className="text-xs text-muted mb-1">滞销库存金额</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-warn">{d.stats.slowAmount.toFixed(1)}</span>
            <span className="text-sm text-muted">万元</span>
          </div>
        </Card>
        <Card hover variant="leftBar" barColor="amber">
          <div className="text-xs text-muted mb-1">临期库存金额</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-amber">{d.stats.expiringAmount.toFixed(1)}</span>
            <span className="text-sm text-muted">万元</span>
          </div>
        </Card>
      </div>

      {/* 库存明细 + 价值排行 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3">
          <CardHeader title="库存明细" subtitle="SKU 库存与可售天数" action={<Button variant="secondary" size="sm">盘点</Button>} />
          <Table
            columns={[
              { key: 'sku', title: 'SKU', width: '90px', render: (r) => <span className="font-mono text-xs text-accent">{r.sku}</span> },
              { key: 'name', title: '商品名称' },
              { key: 'stock', title: '库存', align: 'right', render: (r) => <span className="font-mono">{r.stock.toLocaleString()} {r.unit}</span> },
              {
                key: 'daysAvailable', title: '可售天数', align: 'center',
                render: (r) => (
                  <span className={cn('font-mono font-semibold', r.daysAvailable > 60 ? 'text-warn' : r.daysAvailable < 25 ? 'text-amber' : 'text-ink')}>
                    {r.daysAvailable} 天
                  </span>
                ),
              },
              { key: 'value', title: '价值(万)', align: 'right', render: (r) => <span className="font-mono font-semibold">{r.value.toFixed(1)}</span> },
              {
                key: 'status', title: '状态', align: 'center',
                render: (r) => { const s = statusMap[r.status]; return <Tag type={s.type}>{s.label}</Tag>; },
              },
            ]}
            data={d.items}
            rowKey={(r) => r.sku}
            rowClassName={(r) => (r.status === 'slow' ? 'bg-warn-soft/20' : r.status === 'expiring' ? 'bg-amber-soft/20' : '')}
          />
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="高价值库存 TOP6" subtitle="按库存价值排序（万元）" />
          <Chart option={topValueOption} height={320} />
        </Card>
      </div>

      {/* AI 补货建议 */}
      <Card variant="leftBar" barColor="accent">
        <CardHeader title="AI 智能补货建议" subtitle="基于消耗速率、销售预测与安全库存" action={<Tag type="ai">✦ AI</Tag>} />
        <div>
          {d.aiRestock.map((item) => (
            <AISuggestion
              key={item.sku}
              title={`${item.name}（${item.sku}）`}
              desc={`${item.reason}。当前库存 ${item.current.toLocaleString()}，建议补货至 ${item.suggested.toLocaleString()}。`}
              agent="库存 Agent"
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
