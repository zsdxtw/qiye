import { Outlet } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { AIAssistant } from '@/components/ai/AIAssistant';

export function AppLayout() {
  const { sidebarCollapsed } = useAppStore();

  return (
    <div className="min-h-screen bg-bg">
      <Sidebar />
      <div className={cn('transition-all duration-200', sidebarCollapsed ? 'ml-16' : 'ml-60')}>
        <Topbar />
        <main className="min-h-[calc(100vh-3.5rem)]">
          <div className="max-w-content mx-auto px-6 py-6 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
      <AIAssistant />
    </div>
  );
}

/** 页面标题组件 */
export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-h1 text-ink">{title}</h1>
        {subtitle && <p className="text-sm text-muted mt-1.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
