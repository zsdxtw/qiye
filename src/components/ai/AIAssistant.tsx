import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Mic, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { aiChatPresets } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  agent?: string;
  source?: string;
  confidence?: number;
  actions?: { label: string; type: 'primary' | 'secondary' }[];
}

const quickPrompts = [
  '下个月现金流够不够发工资',
  '哪个产品最赚钱',
  '有哪些政策可以申报',
];

export function AIAssistant() {
  const { aiAssistantOpen, toggleAiAssistant } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'ai',
      content: '您好李总，我是智擎 AI 助手。我可以帮您分析经营数据、预测风险、生成方案。试试问我：',
      agent: '智擎AI',
      actions: quickPrompts.map((p) => ({ label: p, type: 'secondary' as const })),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);

    // 匹配预设回复
    const preset = aiChatPresets.find((p) => p.user === text);
    setTimeout(() => {
      setTyping(false);
      if (preset) {
        setMessages((m) => [
          ...m,
          {
            id: `a-${Date.now()}`,
            role: 'ai',
            content: preset.ai.content,
            agent: preset.ai.agent,
            source: preset.ai.source,
            confidence: preset.ai.confidence,
            actions: preset.ai.actions,
          },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          {
            id: `a-${Date.now()}`,
            role: 'ai',
            content: `已收到您的问题"${text}"。我正在调用相关 Agent 进行分析，请稍候。基于当前经营数据，建议您从经营驾驶舱查看实时指标，或使用预设问题快速体验。`,
            agent: '智擎AI',
            source: '多模块数据',
            confidence: 75,
          },
        ]);
      }
    }, 1200);
  };

  return (
    <>
      {/* 悬浮按钮 */}
      <AnimatePresence>
        {!aiAssistantOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={toggleAiAssistant}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-accent text-white shadow-lg hover:shadow-xl flex items-center justify-center no-print"
            aria-label="打开 AI 助手"
          >
            <Sparkles className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-ok rounded-full border-2 border-bg" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 对话面板 */}
      <AnimatePresence>
        {aiAssistantOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleAiAssistant}
              className="fixed inset-0 bg-black/20 z-40 lg:bg-transparent no-print"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-dark-bg1 z-50 flex flex-col no-print"
            >
              {/* 头部 */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent2 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">智擎 AI 助手</div>
                    <div className="text-2xs text-dark-muted font-mono">在线 · 随时为您服务</div>
                  </div>
                </div>
                <button
                  onClick={toggleAiAssistant}
                  className="text-dark-muted hover:text-white p-1.5 rounded-lg hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 消息区 */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} msg={msg} onQuickAction={sendMessage} />
                ))}
                {typing && (
                  <div className="flex items-center gap-2 text-dark-muted text-xs">
                    <div className="w-2 h-2 bg-accent2 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-accent2 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-accent2 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="ml-1">智擎AI 正在分析...</span>
                  </div>
                )}
              </div>

              {/* 快捷指令 */}
              <div className="px-5 py-2 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {quickPrompts.map((p) => (
                    <button
                      key={p}
                      onClick={() => sendMessage(p)}
                      className="text-2xs px-2 py-1 rounded bg-white/5 text-dark-muted hover:bg-white/10 hover:text-white transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* 输入区 */}
              <div className="px-5 py-4 border-t border-white/10">
                <div className="flex items-center gap-2 bg-white/5 rounded-card-sm px-3 py-2">
                  <Mic className="w-4 h-4 text-dark-muted flex-shrink-0" />
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                    placeholder="输入您的问题，或点击上方快捷指令"
                    className="flex-1 bg-transparent text-white text-sm placeholder:text-dark-muted focus:outline-none"
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim()}
                    className="text-accent2 disabled:text-dark-muted p-1"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ msg, onQuickAction }: { msg: Message; onQuickAction: (text: string) => void }) {
  if (msg.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-accent text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
          <p className="text-sm leading-relaxed">{msg.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="bg-dark-bg2 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%]">
        {msg.agent && (
          <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-white/5">
            <Sparkles className="w-3 h-3 text-accent2" />
            <span className="text-2xs font-mono text-accent2">智擎AI · 调用：{msg.agent}</span>
          </div>
        )}
        <div className="text-sm text-dark-ink leading-relaxed whitespace-pre-wrap">
          {renderContent(msg.content)}
        </div>
        {msg.actions && msg.actions.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {msg.actions.map((a, i) => (
              <button
                key={i}
                onClick={() => onQuickAction(a.label)}
                className={cn(
                  'w-full text-left text-xs px-3 py-2 rounded-card-sm flex items-center justify-between transition-colors',
                  a.type === 'primary'
                    ? 'bg-accent text-white hover:bg-accent/90'
                    : 'bg-white/5 text-dark-ink hover:bg-white/10',
                )}
              >
                <span>{a.label}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        )}
        {msg.source && (
          <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-2 text-2xs text-dark-muted font-mono">
            <span>数据来源：{msg.source}</span>
            <span>·</span>
            <span className={cn(msg.confidence && msg.confidence < 70 ? 'text-amber' : 'text-ok')}>
              置信度 {msg.confidence}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/** 渲染带 **加粗** 的内容 */
function renderContent(content: string) {
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
