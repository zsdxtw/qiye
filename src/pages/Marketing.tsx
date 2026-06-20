import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import { UserPlus, TrendingUp, DollarSign, Crown, Megaphone } from "lucide-react";

const PALETTE = ["#1E3A5F", "#D4AF37", "#3182CE", "#38A169", "#DD6B20", "#E53E3E", "#805AD5"];

const channels = [
  { name: "搜索引擎", value: 18 },
  { name: "社交平台", value: 12 },
  { name: "转介绍", value: 9 },
  { name: "广告投放", value: 6 },
  { name: "线下活动", value: 3 },
];

const growthMonths = ["1月", "2月", "3月", "4月", "5月", "6月"];
const growthData = [186, 215, 248, 289, 312, 326];

const campaigns = [
  { name: "618年中大促", status: "进行中", channel: "全渠道", rate: "28.5%", roi: "3.2x", color: "#1E3A5F" },
  { name: "老客户回馈季", status: "进行中", channel: "短信+微信", rate: "22.1%", roi: "4.5x", color: "#D4AF37" },
  { name: "新品体验官招募", status: "已结束", channel: "社交平台", rate: "18.7%", roi: "2.6x", color: "#3182CE" },
];

const memberLevels = {
  levels: ["普通会员", "银卡会员", "金卡会员", "钻石会员"],
  counts: [1024, 486, 215, 68],
};

const campaignBadgeClass: Record<string, string> = {
  进行中: "bg-success/10 text-success",
  已结束: "bg-gray-100 text-ink-mute",
};

export default function Marketing() {
  const doughnutOption: EChartsOption = {
    tooltip: { trigger: "item", formatter: "{b}: {c}人 ({d}%)" },
    legend: { bottom: 0, icon: "circle", textStyle: { fontSize: 12, color: "#4A5568" } },
    color: PALETTE,
    series: [
      {
        type: "pie",
        radius: ["45%", "70%"],
        center: ["50%", "45%"],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: "#fff", borderWidth: 2 },
        label: { show: false },
        data: channels,
      },
    ],
  };

  const lineOption: EChartsOption = {
    tooltip: { trigger: "axis" },
    grid: { left: 40, right: 20, top: 20, bottom: 30 },
    xAxis: { type: "category", data: growthMonths, boundaryGap: false, axisLabel: { fontSize: 11, color: "#4A5568" }, axisLine: { lineStyle: { color: "#E2E8F0" } } },
    yAxis: { type: "value", axisLabel: { fontSize: 11, color: "#718096" }, splitLine: { lineStyle: { color: "#EDF2F7" } } },
    series: [
      {
        type: "line",
        data: growthData,
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { color: "#1E3A5F", width: 2.5 },
        itemStyle: { color: "#D4AF37", borderColor: "#fff", borderWidth: 2 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(30,58,95,0.25)" },
              { offset: 1, color: "rgba(30,58,95,0.02)" },
            ],
          },
        },
      },
    ],
  };

  const memberBarOption: EChartsOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { left: 80, right: 40, top: 10, bottom: 20 },
    xAxis: { type: "value", axisLabel: { fontSize: 11, color: "#718096" }, splitLine: { lineStyle: { color: "#EDF2F7" } } },
    yAxis: { type: "category", data: memberLevels.levels, axisLabel: { fontSize: 12, color: "#4A5568" }, axisLine: { lineStyle: { color: "#E2E8F0" } } },
    series: [
      {
        type: "bar",
        data: memberLevels.counts,
        barWidth: "55%",
        itemStyle: {
          color: { type: "linear", x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: "#1E3A5F" }, { offset: 1, color: "#3182CE" }] },
          borderRadius: [0, 4, 4, 0],
        },
        label: { show: true, position: "right", fontSize: 11, color: "#4A5568" },
      },
    ],
  };

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <PageHeader title="营销获客中心" subtitle="企业微官网 · 智能名片 · 会员管理 · 获客分析" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="新增客户" value="48" change={15} trend="up" icon={<UserPlus className="w-[18px] h-[18px]" />} accentColor="#1E3A5F" />
        <StatCard label="转化率" value="23%" change={2} trend="up" icon={<TrendingUp className="w-[18px] h-[18px]" />} accentColor="#38A169" />
        <StatCard label="获客成本" value="¥186" change={8} trend="down" icon={<DollarSign className="w-[18px] h-[18px]" />} accentColor="#DD6B20" />
        <StatCard label="活跃会员" value="326" icon={<Crown className="w-[18px] h-[18px]" />} accentColor="#D4AF37" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4">获客渠道分析</h2>
          <ReactECharts option={doughnutOption} style={{ height: 280 }} />
        </div>

        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4">客户增长趋势</h2>
          <ReactECharts option={lineOption} style={{ height: 280 }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4 flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-accent" />
            营销活动
          </h2>
          <div className="space-y-3">
            {campaigns.map((c) => (
              <div key={c.name} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:shadow-card transition-all">
                <div className="w-1 h-12 rounded-full" style={{ backgroundColor: c.color }} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-body font-medium text-ink">{c.name}</span>
                    <span className={`qj-badge ${campaignBadgeClass[c.status]}`}>{c.status}</span>
                  </div>
                  <div className="text-caption text-ink-mute">投放渠道：{c.channel}</div>
                </div>
                <div className="text-right">
                  <div className="text-body tnum font-semibold text-ink">{c.rate}</div>
                  <div className="text-mini text-ink-mute">ROI {c.roi}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4">会员等级分布</h2>
          <ReactECharts option={memberBarOption} style={{ height: 260 }} />
        </div>
      </div>
    </div>
  );
}
