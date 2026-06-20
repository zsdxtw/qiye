import { useState } from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import { financeOverview, invoices, vouchers } from "@/mock/finance";
import { Upload, TrendingUp, PiggyBank, Wallet, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

const CHART_COLORS = ["#1E3A5F", "#D4AF37", "#3182CE", "#38A169", "#DD6B20", "#E53E3E"];

interface InvoiceRow {
  id: string;
  code: string;
  type: string;
  category: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  seller?: string;
  buyer?: string;
  date: string;
  status: string;
}

const fmtMoney = (n: number) => `¥${n.toLocaleString("zh-CN")}`;

export default function Finance() {
  const [activeTab, setActiveTab] = useState<"invoice" | "voucher">("invoice");
  const { revenueProfitTrend, accountBalance, cashflowData } = financeOverview;

  // 营收利润趋势
  const revenueOption: EChartsOption = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(30,58,95,0.95)",
      borderColor: "#D4AF37",
      borderWidth: 1,
      textStyle: { color: "#fff", fontSize: 12 },
    },
    legend: { data: ["营收", "利润", "成本"], bottom: 0, textStyle: { color: "#4A5568" } },
    grid: { left: "3%", right: "4%", bottom: "14%", top: "8%", containLabel: true },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: revenueProfitTrend.months,
      axisLine: { lineStyle: { color: "#E2E8F0" } },
      axisLabel: { color: "#718096" },
    },
    yAxis: {
      type: "value",
      name: "万元",
      nameTextStyle: { color: "#A0AEC0" },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#718096" },
      splitLine: { lineStyle: { color: "#EDF2F7" } },
    },
    series: [
      {
        name: "营收",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        data: revenueProfitTrend.revenue,
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
        name: "利润",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        data: revenueProfitTrend.profit,
        itemStyle: { color: CHART_COLORS[1] },
        lineStyle: { color: CHART_COLORS[1], width: 2.5 },
      },
      {
        name: "成本",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        data: revenueProfitTrend.cost,
        itemStyle: { color: CHART_COLORS[2] },
        lineStyle: { color: CHART_COLORS[2], width: 2.5 },
      },
    ],
  };

  // 科目余额分布（环形图）
  const balanceOption: EChartsOption = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: ¥{c} ({d}%)",
      backgroundColor: "rgba(30,58,95,0.95)",
      borderColor: "#D4AF37",
      borderWidth: 1,
      textStyle: { color: "#fff", fontSize: 12 },
    },
    legend: { bottom: 0, type: "scroll", textStyle: { color: "#4A5568" } },
    color: CHART_COLORS,
    series: [
      {
        type: "pie",
        radius: ["42%", "70%"],
        center: ["50%", "45%"],
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: "bold", formatter: "{b}\n{d}%" },
        },
        data: accountBalance.map((a) => ({ name: a.name, value: a.value })),
      },
    ],
  };

  // 现金流瀑布图
  const baseData: number[] = [];
  const valueData: { value: number; itemStyle: { color: string } }[] = [];
  let running = 0;
  cashflowData.forEach((item, idx) => {
    const isTotal = idx === 0 || idx === cashflowData.length - 1;
    if (isTotal) {
      baseData.push(0);
      valueData.push({ value: item.value, itemStyle: { color: CHART_COLORS[0] } });
      running = item.value;
    } else if (item.value >= 0) {
      baseData.push(running);
      valueData.push({ value: item.value, itemStyle: { color: CHART_COLORS[3] } });
      running += item.value;
    } else {
      running += item.value;
      baseData.push(running);
      valueData.push({ value: -item.value, itemStyle: { color: CHART_COLORS[5] } });
    }
  });

  const cashflowOption: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: any) => {
        const item = cashflowData[params[0].dataIndex];
        return `${item.name}<br/>金额：${item.value >= 0 ? "+" : ""}${item.value} 万`;
      },
      backgroundColor: "rgba(30,58,95,0.95)",
      borderColor: "#D4AF37",
      borderWidth: 1,
      textStyle: { color: "#fff", fontSize: 12 },
    },
    grid: { left: "3%", right: "4%", bottom: "8%", top: "8%", containLabel: true },
    xAxis: {
      type: "category",
      data: cashflowData.map((d) => d.name),
      axisLine: { lineStyle: { color: "#E2E8F0" } },
      axisLabel: { color: "#718096" },
    },
    yAxis: {
      type: "value",
      name: "万元",
      nameTextStyle: { color: "#A0AEC0" },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#718096" },
      splitLine: { lineStyle: { color: "#EDF2F7" } },
    },
    series: [
      {
        name: "base",
        type: "bar",
        stack: "waterfall",
        itemStyle: { color: "transparent" },
        barWidth: "45%",
        data: baseData,
      },
      {
        name: "金额",
        type: "bar",
        stack: "waterfall",
        barWidth: "45%",
        data: valueData,
        label: {
          show: true,
          position: "top",
          color: "#4A5568",
          fontSize: 11,
          formatter: (p: any) => {
            const item = cashflowData[p.dataIndex];
            return `${item.value >= 0 ? "+" : ""}${item.value}`;
          },
        },
      },
    ],
  };

  const statIcons = [TrendingUp, PiggyBank, Wallet, Receipt];

  return (
    <div className="p-6 space-y-5">
      <PageHeader
        title="智能财务中心"
        subtitle="AI自动记账 · 实时仪表盘 · 预算管控"
        actions={
          <button className="qj-btn-primary flex items-center gap-2">
            <Upload className="w-4 h-4" />
            上传发票
          </button>
        }
      />

      {/* 关键指标 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {financeOverview.stats.map((stat, idx) => {
          const Icon = statIcons[idx];
          return (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.display}
              change={stat.change}
              trend={stat.trend as "up" | "down"}
              icon={<Icon className="w-[18px] h-[18px]" />}
              accentColor={CHART_COLORS[idx]}
            />
          );
        })}
      </div>

      {/* 营收趋势 + 科目余额 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="qj-card p-5 lg:col-span-2">
          <h2 className="text-h3 font-semibold text-ink mb-4">营收利润趋势（近12个月）</h2>
          <ReactECharts option={revenueOption} style={{ height: "320px", width: "100%" }} />
        </div>
        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4">科目余额分布</h2>
          <ReactECharts option={balanceOption} style={{ height: "320px", width: "100%" }} />
        </div>
      </div>

      {/* 现金流瀑布 */}
      <div className="qj-card p-5">
        <h2 className="text-h3 font-semibold text-ink mb-4">现金流瀑布图（万元）</h2>
        <ReactECharts option={cashflowOption} style={{ height: "300px", width: "100%" }} />
      </div>

      {/* 发票 / 凭证 */}
      <div className="qj-card p-5">
        <div className="flex gap-1 mb-4 border-b border-gray-100">
          {[
            { key: "invoice", label: "发票管理" },
            { key: "voucher", label: "凭证管理" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "invoice" | "voucher")}
              className={cn(
                "px-4 py-2.5 text-body font-medium border-b-2 transition-colors",
                activeTab === tab.key
                  ? "text-primary border-accent"
                  : "text-ink-mute border-transparent hover:text-ink"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "invoice" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-body">
              <thead>
                <tr className="text-caption text-ink-mute border-b border-gray-100">
                  <th className="text-left font-medium py-3 px-2">发票代码</th>
                  <th className="text-left font-medium py-3 px-2">类型</th>
                  <th className="text-left font-medium py-3 px-2">类目</th>
                  <th className="text-right font-medium py-3 px-2">金额</th>
                  <th className="text-right font-medium py-3 px-2">税额</th>
                  <th className="text-right font-medium py-3 px-2">价税合计</th>
                  <th className="text-left font-medium py-3 px-2">交易方</th>
                  <th className="text-left font-medium py-3 px-2">日期</th>
                  <th className="text-left font-medium py-3 px-2">状态</th>
                </tr>
              </thead>
              <tbody>
                {(invoices as unknown as InvoiceRow[]).map((inv) => {
                  const counterparty = inv.seller ?? inv.buyer ?? "-";
                  return (
                    <tr key={inv.id} className="border-b border-gray-50 hover:bg-card transition-colors">
                      <td className="py-3 px-2 tnum text-ink-soft text-caption">{inv.code}</td>
                      <td className="py-3 px-2">
                        <span className={cn("qj-badge", inv.type === "进项" ? "bg-blue-50 text-info" : "bg-accent/15 text-accent-dark")}>
                          {inv.type}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-ink-soft">{inv.category}</td>
                      <td className="py-3 px-2 text-right tnum text-ink">{fmtMoney(inv.amount)}</td>
                      <td className="py-3 px-2 text-right tnum text-ink-soft">{fmtMoney(inv.taxAmount)}</td>
                      <td className="py-3 px-2 text-right tnum text-ink font-medium">{fmtMoney(inv.totalAmount)}</td>
                      <td className="py-3 px-2 text-ink-soft truncate max-w-[160px]">{counterparty}</td>
                      <td className="py-3 px-2 tnum text-ink-mute text-caption">{inv.date}</td>
                      <td className="py-3 px-2">
                        <span className={cn("qj-badge", inv.status === "已入账" ? "bg-green-50 text-success" : "bg-orange-50 text-warning")}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-body">
              <thead>
                <tr className="text-caption text-ink-mute border-b border-gray-100">
                  <th className="text-left font-medium py-3 px-2">凭证号</th>
                  <th className="text-left font-medium py-3 px-2">日期</th>
                  <th className="text-left font-medium py-3 px-2">摘要</th>
                  <th className="text-left font-medium py-3 px-2">借方科目</th>
                  <th className="text-left font-medium py-3 px-2">贷方科目</th>
                  <th className="text-right font-medium py-3 px-2">金额</th>
                  <th className="text-left font-medium py-3 px-2">制单人</th>
                  <th className="text-left font-medium py-3 px-2">状态</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((v) => (
                  <tr key={v.id} className="border-b border-gray-50 hover:bg-card transition-colors">
                    <td className="py-3 px-2 tnum text-ink font-medium text-caption">{v.number}</td>
                    <td className="py-3 px-2 tnum text-ink-mute text-caption">{v.date}</td>
                    <td className="py-3 px-2 text-ink-soft">{v.summary}</td>
                    <td className="py-3 px-2 text-ink-soft">{v.debit}</td>
                    <td className="py-3 px-2 text-ink-soft">{v.credit}</td>
                    <td className="py-3 px-2 text-right tnum text-ink font-medium">{fmtMoney(v.amount)}</td>
                    <td className="py-3 px-2 text-ink-soft">{v.maker}</td>
                    <td className="py-3 px-2">
                      <span className={cn("qj-badge", v.status === "已审核" ? "bg-green-50 text-success" : "bg-orange-50 text-warning")}>
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
