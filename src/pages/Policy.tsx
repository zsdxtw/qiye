import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import {
  Landmark,
  DollarSign,
  Clock,
  CheckCircle,
  Calendar,
  ChevronRight,
} from "lucide-react";

const policies = [
  { name: "高新技术企业认定奖励", dept: "市科技局", amount: "30万", match: 95, deadline: "2026-07-31", status: "推荐申报" },
  { name: "专精特新中小企业补贴", dept: "市工信局", amount: "20万", match: 88, deadline: "2026-08-15", status: "推荐申报" },
  { name: "研发费用加计扣除", dept: "市税务局", amount: "15万", match: 82, deadline: "2026-09-30", status: "可申报" },
  { name: "稳岗扩岗专项补贴", dept: "市人社局", amount: "8万", match: 76, deadline: "2026-08-20", status: "可申报" },
];

const calendar = [
  { name: "高新技术企业认定奖励", deadline: "2026-07-31", days: 40, status: "申报中" },
  { name: "专精特新中小企业补贴", deadline: "2026-08-15", days: 55, status: "待启动" },
  { name: "研发费用加计扣除", deadline: "2026-09-30", days: 101, status: "待启动" },
  { name: "稳岗扩岗专项补贴", deadline: "2026-08-20", days: 60, status: "待启动" },
];

const approved = [
  { name: "2025年度科技创新券", amount: "¥50,000", date: "2026-01-15" },
  { name: "中小企业数字化转型补贴", amount: "¥120,000", date: "2026-02-20" },
  { name: "就业创业服务补贴", amount: "¥35,000", date: "2026-03-10" },
];

const policyBadgeClass: Record<string, string> = {
  推荐申报: "bg-accent/15 text-accent-dark",
  可申报: "bg-info/10 text-info",
};

const calendarBadgeClass: Record<string, string> = {
  申报中: "bg-info/10 text-info",
  待启动: "bg-gray-100 text-ink-mute",
};

export default function Policy() {
  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <PageHeader title="政策服务大厅" subtitle="政策雷达 · 智能匹配 · 补贴计算 · 申报辅助" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="可申报政策" value="8项" change={2} trend="up" icon={<Landmark className="w-[18px] h-[18px]" />} accentColor="#1E3A5F" />
        <StatCard label="预计补贴" value="35万" icon={<DollarSign className="w-[18px] h-[18px]" />} accentColor="#D4AF37" />
        <StatCard label="申报中" value="2项" icon={<Clock className="w-[18px] h-[18px]" />} accentColor="#3182CE" />
        <StatCard label="已获批" value="5项" icon={<CheckCircle className="w-[18px] h-[18px]" />} accentColor="#38A169" />
      </div>

      <div className="qj-card p-5">
        <h2 className="text-h3 font-semibold text-ink mb-4">政策匹配</h2>
        <div className="space-y-3">
          {policies.map((p) => (
            <div key={p.name} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:shadow-card transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-body font-medium text-ink">{p.name}</span>
                  <span className={`qj-badge ${policyBadgeClass[p.status]}`}>{p.status}</span>
                </div>
                <div className="flex items-center gap-4 text-caption text-ink-mute">
                  <span>发布部门：{p.dept}</span>
                  <span>申报截止：{p.deadline}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-mini text-ink-mute shrink-0">匹配度</span>
                  <div className="flex-1 max-w-[200px] h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${p.match}%`, background: "linear-gradient(90deg, #1E3A5F, #D4AF37)" }}
                    />
                  </div>
                  <span className="text-mini tnum font-semibold text-accent">{p.match}%</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-h3 tnum font-bold text-accent mb-2">{p.amount}</div>
                <button className="qj-btn-primary text-caption px-3 py-1.5">
                  立即申报
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent" />
            申报日历
          </h2>
          <div className="space-y-2.5">
            {calendar.map((c) => (
              <div key={c.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-card transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary-50 flex flex-col items-center justify-center shrink-0">
                  <span className="text-mini text-ink-mute">剩余</span>
                  <span className="text-body tnum font-bold text-primary">{c.days}天</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-body text-ink font-medium truncate">{c.name}</div>
                  <div className="text-mini text-ink-mute">截止日期：{c.deadline}</div>
                </div>
                <span className={`qj-badge ${calendarBadgeClass[c.status]}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            已获批政策
          </h2>
          <table className="w-full text-body">
            <thead>
              <tr className="text-caption text-ink-mute border-b border-gray-100">
                <th className="text-left font-medium py-2.5">政策</th>
                <th className="text-right font-medium py-2.5">补贴金额</th>
                <th className="text-right font-medium py-2.5">批准日期</th>
              </tr>
            </thead>
            <tbody>
              {approved.map((a) => (
                <tr key={a.name} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 text-ink font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      {a.name}
                    </div>
                  </td>
                  <td className="py-3 text-right tnum text-accent font-semibold">{a.amount}</td>
                  <td className="py-3 text-right tnum text-ink-mute">{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="w-full mt-4 flex items-center justify-center gap-1 py-2 text-caption text-primary hover:text-accent transition-colors">
            查看全部获批记录 <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
