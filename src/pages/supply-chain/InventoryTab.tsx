import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import { lowStockItems, inventoryCategory, inventoryTurnover, stockMovements } from "@/mock/supplyChain";
import { AlertTriangle, ArrowDownToLine, ArrowUpFromLine, Package, Plus } from "lucide-react";

const PALETTE = ["#1E3A5F", "#D4AF37", "#3182CE", "#38A169", "#DD6B20", "#805AD5"];

const stockBadge: Record<string, string> = {
  紧急: "bg-danger/10 text-danger",
  预警: "bg-warning/10 text-warning",
};

const fmt = (n: number) => `¥${n.toLocaleString()}`;

export default function InventoryTab() {
  // 库存分类分布
  const categoryOption: EChartsOption = {
    tooltip: { trigger: "item", formatter: "{b}: ¥{c} ({d}%)", backgroundColor: "rgba(30,58,95,0.95)", borderColor: "#D4AF37", borderWidth: 1, textStyle: { color: "#fff", fontSize: 12 } },
    legend: { orient: "vertical", right: 0, top: "center", textStyle: { fontSize: 11, color: "#4A5568" } },
    series: [
      {
        type: "pie",
        radius: ["45%", "70%"],
        center: ["35%", "50%"],
        label: { show: false },
        data: inventoryCategory.map((c, i) => ({ name: c.name, value: c.value, itemStyle: { color: PALETTE[i % PALETTE.length] } })),
      },
    ],
  };

  // 库存周转趋势
  const turnoverOption: EChartsOption = {
    tooltip: { trigger: "axis", backgroundColor: "rgba(30,58,95,0.95)", borderColor: "#D4AF37", borderWidth: 1, textStyle: { color: "#fff", fontSize: 12 } },
    legend: { data: ["我司周转天数", "行业均值"], top: 0, right: 0, textStyle: { fontSize: 12, color: "#718096" } },
    grid: { left: 40, right: 20, top: 36, bottom: 30 },
    xAxis: { type: "category", data: inventoryTurnover.months, axisLine: { lineStyle: { color: "#E2E8F0" } }, axisLabel: { color: "#718096", fontSize: 11 } },
    yAxis: { type: "value", name: "天数", axisLabel: { color: "#718096", fontSize: 11 }, splitLine: { lineStyle: { color: "#EDF2F7" } } },
    series: [
      {
        name: "我司周转天数",
        type: "line",
        data: inventoryTurnover.turnover,
        smooth: true,
        symbol: "circle",
        symbolSize: 7,
        lineStyle: { color: "#1E3A5F", width: 2.5 },
        itemStyle: { color: "#1E3A5F", borderColor: "#fff", borderWidth: 2 },
        areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(30,58,95,0.2)" }, { offset: 1, color: "rgba(30,58,95,0)" }] } },
      },
      {
        name: "行业均值",
        type: "line",
        data: inventoryTurnover.industry,
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { color: "#D4AF37", width: 2, type: "dashed" },
        itemStyle: { color: "#D4AF37" },
      },
    ],
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* 操作栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-caption text-ink-mute">
          <Package className="w-4 h-4" />
          库存总值 <span className="text-primary font-semibold tnum">¥128万</span> · 共 201 个 SKU
        </div>
        <button className="qj-btn-primary text-caption flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" /> 新增入库
        </button>
      </div>

      {/* 库存预警 */}
      <div className="qj-card p-5">
        <h3 className="text-h3 font-semibold text-ink mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-danger" /> 库存预警
          <span className="qj-badge bg-danger/10 text-danger ml-1">{lowStockItems.length}项</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-body whitespace-nowrap">
            <thead>
              <tr className="text-caption text-ink-mute border-b border-gray-100">
                <th className="text-left font-medium py-2.5 px-2">物料名称</th>
                <th className="text-left font-medium py-2.5 px-2">SKU</th>
                <th className="text-left font-medium py-2.5 px-2">分类</th>
                <th className="text-right font-medium py-2.5 px-2">当前库存</th>
                <th className="text-right font-medium py-2.5 px-2">安全库存</th>
                <th className="text-center font-medium py-2.5 px-2">可用天数</th>
                <th className="text-right font-medium py-2.5 px-2">库存价值</th>
                <th className="text-right font-medium py-2.5 px-2">状态</th>
                <th className="text-right font-medium py-2.5 px-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-card transition-colors">
                  <td className="py-3 px-2 text-ink font-medium">{item.name}</td>
                  <td className="py-3 px-2 tnum text-ink-mute">{item.sku}</td>
                  <td className="py-3 px-2">
                    <span className="qj-badge bg-gray-100 text-ink-soft">{item.category}</span>
                  </td>
                  <td className="py-3 px-2 text-right tnum text-danger font-semibold">{item.current} {item.unit}</td>
                  <td className="py-3 px-2 text-right tnum text-ink-mute">{item.safe} {item.unit}</td>
                  <td className="py-3 px-2 text-center tnum text-ink-soft">{item.days}天</td>
                  <td className="py-3 px-2 text-right tnum text-ink-soft">{fmt(item.value)}</td>
                  <td className="py-3 px-2 text-right">
                    <span className={`qj-badge ${stockBadge[item.status]}`}>{item.status}</span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button className="text-caption text-primary hover:text-accent font-medium">立即采购</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 分类分布 + 周转趋势 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="qj-card p-5">
          <h3 className="text-h3 font-semibold text-ink mb-3">库存分类分布</h3>
          <ReactECharts option={categoryOption} style={{ height: 260 }} />
        </div>
        <div className="qj-card p-5">
          <h3 className="text-h3 font-semibold text-ink mb-3">库存周转趋势</h3>
          <ReactECharts option={turnoverOption} style={{ height: 260 }} />
        </div>
      </div>

      {/* 入库出库记录 */}
      <div className="qj-card p-5">
        <h3 className="text-h3 font-semibold text-ink mb-4"> recent 出入库记录</h3>
        <div className="space-y-2">
          {stockMovements.map((m) => (
            <div key={m.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-card transition-colors">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${m.type === "in" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                {m.type === "in" ? <ArrowDownToLine className="w-[18px] h-[18px]" /> : <ArrowUpFromLine className="w-[18px] h-[18px]" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-body text-ink font-medium">{m.material}</span>
                  <span className={`qj-badge ${m.type === "in" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                    {m.type === "in" ? "入库" : "出库"}
                  </span>
                </div>
                <div className="text-caption text-ink-mute">
                  操作员：{m.operator} · 关联单号：<span className="tnum text-primary">{m.ref}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className={`tnum text-body font-semibold ${m.type === "in" ? "text-success" : "text-warning"}`}>
                  {m.type === "in" ? "+" : "-"}{m.quantity}
                </div>
                <div className="text-mini text-ink-mute">{m.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
