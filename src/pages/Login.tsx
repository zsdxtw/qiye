import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Building2, Lock, Phone, QrCode, Eye, EyeOff, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type LoginMode = "password" | "sms" | "qrcode";

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [mode, setMode] = useState<LoginMode>("password");
  const [showPwd, setShowPwd] = useState(false);
  const [account, setAccount] = useState("admin@qijia.com");
  const [password, setPassword] = useState("qijia123");
  const [phone, setPhone] = useState("13888888866");
  const [code, setCode] = useState("");

  const handleLogin = () => {
    login();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* 左侧品牌展示区 */}
      <div className="hidden lg:flex lg:w-[55%] relative bg-primary-dark overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/8 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />
        {/* 网格纹理 */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* 内容 */}
        <div className="relative z-10 flex flex-col justify-between p-16 text-white w-full">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shadow-glow">
              <Building2 className="w-6 h-6 text-primary-dark" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-h2 font-bold tracking-wide">企管家</div>
              <div className="text-mini text-white/50">Qijia Business OS</div>
            </div>
          </div>

          <div className="max-w-lg">
            <h1 className="text-4xl font-bold leading-tight mb-4">
              一个后台，管遍企业大小事
            </h1>
            <p className="text-body text-white/70 leading-relaxed mb-8">
              三务顾问 + AI 成长助手，让老板决策更聪明。覆盖财务、税务、法务、人力、供应链等十大经营场景，专为中小企业打造的一站式智能经营管家。
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "10+", label: "服务板块" },
                { num: "AI", label: "经营助手" },
                { num: "N+", label: "行业插件" },
                { num: "等保三级", label: "安全认证" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-h2 text-accent font-bold tnum">{item.num}</span>
                  <span className="text-caption text-white/60">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-mini text-white/40">
            © 2026 企管家 Qijia Business OS · 让老板少操心，让企业更赚钱
          </div>
        </div>
      </div>

      {/* 右侧登录表单 */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
          {/* 移动端 Logo */}
          <div className="flex lg:hidden items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="text-h2 font-bold text-primary">企管家</div>
          </div>

          <h2 className="text-h1 font-bold text-ink mb-1">欢迎回来</h2>
          <p className="text-caption text-ink-mute mb-8">登录您的企业管理后台</p>

          {/* 登录方式 Tab */}
          <div className="flex gap-1 mb-6 bg-card p-1 rounded-lg">
            {[
              { key: "password", label: "账号密码" },
              { key: "sms", label: "验证码" },
              { key: "qrcode", label: "扫码" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setMode(tab.key as LoginMode)}
                className={cn(
                  "flex-1 py-2 rounded-md text-caption font-medium transition-all",
                  mode === tab.key
                    ? "bg-white text-primary shadow-card"
                    : "text-ink-mute hover:text-ink"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 账号密码登录 */}
          {mode === "password" && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="text-caption text-ink-soft mb-1.5 block">账号</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-mute" />
                  <input
                    type="text"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-card rounded-lg text-body text-ink border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
                    placeholder="邮箱 / 手机号"
                  />
                </div>
              </div>
              <div>
                <label className="text-caption text-ink-soft mb-1.5 block">密码</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-mute" />
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 pl-10 pr-10 bg-card rounded-lg text-body text-ink border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
                    placeholder="请输入密码"
                  />
                  <button
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-mute hover:text-ink"
                  >
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-caption">
                <label className="flex items-center gap-1.5 text-ink-mute cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-primary" />
                  记住我
                </label>
                <button className="text-primary hover:underline">忘记密码？</button>
              </div>
              <button
                onClick={handleLogin}
                className="w-full h-11 bg-primary text-white rounded-lg text-body font-medium hover:bg-primary-light hover:shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                登录
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}

          {/* 验证码登录 */}
          {mode === "sms" && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="text-caption text-ink-soft mb-1.5 block">手机号</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-mute" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-card rounded-lg text-body text-ink border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
                    placeholder="请输入手机号"
                  />
                </div>
              </div>
              <div>
                <label className="text-caption text-ink-soft mb-1.5 block">验证码</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-mute" />
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 bg-card rounded-lg text-body text-ink border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
                      placeholder="请输入验证码"
                    />
                  </div>
                  <button className="px-4 h-11 rounded-lg bg-primary-50 text-primary text-caption font-medium hover:bg-primary-100 transition-colors whitespace-nowrap">
                    获取验证码
                  </button>
                </div>
              </div>
              <button
                onClick={handleLogin}
                className="w-full h-11 bg-primary text-white rounded-lg text-body font-medium hover:bg-primary-light hover:shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                登录
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}

          {/* 扫码登录 */}
          {mode === "qrcode" && (
            <div className="animate-fade-in flex flex-col items-center py-4">
              <div className="w-48 h-48 bg-card rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center mb-4 relative">
                <QrCode className="w-24 h-24 text-primary/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-caption text-ink-mute">二维码已生成</div>
                  </div>
                </div>
              </div>
              <p className="text-caption text-ink-mute text-center">
                请使用 <span className="text-primary font-medium">企管家 App</span> 扫描二维码登录
              </p>
              <button
                onClick={handleLogin}
                className="mt-6 text-caption text-accent hover:underline"
              >
                模拟扫码登录 →
              </button>
            </div>
          )}

          <div className="mt-8 text-center text-mini text-ink-mute">
            登录即代表您同意 <button className="text-primary hover:underline">《服务协议》</button> 和{" "}
            <button className="text-primary hover:underline">《隐私政策》</button>
          </div>
        </div>
      </div>
    </div>
  );
}
