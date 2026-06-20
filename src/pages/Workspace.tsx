import { useNavigate } from "react-router-dom";
import { workspaceModules } from "@/mock/workspace";
import PageHeader from "@/components/PageHeader";
import {
  Wallet,
  Banknote,
  Receipt,
  Users,
  Package,
  Megaphone,
  Scale,
  Landmark,
  TrendingUp,
  MessageCircle,
  ChevronRight,
  Clock,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  wallet: Wallet,
  banknote: Banknote,
  receipt: Receipt,
  users: Users,
  package: Package,
  megaphone: Megaphone,
  scale: Scale,
  landmark: Landmark,
  "trending-up": TrendingUp,
  "message-circle": MessageCircle,
};

// 最近使用：取前 4 个模块作为示例
const recentModules = workspaceModules.slice(0, 4);

export default function Workspace() {
  const navigate = useNavigate();

  const changeColor = (change: string) => {
    if (!change) return "";
    if (change.startsWith("+")) return "text-success";
    if (change.startsWith("-")) return "text-danger";
    return "text-ink-mute";
  };

  return (
    <div className="p-6 space-y-5">
      <PageHeader title="工作台" subtitle="十大服务板块，覆盖企业经营全场景" />

      {/* 最近使用 */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <div className="flex items-center gap-1.5 text-caption text-ink-mute mr-1">
          <Clock className="w-3.5 h-3.5" />
          最近使用
        </div>
        {recentModules.map((m) => {
          const Icon = iconMap[m.icon] || TrendingUp;
          return (
            <button
              key={m.id}
              onClick={() => navigate(m.path)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-100 shadow-card text-caption text-ink-soft hover:border-primary hover:text-primary transition-all"
            >
              <Icon className="w-3.5 h-3.5" style={{ color: m.color }} />
              {m.name}
            </button>
          );
        })}
      </div>

      {/* 模块卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {workspaceModules.map((m) => {
          const Icon = iconMap[m.icon] || TrendingUp;
          return (
            <div
              key={m.id}
              onClick={() => navigate(m.path)}
              className="qj-card p-5 hover:shadow-float transition-all cursor-pointer group flex flex-col"
            >
              {/* 顶部：图标 + 名称 + 箭头 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: m.bgColor, color: m.color }}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-h3 font-semibold text-ink truncate">{m.name}</h3>
                </div>
                <ChevronRight className="w-5 h-5 text-ink-mute group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>

              {/* 描述 */}
              <p className="text-caption text-ink-mute mb-2">{m.description}</p>

              {/* 摘要 */}
              <p className="text-body text-primary font-medium mb-4">{m.summary}</p>

              {/* 统计数据 */}
              <div className="flex gap-4 mb-4 mt-auto">
                {m.stats.map((s) => (
                  <div key={s.label} className="flex-1 min-w-0">
                    <div className="text-mini text-ink-mute">{s.label}</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-body font-semibold tnum text-ink">{s.value}</span>
                      {s.change && (
                        <span className={`text-mini tnum ${changeColor(s.change)}`}>{s.change}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* 进入按钮 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(m.path);
                }}
                className="qj-btn-ghost w-full py-1.5 text-caption"
              >
                进入
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
