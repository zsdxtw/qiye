import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/store/appStore";
import { useChatStore, type ChatMessage } from "@/store/chatStore";
import { Bot, Send, X, Sparkles, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { quickQuestions } from "@/mock/consultation";

const aiResponses: Record<string, string> = {
  "查本月营收情况":
    "好的，张总。本月营收数据如下：\n\n**本月营收 ¥128万**（环比 +12%）\n- 主营业务收入：¥115万\n- 加工服务收入：¥8万\n- 其他收入：¥5万\n\n营收增长主要来自宏达科技和东方机电的大额订单。需要查看详细分析吗？",
  "分析税务风险":
    "正在调取本月税务数据……\n\n**发现 2 项税务风险：**\n\n⚠️ **高风险**：库存账实差异 33.6%\n建议：6月底前完成实地盘点调整\n\n⚠️ **中风险**：进项税额占比 62%（行业均值 45%）\n建议：核查大额进项发票真实性\n\n需要我为您预约税务师做进一步排查吗？",
  "生成经营诊断报告":
    "正在生成 6 月经营诊断报告……\n\n**六维健康评分：78分（A级）**\n\n亮点维度：\n- 财务健康 82分（净利率表现突出）\n- 运营效率 80分（库存周转优异）\n\n待改进维度：\n- 成长潜力 70分（客户增长率偏低）\n- 税务合规 75分（存在2项风险）\n\n完整报告已生成，是否发送到您的邮箱？",
  default:
    "好的，张总。我已收到您的问题。作为您的AI经营助手，我可以帮您查询财务数据、分析税务风险、生成经营报告、模拟决策方案等。\n\n请问您想了解哪方面的信息？您也可以点击下方快捷问题快速提问。",
};

export default function AIAssistant() {
  const open = useAppStore((s) => s.aiPanelOpen);
  const setOpen = useAppStore((s) => s.setAiPanel);
  const { sessions, currentSessionId, isTyping, addMessage, setTyping, createSession, setCurrentSession } =
    useChatStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentSession = sessions.find((s) => s.id === currentSessionId) || sessions[0];
  const messages = currentSession?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const content = text || input.trim();
    if (!content) return;

    const userMsg: ChatMessage = {
      id: `msg${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
    };
    addMessage(currentSession.id, userMsg);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = aiResponses[content] || aiResponses.default;
      const aiMsg: ChatMessage = {
        id: `msg${Date.now() + 1}`,
        role: "assistant",
        content: reply,
        timestamp: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
      };
      addMessage(currentSession.id, aiMsg);
      setTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* 悬浮按钮 */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-accent text-primary-dark shadow-glow flex items-center justify-center hover:scale-110 transition-transform z-30 animate-pulse-gold"
          title="AI 经营助手"
        >
          <Bot className="w-7 h-7" strokeWidth={2} />
        </button>
      )}

      {/* 对话面板 */}
      {open && (
        <div className="fixed bottom-6 right-6 w-[400px] h-[600px] bg-white rounded-2xl shadow-float flex flex-col z-30 overflow-hidden border border-gray-100 animate-slide-up">
          {/* 头部 */}
          <div className="flex items-center justify-between px-4 h-14 bg-primary text-white shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <div>
                <div className="text-body font-semibold leading-tight">小企 AI 助手</div>
                <div className="text-mini text-white/60 leading-tight">在线 · 随时为您服务</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 历史会话 */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-50 overflow-x-auto shrink-0">
            {sessions.map((s) => (
              <button
                key={s.id}
                onClick={() => setCurrentSession(s.id)}
                className={cn(
                  "shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-md text-mini transition-colors",
                  s.id === currentSessionId
                    ? "bg-primary-50 text-primary"
                    : "text-ink-mute hover:bg-gray-50"
                )}
              >
                <MessageSquare className="w-3 h-3" />
                {s.title}
              </button>
            ))}
            <button
              onClick={() => createSession()}
              className="shrink-0 px-2 py-1 rounded-md text-mini text-accent hover:bg-accent/10 transition-colors"
            >
              + 新对话
            </button>
          </div>

          {/* 消息区 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-card">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <Bot className="w-6 h-6 text-accent" />
                </div>
                <div className="text-body text-ink font-medium mb-1">您好，张总</div>
                <div className="text-caption text-ink-mute">我是小企AI，有什么可以帮您？</div>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] px-3.5 py-2.5 rounded-2xl text-caption leading-relaxed whitespace-pre-wrap",
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-md"
                      : "bg-white text-ink rounded-bl-md shadow-card border border-gray-50"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-card border border-gray-50">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-ink-mute/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-ink-mute/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-ink-mute/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 快捷问题 */}
          {messages.length <= 1 && (
            <div className="px-3 py-2 border-t border-gray-50 shrink-0">
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.slice(0, 3).map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="px-2.5 py-1 rounded-md text-mini bg-primary-50 text-primary hover:bg-primary-100 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 输入区 */}
          <div className="p-3 border-t border-gray-50 shrink-0">
            <div className="flex items-center gap-2 bg-card rounded-lg px-3 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="输入您的问题..."
                className="flex-1 bg-transparent text-caption text-ink placeholder:text-ink-mute outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="w-7 h-7 rounded-md bg-primary text-white flex items-center justify-center disabled:opacity-30 hover:bg-primary-light transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
