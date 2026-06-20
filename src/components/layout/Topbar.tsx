import { useLocation } from 'react-router-dom';
import { Search, Bell, ChevronRight, Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

const routeNames: Record<string, string[]> = {
  '/dashboard': ['经营概览', 'AI 经营驾驶舱'],
  '/risk': ['经营概览', '风险预警中心'],
  '/finance/invoices': ['财务管理', '智能票据'],
  '/finance/receivable': ['财务管理', '应收应付'],
  '/finance/cashflow': ['财务管理', '资金管理'],
  '/business/purchase': ['业务管理', '采购管理'],
  '/business/sales': ['业务管理', '销售管理'],
  '/business/inventory': ['业务管理', '库存管理'],
  '/business/crm': ['业务管理', '客户管理'],
  '/hr/attendance': ['人事管理', '考勤排班'],
  '/hr/payroll': ['人事管理', '薪酬核算'],
};

export function Topbar() {
  const location = useLocation();
  const { user, toggleAiAssistant } = useAppStore();
  const crumbs = routeNames[location.pathname] || ['智擎'];

  return (
    <header className="h-14 bg-bg2 border-b border-rule flex items-center px-6 gap-4 sticky top-0 z-20 no-print">
      {/* 面包屑 */}
      <nav className="flex items-center gap-1.5 text-sm">
        {crumbs.map((c, i) => (
          <span key={c} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted" />}
            <span className={cn(i === crumbs.length - 1 ? 'text-ink font-semibold' : 'text-muted')}>{c}</span>
          </span>
        ))}
      </nav>

      {/* 全局搜索 */}
      <div className="flex-1 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            placeholder="搜索或提问，如「上个月哪个产品最赚钱」"
            className="w-full bg-bg border border-rule rounded-card-sm pl-9 pr-16 py-2 text-sm placeholder:text-muted focus:outline-none focus:border-accent focus:bg-bg2 transition-colors"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-2xs font-mono text-muted bg-bg2 border border-rule px-1.5 py-0.5 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* 右侧操作 */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleAiAssistant}
          className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-card-sm bg-accent-soft text-accent font-semibold hover:bg-accent/10 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI 助手
        </button>

        <button className="relative p-2 text-muted hover:text-ink hover:bg-bg rounded-card-sm transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-warn rounded-full" />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-rule">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent2 text-white flex items-center justify-center text-sm font-semibold">
            {user.avatar}
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-semibold text-ink leading-none">{user.name}</div>
            <div className="text-2xs text-muted mt-0.5">{user.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
