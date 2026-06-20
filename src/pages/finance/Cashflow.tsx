import { PageHeader } from '@/components/layout/AppLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Chart } from '@/components/charts/Chart';
import { cashflowData } from '@/data/mockData';
import { Landmark, AlertTriangle, ArrowRight } from 'lucide-react';
import type { EChartsOption } from 'echarts';

export default function Cashflow() {
  const d = cashflowData;

  const forecastOption: EChartsOption = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['实际资金', 'AI 预测'] },
    xAxis: {
      type: 'category',
      data: d.forecast.months,
      axisLine: { lineStyle: { color: '#E3E7F0' } },
      axisLabel: { color: '#5B6478' },
    },
    yAxis: {
      type: 'value',
      name: '万元',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#E3E7F0', type: 'dashed' } },
      axisLabel: { color: '#5B6478' },
    },
    series: [
      {
        name: '实际资金',
        type: 'line',
        data: d.forecast.actual,
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { color: '#4F46E5', width: 3 },
        itemStyle: { color: '#4F46E5' },
        areaStyle: {
          color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
            { offset: 0, color: 'rgba(79,70,229,0.2)' },
            { offset: 1, color: 'rgba(79,70,229,0)' },
          ]},
        },
        connectNulls: false,
      },
      {
        name: 'AI 预测',
        type: 'line',
        data: d.forecast.predicted,
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { color: '#0EA5E9', width: 2, type: 'dashed' },
        itemStyle: { color: '#0EA5E9' },
        connectNulls: false,
      },
      {
        name: '安全水位',
        type: 'line',
        data: d.forecast.months.map(() => d.forecast.safeLine),
        symbol: 'none',
        lineStyle: { color: '#16A37B', width: 1, type: 'dotted' },
        itemStyle: { color: '#16A37B' },
      },
      {
        name: '警戒水位',
        type: 'line',
        data: d.forecast.months.map(() => d.forecast.warningLine),
        symbol: 'none',
        lineStyle: { color: '#E0584C', width: 1, type: 'dotted' },
        itemStyle: { color: '#E0584C' },
      },
    ],
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="资金管理"
        subtitle="多账户资金总览、现金流预测与缺口预警"
        action={<Button variant="secondary">导出资金报表</Button>}
      />

      {/* 多账户总览 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-h3 text-ink">账户总览</h3>
          <div className="text-sm text-muted">
            资金合计 <span className="text-ink font-bold font-mono text-lg ml-1">{d.totalBalance}</span> 万元
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {d.accounts.map((acc) => (
            <Card key={acc.account} hover>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-card-sm bg-accent-soft flex items-center justify-center">
                  <Landmark className="w-4 h-4 text-accent" />
                </div>
                <Tag type="default">{acc.type}</Tag>
              </div>
              <div className="text-sm font-semibold text-ink mb-1">{acc.bank}</div>
              <div className="text-2xs text-muted font-mono mb-2">{acc.account}</div>
              <div className="text-xl font-bold font-mono text-ink">{acc.balance} <span className="text-xs text-muted font-sans">万</span></div>
            </Card>
          ))}
        </div>
      </div>

      {/* 现金流预测图 */}
      <Card>
        <CardHeader
          title="现金流预测"
          subtitle="实际资金 vs AI 预测，含安全水位与警戒水位线"
          action={<Tag type="ai">✦ AI 预测 · 置信度 88%</Tag>}
        />
        <Chart option={forecastOption} height={340} />
        <div className="flex items-center gap-4 mt-3 text-xs text-muted">
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-accent inline-block" />实际资金</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-accent2 inline-block border-dashed" style={{ borderTop: '2px dashed #0EA5E9' }} />AI 预测</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-ok inline-block" />安全水位 300 万</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-warn inline-block" />警戒水位 200 万</span>
        </div>
      </Card>

      {/* 资金缺口预警 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card variant="leftBar" barColor="warn" className="lg:col-span-2">
          <CardHeader
            title={`${d.gapWarning.month}资金缺口预警`}
            action={<Tag type="high">高危</Tag>}
          />
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-8 h-8 text-warn" />
              <div>
                <div className="text-3xl font-bold font-mono text-warn">{d.gapWarning.gap}</div>
                <div className="text-2xs text-muted">万元缺口</div>
              </div>
            </div>
            <div className="text-sm text-muted leading-relaxed flex-1">
              {d.gapWarning.suggestion}
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="primary">一键催收华联账款</Button>
            <Button size="sm" variant="secondary">申请银行贷款</Button>
          </div>
        </Card>

        <Card variant="leftBar" barColor="accent">
          <CardHeader title="AI 调度建议" action={<Tag type="ai">✦ AI</Tag>} />
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-ink font-medium">收回华联账款</div>
                <div className="text-xs text-muted">回款 32 万，缓解 8 月缺口</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-ink font-medium">申请流动资金贷款</div>
                <div className="text-xs text-muted">建议额度 50 万，期限 6 个月</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-ink font-medium">C 品类促销清库存</div>
                <div className="text-xs text-muted">预计回笼资金 130 万</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
