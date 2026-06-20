import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface RadarChartProps {
  data: { name: string; score: number; fullMark?: number }[];
  height?: number;
  showLegend?: boolean;
}

export default function RadarChart({ data, height = 280, showLegend = false }: RadarChartProps) {
  const option: EChartsOption = {
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(30,58,95,0.95)",
      borderColor: "#D4AF37",
      borderWidth: 1,
      textStyle: { color: "#fff", fontSize: 12 },
    },
    radar: {
      indicator: data.map((d) => ({
        name: d.name,
        max: d.fullMark || 100,
      })),
      shape: "polygon",
      radius: "68%",
      center: ["50%", "52%"],
      axisName: {
        color: "#4A5568",
        fontSize: 12,
        fontWeight: 500,
      },
      splitArea: {
        areaStyle: {
          color: ["rgba(30,58,95,0.02)", "rgba(30,58,95,0.04)", "rgba(30,58,95,0.06)", "rgba(30,58,95,0.08)"],
        },
      },
      axisLine: {
        lineStyle: { color: "rgba(30,58,95,0.15)" },
      },
      splitLine: {
        lineStyle: { color: "rgba(30,58,95,0.12)" },
      },
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: data.map((d) => d.score),
            name: "企业评分",
            areaStyle: {
              color: "rgba(30,58,95,0.25)",
            },
            lineStyle: {
              color: "#D4AF37",
              width: 2,
            },
            itemStyle: {
              color: "#D4AF37",
              borderColor: "#fff",
              borderWidth: 2,
            },
            symbolSize: 6,
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: `${height}px`, width: "100%" }} />;
}
