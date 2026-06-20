import { create } from 'zustand';

interface AppState {
  // AI 助手开关
  aiAssistantOpen: boolean;
  toggleAiAssistant: () => void;
  setAiAssistantOpen: (open: boolean) => void;

  // 侧边栏折叠（平板端）
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // 当前用户
  user: {
    name: string;
    role: string;
    company: string;
    avatar: string;
  };
}

export const useAppStore = create<AppState>((set) => ({
  aiAssistantOpen: false,
  toggleAiAssistant: () => set((s) => ({ aiAssistantOpen: !s.aiAssistantOpen })),
  setAiAssistantOpen: (open) => set({ aiAssistantOpen: open }),

  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  user: {
    name: '李明远',
    role: '企业老板',
    company: '华联商贸有限公司',
    avatar: '李',
  },
}));
