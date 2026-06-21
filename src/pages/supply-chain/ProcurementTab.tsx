import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import { purchaseOrders, purchaseTrend, supplierDistribution, supplierRatings } from "@/mock/supplyChain";
import { ShoppingCart, TrendingUp, Plus, Download } from "lucide-react";

const PALETTE = ["#1E3A5F", "#D4AF37", "#3182CE", "#38A169", "#DD6B20", "#805AD5"];

const statusBadge: Record<string, string> = {
  已发货: "bg-info/10 text-info",
  待审批: "bg-accent/15 text-accent-dark",
  已完成: "bg-success/10 text-success",
};

const levelBadge: Record<string, string> = {
  A: "bg-success/15 text-success",
  B: "bg-info/15 text-info",
  C: "bg-warning/15 text-warning",
};

const fmt = (n: number) => `¥${n.toLocaleString()}`;

export default function ProcurementTab() {
  // 采购金额趋势 + 订单数组合图
  const trendOption: EChartsOption = {
    tooltip: { trigger: "axis", backgroundColor: "rgba(30,58,95,0.95)", borderColor: "#D4AF37", borderWidth: 1, textStyle: { color: "#fff", fontSize: 12 } },
    legend: { data: ["采购金额(万)", "订单数"], top: 0, right: 0, textStyle: { fontSize: 12, color: "#718096" } },
    grid: { left: 40, right: 40, top: 36, bottom: 30 },
    xAxis: { type: "category", data: purchaseTrend.months, axisLine: { lineStyle: { color: "#E2E8F0" } }, axisLabel: { color: "#718096", fontSize: 11 } },
    yAxis: [
      { type: "value", name: "金额(万)", axisLabel: { color: "#718096", fontSize: 11 }, splitLine: { lineStyle: { color: "#EDF2F7" } } },
      { type: "value", name: "订单数", axisLabel: { color: "#718096", fontSize: 11 }, splitLine: { show: false } },
    ],
    series: [
      {
        name: "采购金额(万)",
        type: "bar",
        data: purchaseTrend.amounts,
        barWidth: "40%",
        itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#1E3A5F" }, { offset: 1, color: "#2C5282" }] }, borderRadius: [4, 4, 0, 0] },
      },
      {
        name: "订单数",
        type: "line",
        yAxisIndex: 1,
        data: purchaseTrend.orderCount,
        smooth: true,
        symbol: "circle",
        symbolSize: 7,
        lineStyle: { color: "#D4AF37", width: 2 },
        itemStyle: { color: "#D4AF37", borderColor: "#fff", borderWidth: 2 },
      },
    ],
  };

  // 供应商分布饼图
  const pieOption: EChartsOption = {
    tooltip: { trigger: "item", formatter: "{b}: ¥{c} ({d}%)", backgroundColor: "rgba(30,58,95,0.95)", borderColor: "#D4AF37", borderWidth: 1, textStyle: { color: "#fff", fontSize: 12 } },
    legend: { orient: "vertical", right: 0, top: "center", textStyle: { fontSize: 11, color: "#4A5568" } },
    series: [
      {
        type: "pie",
        radius: ["45%", "70%"],
        center: ["35%", "50%"],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 13, fontWeight: "bold" } },
        data: supplierDistribution.map((s, i) => ({ name: s.name, value: s.value, itemStyle: { color: PALETTE[i % PALETTE.length] } })),
      },
    ],
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* 操作栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-caption text-ink-mute">
          <ShoppingCart className="w-4 h-4" />
          共 {purchaseOrders.length} 笔采购订单
        </div>
        <div className="flex items-center gap-2">
          <button className="qj-btn-ghost text-caption flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> 导出
          </button>
          <button className="qj-btn-primary text-caption flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> 新建采购单
          </button>
        </div>
      </div>

      {/* 趋势 + 供应商分布 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="qj-card p-5 lg:col-span-2">
          <h3 className="text-h3 font-semibold text-ink mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> 采购金额趋势
          </h3>
          <ReactECharts option={trendOption} style={{ height: 280 }} />
        </div>
        <div className="qj-card p-5">
          <h3 className="text-h3 font-semibold text-ink mb-3">供应商分布</h3>
          <ReactECharts option={pieOption} style={{ height: 280 }} />
        </div>
      </div>

      {/* 采购订单表 */}
      <div className="qj-card p-5">
        <h3 className="text-h3 font-semibold text-ink mb-4">采购订单列表</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-body whitespace-nowrap">
            <thead>
              <tr className="text-caption text-ink-mute border-b border-gray-100">
                <th className="text-left font-medium py-2.5 px-2">订单号</th>
                <th className="text-left font-medium py-2.5 px-2">供应商</th>
                <th className="text-left font-medium py-2.5 px-2">类目</th>
                <th className="text-right font-medium py-2.5 px-2">数量</th>
                <th className="text-right font-medium py-2.5 px-2">金额</th>
                <th className="text-center font-medium py-2.5 px-2">采购日期</th>
                <th className="text-center font-medium py-2.5 px-2">预计到货</th>
                <th className="text-center font-medium py-2.5 px-2">采购员</th>
                <th className="text-right font-medium py-2.5 px-2">状态</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 last:border-0 hover:bg-card transition-colors">
                  <td className="py-3 px-2 tnum text-primary font-medium">{o.id}</td>
                  <td className="py-3 px-2 text-ink-soft">{o.supplier}</td>
                  <td className="py-3 px-2">
                    <span className="qj-badge bg-gray-100 text-ink-soft">{o.category}</span>
                  </td>
                  <td className="py-3 px-2 text-right tnum text-ink-soft">{o.quantity} {o.unit}</td>
                  <td className="py-3 px-2 text-right tnum text-ink font-medium">{fmt(o.amount)}</td>
                  <td className="py-3 px-2 text-center tnum text-ink-mute">{o.date}</td>
                  <td className="py-3 px-2 text-center tnum text-ink-mute">{o.expectedDate}</td>
                  <td className="py-3 px-2 text-center text-ink-soft">{o.buyer}</td>
                  <td className="py-3 px-2 text-right">
                    <span className={`qj-badge ${statusBadge[o.status]}`}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 供应商评级 */}
      <div className="qj-card p-5">
        <h3 className="text-h3 font-semibold text-ink mb-4">供应商评级</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {supplierRatings.map((s) => (
            <div key={s.name} className="border border-gray-100 rounded-lg p-4 hover:shadow-card transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="text-body text-ink font-medium truncate">{s.name}</div>
                <span className={`qj-badge ${levelBadge[s.level]}`}>{s.level}级</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-mini text-ink-mute">订单数</div>
                  <div className="text-body tnum text-ink font-semibold">{s.orders}</div>
                </div>
                <div>
                  <div className="text-mini text-ink-mute">累计金额</div>
                  <div className="text-body tnum text-ink font-semibold">{fmt(s.amount)}</div>
                </div>
                <div>
                  <div className="text-mini text-ink-mute">准时率</div>
                  <div className="text-body tnum text-success font-semibold">{s.onTimeRate}%</div>
                </div>
                <div>
                  <div className="text-mini text-ink-mute">合格率</div>
                  <div className="text-body tnum text-success font-semibold">{s.qualityRate}%</div>
                </div>
              </div>
              <div className="text-mini text-ink-mute pt-3 border-t border-gray-50">{s.contact}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
