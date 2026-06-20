import { useNavigate } from "react-router-dom";
import { dashboardData } from "@/mock/dashboard";
import RadarChart from "@/components/RadarChart";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import {
  TrendingUp,
  PiggyBank,
  Droplets,
  AlertTriangle,
  CalendarClock,
  Package,
  FileText,
  ChevronRight,
  Landmark,
  Newspaper,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentType } from "react";

const iconMap: Record<string, ComponentType<{ className?: string; strokeWidth?: number | string }>> = {
  "trending-up": TrendingUp,
  "piggy-bank": PiggyBank,
  droplets: Droplets,
  "alert-triangle": AlertTriangle,
  "calendar-clock": CalendarClock,
  package: Package,
  "file-text": FileText,
  "book-open": TrendingUp,
  receipt: Landmark,
  banknote: PiggyBank,
  users: TrendingUp,
  megaphone: TrendingUp,
  "file-signature": FileText,
  landmark: Landmark,
  activity: TrendingUp,
  "message-circle": Bot,
  "bar-chart-3": TrendingUp,
  "grid-3x3": TrendingUp,
};

const alertColorMap = {
  high: { bg: "bg-red-50", text: "text-danger", border: "border-red-100" },
  warning: { bg: "bg-orange-50", text: "text-warning", border: "border-orange-100" },
  info: { bg: "bg-blue-50", text: "text-info", border: "border-blue-100" },
};

export default function Dashboard() {
  const navigate = useNavigate();

  const sparklineOption = (data: number[], color: string): EChartsOption => ({
    grid: { left: 0, right: 0, top: 4, bottom: 0 },
    xAxis: { type: "category", show: false, data: data.map((_, i) => i) },
    yAxis: { type: "value", show: false },
    series: [
      {
        type: "line",
        data,
        smooth: true,
        symbol: "none",
        lineStyle: { color, width: 2 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: `${color}40` },
              { offset: 1, color: `${color}00` },
            ],
          },
        },
      },
    ],
  });

  return (
    <div className="p-6 space-y-5">
      {/* 欢迎栏 */}
      <div className="relative overflow-hidden rounded-card bg-gradient-to-r from-primary-dark via-primary to-primary-light p-6 text-white animate-fade-in">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-h1 font-bold mb-1">
              {dashboardData.greeting}，{dashboardData.userName} 👋
            </h1>
            <p className="text-body text-white/70">{dashboardData.todayDate}</p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-md">
                <span className="text-mini text-white/60">今日待办</span>
                <span className="tnum text-body font-semibold text-accent">{dashboardData.todos}项</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-md">
                <span className="text-mini text-white/60">预警</span>
                <span className="tnum text-body font-semibold text-red-300">{dashboardData.alerts}项</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/ai-assistant")}
            className="hidden md:flex items-center gap-2 bg-accent text-primary-dark px-5 py-2.5 rounded-lg text-body font-medium hover:shadow-glow transition-all"
          >
            <Bot className="w-4 h-4" />
            与 AI 助手对话
          </button>
        </div>
      </div>

      {/* 健康评分 + 关键数据 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 健康评分卡 */}
        <div className="qj-card p-5 lg:row-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-caption text-ink-mute mb-1">经营健康评分</div>
              <div className="flex items-end gap-2">
                <span className="text-4xl tnum font-bold text-accent">{dashboardData.healthScore.total}</span>
                <span className="text-body text-ink-mute pb-1">分</span>
                <span className="qj-badge bg-accent/15 text-accent-dark ml-1 mb-1">{dashboardData.healthScore.grade}级</span>
              </div>
              <div className="text-mini text-success tnum mt-1">较上周 +{dashboardData.healthScore.change}分</div>
            </div>
          </div>
          <RadarChart data={dashboardData.healthScore.dimensions} height={240} />
          <button
            onClick={() => navigate("/growth")}
            className="w-full mt-3 flex items-center justify-center gap-1 py-2 text-caption text-primary hover:text-accent transition-colors"
          >
            查看六维诊断详情 <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 关键数据卡 */}
        {dashboardData.keyMetrics.map((metric) => {
          const Icon = iconMap[metric.icon] || TrendingUp;
          const colorMap: Record<string, string> = {
            primary: "#1E3A5F",
            accent: "#D4AF37",
            info: "#3182CE",
          };
          const color = colorMap[metric.color] || "#1E3A5F";
          return (
            <div key={metric.key} className="qj-card p-5 hover:shadow-float transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="text-caption text-ink-mute">{metric.label}</div>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${color}15`, color }}
                >
                  <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                </div>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <div className="text-h1 tnum font-bold" style={{ color }}>
                  {metric.display}
                </div>
                {metric.change > 0 && (
                  <div className="flex items-center text-success tnum text-caption pb-1.5">
                    <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                    {metric.change}%
                  </div>
                )}
              </div>
              <ReactECharts
                option={sparklineOption(metric.sparkline, color)}
                style={{ height: "40px", width: "100%" }}
              />
            </div>
          );
        })}
      </div>

      {/* 智能预警 + 快捷功能 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 智能预警 */}
        <div className="qj-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-h3 font-semibold text-ink flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              智能预警
            </h2>
            <button className="text-caption text-ink-mute hover:text-primary">全部 &gt;</button>
          </div>
          <div className="space-y-2.5">
            {dashboardData.alertsList.map((alert) => {
              const Icon = iconMap[alert.icon] || AlertTriangle;
              const colors = alertColorMap[alert.level as keyof typeof alertColorMap];
              return (
                <div
                  key={alert.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-card",
                    colors.bg,
                    colors.border
                  )}
                >
                  <div className={cn("w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0", colors.text)}>
                    <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-body text-ink font-medium truncate">{alert.title}</span>
                      <span className="text-mini text-ink-mute shrink-0">{alert.time}</span>
                    </div>
                    <div className="text-caption text-ink-soft truncate">{alert.desc}</div>
                  </div>
                  <button className="shrink-0 px-3 py-1.5 bg-white text-primary text-caption font-medium rounded-md hover:bg-primary hover:text-white transition-colors">
                    {alert.action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 快捷功能宫格 */}
        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4">快捷功能</h2>
          <div className="grid grid-cols-4 gap-2">
            {dashboardData.quickActions.map((action) => {
              const Icon = iconMap[action.icon] || TrendingUp;
              return (
                <button
                  key={action.key}
                  onClick={() => navigate(action.path)}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg hover:bg-card transition-all group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${action.color}15`, color: action.color }}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <span className="text-mini text-ink-soft">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 行业动态 */}
      <div className="qj-card p-5">
        <div className="flex items-center gap-1 mb-4 border-b border-gray-50">
          {[
            { key: "policy", label: "政策速递", icon: Landmark },
            { key: "competitor", label: "竞品情报", icon: TrendingUp },
            { key: "industry", label: "行业新闻", icon: Newspaper },
          ].map((tab, idx) => (
            <button
              key={tab.key}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2.5 text-body font-medium border-b-2 transition-colors",
                idx === 0
                  ? "text-primary border-accent"
                  : "text-ink-mute border-transparent hover:text-ink"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {dashboardData.industryNews.policy.map((news) => (
            <div
              key={news.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-card transition-colors cursor-pointer group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-body text-ink font-medium group-hover:text-primary transition-colors">
                    {news.title}
                  </span>
                  <span className="text-mini text-ink-mute shrink-0">{news.time}</span>
                </div>
                <p className="text-caption text-ink-soft line-clamp-1">{news.summary}</p>
                <span className="text-mini text-primary mt-1">{news.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
