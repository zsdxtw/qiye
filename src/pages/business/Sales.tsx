import { PageHeader } from '@/components/layout/AppLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Table } from '@/components/ui/Table';
import { Chart } from '@/components/charts/Chart';
import { AICallout, AIHighlight } from '@/components/ai/AICallout';
import { salesData } from '@/data/mockData';
import { Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { EChartsOption } from 'echarts';

const statusMap = {
  '待发货': { label: '待发货', type: 'medium' as const },
  '已发货': { label: '已发货', type: 'ai' as const },
  '已签收': { label: '已签收', type: 'safe' as const },
};

export default function Sales() {
  const d = salesData;

  const channelOption: EChartsOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {c}万 ({d}%)' },
    legend: { bottom: 0, icon: 'circle' },
    series: [
      {
        type: 'pie',
        radius: ['40%', '68%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        label: { show: true, formatter: '{b}\n{d}%', fontSize: 11, color: '#5B6478' },
        labelLine: { length: 8, length2: 8 },
        data: d.channels.map((c, i) => ({
          name: c.name,
          value: c.amount,
          itemStyle: { color: ['#4F46E5', '#0EA5E9', '#16A37B', '#E08A1E'][i] },
        })),
      },
    ],
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="销售管理"
        subtitle="渠道分析、订单跟进与销售预测"
        action={<Button variant="primary"><Plus className="w-4 h-4" />新建销售单</Button>}
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover>
          <div className="text-xs text-muted mb-1">本月订单总数</div>
          <div className="text-2xl font-bold font-mono text-ink">{d.stats.totalOrders}</div>
        </Card>
        <Card hover>
          <div className="text-xs text-muted mb-1">本月销售金额</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-ink">{d.stats.monthAmount.toFixed(1)}</span>
            <span className="text-sm text-muted">万元</span>
          </div>
        </Card>
        <Card hover variant="leftBar" barColor="ok">
          <div className="text-xs text-muted mb-1">环比增长</div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold font-mono text-ok">+{d.stats.monthGrowth}%</span>
            <ArrowUpRight className="w-4 h-4 text-ok" />
          </div>
        </Card>
        <Card hover>
          <div className="text-xs text-muted mb-1">活跃客户数</div>
          <div className="text-2xl font-bold font-mono text-ink">{d.stats.customerCount}</div>
        </Card>
      </div>

      {/* 渠道分布 + 渠道明细 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3">
          <CardHeader title="渠道销售分布" subtitle="各渠道本月销售额与占比" action={<Tag type="ai">✦ AI 渠道洞察</Tag>} />
          <Chart option={channelOption} height={300} />
        </Card>

        <Card className="lg:col-span-2" variant="leftBar" barColor="accent">
          <CardHeader title="渠道明细" subtitle="渠道增长趋势对比" />
          <div className="space-y-3">
            {d.channels.map((c) => (
              <div key={c.name} className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-ink font-medium">{c.name}</div>
                  <div className="text-xs text-muted font-mono">{c.amount.toFixed(1)} 万 · 占比 {c.ratio}%</div>
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-semibold font-mono ${c.growth >= 0 ? 'text-ok' : 'text-warn'}`}>
                  {c.growth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {c.growth >= 0 ? '+' : ''}{c.growth}%
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI 销售预测 */}
      <AICallout title="智擎 AI · 销售预测">
        <p className="text-sm leading-relaxed mb-4">
          基于历史销售数据、渠道趋势与季节性因素，预测下月销售额为{' '}
          <span className="font-mono font-bold text-accent2">{d.forecast.nextMonth} 万元</span>
          ，置信度 {d.forecast.confidence}%。
        </p>
        <div className="flex flex-wrap items-end gap-y-3 pt-3 border-t border-white/10">
          <AIHighlight value={`${d.forecast.nextMonth}万`} label="下月预测销售额" tone="ok" />
          <AIHighlight value={`${d.forecast.confidence}%`} label="预测置信度" />
          <div className="flex flex-col">
            <span className="text-2xs text-dark-muted mb-1.5">关键影响因素</span>
            <div className="flex flex-wrap gap-1.5">
              {d.forecast.factors.map((f) => (
                <span key={f} className="text-2xs font-mono text-accent2 bg-accent/20 px-2 py-0.5 rounded">{f}</span>
              ))}
            </div>
          </div>
        </div>
      </AICallout>

      {/* 销售订单列表 */}
      <Card>
        <CardHeader title="销售订单" subtitle="本月销售订单明细" action={<Button variant="secondary" size="sm">导出</Button>} />
        <Table
          columns={[
            { key: 'id', title: '订单编号' },
            { key: 'customer', title: '客户' },
            { key: 'channel', title: '渠道' },
            { key: 'date', title: '日期', width: '120px' },
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
    </div>
  );
}
