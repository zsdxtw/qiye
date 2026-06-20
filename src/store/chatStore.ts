import { create } from "zustand";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  richContent?: {
    type: "card" | "chart" | "buttons";
    data: unknown;
  };
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
}

interface ChatState {
  sessions: ChatSession[];
  currentSessionId: string | null;
  isTyping: boolean;
  createSession: () => string;
  setCurrentSession: (id: string) => void;
  addMessage: (sessionId: string, message: ChatMessage) => void;
  setTyping: (typing: boolean) => void;
}

const defaultSession: ChatSession = {
  id: "s001",
  title: "今日经营简报",
  createdAt: "2026-06-21 08:30",
  messages: [
    {
      id: "msg001",
      role: "assistant",
      content:
        "早上好，张总。今日经营简报如下：\n\n**健康评分 78分**（较上周 +2），财务与运营维度提升明显。\n\n**本月关键数据**\n- 营收 ¥128万（环比 +12%）\n- 利润 ¥23万（环比 +8%）\n- 现金流：充裕 ✅\n\n**需要您关注**\n- ⚠️ 客户A订单量下降40%，建议本周内回访\n- 📅 增值税申报截止还剩3天\n\n有什么可以帮您的吗？",
      timestamp: "2026-06-21 08:30",
    },
  ],
};

export const useChatStore = create<ChatState>((set) => ({
  sessions: [defaultSession],
  currentSessionId: "s001",
  isTyping: false,
  createSession: () => {
    const id = `s${Date.now()}`;
    const session: ChatSession = {
      id,
      title: "新对话",
      createdAt: new Date().toLocaleString("zh-CN"),
      messages: [],
    };
    set((state) => ({
      sessions: [session, ...state.sessions],
      currentSessionId: id,
    }));
    return id;
  },
  setCurrentSession: (id) => set({ currentSessionId: id }),
  addMessage: (sessionId, message) =>
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === sessionId ? { ...s, messages: [...s.messages, message] } : s
      ),
    })),
  setTyping: (typing) => set({ isTyping: typing }),
}));
