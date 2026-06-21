import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";
import {
  LayoutDashboard,
  Grid3x3,
  Bot,
  Wallet,
  Receipt,
  MessageCircle,
  BarChart3,
  TrendingUp,
  Users,
  Package,
  Megaphone,
  Scale,
  Landmark,
  Banknote,
  Settings,
  ChevronLeft,
  Building2,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    title: "核心",
    items: [
      { path: "/", label: "老板驾驶舱", icon: LayoutDashboard },
      { path: "/workspace", label: "工作台", icon: Grid3x3 },
      { path: "/ai-assistant", label: "AI 经营助手", icon: Bot },
    ],
  },
  {
    title: "经营管理",
    items: [
      { path: "/finance", label: "智能财务中心", icon: Wallet },
      { path: "/tax", label: "智能税务中心", icon: Receipt },
      { path: "/consultation", label: "三务咨询中心", icon: MessageCircle },
      { path: "/dashboard", label: "数据看板", icon: BarChart3 },
    ],
  },
  {
    title: "企业服务",
    items: [
      { path: "/hr", label: "人力资源管家", icon: Users },
      { path: "/supply-chain", label: "供应链进销存", icon: Package },
      { path: "/mall", label: "企业内部商城", icon: ShoppingBag },
      { path: "/marketing", label: "营销获客中心", icon: Megaphone },
      { path: "/legal", label: "法律合规中心", icon: Scale },
      { path: "/policy", label: "政策服务大厅", icon: Landmark },
      { path: "/finance-service", label: "金融服务超市", icon: Banknote },
    ],
  },
  {
    title: "智能成长",
    items: [{ path: "/growth", label: "智能成长中心", icon: TrendingUp }],
  },
  {
    title: "系统",
    items: [{ path: "/settings", label: "个人中心 / 设置", icon: Settings }],
  },
];

export default function Sidebar() {
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
  const toggle = useAppStore((s) => s.toggleSidebar);
  const company = useAuthStore((s) => s.company);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-col bg-primary-dark text-white transition-all duration-300 sidebar-scroll",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo 区 */}
      <div className="flex items-center gap-3 h-16 px-4 border-b border-white/10 shrink-0">
        <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0 shadow-glow">
          <Building2 className="w-5 h-5 text-primary-dark" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-h3 font-bold tracking-wide leading-tight">企管家</div>
            <div className="text-mini text-white/50 leading-tight">Qijia Business OS</div>
          </div>
        )}
      </div>

      {/* 导航区 */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-4">
            {!collapsed && (
              <div className="px-3 mb-1.5 text-mini text-white/35 uppercase tracking-wider">
                {group.title}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active =
                  location.pathname === item.path ||
                  (item.path !== "/" && location.pathname.startsWith(item.path));
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-body transition-all relative group",
                      active
                        ? "bg-accent/15 text-accent font-medium"
                        : "text-white/70 hover:bg-white/8 hover:text-white",
                      collapsed && "justify-center"
                    )}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent rounded-r-full" />
                    )}
                    <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={2} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* 企业信息 + 折叠按钮 */}
      <div className="border-t border-white/10 p-3 shrink-0">
        {!collapsed && company && (
          <div className="px-2 py-2 mb-2 rounded-lg bg-white/5">
            <div className="text-caption text-white/50">当前企业</div>
            <div className="text-body text-white truncate">{company.name}</div>
          </div>
        )}
        <button
          onClick={toggle}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white/50 hover:bg-white/8 hover:text-white transition-all"
        >
          <ChevronLeft
            className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")}
          />
          {!collapsed && <span className="text-caption">收起</span>}
        </button>
      </div>
    </aside>
  );
}
