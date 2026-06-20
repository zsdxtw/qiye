import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { consultations, experts, quickQuestions } from "@/mock/consultation";
import { cn } from "@/lib/utils";
import {
  Plus, Bot, Headphones, UserCheck, Star, MessageSquare,
  Clock, Calendar, ChevronRight, Scale, Receipt, Wallet, Layers,
} from "lucide-react";

type TabKey = "all" | "tax" | "legal" | "finance" | "combined";
type ServiceLevel = "ai" | "online" | "expert";

const tabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "tax", label: "税务咨询" },
  { key: "legal", label: "法务咨询" },
  { key: "finance", label: "财务咨询" },
  { key: "combined", label: "三务联动" },
];

const typeBadgeMap: Record<string, { bg: string; text: string; icon: typeof Receipt }> = {
  tax: { bg: "bg-accent/15", text: "text-accent-dark", icon: Receipt },
  legal: { bg: "bg-red-50", text: "text-danger", icon: Scale },
  finance: { bg: "bg-blue-50", text: "text-info", icon: Wallet },
  combined: { bg: "bg-purple-50", text: "text-purple-700", icon: Layers },
};

const serviceBadgeMap: Record<string, string> = {
  ai: "bg-gray-100 text-ink-soft",
  online: "bg-blue-50 text-info",
  expert: "bg-accent/15 text-accent-dark",
};

const statusBadgeMap: Record<string, string> = {
  pending: "bg-gray-100 text-ink-soft",
  in_progress: "bg-blue-50 text-info",
  waiting_confirm: "bg-orange-50 text-warning",
  completed: "bg-green-50 text-success",
  reviewed: "bg-gray-100 text-ink-mute",
  cancelled: "bg-red-50 text-danger",
};

