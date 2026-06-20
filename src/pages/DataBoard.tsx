import { useState } from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import PageHeader from "@/components/PageHeader";
import { Download, LineChart as LineIcon, PieChart, BarChart3, TrendingUp, Filter, GitCommitVertical } from "lucide-react";
import { cn } from "@/lib/utils";

const PALETTE = ["#1E3A5F", "#D4AF37", "#3182CE", "#38A169", "#DD6B20", "#E53E3E", "#805AD5"];

const RANGES = ["日", "周", "月", "季", "年"] as const;

const tooltipStyle = {
  backgroundColor: "rgba(30,58,95,0.95)",
  borderColor: "#D4AF37",
  borderWidth: 1,
  textStyle: { color: "#fff", fontSize: 12 },
};

const baseGrid = { top: 30, bottom: 30, left: 40, right: 20 };

function ChartCard({
  title,
  icon,
  span,
  option,
}: {
  title: string;
  icon: React.ReactNode;
  span: string;
  option: EChartsOption;
}) {
  return (
    <div className={cn("qj-card p-5 animate-fade-in", span)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-md bg-primary-50 text-primary flex items-center justify-center">
            {icon}
          </span>
          <h3 className="text-h3 text-ink font-semibold">{title}</h3>
        </div>
        <button className="text-ink-mute hover:text-primary px-2 py-1 rounded hover:bg-card text-mini">···</button>
      </div>
      <ReactECharts option={option} style={{ height: "280px", width: "100%" }} />
    </div>
  );
}

export default function DataBoard() {
  const [range, setRange] = useState<(typeof RANGES)[number]>("月");

  const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

  const revenueOption: EChartsOption = {
    tooltip: { trigger: "axis", ...tooltipStyle },
    legend: { data: ["本期", "同期"], right: 0, top: 0, textStyle: { color: "#718096", fontSize: 12 } },
    grid: baseGrid,
    xAxis: { type: "category", data: months, axisLine: { lineStyle: { color: "#E2E8F0" } }, axisLabel: { color: "#718096", fontSize: 11 } },
    yAxis: { type: "value", axisLine: { show: false }, splitLine: { lineStyle: { color: "#EDF2F7" } }, axisLabel: { color: "#718096", fontSize: 11 } },
    series: [
      {
        name: "本期", type: "line", smooth: true, symbol: "circle", symbolSize: 6,
        data: [120, 132, 145, 160, 178, 195, 210, 225, 240, 268, 290, 320],
        lineStyle: { color: PALETTE[0], width: 2.5 }, itemStyle: { color: PALETTE[0] },
        areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(30,58,95,0.25)" }, { offset: 1, color: "rgba(30,58,95,0)" }] } },
      },
      {
        name: "同期", type: "line", smooth: true, symbol: "circle", symbolSize: 5,
        data: [98, 105, 118, 130, 142, 158, 170, 185, 200, 220, 240, 260],
        lineStyle: { color: PALETTE[1], width: 2, type: "dashed" }, itemStyle: { color: PALETTE[1] },
      },
    ],
  };

  const profitOption: EChartsOption = {
    tooltip: { trigger: "item", ...tooltipStyle },
    legend: { bottom: 0, textStyle: { color: "#718096", fontSize: 12 } },
    series: [{
      type: "pie", radius: ["45%", "70%"], center: ["50%", "45%"],
      avoidLabelOverlap: true,
      label: { show: true, formatter: "{b}\n{d}%", color: "#4A5568", fontSize: 11 },
      itemStyle: { borderColor: "#fff", borderWidth: 2 },
      data: [
        { value: 580, name: "主营业务", itemStyle: { color: PALETTE[0] } },
        { value: 280, name: "加工服务", itemStyle: { color: PALETTE[1] } },
        { value: 140, name: "其他", itemStyle: { color: PALETTE[2] } },
      ],
    }],
  };

  const customerOption: EChartsOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, ...tooltipStyle },
    grid: { ...baseGrid, left: 80 },
    xAxis: { type: "value", axisLine: { show: false }, splitLine: { lineStyle: { color: "#EDF2F7" } }, axisLabel: { color: "#718096", fontSize: 11 } },
    yAxis: { type: "category", data: ["宏达机械", "中远科技", "东方精工", "华盛集团", "利达实业"], axisLine: { lineStyle: { color: "#E2E8F0" } }, axisLabel: { color: "#4A5568", fontSize: 12 } },
    series: [{
      type: "bar", barWidth: 14,
      data: [320, 280, 240, 180, 120],
      itemStyle: { color: PALETTE[0], borderRadius: [0, 4, 4, 0] },
    }],
  };

  const taxOption: EChartsOption = {
    tooltip: { trigger: "axis", ...tooltipStyle },
    legend: { data: ["我司税负率", "行业平均"], right: 0, top: 0, textStyle: { color: "#718096", fontSize: 12 } },
    grid: baseGrid,
    xAxis: { type: "category", data: ["1月", "2月", "3月", "4月", "5月", "6月"], axisLine: { lineStyle: { color: "#E2E8F0" } }, axisLabel: { color: "#718096", fontSize: 11 } },
    yAxis: { type: "value", axisLine: { show: false }, splitLine: { lineStyle: { color: "#EDF2F7" } }, axisLabel: { color: "#718096", fontSize: 11, formatter: "{value}%" } },
    series: [
      { name: "我司税负率", type: "bar", barWidth: 14, data: [3.2, 3.5, 3.4, 3.8, 3.6, 3.9], itemStyle: { color: PALETTE[0], borderRadius: [4, 4, 0, 0] } },
      { name: "行业平均", type: "bar", barWidth: 14, data: [4.1, 4.0, 4.2, 4.1, 4.3, 4.2], itemStyle: { color: PALETTE[1], borderRadius: [4, 4, 0, 0] } },
    ],
  };

  const cashOption: EChartsOption = {
    tooltip: { trigger: "axis", ...tooltipStyle },
    legend: { data: ["现金流入", "现金流出", "结余"], right: 0, top: 0, textStyle: { color: "#718096", fontSize: 12 } },
    grid: baseGrid,
    xAxis: { type: "category", data: months.slice(0, 6), axisLine: { lineStyle: { color: "#E2E8F0" } }, axisLabel: { color: "#718096", fontSize: 11 } },
    yAxis: { type: "value", axisLine: { show: false }, splitLine: { lineStyle: { color: "#EDF2F7" } }, axisLabel: { color: "#718096", fontSize: 11 } },
    series: [
      { name: "现金流入", type: "bar", barWidth: 12, data: [180, 200, 220, 240, 260, 300], itemStyle: { color: PALETTE[2], borderRadius: [4, 4, 0, 0] } },
      { name: "现金流出", type: "bar", barWidth: 12, data: [150, 170, 190, 210, 230, 250], itemStyle: { color: PALETTE[4], borderRadius: [4, 4, 0, 0] } },
      { name: "结余", type: "line", smooth: true, symbol: "circle", symbolSize: 6, data: [30, 60, 90, 120, 150, 200], lineStyle: { color: PALETTE[1], width: 2.5 }, itemStyle: { color: PALETTE[1] } },
    ],
  };

  const funnelOption: EChartsOption = {
    tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)", ...tooltipStyle },
    series: [{
      type: "funnel", left: "10%", right: "10%", top: 10, bottom: 10, width: "80%", minSize: "30%",
      label: { color: "#fff", fontSize: 12, formatter: "{b}\n{c}" },
      itemStyle: { borderColor: "#fff", borderWidth: 1 },
      data: [
        { value: 1000, name: "潜在客户", itemStyle: { color: PALETTE[0] } },
        { value: 620, name: "意向客户", itemStyle: { color: PALETTE[1] } },
        { value: 380, name: "成交客户", itemStyle: { color: PALETTE[2] } },
        { value: 220, name: "复购客户", itemStyle: { color: PALETTE[3] } },
        { value: 120, name: "忠诚客户", itemStyle: { color: PALETTE[4] } },
      ],
    }],
  };

  const deptOption: EChartsOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, ...tooltipStyle },
    legend: { data: ["研发", "销售", "运营", "行政"], right: 0, top: 0, textStyle: { color: "#718096", fontSize: 12 } },
    grid: baseGrid,
    xAxis: { type: "category", data: ["1月", "2月", "3月", "4月", "5月", "6月"], axisLine: { lineStyle: { color: "#E2E8F0" } }, axisLabel: { color: "#718096", fontSize: 11 } },
    yAxis: { type: "value", axisLine: { show: false }, splitLine: { lineStyle: { color: "#EDF2F7" } }, axisLabel: { color: "#718096", fontSize: 11 } },
    series: [
      { name: "研发", type: "bar", stack: "total", barWidth: 18, data: [32, 35, 38, 40, 42, 45], itemStyle: { color: PALETTE[0] } },
      { name: "销售", type: "bar", stack: "total", data: [28, 30, 33, 35, 38, 40], itemStyle: { color: PALETTE[1] } },
      { name: "运营", type: "bar", stack: "total", data: [18, 20, 22, 24, 25, 28], itemStyle: { color: PALETTE[2] } },
      { name: "行政", type: "bar", stack: "total", data: [10, 12, 12, 14, 14, 15], itemStyle: { color: PALETTE[3] } },
    ],
  };

  return (
    <div className="p-6">
      <PageHeader
        title="数据看板"
        subtitle="自定义布局 · 多维度分析 · 数据下钻"
        actions={
          <>
            <div className="flex items-center bg-card rounded-md p-0.5">
              {RANGES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={cn(
                    "px-3 py-1.5 text-caption font-medium rounded transition-all",
                    range === r ? "bg-white text-primary shadow-card" : "text-ink-mute hover:text-ink"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
            <button className="qj-btn-ghost flex items-center gap-1.5">
              <Download className="w-4 h-4" />
              导出报表
            </button>
          </>
        }
      />

      <div className="grid grid-cols-12 gap-4">
        <ChartCard title="营收趋势" icon={<LineIcon className="w-4 h-4" />} span="col-span-8" option={revenueOption} />
        <ChartCard title="利润构成" icon={<PieChart className="w-4 h-4" />} span="col-span-4" option={profitOption} />
        <ChartCard title="客户分布" icon={<BarChart3 className="w-4 h-4" />} span="col-span-4" option={customerOption} />
        <ChartCard title="税负率对比" icon={<TrendingUp className="w-4 h-4" />} span="col-span-4" option={taxOption} />
        <ChartCard title="现金流趋势" icon={<GitCommitVertical className="w-4 h-4" />} span="col-span-4" option={cashOption} />
        <ChartCard title="经营漏斗" icon={<Filter className="w-4 h-4" />} span="col-span-6" option={funnelOption} />
        <ChartCard title="部门费用" icon={<BarChart3 className="w-4 h-4" />} span="col-span-6" option={deptOption} />
      </div>
    </div>
  );
}
