import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useAppStore } from "@/store/appStore";
import { dashboardData } from "@/mock/dashboard";
import { Bell, Search, Settings, ChevronDown, LogOut, Menu } from "lucide-react";
import { useState } from "react";

export default function Topbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 z-20">
      {/* 左侧 */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
        >
          <Menu className="w-5 h-5 text-ink" />
        </button>
        <div className="hidden md:flex items-center gap-2 text-ink-soft">
          <span className="text-h2 text-ink font-semibold">
            {dashboardData.greeting}，{user?.name?.charAt(0)}总
          </span>
          <span className="text-caption text-ink-mute">·</span>
          <span className="text-caption text-ink-mute">{dashboardData.todayDate}</span>
        </div>
      </div>

      {/* 中间搜索 */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-mute" />
          <input
            type="text"
            placeholder="搜索功能、数据、政策..."
            className="w-full h-9 pl-9 pr-4 bg-card rounded-lg text-caption text-ink placeholder:text-ink-mute border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* 右侧 */}
      <div className="flex items-center gap-2">
        {/* 待办 */}
        <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-card">
          <div className="flex items-center gap-1.5">
            <span className="text-caption text-ink-mute">待办</span>
            <span className="tnum text-body font-semibold text-primary">{dashboardData.todos}</span>
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-1.5">
            <span className="text-caption text-ink-mute">预警</span>
            <span className="tnum text-body font-semibold text-danger">{dashboardData.alerts}</span>
          </div>
        </div>

        {/* 消息 */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-ink-soft" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white text-mini rounded-full flex items-center justify-center tnum">
            {dashboardData.messages}
          </span>
        </button>

        {/* 设置 */}
        <button
          onClick={() => navigate("/settings")}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Settings className="w-5 h-5 text-ink-soft" />
        </button>

        {/* 用户 */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-body font-semibold">
              {user?.name?.charAt(0)}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-caption text-ink font-medium leading-tight">{user?.name}</div>
              <div className="text-mini text-ink-mute leading-tight">{user?.title}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-ink-mute hidden md:block" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-float border border-gray-100 py-1 z-20">
                <button
                  onClick={() => {
                    navigate("/settings");
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-caption text-ink-soft hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-4 h-4" /> 个人设置
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-caption text-danger hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> 退出登录
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
