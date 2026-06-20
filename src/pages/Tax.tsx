import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import { taxOverview, taxCalendar, taxRisks, taxBenefits } from "@/mock/tax";
import {
  Landmark,
  Banknote,
  Percent,
  AlertTriangle,
  Lightbulb,
  Calendar,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CHART_COLORS = ["#1E3A5F", "#D4AF37", "#3182CE", "#38A169", "#DD6B20", "#E53E3E"];

const fmtMoney = (n: number) => `¥${n.toLocaleString("zh-CN")}`;

const parseChange = (s: string): number | undefined => {
  if (!s) return undefined;
  const n = parseFloat(s);
  return isNaN(n) ? undefined : n;
};

const riskBorderColor: Record<string, string> = {
  high: "#E53E3E",
  medium: "#DD6B20",
  low: "#3182CE",
};

const riskBadge: Record<string, { cls: string; label: string; impact: string }> = {
  high: { cls: "bg-red-50 text-danger", label: "高风险", impact: "text-danger" },
  medium: { cls: "bg-orange-50 text-warning", label: "中风险", impact: "text-warning" },
  low: { cls: "bg-blue-50 text-info", label: "低风险", impact: "text-info" },
};

type TaxEvent = (typeof taxCalendar.events)[number];

export default function Tax() {
  const { taxTypes, taxRateTrend } = taxOverview;

  // 税负率趋势
  const rateOption: EChartsOption = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(30,58,95,0.95)",
      borderColor: "#D4AF37",
      borderWidth: 1,
      textStyle: { color: "#fff", fontSize: 12 },
      formatter: (params: any) => {
        let s = `${params[0].axisValue}<br/>`;
        params.forEach((p: any) => {
          s += `${p.marker} ${p.seriesName}: ${p.value}%<br/>`;
        });
        return s;
      },
    },
    legend: { data: ["我司税负率", "行业均值"], bottom: 0, textStyle: { color: "#4A5568" } },
    grid: { left: "3%", right: "4%", bottom: "14%", top: "8%", containLabel: true },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: taxRateTrend.months,
      axisLine: { lineStyle: { color: "#E2E8F0" } },
      axisLabel: { color: "#718096" },
    },
    yAxis: {
      type: "value",
      name: "%",
      nameTextStyle: { color: "#A0AEC0" },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#718096", formatter: "{value}%" },
      splitLine: { lineStyle: { color: "#EDF2F7" } },
    },
    series: [
      {
        name: "我司税负率",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 7,
        data: taxRateTrend.rates,
        itemStyle: { color: CHART_COLORS[0] },
        lineStyle: { color: CHART_COLORS[0], width: 2.5 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: `${CHART_COLORS[0]}30` },
              { offset: 1, color: `${CHART_COLORS[0]}00` },
            ],
          },
        },
      },
      {
        name: "行业均值",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 7,
        data: taxRateTrend.industryAvg,
        itemStyle: { color: CHART_COLORS[1] },
        lineStyle: { color: CHART_COLORS[1], width: 2.5, type: "dashed" },
      },
    ],
  };

  // 申报日历 - 2026年6月
  const year = taxCalendar.year;
  const month = taxCalendar.month;
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOffset = (firstDay.getDay() + 6) % 7; // 周一为首列
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const eventsByDay: Record<number, TaxEvent[]> = {};
  taxCalendar.events.forEach((e) => {
    if (!eventsByDay[e.day]) eventsByDay[e.day] = [];
    eventsByDay[e.day].push(e);
  });

  const statIcons = [Landmark, Banknote, Percent, AlertTriangle];

  return (
    <div className="p-6 space-y-5">
      <PageHeader title="智能税务中心" subtitle="自动算税 · 一键申报 · 税务风控" />

      {/* 关键指标 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {taxOverview.stats.map((stat, idx) => {
          const Icon = statIcons[idx];
          return (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              change={parseChange(stat.change)}
              trend={stat.trend as "up" | "down" | "neutral"}
              icon={<Icon className="w-[18px] h-[18px]" />}
              accentColor={CHART_COLORS[idx]}
            />
          );
        })}
      </div>

      {/* 税种表 + 税负率趋势 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="qj-card p-5 lg:col-span-2">
          <h2 className="text-h3 font-semibold text-ink mb-4">各税种应纳税额</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-body">
              <thead>
                <tr className="text-caption text-ink-mute border-b border-gray-100">
                  <th className="text-left font-medium py-3 px-2">税种</th>
                  <th className="text-right font-medium py-3 px-2">应纳税额</th>
                  <th className="text-left font-medium py-3 px-2">税率</th>
                  <th className="text-left font-medium py-3 px-2">申报状态</th>
                  <th className="text-left font-medium py-3 px-2">截止日期</th>
                  <th className="text-right font-medium py-3 px-2">操作</th>
                </tr>
              </thead>
              <tbody>
                {taxTypes.map((t) => (
                  <tr key={t.name} className="border-b border-gray-50 hover:bg-card transition-colors">
                    <td className="py-3 px-2 text-ink font-medium">{t.name}</td>
                    <td className="py-3 px-2 text-right tnum text-ink font-medium">{fmtMoney(t.amount)}</td>
                    <td className="py-3 px-2 tnum text-ink-soft">{t.rate}</td>
                    <td className="py-3 px-2">
                      <span className={cn("qj-badge", t.status === "已申报" ? "bg-green-50 text-success" : "bg-orange-50 text-warning")}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 tnum text-ink-mute text-caption">{t.deadline}</td>
                    <td className="py-3 px-2 text-right">
                      {t.status === "待申报" ? (
                        <button className="px-3 py-1 bg-primary text-white rounded-md text-caption font-medium hover:bg-primary-light transition-colors">
                          一键申报
                        </button>
                      ) : (
                        <span className="text-mini text-ink-mute">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4">税负率趋势</h2>
          <ReactECharts option={rateOption} style={{ height: "320px", width: "100%" }} />
        </div>
      </div>

      {/* 税务风险 */}
      <div className="qj-card p-5">
        <h2 className="text-h3 font-semibold text-ink mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning" />
          税务风险
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {taxRisks.map((risk) => {
            const cfg = riskBadge[risk.level] || riskBadge.low;
            const borderColor = riskBorderColor[risk.level] || riskBorderColor.low;
            return (
              <div
                key={risk.id}
                className="rounded-card border border-gray-100 p-4 hover:shadow-card transition-all"
                style={{ borderLeftWidth: "4px", borderLeftColor: borderColor }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={cn("qj-badge", cfg.cls)}>{cfg.label}</span>
                </div>
                <h3 className="text-body font-semibold text-ink mb-1.5">{risk.title}</h3>
                <p className="text-caption text-ink-soft mb-3 leading-relaxed">{risk.description}</p>
                <div className="flex items-start gap-1.5 mb-3 p-2 rounded-md bg-accent/5">
                  <Lightbulb className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  <p className="text-caption text-ink-soft leading-relaxed">{risk.suggestion}</p>
                </div>
                <p className={cn("text-caption font-medium", cfg.impact)}>影响：{risk.impact}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 税收优惠 */}
      <div className="qj-card p-5">
        <h2 className="text-h3 font-semibold text-ink mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-accent" />
          税收优惠
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {taxBenefits.map((b) => (
            <div key={b.id} className="rounded-card border border-gray-100 p-4 hover:shadow-card transition-all">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-body font-semibold text-ink">{b.name}</h3>
                <span className="qj-badge bg-accent/15 text-accent-dark shrink-0 ml-2">扣除比例 {b.rate}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-mini text-ink-mute">预计节省</span>
                <span className="text-h3 tnum font-bold text-success">{b.estimatedSaving}</span>
                <span
                  className={cn(
                    "qj-badge ml-auto",
                    b.status === "可享受" ? "bg-green-50 text-success" : "bg-blue-50 text-info"
                  )}
                >
                  {b.status}
                </span>
              </div>
              <p className="text-caption text-ink-soft leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 申报日历 */}
      <div className="qj-card p-5">
        <h2 className="text-h3 font-semibold text-ink mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          申报日历 · {year}年{month + 1}月
        </h2>
        <div className="grid grid-cols-7 gap-2">
          {["周一", "周二", "周三", "周四", "周五", "周六", "周日"].map((d) => (
            <div key={d} className="text-center text-caption text-ink-mute font-medium py-2">
              {d}
            </div>
          ))}
          {cells.map((day, idx) => {
            if (day === null) {
              return <div key={idx} className="min-h-[80px] rounded-lg bg-gray-50/50" />;
            }
            const events = eventsByDay[day] || [];
            const hasDone = events.some((e) => e.status === "done");
            const hasPending = events.some((e) => e.status === "pending");
            return (
              <div
                key={idx}
                className={cn(
                  "min-h-[80px] rounded-lg border p-1.5 flex flex-col",
                  hasDone
                    ? "border-success/30 bg-green-50/50"
                    : hasPending
                      ? "border-warning/30 bg-orange-50/50"
                      : "border-gray-100 bg-white"
                )}
              >
                <div
                  className={cn(
                    "text-caption tnum font-medium mb-1",
                    hasDone ? "text-success" : hasPending ? "text-warning" : "text-ink-mute"
                  )}
                >
                  {day}
                </div>
                <div className="space-y-1 flex-1">
                  {events.map((e, i) => (
                    <div
                      key={i}
                      className={cn(
                        "text-mini leading-tight px-1 py-0.5 rounded truncate",
                        e.status === "done" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
                      )}
                    >
                      {e.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
