import { PageHeader } from '@/components/layout/AppLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Table } from '@/components/ui/Table';
import { Chart } from '@/components/charts/Chart';
import { receivableData } from '@/data/mockData';
import { ArrowUpRight, ArrowDownRight, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EChartsOption } from 'echarts';

export default function Receivable() {
  const d = receivableData;

  const agingOption: EChartsOption = {
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, icon: 'circle' },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        label: { show: true, formatter: '{b}\n{c}万', fontSize: 11, color: '#5B6478' },
        labelLine: { length: 8, length2: 8 },
        data: Object.entries(d.agingDistribution).map(([name, value], i) => ({
          name,
          value,
          itemStyle: {
            color: ['#16A37B', '#0EA5E9', '#E08A1E', '#E0584C'][i],
          },
        })),
      },
    ],
  };

  const heatmapOption: EChartsOption = {
    tooltip: {
      position: 'top',
      formatter: (p) => {
        const v = p.value as number[];
        return `${d.heatmap.customers[v[1]]}<br/>${d.heatmap.periods[v[0]]}: ${v[2]} 万`;
      },
    },
    grid: { top: 10, right: 20, bottom: 60, left: 90 },
    xAxis: {
      type: 'category',
      data: d.heatmap.periods,
      splitArea: { show: true },
      axisLabel: { color: '#5B6478', fontSize: 11 },
      axisLine: { lineStyle: { color: '#E3E7F0' } },
    },
    yAxis: {
      type: 'category',
      data: d.heatmap.customers,
      splitArea: { show: true },
      axisLabel: { color: '#5B6478', fontSize: 11 },
      axisLine: { lineStyle: { color: '#E3E7F0' } },
    },
    visualMap: {
      min: 0,
      max: 70,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      inRange: { color: ['#EEF0FE', '#4F46E5', '#E0584C'] },
      textStyle: { color: '#5B6478', fontSize: 11 },
    },
    series: [
      {
        type: 'heatmap',
        data: d.heatmap.data.flatMap((row, i) =>
          row.map((v, j) => [j, i, v]),
        ),
        label: { show: true, formatter: (p) => String((p.value as number[])[2] || ''), fontSize: 10, color: '#0E1525' },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.3)' } },
      },
    ],
  };

  return (
    <div className="space-y-5">
      <PageHeader title="应收应付" subtitle="账龄分布、回款概率预测与催收建议" />

      {/* 总额卡片 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card variant="leftBar" barColor="ok">
          <div className="text-xs text-muted mb-1">应收总额</div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-2xl font-bold font-mono text-ink">{d.summary.receivable}</span>
            <span className="text-sm text-muted">万元</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-warn font-semibold">
            <ArrowUpRight className="w-3 h-3" />
            {d.summary.receivableChange}
          </div>
        </Card>
        <Card variant="leftBar" barColor="amber">
          <div className="text-xs text-muted mb-1">应付总额</div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-2xl font-bold font-mono text-ink">{d.summary.payable}</span>
            <span className="text-sm text-muted">万元</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-ok font-semibold">
            <ArrowDownRight className="w-3 h-3" />
            {d.summary.payableChange}
          </div>
        </Card>
        <Card variant="leftBar" barColor="accent">
          <div className="text-xs text-muted mb-1">净应收</div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-2xl font-bold font-mono text-ink">{(d.summary.receivable - d.summary.payable).toFixed(1)}</span>
            <span className="text-sm text-muted">万元</span>
          </div>
          <div className="text-xs text-muted">应收 - 应付</div>
        </Card>
      </div>

      {/* 账龄分布 + 热力图 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader title="账龄分布" subtitle="应收账款按账期划分" />
          <Chart option={agingOption} height={280} />
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader title="账龄动态热力图" subtitle="客户 × 账期 金额矩阵（万元）" action={<Tag type="ai">✦ AI 风险识别</Tag>} />
          <Chart option={heatmapOption} height={320} />
        </Card>
      </div>

      {/* 高风险应收清单 */}
      <Card variant="leftBar" barColor="warn">
        <CardHeader
          title="高风险应收清单"
          subtitle="回款概率低于 50% 的应收账款，建议优先催收"
          action={<Tag type="high">需人工确认</Tag>}
        />
        <Table
          columns={[
            { key: 'customer', title: '客户' },
            { key: 'amount', title: '应收金额(万)', align: 'right', render: (r) => <span className="font-mono font-semibold text-warn">{r.amount.toFixed(1)}</span> },
            { key: 'overdue', title: '逾期天数', align: 'center', render: (r) => <span className="font-mono">{r.overdue} 天</span> },
            {
              key: 'recoveryRate', title: '回款概率', align: 'center',
              render: (r) => (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-16 h-1.5 bg-rule rounded-full overflow-hidden">
                    <div
                      className={cn('h-full rounded-full', r.recoveryRate < 50 ? 'bg-warn' : 'bg-amber')}
                      style={{ width: `${r.recoveryRate}%` }}
                    />
                  </div>
                  <span className={cn('text-xs font-mono font-semibold', r.recoveryRate < 50 ? 'text-warn' : 'text-amber')}>
                    {r.recoveryRate}%
                  </span>
                </div>
              ),
            },
            {
              key: 'action', title: '操作', align: 'right',
              render: () => (
                <div className="flex items-center gap-2 justify-end">
                  <Button size="sm" variant="primary"><Phone className="w-3 h-3" />一键催收</Button>
                </div>
              ),
            },
          ]}
          data={d.highRisk}
          rowKey={(r) => r.customer}
          rowClassName={(r) => r.recoveryRate < 50 ? 'bg-warn-soft/20' : ''}
        />
      </Card>
    </div>
  );
}
