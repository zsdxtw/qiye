import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Chart } from '@/components/charts/Chart';
import { AICallout, AISuggestion, AIHighlight } from '@/components/ai/AICallout';
import { dashboardData } from '@/data/mockData';
import { useAppStore } from '@/store/useAppStore';
import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertTriangle, CheckCircle2, Clock, Sparkles, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import type { EChartsOption } from 'echarts';

export default function Dashboard() {
  const { user, toggleAiAssistant } = useAppStore();
  const d = dashboardData;

  const revenueOption: EChartsOption = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['营收', '毛利'] },
    xAxis: {
      type: 'category',
      data: d.revenueTrend.months,
      axisLine: { lineStyle: { color: '#E3E7F0' } },
      axisLabel: { color: '#5B6478' },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#E3E7F0', type: 'dashed' } },
      axisLabel: { color: '#5B6478', formatter: '{value}' },
    },
    series: [
      {
        name: '营收',
        type: 'bar',
        data: d.revenueTrend.revenue,
        itemStyle: { color: '#4F46E5', borderRadius: [4, 4, 0, 0] },
        barWidth: '40%',
      },
      {
        name: '毛利',
        type: 'line',
        data: d.revenueTrend.profit,
        smooth: true,
        lineStyle: { color: '#0EA5E9', width: 2 },
        itemStyle: { color: '#0EA5E9' },
        symbol: 'circle',
        symbolSize: 6,
      },
    ],
  };

  return (
    <div className="space-y-5">
      {/* 顶部问候 */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-h1 text-ink">{d.greeting}</h1>
          <p className="text-sm text-muted mt-1.5 flex items-center gap-2">
            <span>{d.date}</span>
            <span className="text-rule">·</span>
            <span className="text-ok flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {d.reportTime}
            </span>
          </p>
        </div>
        <Button variant="secondary" size="md" onClick={toggleAiAssistant}>
          <Sparkles className="w-4 h-4" />
          问 AI 助手
        </Button>
      </div>

      {/* AI 经营摘要 */}
      <AICallout>
        <p className="text-sm leading-relaxed mb-4">{d.aiSummary.text}</p>
        <div className="flex flex-wrap gap-y-3 pt-3 border-t border-white/10">
          {d.aiSummary.highlights.map((h) => (
            <AIHighlight key={h.label} value={h.value} label={h.label} tone={h.tone} />
          ))}
        </div>
      </AICallout>

      {/* 指标卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {d.metrics.map((m) => (
          <Card key={m.label} hover>
            <div className="text-xs text-muted mb-2">{m.label}</div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-2xl font-bold font-mono text-ink">{m.value}</span>
              <span className="text-sm text-muted">{m.unit}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              {m.trend === 'up' ? (
                <span className="text-ok flex items-center gap-0.5 font-semibold">
                  <ArrowUpRight className="w-3 h-3" />
                  {m.change}
                </span>
              ) : (
                <span className="text-warn flex items-center gap-0.5 font-semibold">
                  <ArrowDownRight className="w-3 h-3" />
                  {m.change}
                </span>
              )}
              <span className="text-muted">{m.sub}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* 营收趋势 + AI 建议 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3">
          <CardHeader
            title="营收趋势"
            subtitle="近 6 个月营收与毛利对比（万元）"
            action={<Tag type="ai">✦ AI 预测 7 月营收 728 万</Tag>}
          />
          <Chart option={revenueOption} height={300} />
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="AI 经营建议" subtitle="基于实时数据自动生成" action={<Tag type="ai">✦ AI</Tag>} />
          <div>
            {d.aiSuggestions.map((s) => (
              <AISuggestion
                key={s.id}
                title={s.title}
                desc={s.desc}
                impact={s.impact}
                agent={s.agent}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* 风险预警摘要 + 待办事项 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card variant="leftBar" barColor="warn">
          <CardHeader
            title="风险预警摘要"
            action={
              <Link to="/risk" className="text-xs text-accent font-semibold flex items-center gap-1 hover:underline">
                查看全部 <ChevronRight className="w-3 h-3" />
              </Link>
            }
          />
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 rounded-card-sm bg-warn-soft/50">
              <div className="text-2xl font-bold font-mono text-warn">{d.riskSummary.high}</div>
              <div className="text-2xs text-muted mt-1">高危</div>
            </div>
            <div className="text-center p-3 rounded-card-sm bg-amber-soft/50">
              <div className="text-2xl font-bold font-mono text-amber">{d.riskSummary.medium}</div>
              <div className="text-2xs text-muted mt-1">关注</div>
            </div>
            <div className="text-center p-3 rounded-card-sm bg-ok-soft/50">
              <div className="text-2xl font-bold font-mono text-ok">{d.riskSummary.resolved}</div>
              <div className="text-2xs text-muted mt-1">已解除</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-warn flex-shrink-0" />
              <span className="text-ink">华联账款逾期 18 天，回款概率 42%</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-warn flex-shrink-0" />
              <span className="text-ink">C 品类库存滞销 186 万，周转 3.2 次</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-amber flex-shrink-0" />
              <span className="text-ink">毛利率下滑 2.3pp，原材料成本上涨</span>
            </div>
          </div>
        </Card>

        <Card variant="leftBar" barColor="accent">
          <CardHeader title="待办事项" subtitle="审批 / 申报 / 到期提醒" />
          <div className="space-y-2">
            {d.todos.map((t) => (
              <div
                key={t.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-card-sm border transition-colors hover:bg-accent-soft/30',
                  t.urgent ? 'border-warn/30 bg-warn-soft/20' : 'border-rule',
                )}
              >
                <div className={cn('w-8 h-8 rounded-card-sm flex items-center justify-center flex-shrink-0', t.urgent ? 'bg-warn-soft text-warn' : 'bg-accent-soft text-accent')}>
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-ink font-medium truncate">{t.title}</div>
                  <div className="text-2xs text-muted mt-0.5 flex items-center gap-2">
                    <span className="font-mono">{t.type}</span>
                    <span>·</span>
                    <span>{t.time}</span>
                  </div>
                </div>
                {t.urgent && <Tag type="high">紧急</Tag>}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 底部用户信息条 */}
      <div className="text-center text-2xs text-muted font-mono py-2">
        {user.company} · 智擎 AI 经营管理平台 · 数据更新于 2026-06-21 08:00
      </div>
    </div>
  );
}
