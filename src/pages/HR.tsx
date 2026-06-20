import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import {
  Users,
  UserPlus,
  UserMinus,
  FileCheck,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

const PALETTE = ["#1E3A5F", "#D4AF37", "#3182CE", "#38A169", "#DD6B20", "#E53E3E", "#805AD5"];

const departments = [
  { name: "生产部", value: 42 },
  { name: "销售部", value: 18 },
  { name: "研发部", value: 12 },
  { name: "行政部", value: 8 },
  { name: "财务部", value: 6 },
];

const positions = [
  { name: "高级前端工程师", need: 2, interviewed: 5, status: "面试中" },
  { name: "销售经理", need: 1, interviewed: 3, status: "终面" },
  { name: "生产主管", need: 1, interviewed: 2, status: "待安排" },
];

const attendance = {
  depts: ["生产部", "销售部", "研发部", "行政部", "财务部"],
  rates: [96.5, 94.2, 98.1, 92.8, 97.3],
};

const warnings = [
  {
    title: "合同即将到期",
    desc: "5名员工合同将于30天内到期，请及时办理续签手续",
    count: 5,
    level: "warning" as const,
  },
  {
    title: "社保基数调整",
    desc: "本年度社保缴费基数已更新，需核对8月薪酬计算",
    count: 1,
    level: "info" as const,
  },
];

const statusBadgeClass: Record<string, string> = {
  面试中: "bg-info/10 text-info",
  终面: "bg-accent/15 text-accent-dark",
  待安排: "bg-gray-100 text-ink-mute",
};

export default function HR() {
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
        data: departments,
      },
    ],
  };

  const barOption: EChartsOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, formatter: "{b}: {c}%" },
    grid: { left: 45, right: 20, top: 20, bottom: 30 },
    xAxis: {
      type: "category",
      data: attendance.depts,
      axisLabel: { fontSize: 11, color: "#4A5568" },
      axisLine: { lineStyle: { color: "#E2E8F0" } },
    },
    yAxis: {
      type: "value",
      max: 100,
      axisLabel: { fontSize: 11, color: "#718096", formatter: "{value}%" },
      splitLine: { lineStyle: { color: "#EDF2F7" } },
    },
    series: [
      {
        type: "bar",
        data: attendance.rates,
        barWidth: "40%",
        itemStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "#1E3A5F" },
              { offset: 1, color: "#3182CE" },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <PageHeader title="人力资源管家" subtitle="智能招聘 · 考勤薪酬 · 在线培训 · 用工风险预警" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="在职员工" value="86人" change={2} trend="up" icon={<Users className="w-[18px] h-[18px]" />} accentColor="#1E3A5F" />
        <StatCard label="本月入职" value="3人" icon={<UserPlus className="w-[18px] h-[18px]" />} accentColor="#38A169" />
        <StatCard label="本月离职" value="1人" icon={<UserMinus className="w-[18px] h-[18px]" />} accentColor="#DD6B20" />
        <StatCard label="待审批" value="4项" icon={<FileCheck className="w-[18px] h-[18px]" />} accentColor="#D4AF37" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4">部门人员分布</h2>
          <ReactECharts option={doughnutOption} style={{ height: 280 }} />
        </div>

        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4">招聘进度</h2>
          <table className="w-full text-body">
            <thead>
              <tr className="text-caption text-ink-mute border-b border-gray-100">
                <th className="text-left font-medium py-2.5">岗位</th>
                <th className="text-center font-medium py-2.5">需求人数</th>
                <th className="text-center font-medium py-2.5">已面试</th>
                <th className="text-right font-medium py-2.5">状态</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((p) => (
                <tr key={p.name} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 text-ink font-medium">{p.name}</td>
                  <td className="py-3 text-center tnum text-ink-soft">{p.need}</td>
                  <td className="py-3 text-center tnum text-ink-soft">{p.interviewed}</td>
                  <td className="py-3 text-right">
                    <span className={`qj-badge ${statusBadgeClass[p.status]}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4">考勤概览（本周）</h2>
          <ReactECharts option={barOption} style={{ height: 280 }} />
        </div>

        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            用工风险预警
          </h2>
          <div className="space-y-3">
            {warnings.map((w) => {
              const color = w.level === "warning" ? "#DD6B20" : "#3182CE";
              const bg = w.level === "warning" ? "bg-orange-50" : "bg-blue-50";
              const Icon = w.level === "warning" ? AlertTriangle : ShieldCheck;
              return (
                <div key={w.title} className={`flex items-start gap-3 p-4 rounded-lg border border-gray-100 ${bg}`}>
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0" style={{ color }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-body font-medium text-ink">{w.title}</span>
                      <span className="qj-badge bg-white" style={{ color }}>
                        {w.count}项
                      </span>
                    </div>
                    <p className="text-caption text-ink-soft">{w.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
