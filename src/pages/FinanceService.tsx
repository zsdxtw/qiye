import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import {
  Banknote,
  Percent,
  FileText,
  Award,
  Shield,
  CreditCard,
  Wallet,
  Building2,
} from "lucide-react";

const loanProducts = [
  { name: "科技信用贷", bank: "中国银行", amount: "300万", rate: "4.05%", term: "12个月", match: 95, color: "#1E3A5F" },
  { name: "中小企业经营贷", bank: "建设银行", amount: "200万", rate: "4.35%", term: "24个月", match: 88, color: "#D4AF37" },
  { name: "知识产权质押贷", bank: "工商银行", amount: "150万", rate: "4.75%", term: "36个月", match: 82, color: "#3182CE" },
];

const insurances = [
  { name: "企业财产保险", scope: "厂房、设备、存货等企业财产因自然灾害或意外事故造成的损失", premium: "¥12,800/年", icon: Shield, color: "#1E3A5F" },
  { name: "雇主责任险", scope: "员工在工作期间因意外伤害或职业病导致的身故、伤残及医疗费用", premium: "¥8,600/年", icon: Award, color: "#D4AF37" },
];

const collections = [
  { channel: "微信支付", amount: 28560, icon: Wallet, color: "#38A169" },
  { channel: "支付宝", amount: 19320, icon: CreditCard, color: "#3182CE" },
  { channel: "银行转账", amount: 56800, icon: Building2, color: "#1E3A5F" },
];

const cashMonths = ["1月", "2月", "3月", "4月", "5月", "6月"];
const forecast = [120, 135, 128, 145, 160, 172];
const lowerBound = [108, 120, 115, 130, 142, 155];
const upperBound = [132, 150, 141, 160, 178, 189];

export default function FinanceService() {
  const cashOption: EChartsOption = {
    tooltip: { trigger: "axis" },
    legend: { data: ["预测现金流", "置信区间"], bottom: 0, textStyle: { fontSize: 12, color: "#4A5568" } },
    grid: { left: 50, right: 20, top: 20, bottom: 40 },
    xAxis: { type: "category", data: cashMonths, boundaryGap: false, axisLabel: { fontSize: 11, color: "#4A5568" }, axisLine: { lineStyle: { color: "#E2E8F0" } } },
    yAxis: { type: "value", axisLabel: { fontSize: 11, color: "#718096", formatter: "{value}万" }, splitLine: { lineStyle: { color: "#EDF2F7" } } },
    series: [
      {
        name: "置信区间",
        type: "line",
        data: lowerBound,
        stack: "confidence",
        symbol: "none",
        lineStyle: { opacity: 0 },
        areaStyle: { opacity: 0 },
      },
      {
        name: "置信区间",
        type: "line",
        data: upperBound.map((u, i) => u - lowerBound[i]),
        stack: "confidence",
        symbol: "none",
        lineStyle: { opacity: 0 },
        areaStyle: { color: "rgba(30,58,95,0.15)" },
      },
      {
        name: "预测现金流",
        type: "line",
        data: forecast,
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { color: "#1E3A5F", width: 2.5 },
        itemStyle: { color: "#D4AF37", borderColor: "#fff", borderWidth: 2 },
      },
    ],
  };

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <PageHeader title="金融服务超市" subtitle="智能融资匹配 · 企业保险 · 聚合收款 · 现金流预测" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="可贷额度" value="500万" icon={<Banknote className="w-[18px] h-[18px]" />} accentColor="#1E3A5F" />
        <StatCard label="融资成本" value="4.35%" change={0.2} trend="down" icon={<Percent className="w-[18px] h-[18px]" />} accentColor="#D4AF37" />
        <StatCard label="在贷笔数" value="2笔" icon={<FileText className="w-[18px] h-[18px]" />} accentColor="#3182CE" />
        <StatCard label="信用评级" value="AA" icon={<Award className="w-[18px] h-[18px]" />} accentColor="#38A169" />
      </div>

      <div>
        <h2 className="text-h3 font-semibold text-ink mb-4">融资产品推荐</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loanProducts.map((p) => (
            <div key={p.name} className="qj-card p-5 hover:shadow-float transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: p.color }} />
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${p.color}15`, color: p.color }}>
                  <Banknote className="w-5 h-5" />
                </div>
                <span className="qj-badge bg-accent/15 text-accent-dark">匹配度 {p.match}%</span>
              </div>
              <h3 className="text-h3 font-semibold text-ink mb-1">{p.name}</h3>
              <p className="text-caption text-ink-mute mb-4">{p.bank}</p>
              <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-gray-100">
                <div>
                  <div className="text-mini text-ink-mute">额度</div>
                  <div className="text-body tnum font-semibold text-ink">{p.amount}</div>
                </div>
                <div>
                  <div className="text-mini text-ink-mute">利率</div>
                  <div className="text-body tnum font-semibold text-accent">{p.rate}</div>
                </div>
                <div>
                  <div className="text-mini text-ink-mute">期限</div>
                  <div className="text-body tnum font-semibold text-ink">{p.term}</div>
                </div>
              </div>
              <button className="w-full qj-btn-primary">申请</button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            企业保险
          </h2>
          <div className="space-y-3">
            {insurances.map((ins) => {
              const Icon = ins.icon;
              return (
                <div key={ins.name} className="flex items-start gap-3 p-4 rounded-lg border border-gray-100 hover:shadow-card transition-all">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${ins.color}15`, color: ins.color }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-body font-medium text-ink">{ins.name}</span>
                      <span className="text-body tnum font-semibold text-accent">{ins.premium}</span>
                    </div>
                    <p className="text-caption text-ink-soft mb-3">{ins.scope}</p>
                    <button className="qj-btn-ghost text-caption px-3 py-1.5">投保</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="qj-card p-5">
          <h2 className="text-h3 font-semibold text-ink mb-4">现金流预测</h2>
          <ReactECharts option={cashOption} style={{ height: 280 }} />
        </div>
      </div>

      <div className="qj-card p-5">
        <h2 className="text-h3 font-semibold text-ink mb-4 flex items-center gap-2">
          <Wallet className="w-4 h-4 text-accent" />
          聚合收款（今日）
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {collections.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.channel} className="p-4 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${c.color}15`, color: c.color }}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-caption text-ink-mute">{c.channel}</span>
                </div>
                <div className="text-h2 tnum font-bold text-ink">¥{c.amount.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between p-4 bg-card rounded-lg">
          <span className="text-body text-ink-soft">今日收款合计</span>
          <span className="text-h2 tnum font-bold text-primary">
            ¥{collections.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
