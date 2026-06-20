import { NavLink } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, ShieldAlert, FileText, Wallet, TrendingUp,
  ShoppingCart, Package, Users, CalendarClock, Calculator,
  Settings, ChevronLeft, Sparkles, BookOpen, Scale, Plane, Gift,
  Landmark, FileSearch, Receipt,
  Building2, Database, Code2,
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: typeof LayoutDashboard;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: '经营概览',
    items: [
      { path: '/dashboard', label: 'AI 经营驾驶舱', icon: LayoutDashboard },
      { path: '/risk', label: '风险预警中心', icon: ShieldAlert },
    ],
  },
  {
    title: '财务管理',
    items: [
      { path: '/finance/invoices', label: '智能票据', icon: Receipt },
      { path: '/finance/receivable', label: '应收应付', icon: FileText },
      { path: '/finance/cashflow', label: '资金管理', icon: Wallet },
    ],
  },
  {
    title: '业务管理',
    items: [
      { path: '/business/purchase', label: '采购管理', icon: ShoppingCart },
      { path: '/business/sales', label: '销售管理', icon: TrendingUp },
      { path: '/business/inventory', label: '库存管理', icon: Package },
      { path: '/business/crm', label: '客户管理', icon: Users },
    ],
  },
  {
    title: '人事管理',
    items: [
      { path: '/hr/attendance', label: '考勤排班', icon: CalendarClock },
      { path: '/hr/payroll', label: '薪酬核算', icon: Calculator },
    ],
  },
];

const comingSoonGroups: NavGroup[] = [
  {
    title: '增值服务',
    items: [
      { path: '#', label: '代理记账', icon: BookOpen },
      { path: '#', label: '法务合同', icon: Scale },
      { path: '#', label: '差旅费控', icon: Plane },
      { path: '#', label: '员工福利', icon: Gift },
      { path: '#', label: '智能金融', icon: Landmark },
      { path: '#', label: '政策情报', icon: FileSearch },
    ],
  },
  {
    title: '设置',
    items: [
      { path: '#', label: '组织架构', icon: Building2 },
      { path: '#', label: '权限管理', icon: Settings },
      { path: '#', label: '数据导入', icon: Database },
      { path: '#', label: '开放 API', icon: Code2 },
    ],
  },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 bottom-0 bg-bg2 border-r border-rule flex flex-col z-30 transition-all duration-200 no-print',
        sidebarCollapsed ? 'w-16' : 'w-60',
      )}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-rule flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent2 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        {!sidebarCollapsed && (
          <div className="ml-2.5">
            <div className="font-display font-bold text-ink text-base leading-none">智擎</div>
            <div className="text-2xs text-muted font-mono mt-0.5">ZhiQing SaaS</div>
          </div>
        )}
      </div>

      {/* 导航 */}
      <nav className="flex-1 overflow-y-auto py-3">
        {navGroups.map((group) => (
          <NavGroup key={group.title} group={group} collapsed={sidebarCollapsed} />
        ))}
        <div className="px-4 my-2">
          <div className="border-t border-rule" />
        </div>
        {comingSoonGroups.map((group) => (
          <NavGroup key={group.title} group={group} collapsed={sidebarCollapsed} disabled />
        ))}
      </nav>

      {/* 折叠按钮 */}
      <button
        onClick={toggleSidebar}
        className="h-10 border-t border-rule flex items-center justify-center text-muted hover:text-ink hover:bg-bg transition-colors"
      >
        <ChevronLeft className={cn('w-4 h-4 transition-transform', sidebarCollapsed && 'rotate-180')} />
      </button>
    </aside>
  );
}

function NavGroup({ group, collapsed, disabled }: { group: NavGroup; collapsed: boolean; disabled?: boolean }) {
  return (
    <div className="mb-1">
      {!collapsed && (
        <div className="px-4 py-1.5 text-2xs font-mono font-semibold text-muted uppercase tracking-wider">
          {group.title}
        </div>
      )}
      <div className="px-2">
        {group.items.map((item) => (
          <NavLink
            key={`${group.title}-${item.label}`}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 px-2.5 py-2 rounded-card-sm text-sm transition-colors mb-0.5',
                collapsed && 'justify-center',
                disabled
                  ? 'text-muted/60 cursor-not-allowed'
                  : isActive
                    ? 'bg-accent-soft text-accent font-semibold'
                    : 'text-muted hover:text-ink hover:bg-accent-soft/60',
              )
            }
            onClick={(e) => disabled && e.preventDefault()}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
            {!collapsed && disabled && (
              <span className="ml-auto text-2xs text-muted/50 font-mono">即将上线</span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
