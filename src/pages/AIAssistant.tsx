import { useState, useRef, useEffect } from "react";
import { useChatStore, type ChatMessage } from "@/store/chatStore";
import { quickQuestions } from "@/mock/consultation";
import { Plus, Send, Sparkles, MessageSquare, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="h-[calc(100vh-4rem)] flex">
      {/* 左侧会话列表 */}
      <aside className="w-64 bg-primary-dark text-white p-4 flex flex-col shrink-0">
        <button
          onClick={() => createSession()}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-accent text-primary-dark rounded-lg text-body font-semibold hover:shadow-glow transition-all mb-4"
        >
          <Plus className="w-4 h-4" />
          新建对话
        </button>
        <div className="text-mini text-white/40 px-1 mb-2">会话列表</div>
        <div className="flex-1 overflow-y-auto sidebar-scroll space-y-1">
          {sessions.map((s) => (
            <button
              key={s.id}
              onClick={() => setCurrentSession(s.id)}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-lg transition-colors",
                s.id === currentSessionId
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span className="text-caption font-medium truncate">{s.title}</span>
              </div>
              <div className="text-mini text-white/40 pl-5">{s.createdAt}</div>
            </button>
          ))}
        </div>
      </aside>

      {/* 右侧聊天区 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 头部 */}
        <div className="h-14 bg-white border-b border-gray-100 flex items-center px-6 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div>
              <div className="text-body font-semibold text-ink leading-tight">小企 AI 经营助手</div>
              <div className="text-mini text-success leading-tight flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                在线 · 随时为您服务
              </div>
            </div>
          </div>
        </div>

        {/* 消息区 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-card">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Bot className="w-7 h-7 text-accent" />
              </div>
              <div className="text-h3 text-ink font-semibold mb-1">您好，张总</div>
              <div className="text-caption text-ink-mute">我是小企AI经营助手，有什么可以帮您？</div>
            </div>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex flex-col", msg.role === "user" ? "items-end" : "items-start")}>
              <div
                className={cn(
                  "max-w-[75%] px-4 py-2.5 text-caption leading-relaxed whitespace-pre-wrap",
                  msg.role === "user"
                    ? "bg-primary text-white rounded-2xl rounded-br-md"
                    : "bg-white text-ink rounded-2xl rounded-bl-md shadow-card border border-gray-50"
                )}
              >
                {msg.content}
              </div>
              <div className="text-mini text-ink-mute mt-1 px-1">{msg.timestamp}</div>
            </div>
          ))}
          {isTyping && (
            <div className="flex flex-col items-start">
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
          <div className="px-6 pb-2 shrink-0 bg-card">
            <div className="flex flex-wrap gap-2">
              {quickQuestions.slice(0, 4).map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1.5 rounded-full bg-white border border-gray-100 text-mini text-ink-soft hover:border-primary hover:text-primary transition-all shadow-card"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 输入区 */}
        <div className="border-t border-gray-100 p-4 bg-white shrink-0">
          <div className="flex items-center gap-2 bg-card rounded-lg px-4 py-2.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="输入您的问题，按 Enter 发送..."
              className="flex-1 bg-transparent text-body text-ink placeholder:text-ink-mute outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center disabled:opacity-30 hover:bg-primary-light transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
