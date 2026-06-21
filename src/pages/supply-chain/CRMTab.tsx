import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import { topCustomers, customerLevels, customerList, followUps } from "@/mock/supplyChain";
import { Users, Plus, Phone, Crown, Star, Clock } from "lucide-react";

const PALETTE = ["#1E3A5F", "#D4AF37", "#3182CE", "#38A169", "#DD6B20"];

const levelBadge: Record<string, string> = {
  钻石: "bg-purple-100 text-purple-700",
  金卡: "bg-accent/15 text-accent-dark",
  银卡: "bg-gray-100 text-gray-600",
  普通: "bg-blue-50 text-info",
};

const statusBadge: Record<string, string> = {
  活跃: "bg-success/10 text-success",
  沉睡: "bg-warning/10 text-warning",
  流失: "bg-danger/10 text-danger",
};

const priorityBadge: Record<string, string> = {
  高: "bg-danger/10 text-danger",
  中: "bg-warning/10 text-warning",
  低: "bg-info/10 text-info",
};

const fmt = (n: number) => `¥${n.toLocaleString()}`;

export default function CRMTab() {
  // 客户TOP5
  const topOption: EChartsOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, formatter: (p: any) => `${p[0].name}<br/>累计销售额：¥${p[0].value.toLocaleString()}` },
    grid: { left: 110, right: 50, top: 10, bottom: 20 },
    xAxis: { type: "value", axisLabel: { fontSize: 11, color: "#718096", formatter: (v: number) => `${v / 10000}万` }, splitLine: { lineStyle: { color: "#EDF2F7" } } },
    yAxis: { type: "category", data: topCustomers.names, axisLabel: { fontSize: 12, color: "#4A5568" }, axisLine: { lineStyle: { color: "#E2E8F0" } } },
    series: [
      {
        type: "bar",
        data: topCustomers.values,
        barWidth: "55%",
        itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: "#D4AF37" }, { offset: 1, color: "#E5C158" }] }, borderRadius: [0, 4, 4, 0] },
        label: { show: true, position: "right", formatter: (p: any) => `${(p.value / 10000).toFixed(1)}万`, fontSize: 11, color: "#4A5568" },
      },
    ],
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* 操作栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-caption text-ink-mute">
          <Users className="w-4 h-4" />
          共 68 位客户 · 活跃客户 52 位
        </div>
        <button className="qj-btn-primary text-caption flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" /> 新增客户
        </button>
      </div>

      {/* 客户分级卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {customerLevels.map((lv) => (
          <div key={lv.level} className="qj-card p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-10" style={{ background: lv.color }} />
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${lv.color}15`, color: lv.color }}>
                {lv.level === "钻石客户" ? <Crown className="w-4 h-4" /> : <Star className="w-4 h-4" />}
              </div>
              <span className="text-body text-ink font-semibold">{lv.level}</span>
            </div>
            <div className="text-h2 tnum font-bold text-ink mb-1">{lv.count}<span className="text-caption text-ink-mute font-normal ml-1">位</span></div>
            <div className="text-caption tnum text-ink-soft mb-1">累计 ¥{(lv.revenue / 10000).toFixed(0)}万</div>
            <div className="text-mini text-ink-mute">{lv.desc}</div>
          </div>
        ))}
      </div>

      {/* TOP5 + 客户列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="qj-card p-5">
          <h3 className="text-h3 font-semibold text-ink mb-3">客户销售额 TOP5</h3>
          <ReactECharts option={topOption} style={{ height: 240 }} />
        </div>

        <div className="qj-card p-5 lg:col-span-2">
          <h3 className="text-h3 font-semibold text-ink mb-4">客户列表</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-body whitespace-nowrap">
              <thead>
                <tr className="text-caption text-ink-mute border-b border-gray-100">
                  <th className="text-left font-medium py-2.5 px-2">客户名称</th>
                  <th className="text-left font-medium py-2.5 px-2">联系人</th>
                  <th className="text-left font-medium py-2.5 px-2">行业</th>
                  <th className="text-right font-medium py-2.5 px-2">累计金额</th>
                  <th className="text-center font-medium py-2.5 px-2">最近下单</th>
                  <th className="text-center font-medium py-2.5 px-2">等级</th>
                  <th className="text-right font-medium py-2.5 px-2">状态</th>
                </tr>
              </thead>
              <tbody>
                {customerList.map((c) => (
                  <tr key={c.id} className="border-b border-gray-50 last:border-0 hover:bg-card transition-colors">
                    <td className="py-3 px-2 text-ink font-medium">{c.name}</td>
                    <td className="py-3 px-2">
                      <div className="text-ink-soft">{c.contact}</div>
                      <div className="text-mini text-ink-mute tnum">{c.phone}</div>
                    </td>
                    <td className="py-3 px-2 text-ink-soft">{c.industry}</td>
                    <td className="py-3 px-2 text-right tnum text-ink font-medium">{fmt(c.totalAmount)}</td>
                    <td className="py-3 px-2 text-center tnum text-ink-mute">{c.lastOrder}</td>
                    <td className="py-3 px-2 text-center">
                      <span className={`qj-badge ${levelBadge[c.level]}`}>{c.level}</span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className={`qj-badge ${statusBadge[c.status]}`}>{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 客户跟进 */}
      <div className="qj-card p-5">
        <h3 className="text-h3 font-semibold text-ink mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent" /> 客户跟进记录
        </h3>
        <div className="space-y-3">
          {followUps.map((f) => (
            <div key={f.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-50 hover:shadow-card transition-all">
              <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                <Phone className="w-[18px] h-[18px] text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-body text-ink font-medium">{f.customer}</span>
                  <span className={`qj-badge ${priorityBadge[f.priority]}`}>{f.priority}优先级</span>
                </div>
                <p className="text-caption text-ink-soft mb-1">{f.content}</p>
                <div className="flex items-center gap-3 text-mini text-ink-mute">
                  <span>跟进人：{f.salesperson}</span>
                  <span>·</span>
                  <span className="tnum">{f.date}</span>
                  <span>·</span>
                  <span className="text-accent">下次跟进：{f.nextDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
