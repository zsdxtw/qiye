import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import { salesOrders, salesTrend, salesChannels, hotProducts } from "@/mock/supplyChain";
import { TrendingUp, Plus, Download, ArrowUpRight, ArrowDownRight } from "lucide-react";

const PALETTE = ["#1E3A5F", "#D4AF37", "#3182CE", "#38A169", "#DD6B20"];

const statusBadge: Record<string, string> = {
  待发货: "bg-warning/10 text-warning",
  已发货: "bg-info/10 text-info",
  已完成: "bg-success/10 text-success",
  生产中: "bg-accent/15 text-accent-dark",
};

const fmt = (n: number) => `¥${n.toLocaleString()}`;

export default function SalesTab() {
  // 销售趋势
  const trendOption: EChartsOption = {
    tooltip: { trigger: "axis", backgroundColor: "rgba(30,58,95,0.95)", borderColor: "#D4AF37", borderWidth: 1, textStyle: { color: "#fff", fontSize: 12 } },
    legend: { data: ["销售额(万)", "订单数"], top: 0, right: 0, textStyle: { fontSize: 12, color: "#718096" } },
    grid: { left: 40, right: 40, top: 36, bottom: 30 },
    xAxis: { type: "category", data: salesTrend.months, axisLine: { lineStyle: { color: "#E2E8F0" } }, axisLabel: { color: "#718096", fontSize: 11 } },
    yAxis: [
      { type: "value", name: "金额(万)", axisLabel: { color: "#718096", fontSize: 11 }, splitLine: { lineStyle: { color: "#EDF2F7" } } },
      { type: "value", name: "订单数", axisLabel: { color: "#718096", fontSize: 11 }, splitLine: { show: false } },
    ],
    series: [
      {
        name: "销售额(万)",
        type: "line",
        data: salesTrend.amounts,
        smooth: true,
        symbol: "circle",
        symbolSize: 7,
        lineStyle: { color: "#38A169", width: 2.5 },
        itemStyle: { color: "#38A169", borderColor: "#fff", borderWidth: 2 },
        areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(56,161,105,0.25)" }, { offset: 1, color: "rgba(56,161,105,0)" }] } },
      },
      {
        name: "订单数",
        type: "bar",
        yAxisIndex: 1,
        data: salesTrend.orderCount,
        barWidth: "35%",
        itemStyle: { color: "#D4AF37", borderRadius: [4, 4, 0, 0] },
      },
    ],
  };

  // 销售渠道
  const channelOption: EChartsOption = {
    tooltip: { trigger: "item", formatter: "{b}: {d}%", backgroundColor: "rgba(30,58,95,0.95)", borderColor: "#D4AF37", borderWidth: 1, textStyle: { color: "#fff", fontSize: 12 } },
    series: [
      {
        type: "pie",
        radius: ["50%", "75%"],
        center: ["50%", "50%"],
        label: { show: true, formatter: "{b}\n{d}%", fontSize: 11, color: "#4A5568" },
        labelLine: { length: 8, length2: 8 },
        data: salesChannels.map((c, i) => ({ name: c.name, value: c.value, itemStyle: { color: PALETTE[i % PALETTE.length] } })),
      },
    ],
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* 操作栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-caption text-ink-mute">
          <TrendingUp className="w-4 h-4" />
          共 {salesOrders.length} 笔销售订单 · 本月销售额 <span className="text-success font-semibold tnum">¥128万</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="qj-btn-ghost text-caption flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> 导出
          </button>
          <button className="qj-btn-primary text-caption flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> 新建销售单
          </button>
        </div>
      </div>

      {/* 趋势 + 渠道 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="qj-card p-5 lg:col-span-2">
          <h3 className="text-h3 font-semibold text-ink mb-3">销售趋势</h3>
          <ReactECharts option={trendOption} style={{ height: 280 }} />
        </div>
        <div className="qj-card p-5">
          <h3 className="text-h3 font-semibold text-ink mb-3">销售渠道分布</h3>
          <ReactECharts option={channelOption} style={{ height: 280 }} />
        </div>
      </div>

      {/* 热销产品 */}
      <div className="qj-card p-5">
        <h3 className="text-h3 font-semibold text-ink mb-4">热销产品排行</h3>
        <div className="space-y-3">
          {hotProducts.map((p, idx) => (
            <div key={p.name} className="flex items-center gap-4">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center tnum text-body font-bold shrink-0 ${idx === 0 ? "bg-accent text-primary-dark" : "bg-gray-100 text-ink-soft"}`}>
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-body text-ink font-medium">{p.name}</span>
                  <span className="tnum text-body text-ink font-semibold">{fmt(p.sales)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(p.sales / hotProducts[0].sales) * 100}%`, background: idx === 0 ? "#D4AF37" : "#1E3A5F" }}
                    />
                  </div>
                  <span className="text-mini text-ink-mute tnum shrink-0">{p.count}件</span>
                  <span className={`flex items-center gap-0.5 text-mini tnum shrink-0 ${p.growth >= 0 ? "text-success" : "text-danger"}`}>
                    {p.growth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(p.growth)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 销售订单表 */}
      <div className="qj-card p-5">
        <h3 className="text-h3 font-semibold text-ink mb-4">销售订单列表</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-body whitespace-nowrap">
            <thead>
              <tr className="text-caption text-ink-mute border-b border-gray-100">
                <th className="text-left font-medium py-2.5 px-2">订单号</th>
                <th className="text-left font-medium py-2.5 px-2">客户</th>
                <th className="text-left font-medium py-2.5 px-2">产品</th>
                <th className="text-right font-medium py-2.5 px-2">数量</th>
                <th className="text-right font-medium py-2.5 px-2">金额</th>
                <th className="text-center font-medium py-2.5 px-2">下单日期</th>
                <th className="text-center font-medium py-2.5 px-2">交货日期</th>
                <th className="text-center font-medium py-2.5 px-2">销售员</th>
                <th className="text-right font-medium py-2.5 px-2">状态</th>
              </tr>
            </thead>
            <tbody>
              {salesOrders.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 last:border-0 hover:bg-card transition-colors">
                  <td className="py-3 px-2 tnum text-primary font-medium">{o.id}</td>
                  <td className="py-3 px-2 text-ink-soft">{o.customer}</td>
                  <td className="py-3 px-2 text-ink-soft">{o.product}</td>
                  <td className="py-3 px-2 text-right tnum text-ink-soft">{o.quantity} {o.unit}</td>
                  <td className="py-3 px-2 text-right tnum text-ink font-medium">{fmt(o.amount)}</td>
                  <td className="py-3 px-2 text-center tnum text-ink-mute">{o.date}</td>
                  <td className="py-3 px-2 text-center tnum text-ink-mute">{o.deliveryDate}</td>
                  <td className="py-3 px-2 text-center text-ink-soft">{o.salesperson}</td>
                  <td className="py-3 px-2 text-right">
                    <span className={`qj-badge ${statusBadge[o.status]}`}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
