import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import {
  FileText,
  CalendarClock,
  Copyright,
  ShieldCheck,
  Send,
  Scale,
  Lightbulb,
  Briefcase,
} from "lucide-react";

const contracts = [
  { name: "年度采购框架协议", party: "上海钢铁集团", type: "采购合同", amount: "¥1,280,000", signDate: "2025-08-15", expireDate: "2026-08-14", status: "履行中" },
  { name: "办公场地租赁合同", party: "深圳湾科技园", type: "租赁合同", amount: "¥360,000", signDate: "2025-06-01", expireDate: "2026-07-15", status: "即将到期" },
  { name: "技术服务合作协议", party: "北京智联科技", type: "服务合同", amount: "¥580,000", signDate: "2025-09-10", expireDate: "2026-09-09", status: "履行中" },
  { name: "劳动合同（批量）", party: "全体员工", type: "劳动合同", amount: "—", signDate: "2025-07-01", expireDate: "2026-06-30", status: "待续签" },
  { name: "产品销售合同", party: "广州恒达制造", type: "销售合同", amount: "¥890,000", signDate: "2026-03-20", expireDate: "2026-12-31", status: "履行中" },
];

const intellectualProperties = [
  { name: "智能仓储管理系统", number: "2026SR1234567", type: "软件著作权", status: "已授权", icon: FileText, color: "#1E3A5F" },
  { name: "一种高效节能电机", number: "ZL202510123456.7", type: "发明专利", status: "已授权", icon: Lightbulb, color: "#D4AF37" },
  { name: "企管家图形商标", number: "第78945612号", type: "商标", status: "已注册", icon: Copyright, color: "#3182CE" },
  { name: "数据采集终端V2.0", number: "2026SR7654321", type: "软件著作权", status: "审查中", icon: FileText, color: "#38A169" },
];

const quickQuestions = ["合同审查要点", "劳动纠纷处理", "知识产权申请"];

const contractBadgeClass: Record<string, string> = {
  履行中: "bg-success/10 text-success",
  即将到期: "bg-warning/10 text-warning",
  待续签: "bg-danger/10 text-danger",
  待审: "bg-info/10 text-info",
};

const ipBadgeClass: Record<string, string> = {
  已授权: "bg-success/10 text-success",
  已注册: "bg-success/10 text-success",
  审查中: "bg-warning/10 text-warning",
};

export default function Legal() {
  const [input, setInput] = useState("");

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <PageHeader title="法律合规中心" subtitle="合同审查 · 电子签署 · 知识产权保护 · AI法律助手" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="待审合同" value="3份" icon={<FileText className="w-[18px] h-[18px]" />} accentColor="#1E3A5F" />
        <StatCard label="即将到期" value="5份" icon={<CalendarClock className="w-[18px] h-[18px]" />} accentColor="#DD6B20" />
        <StatCard label="知识产权" value="12项" change={1} trend="up" icon={<Copyright className="w-[18px] h-[18px]" />} accentColor="#D4AF37" />
        <StatCard label="法律风险" value="0项" icon={<ShieldCheck className="w-[18px] h-[18px]" />} accentColor="#38A169" />
      </div>

      <div className="qj-card p-5">
        <h2 className="text-h3 font-semibold text-ink mb-4">合同管理</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-body whitespace-nowrap">
            <thead>
              <tr className="text-caption text-ink-mute border-b border-gray-100">
                <th className="text-left font-medium py-2.5">合同名称</th>
                <th className="text-left font-medium py-2.5">对方</th>
                <th className="text-left font-medium py-2.5">类型</th>
                <th className="text-right font-medium py-2.5">金额</th>
                <th className="text-center font-medium py-2.5">签订日期</th>
                <th className="text-center font-medium py-2.5">到期日期</th>
                <th className="text-right font-medium py-2.5">状态</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((c) => (
                <tr key={c.name} className="border-b border-gray-50 last:border-0 hover:bg-card transition-colors">
                  <td className="py-3 text-ink font-medium">{c.name}</td>
                  <td className="py-3 text-ink-soft">{c.party}</td>
                  <td className="py-3 text-ink-soft">{c.type}</td>
                  <td className="py-3 text-right tnum text-ink font-medium">{c.amount}</td>
                  <td className="py-3 text-center tnum text-ink-mute">{c.signDate}</td>
                  <td className="py-3 text-center tnum text-ink-mute">{c.expireDate}</td>
                  <td className="py-3 text-right">
                    <span className={`qj-badge ${contractBadgeClass[c.status]}`}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4 flex items-center gap-2">
            <Copyright className="w-4 h-4 text-accent" />
            知识产权
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {intellectualProperties.map((ip) => {
              const Icon = ip.icon;
              return (
                <div key={ip.number} className="p-4 rounded-lg border border-gray-100 hover:shadow-card transition-all">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${ip.color}15`, color: ip.color }}>
                      <Icon className="w-[18px] h-[18px]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-body font-medium text-ink truncate">{ip.name}</div>
                      <div className="text-mini text-ink-mute">{ip.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-mini tnum text-ink-mute">{ip.number}</span>
                    <span className={`qj-badge ${ipBadgeClass[ip.status]}`}>{ip.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4 flex items-center gap-2">
            <Scale className="w-4 h-4 text-primary" />
            AI法律助手
          </h2>
          <div className="bg-gradient-to-br from-primary to-primary-light rounded-lg p-4 text-white mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4 text-accent" />
              <span className="text-body font-medium">智能法律顾问</span>
            </div>
            <p className="text-caption text-white/70">
              基于企业法律知识库，为您提供合同审查、风险提示、法律咨询等服务。
            </p>
          </div>
          <div className="mb-3">
            <p className="text-caption text-ink-mute mb-2">快捷提问</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="px-3 py-1.5 text-caption text-primary bg-primary-50 rounded-md hover:bg-primary-100 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="请输入您的法律问题..."
              className="flex-1 px-3 py-2.5 text-body text-ink bg-card rounded-md border border-gray-200 focus:outline-none focus:border-primary"
            />
            <button className="qj-btn-primary px-3 py-2.5">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
