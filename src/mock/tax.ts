// 税务模块 Mock 数据
export const taxOverview = {
  stats: [
    { label: "本月应纳税额", value: "18.6万", change: "+3%", trend: "up" },
    { label: "本年累计纳税", value: "98.5万", change: "+12%", trend: "up" },
    { label: "综合税负率", value: "3.2%", change: "-0.1%", trend: "down" },
    { label: "风险项", value: "2项", change: "", trend: "neutral" },
  ],
  // 各税种应纳税额
  taxTypes: [
    { name: "增值税", amount: 98000, rate: "13%", status: "待申报", deadline: "2026-06-24" },
    { name: "企业所得税", amount: 56000, rate: "25%", status: "待申报", deadline: "2026-07-15" },
    { name: "个人所得税", amount: 18500, rate: "累进", status: "已申报", deadline: "2026-06-15" },
    { name: "城市维护建设税", amount: 6860, rate: "7%", status: "待申报", deadline: "2026-06-24" },
    { name: "教育费附加", amount: 2940, rate: "3%", status: "待申报", deadline: "2026-06-24" },
    { name: "印花税", amount: 3200, rate: "0.03%", status: "已申报", deadline: "2026-06-15" },
  ],
  // 税负率趋势
  taxRateTrend: {
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
    rates: [3.5, 3.4, 3.6, 3.3, 3.3, 3.2],
    industryAvg: [3.8, 3.7, 3.8, 3.7, 3.6, 3.6],
  },
};

// 申报日历 - 2026年6月
export const taxCalendar = {
  year: 2026,
  month: 5, // JS月份从0开始，5=6月
  events: [
    { day: 15, taxType: "个人所得税", status: "done", title: "个税申报" },
    { day: 15, taxType: "印花税", status: "done", title: "印花税申报" },
    { day: 24, taxType: "增值税", status: "pending", title: "增值税申报" },
    { day: 24, taxType: "城建税", status: "pending", title: "城建税申报" },
    { day: 24, taxType: "教育费附加", status: "pending", title: "教育费附加申报" },
  ],
};

// 税务风险
export const taxRisks = [
  {
    id: "r01",
    level: "high",
    title: "库存账实差异较大",
    description: "账面库存 ¥128万，根据进销项推算实际库存约 ¥85万，差异率 33.6%",
    suggestion: "6月底前完成实地盘点，差异部分做账务调整，避免税务稽查风险",
    impact: "可能面临补税+滞纳金约 ¥5-8万",
  },
  {
    id: "r02",
    level: "medium",
    title: "进销项比例异常",
    description: "本月进项税额占比 62%，行业均值 45%，存在虚抵进项风险",
    suggestion: "核查5月单笔超10万的进项发票真实性，保留完整业务链证据",
    impact: "若被认定虚抵，需转出进项税并补缴",
  },
  {
    id: "r03",
    level: "low",
    title: "个税申报人员遗漏",
    description: "2名兼职人员劳务报酬未申报个税",
    suggestion: "在6月申报期内补报，完善用工合同",
    impact: "补缴个税约 ¥3,200，无滞纳金",
  },
];

// 税收优惠
export const taxBenefits = [
  { id: "b01", name: "制造业研发费用加计扣除", rate: "120%", estimatedSaving: "8.5万/年", status: "可享受", desc: "制造业企业研发费用未形成无形资产计入当期损益的，在按规定据实扣除的基础上，再按照实际发生额的120%在税前加计扣除。" },
  { id: "b02", name: "小型微利企业所得税优惠", rate: "20%", estimatedSaving: "3.2万/年", status: "可享受", desc: "年应纳税所得额不超过300万元的小型微利企业，所得税按20%税率缴纳。" },
  { id: "b03", name: "增值税留抵退税", rate: "全额", estimatedSaving: "12万", status: "可申请", desc: "符合条件的制造业企业可按月申请全额退还增值税增量留抵税额。" },
  { id: "b04", name: "残疾人就业保障金减免", rate: "50%", estimatedSaving: "0.8万/年", status: "可享受", desc: "安排残疾人就业比例达到1%以上的，按规定比例减免残保金。" },
];
