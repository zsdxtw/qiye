import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { currentUser, currentCompany, companyMembers } from "@/mock/user";
import {
  Building2, Users, Shield, CreditCard, History, Lock,
  Search, UserPlus, Edit, Trash2, Check, Crown, Construction,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TabKey = "company" | "members" | "permission" | "plan" | "audit" | "security";

const TABS: { key: TabKey; label: string; icon: typeof Building2 }[] = [
  { key: "company", label: "企业信息", icon: Building2 },
  { key: "members", label: "成员管理", icon: Users },
  { key: "permission", label: "权限管理", icon: Shield },
  { key: "plan", label: "订阅套餐", icon: CreditCard },
  { key: "audit", label: "操作审计", icon: History },
  { key: "security", label: "安全设置", icon: Lock },
];

const PLANS = [
  { name: "标准版", price: "299", features: ["用户数 5 人", "企业数 1 个", "存储 5G", "基础报表", "邮件支持"], current: false },
  { name: "专业版", price: "899", features: ["用户数 20 人", "企业数 3 个", "存储 50G", "高级报表", "AI 助手", "专属客服"], current: true },
  { name: "旗舰版", price: "1999", features: ["用户数 不限", "企业数 不限", "存储 200G", "全功能报表", "AI 助手+", "专属顾问", "API 接口"], current: false },
];

function Placeholder() {
  return (
    <div className="qj-card p-12 flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mb-4">
        <Construction className="w-8 h-8" />
      </div>
      <h3 className="text-h3 text-ink font-semibold mb-1">功能开发中</h3>
      <p className="text-caption text-ink-mute">该模块正在紧锣密鼓地开发中，敬请期待</p>
    </div>
  );
}

function CompanyTab() {
  const info = [
    { label: "企业名称", value: currentCompany.name },
    { label: "所属行业", value: currentCompany.industry },
    { label: "营收规模", value: currentCompany.revenueRange },
    { label: "员工人数", value: `${currentCompany.employees} 人` },
    { label: "成立年份", value: currentCompany.established },
    { label: "所在地区", value: currentCompany.location },
  ];
  return (
    <div className="qj-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-h3 text-ink font-semibold">{currentCompany.name}</h3>
            <p className="text-caption text-ink-mute">企业ID：{currentCompany.id}</p>
          </div>
        </div>
        <button className="qj-btn-ghost flex items-center gap-1.5">
          <Edit className="w-4 h-4" /> 编辑
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 pt-4 border-t border-gray-50">
        {info.map((item) => (
          <div key={item.label} className="flex flex-col">
            <span className="text-mini text-ink-mute mb-1">{item.label}</span>
            <span className="text-body text-ink font-medium tnum">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MembersTab() {
  const [keyword, setKeyword] = useState("");
  const filtered = companyMembers.filter(
    (m) => m.name.includes(keyword) || m.role.includes(keyword) || m.email.includes(keyword)
  );
  return (
    <div className="qj-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-mute" />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜索姓名 / 角色 / 邮箱"
            className="w-72 h-10 pl-10 pr-4 bg-card rounded-lg text-body text-ink border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
          />
        </div>
        <button className="qj-btn-primary flex items-center gap-1.5">
          <UserPlus className="w-4 h-4" /> 邀请成员
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-body">
          <thead>
            <tr className="text-mini text-ink-mute border-b border-gray-100">
              <th className="text-left font-medium py-3 px-2">成员</th>
              <th className="text-left font-medium py-3 px-2">角色</th>
              <th className="text-left font-medium py-3 px-2">职位</th>
              <th className="text-left font-medium py-3 px-2">手机</th>
              <th className="text-left font-medium py-3 px-2">邮箱</th>
              <th className="text-left font-medium py-3 px-2">状态</th>
              <th className="text-left font-medium py-3 px-2">最近登录</th>
              <th className="text-right font-medium py-3 px-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id} className="border-b border-gray-50 hover:bg-card transition-colors">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-white text-mini font-semibold flex items-center justify-center">
                      {m.name.slice(0, 1)}
                    </div>
                    <span className="text-ink font-medium">{m.name}</span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className="qj-badge bg-primary-50 text-primary">{m.role}</span>
                </td>
                <td className="py-3 px-2 text-ink-soft">{m.title}</td>
                <td className="py-3 px-2 text-ink-soft tnum">{m.phone}</td>
                <td className="py-3 px-2 text-ink-soft">{m.email}</td>
                <td className="py-3 px-2">
                  {m.status === "active" ? (
                    <span className="qj-badge bg-success/10 text-success">在线</span>
                  ) : (
                    <span className="qj-badge bg-gray-100 text-ink-mute">离线</span>
                  )}
                </td>
                <td className="py-3 px-2 text-caption text-ink-mute tnum">{m.lastLogin}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center justify-end gap-1">
                    <button className="w-7 h-7 rounded-md text-ink-mute hover:bg-primary-50 hover:text-primary flex items-center justify-center">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-7 h-7 rounded-md text-ink-mute hover:bg-red-50 hover:text-danger flex items-center justify-center">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PlanTab() {
  const usage = [
    { label: "用户数", used: 6, total: 20 },
    { label: "企业数", used: 1, total: 3 },
    { label: "存储空间", used: 12, total: 50, unit: "G" },
  ];
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="qj-card p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-h3 text-ink font-semibold">专业版</h3>
                <span className="qj-badge bg-accent/15 text-accent-dark">当前套餐</span>
              </div>
              <p className="text-caption text-ink-mute">续费日期：2026-12-31</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-h2 tnum font-bold text-primary">¥899<span className="text-caption text-ink-mute font-normal">/年</span></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {usage.map((u) => (
            <div key={u.label} className="bg-card rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-caption text-ink-mute">{u.label}</span>
                <span className="text-mini text-ink-soft tnum">{u.used}{u.unit || ""}/{u.total}{u.unit || ""}</span>
              </div>
              <div className="h-2 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${(u.used / u.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "qj-card p-6 flex flex-col",
              plan.current && "ring-2 ring-accent"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-h3 text-ink font-semibold">{plan.name}</h3>
              {plan.current && <span className="qj-badge bg-accent/15 text-accent-dark">当前</span>}
            </div>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-h1 tnum font-bold text-primary">¥{plan.price}</span>
              <span className="text-caption text-ink-mute pb-1">/年</span>
            </div>
            <ul className="space-y-2 mb-5 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-caption text-ink-soft">
                  <Check className="w-3.5 h-3.5 text-success shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              disabled={plan.current}
              className={cn(
                "w-full py-2.5 rounded-md text-body font-medium transition-all",
                plan.current
                  ? "bg-card text-ink-mute cursor-not-allowed"
                  : "qj-btn-primary"
              )}
            >
              {plan.current ? "当前套餐" : "升级"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabKey>("members");

  return (
    <div className="p-6">
      <PageHeader title="个人中心" subtitle="企业信息 · 成员管理 · 订阅套餐" />

      <div className="flex gap-5">
        {/* 左侧导航 */}
        <aside className="w-56 shrink-0">
          <div className="qj-card p-3">
            <div className="flex items-center gap-3 px-3 py-3 mb-2 border-b border-gray-50">
              <div className="w-10 h-10 rounded-full bg-primary text-white font-semibold flex items-center justify-center">
                {currentUser.name.slice(0, 1)}
              </div>
              <div className="min-w-0">
                <div className="text-body text-ink font-medium truncate">{currentUser.name}</div>
                <div className="text-mini text-ink-mute truncate">{currentUser.title}</div>
              </div>
            </div>
            <nav className="space-y-0.5">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-body transition-all border-l-2",
                      active
                        ? "bg-primary-50 text-primary border-accent"
                        : "text-ink-soft border-transparent hover:bg-card hover:text-ink"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* 右侧内容 */}
        <section className="flex-1 min-w-0">
          {activeTab === "company" && <CompanyTab />}
          {activeTab === "members" && <MembersTab />}
          {activeTab === "plan" && <PlanTab />}
          {(activeTab === "permission" || activeTab === "audit" || activeTab === "security") && <Placeholder />}
        </section>
      </div>
    </div>
  );
}
