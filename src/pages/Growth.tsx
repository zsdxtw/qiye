import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import RadarChart from "@/components/RadarChart";
import { healthDetail, simulations, marketRadar } from "@/mock/growth";
import { cn } from "@/lib/utils";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import {
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Award,
  Users,
  Play,
  Save,
  ChevronRight,
  Building2,
  Newspaper,
  Landmark,
  Minus,
} from "lucide-react";

const dimensionIconMap: Record<string, typeof Activity> = {
  finance: Activity,
  tax: Target,
  operation: TrendingUp,
  growth: Award,
  risk: Users,
  compliance: Landmark,
};

const subStatusMap: Record<string, string> = {
  excellent: "bg-success",
  good: "bg-success",
  normal: "bg-gray-300",
  warning: "bg-warning",
};

function scoreColor(score: number) {
  if (score >= 85) return "text-success";
  if (score >= 75) return "text-accent-dark";
  if (score >= 60) return "text-warning";
  return "text-danger";
}

function ChangeIndicator({ value }: { value: number }) {
  if (value === 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-mini text-ink-mute tnum">
        <Minus className="w-3 h-3" />
        持平
      </span>
    );
  }
  const positive = value > 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-mini tnum",
        positive ? "text-success" : "text-danger"
      )}
    >
      {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {positive ? "+" : ""}
      {value}
    </span>
  );
}

const scenarioOptions = [
  { value: "price_up", label: "涨价", icon: TrendingUp },
  { value: "price_down", label: "降价", icon: TrendingDown },
  { value: "capacity_up", label: "扩产", icon: Activity },
  { value: "capacity_down", label: "缩产", icon: Minus },
  { value: "hire", label: "招人", icon: Users },
  { value: "layoff", label: "裁员", icon: Users },
  { value: "ad", label: "投广告", icon: Target },
];

const impactBadgeMap: Record<string, string> = {
  high: "bg-red-50 text-danger",
  medium: "bg-orange-50 text-warning",
  low: "bg-gray-100 text-ink-soft",
};

const levelDotMap: Record<string, string> = {
  high: "bg-danger",
  medium: "bg-warning",
  low: "bg-success",
};

function IndustryChart() {
  const { trend, months } = marketRadar.industryIndex;
  const option: EChartsOption = {
    grid: { left: 4, right: 4, top: 8, bottom: 4 },
    xAxis: { type: "category", show: false, data: months },
    yAxis: { type: "value", show: false, scale: true },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(30,58,95,0.95)",
      borderColor: "#D4AF37",
      borderWidth: 1,
      textStyle: { color: "#fff", fontSize: 12 },
      formatter: (params: any) => `${params[0].name}<br/>指数：<b>${params[0].value}</b>`,
    },
    series: [
      {
        type: "line",
        data: trend,
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        lineStyle: { color: "#D4AF37", width: 2 },
        itemStyle: { color: "#D4AF37", borderColor: "#fff", borderWidth: 1 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(212,175,55,0.35)" },
              { offset: 1, color: "rgba(212,175,55,0.02)" },
            ],
          },
        },
      },
    ],
  };
  return <ReactECharts option={option} style={{ height: "120px", width: "100%" }} />;
}