const serviceOptions: { level: ServiceLevel; title: string; desc: string; icon: typeof Bot; price: string }[] = [
  { level: "ai", title: "AI自助", desc: "智能秒回 · 7×24小时", icon: Bot, price: "免费" },
  { level: "online", title: "在线顾问", desc: "实时沟通 · 平均3分钟响应", icon: Headphones, price: "¥99/次" },
  { level: "expert", title: "专家预约", desc: "资深专家 · 一对一深度服务", icon: UserCheck, price: "¥500+" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={cn("w-3 h-3", i <= Math.round(rating) ? "fill-accent text-accent" : "text-gray-300")} />
      ))}
      <span className="text-mini text-ink-soft tnum ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function Consultation() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [serviceLevel, setServiceLevel] = useState<ServiceLevel>("ai");
  const [question, setQuestion] = useState("");

  const filtered =
    activeTab === "all" ? consultations : consultations.filter((c) => c.type === activeTab);

  const topExperts = experts.slice(0, 3);

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <PageHeader
        title="三务咨询中心"
        subtitle="税务咨询 · 法务咨询 · 财务咨询 · 三务联动"
        actions={
          <button className="qj-btn-primary flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            发起咨询
          </button>
        }
      />

      {/* Tab 栏 */}
      <div className="flex items-center gap-1 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "px-4 py-2.5 text-body font-medium border-b-2 transition-colors -mb-px",
              activeTab === tab.key
                ? "text-primary border-accent"
                : "text-ink-mute border-transparent hover:text-ink"
            )}
          >
            {tab.label}
            {tab.key !== "all" && (
              <span className="ml-1.5 text-mini text-ink-mute tnum">
                {consultations.filter((c) => c.type === tab.key).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 左侧：咨询历史 */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-h3 font-semibold text-ink">
              咨询记录
              <span className="ml-2 text-caption text-ink-mute font-normal tnum">
                共 {filtered.length} 条
              </span>
            </h2>
          </div>

          {filtered.map((c) => {
            const typeCfg = typeBadgeMap[c.type];
            const TypeIcon = typeCfg.icon;
            return (
              <div
                key={c.id}
                className="qj-card p-4 hover:shadow-float transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  {/* 类型图标 */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      typeCfg.bg
                    )}
                  >
                    <TypeIcon className={cn("w-5 h-5", typeCfg.text)} />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* 顶部：标签 + 状态 */}
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={cn("qj-badge", typeCfg.bg, typeCfg.text)}>
                        {c.typeLabel}
                      </span>
                      <span className={cn("qj-badge", serviceBadgeMap[c.serviceLevel])}>
                        {c.serviceLabel}
                      </span>
                      <span className={cn("qj-badge", statusBadgeMap[c.status])}>
                        {c.statusLabel}
                      </span>
                      {c.rating && (
                        <span className="qj-badge bg-accent/15 text-accent-dark">
                          <Star className="w-3 h-3 fill-accent" />
                          {c.rating}分
                        </span>
                      )}
                    </div>

                    {/* 标题 */}
                    <h3 className="text-body font-semibold text-ink group-hover:text-primary transition-colors line-clamp-1">
                      {c.title}
                    </h3>
                    <p className="text-caption text-ink-soft line-clamp-1 mt-0.5">
                      {c.description}
                    </p>

                    {/* 专家信息 */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-white text-mini font-medium flex items-center justify-center">
                        {c.expert.name.charAt(0)}
                      </div>
                      <span className="text-caption text-ink-soft">{c.expert.name}</span>
                      <span className="text-mini text-ink-mute">·</span>
                      <span className="text-mini text-ink-mute">{c.expert.title}</span>
                    </div>

                    {/* 底部：消息数 + 时间 */}
                    <div className="flex items-center gap-4 mt-2.5 text-mini text-ink-mute">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        <span className="tnum">{c.messages}</span> 条消息
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        创建于 {c.createdAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        更新于 {c.lastUpdate}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-ink-mute group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* 右侧：发起新咨询 + 推荐专家 */}
        <div className="space-y-5">
          {/* 发起新咨询 */}
          <div className="qj-card p-5">
            <h2 className="text-h3 font-semibold text-ink mb-1">发起新咨询</h2>
            <p className="text-caption text-ink-mute mb-4">选择服务方式，描述您的问题</p>

            {/* 服务方式选择 */}
            <div className="space-y-2 mb-4">
              {serviceOptions.map((opt) => {
                const Icon = opt.icon;
                const active = serviceLevel === opt.level;
                return (
                  <button
                    key={opt.level}
                    onClick={() => setServiceLevel(opt.level)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left",
                      active
                        ? "border-accent bg-accent/5 shadow-card"
                        : "border-gray-100 hover:border-primary-100 hover:bg-card"
                    )}
                  >
                    <div
                      className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                        active ? "bg-accent text-white" : "bg-card text-primary"
                      )}
                    >
                      <Icon className="w-[18px] h-[18px]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-body font-medium text-ink">{opt.title}</div>
                      <div className="text-mini text-ink-mute">{opt.desc}</div>
                    </div>
                    <span
                      className={cn(
                        "text-caption font-medium tnum shrink-0",
                        active ? "text-accent-dark" : "text-ink-mute"
                      )}
                    >
                      {opt.price}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 问题输入 */}
            <label className="text-caption text-ink-soft mb-1.5 block">描述您的问题</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              placeholder="请详细描述您遇到的问题，例如：跨年度亏损弥补如何处理？"
              className="w-full p-3 bg-card rounded-lg text-body text-ink border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all resize-none"
            />

            {/* 快捷问题 */}
            <div className="flex flex-wrap gap-1.5 mt-2 mb-4">
              {quickQuestions.slice(0, 4).map((q) => (
                <button
                  key={q}
                  onClick={() => setQuestion(q)}
                  className="px-2 py-1 text-mini text-ink-mute bg-card rounded hover:bg-primary-50 hover:text-primary transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            <button className="qj-btn-primary w-full flex items-center justify-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              立即咨询
            </button>
          </div>

          {/* 推荐专家 */}
          <div className="qj-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-h3 font-semibold text-ink">推荐专家</h2>
              <button className="text-caption text-ink-mute hover:text-primary">全部 {">"}</button>
            </div>

            <div className="space-y-3">
              {topExperts.map((expert) => (
                <div
                  key={expert.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-card transition-colors"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary-light text-white text-body font-semibold flex items-center justify-center shrink-0">
                    {expert.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-body font-medium text-ink">{expert.name}</span>
                      <span className="text-mini text-ink-mute">{expert.title}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <StarRating rating={expert.rating} />
                      <span className="text-mini text-ink-mute tnum">
                        · {expert.consultations}次咨询
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-caption text-accent-dark font-medium tnum">
                        ¥{expert.price}
                      </span>
                      <span className="text-mini text-ink-mute">/次</span>
                    </div>
                  </div>
                  <button className="shrink-0 px-3 py-1.5 bg-primary text-white text-caption font-medium rounded-md hover:bg-primary-light transition-colors">
                    预约
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
