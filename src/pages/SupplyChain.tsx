import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import { Package, Truck, AlertTriangle, Building2 } from "lucide-react";

const PALETTE = ["#1E3A5F", "#D4AF37", "#3182CE", "#38A169", "#DD6B20", "#E53E3E", "#805AD5"];

const lowStockItems = [
  { name: "不锈钢板材 304", current: 120, safe: 500, days: 18, status: "紧急" },
  { name: "电机轴承 6204", current: 45, safe: 200, days: 12, status: "预警" },
  { name: "包装纸箱 A型", current: 280, safe: 800, days: 9, status: "预警" },
];

const purchaseOrders = [
  { id: "PO-20260601", supplier: "上海钢铁集团", amount: 128000, status: "已发货", date: "06-15" },
  { id: "PO-20260602", supplier: "深圳电子元件", amount: 56400, status: "待审批", date: "06-18" },
  { id: "PO-20260603", supplier: "杭州包装材料", amount: 18900, status: "已完成", date: "06-12" },
  { id: "PO-20260604", supplier: "苏州机械配件", amount: 87300, status: "已发货", date: "06-19" },
];

const salesOrders = [
  { id: "SO-20260601", customer: "北京智联科技", amount: 256000, status: "待发货", date: "06-19" },
  { id: "SO-20260602", customer: "广州恒达制造", amount: 134500, status: "已发货", date: "06-18" },
  { id: "SO-20260603", customer: "深圳创新电子", amount: 98700, status: "已完成", date: "06-15" },
  { id: "SO-20260604", customer: "上海华联商贸", amount: 76200, status: "待发货", date: "06-20" },
];

const topCustomers = {
  names: ["北京智联科技", "广州恒达制造", "深圳创新电子", "上海华联商贸", "成都西部集团"],
  values: [856000, 624000, 487000, 352000, 298000],
};

const stockBadgeClass: Record<string, string> = {
  紧急: "bg-danger/10 text-danger",
  预警: "bg-warning/10 text-warning",
};

const orderBadgeClass: Record<string, string> = {
  已发货: "bg-info/10 text-info",
  待审批: "bg-accent/15 text-accent-dark",
  已完成: "bg-success/10 text-success",
  待发货: "bg-warning/10 text-warning",
};

const fmt = (n: number) => `¥${n.toLocaleString()}`;

export default function SupplyChain() {
  const barOption: EChartsOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, formatter: (p: any) => `${p[0].name}<br/>销售额：¥${p[0].value.toLocaleString()}` },
    grid: { left: 110, right: 30, top: 10, bottom: 20 },
    xAxis: { type: "value", axisLabel: { fontSize: 11, color: "#718096", formatter: (v: number) => `${v / 10000}万` }, splitLine: { lineStyle: { color: "#EDF2F7" } } },
    yAxis: { type: "category", data: topCustomers.names, axisLabel: { fontSize: 12, color: "#4A5568" }, axisLine: { lineStyle: { color: "#E2E8F0" } } },
    series: [
      {
        type: "bar",
        data: topCustomers.values,
        barWidth: "55%",
        itemStyle: {
          color: { type: "linear", x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: "#D4AF37" }, { offset: 1, color: "#E5C158" }] },
          borderRadius: [0, 4, 4, 0],
        },
        label: { show: true, position: "right", formatter: (p: any) => `${(p.value / 10000).toFixed(1)}万`, fontSize: 11, color: "#4A5568" },
      },
    ],
  };

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <PageHeader title="供应链与进销存" subtitle="采购管理 · 库存预警 · CRM · 物流追踪" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="库存周转" value="32天" change={3} trend="down" icon={<Package className="w-[18px] h-[18px]" />} accentColor="#1E3A5F" />
        <StatCard label="待发货" value="12单" icon={<Truck className="w-[18px] h-[18px]" />} accentColor="#DD6B20" />
        <StatCard label="库存预警" value="3项" icon={<AlertTriangle className="w-[18px] h-[18px]" />} accentColor="#E53E3E" />
        <StatCard label="供应商" value="48家" icon={<Building2 className="w-[18px] h-[18px]" />} accentColor="#D4AF37" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-danger" />
            库存预警
          </h2>
          <table className="w-full text-body">
            <thead>
              <tr className="text-caption text-ink-mute border-b border-gray-100">
                <th className="text-left font-medium py-2.5">物料名称</th>
                <th className="text-right font-medium py-2.5">当前库存</th>
                <th className="text-right font-medium py-2.5">安全库存</th>
                <th className="text-center font-medium py-2.5">周转天数</th>
                <th className="text-right font-medium py-2.5">状态</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item) => (
                <tr key={item.name} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 text-ink font-medium">{item.name}</td>
                  <td className="py-3 text-right tnum text-danger">{item.current}</td>
                  <td className="py-3 text-right tnum text-ink-mute">{item.safe}</td>
                  <td className="py-3 text-center tnum text-ink-soft">{item.days}天</td>
                  <td className="py-3 text-right">
                    <span className={`qj-badge ${stockBadgeClass[item.status]}`}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4">客户TOP5</h2>
          <ReactECharts option={barOption} style={{ height: 260 }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4">近期采购订单</h2>
          <table className="w-full text-body">
            <thead>
              <tr className="text-caption text-ink-mute border-b border-gray-100">
                <th className="text-left font-medium py-2.5">订单号</th>
                <th className="text-left font-medium py-2.5">供应商</th>
                <th className="text-right font-medium py-2.5">金额</th>
                <th className="text-center font-medium py-2.5">日期</th>
                <th className="text-right font-medium py-2.5">状态</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 tnum text-primary font-medium">{o.id}</td>
                  <td className="py-3 text-ink-soft">{o.supplier}</td>
                  <td className="py-3 text-right tnum text-ink font-medium">{fmt(o.amount)}</td>
                  <td className="py-3 text-center tnum text-ink-mute">{o.date}</td>
                  <td className="py-3 text-right">
                    <span className={`qj-badge ${orderBadgeClass[o.status]}`}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4">销售订单</h2>
          <table className="w-full text-body">
            <thead>
              <tr className="text-caption text-ink-mute border-b border-gray-100">
                <th className="text-left font-medium py-2.5">订单号</th>
                <th className="text-left font-medium py-2.5">客户</th>
                <th className="text-right font-medium py-2.5">金额</th>
                <th className="text-center font-medium py-2.5">日期</th>
                <th className="text-right font-medium py-2.5">状态</th>
              </tr>
            </thead>
            <tbody>
              {salesOrders.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 tnum text-primary font-medium">{o.id}</td>
                  <td className="py-3 text-ink-soft">{o.customer}</td>
                  <td className="py-3 text-right tnum text-ink font-medium">{fmt(o.amount)}</td>
                  <td className="py-3 text-center tnum text-ink-mute">{o.date}</td>
                  <td className="py-3 text-right">
                    <span className={`qj-badge ${orderBadgeClass[o.status]}`}>{o.status}</span>
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