export default function Growth() {
  const [scenario, setScenario] = useState("price_up");
  const [changeRate, setChangeRate] = useState(10);

  const radarData = healthDetail.dimensions.map((d) => ({ name: d.name, score: d.score }));

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <PageHeader
        title="智能成长中心"
        subtitle="市场雷达 · 六维健康诊断 · AI战略建议 · 决策沙盘"
      />

      {/* 顶部：健康评分总览 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 左：总分 */}
        <div className="qj-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-caption text-ink-mute">经营健康总评</span>
            </div>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-5xl tnum font-bold text-accent leading-none">
                {healthDetail.total}
              </span>
              <span className="text-body text-ink-mute pb-1">分</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="qj-badge bg-accent/15 text-accent-dark">
                <Award className="w-3 h-3" />
                {healthDetail.grade}级
              </span>
              <ChangeIndicator value={healthDetail.change} />
              <span className="text-mini text-ink-mute">较上期</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
            <div>
              <div className="text-mini text-ink-mute">行业排名</div>
              <div className="text-body font-semibold text-primary tnum mt-0.5">
                {healthDetail.rank}
              </div>
            </div>
            <div className="text-right">
              <div className="text-mini text-ink-mute">诊断维度</div>
              <div className="text-body font-semibold text-ink tnum mt-0.5">
                {healthDetail.dimensions.length} 维
              </div>
            </div>
          </div>
        </div>

        {/* 右：雷达图 */}
        <div className="qj-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-h3 font-semibold text-ink">六维健康雷达</h2>
            <span className="text-caption text-ink-mute">满分 100 分</span>
          </div>
          <RadarChart data={radarData} height={260} />
        </div>
      </div>

      {/* 六维诊断明细 */}
      <div>
        <h2 className="text-h2 font-semibold text-ink mb-3 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          六维诊断明细
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {healthDetail.dimensions.map((dim) => {
            const Icon = dimensionIconMap[dim.key] || Activity;
            return (
              <div key={dim.key} className="qj-card p-4 hover:shadow-float transition-all">
                {/* 头部 */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-body font-semibold text-ink">{dim.name}</div>
                      <div className="text-mini text-ink-mute">权重 {dim.weight}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-h2 tnum font-bold leading-none", scoreColor(dim.score))}>
                      {dim.score}
                    </div>
                    <div className="mt-1">
                      <ChangeIndicator value={dim.change} />
                    </div>
                  </div>
                </div>

                {/* 基准对比 */}
                <div className="flex items-center justify-between text-mini text-ink-mute bg-card rounded-md px-2.5 py-1.5 mb-3">
                  <span>行业基准</span>
                  <span className="tnum text-ink-soft font-medium">{dim.benchmark} 分</span>
                </div>

                {/* 子指标 */}
                <div className="space-y-1.5 mb-3">
                  {dim.subMetrics.map((m) => (
                    <div key={m.name} className="flex items-center justify-between text-caption">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            subStatusMap[m.status] || "bg-gray-300"
                          )}
                        />
                        <span className="text-ink-soft">{m.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="tnum text-ink font-medium">{m.value}</span>
                        <span className="text-mini text-ink-mute tnum">/ {m.benchmark}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 建议 */}
                <div className="flex items-start gap-1.5 pt-3 border-t border-gray-50">
                  <Lightbulb className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  <p className="text-mini text-ink-soft leading-relaxed">{dim.suggestion}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 决策沙盘 */}
      <div>
        <h2 className="text-h2 font-semibold text-ink mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          决策沙盘
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* 左：模拟表单 */}
          <div className="qj-card p-5">
            <h3 className="text-body font-semibold text-ink mb-1">新建模拟</h3>
            <p className="text-mini text-ink-mute mb-4">选择场景与幅度，AI 推演经营影响</p>

            <label className="text-caption text-ink-soft mb-1.5 block">场景类型</label>
            <div className="grid grid-cols-4 gap-1.5 mb-4">
              {scenarioOptions.map((opt) => {
                const Icon = opt.icon;
                const active = scenario === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setScenario(opt.value)}
                    className={cn(
                      "flex flex-col items-center gap-1 py-2 rounded-md border text-mini transition-all",
                      active
                        ? "border-accent bg-accent/5 text-accent-dark"
                        : "border-gray-100 text-ink-soft hover:border-primary-100 hover:bg-card"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <label className="text-caption text-ink-soft mb-1.5 block">
              变化幅度：<span className="text-primary tnum font-medium">{changeRate}%</span>
            </label>
            <input
              type="range"
              min={1}
              max={50}
              value={changeRate}
              onChange={(e) => setChangeRate(Number(e.target.value))}
              className="w-full accent-primary mb-1"
            />
            <div className="flex justify-between text-mini text-ink-mute tnum mb-4">
              <span>1%</span>
              <span>50%</span>
            </div>

            <button className="qj-btn-primary w-full flex items-center justify-center gap-1.5">
              <Play className="w-4 h-4" />
              开始模拟
            </button>
          </div>

          {/* 右：已保存模拟 */}
          <div className="qj-card p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-body font-semibold text-ink">已保存的模拟方案</h3>
              <span className="text-caption text-ink-mute tnum">共 {simulations.length} 个</span>
            </div>
            <div className="space-y-3">
              {simulations.map((sim) => (
                <div
                  key={sim.id}
                  className="p-4 rounded-lg border border-gray-100 hover:border-primary-100 hover:shadow-card transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-body font-semibold text-ink">{sim.scenario}</div>
                      <div className="text-mini text-ink-mute mt-0.5">创建于 {sim.createdAt}</div>
                    </div>
                    <span className="qj-badge bg-green-50 text-success">
                      <Save className="w-3 h-3" />
                      已保存
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(sim.results).map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-card rounded-md"
                      >
                        <span className="text-mini text-ink-mute">
                          {resultLabelMap[k] || k}
                        </span>
                        <span
                          className={cn(
                            "text-caption font-semibold tnum",
                            typeof v === "number" && v > 0
                              ? "text-success"
                              : typeof v === "number" && v < 0
                              ? "text-danger"
                              : "text-ink"
                          )}
                        >
                          {typeof v === "number" && v > 0 && !Number.isInteger(v) ? "+" : ""}
                          {v}
                          {typeof v === "number" && k !== "roi" && k !== "paybackMonths" ? "%" : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 市场雷达 */}
      <div>
        <h2 className="text-h2 font-semibold text-ink mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          市场雷达
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* 行业指数 */}
          <div className="qj-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-body font-semibold text-ink flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-accent" />
                行业指数
              </h3>
              <span className="qj-badge bg-accent/15 text-accent-dark">
                {marketRadar.industryIndex.months.length} 月趋势
              </span>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-h1 tnum font-bold text-ink">
                {marketRadar.industryIndex.current}
              </span>
              <span
                className={cn(
                  "flex items-center text-caption tnum pb-1.5",
                  marketRadar.industryIndex.change >= 0 ? "text-success" : "text-danger"
                )}
              >
                {marketRadar.industryIndex.change >= 0 ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                {marketRadar.industryIndex.change >= 0 ? "+" : ""}
                {marketRadar.industryIndex.change}
              </span>
            </div>
            <IndustryChart />
          </div>

          {/* 竞品动态 */}
          <div className="qj-card p-5">
            <h3 className="text-body font-semibold text-ink flex items-center gap-1.5 mb-3">
              <Building2 className="w-4 h-4 text-primary" />
              竞品动态
            </h3>
            <div className="space-y-3">
              {marketRadar.competitorDynamics.map((d, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-caption font-medium text-ink">{d.name}</span>
                      <span className={cn("qj-badge", impactBadgeMap[d.impact])}>{d.category}</span>
                    </div>
                    <p className="text-mini text-ink-soft mt-0.5 line-clamp-1">{d.event}</p>
                    <span className="text-mini text-ink-mute">{d.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 政策时间线 */}
          <div className="qj-card p-5">
            <h3 className="text-body font-semibold text-ink flex items-center gap-1.5 mb-3">
              <Newspaper className="w-4 h-4 text-primary" />
              政策时间线
            </h3>
            <div className="relative pl-4">
              <div className="absolute left-1 top-1 bottom-1 w-px bg-gray-100" />
              {marketRadar.policyTimeline.map((p, i) => (
                <div key={i} className="relative pb-4 last:pb-0">
                  <div
                    className={cn(
                      "absolute -left-3 top-1 w-2.5 h-2.5 rounded-full ring-2 ring-white",
                      levelDotMap[p.level]
                    )}
                  />
                  <div className="text-mini text-ink-mute tnum">{p.date}</div>
                  <div className="text-caption font-medium text-ink mt-0.5">{p.title}</div>
                  <div className="text-mini text-accent-dark mt-0.5">{p.impact}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const resultLabelMap: Record<string, string> = {
  revenueChange: "营收变化",
  profitChange: "利润变化",
  volumeChange: "销量变化",
  churnRate: "流失率",
  newMargin: "新利润率",
  costChange: "成本变化",
  paybackMonths: "回本周期(月)",
  customerGrowth: "客户增长",
  roi: "ROI",
};
