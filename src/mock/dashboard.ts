// 老板驾驶舱数据
export const dashboardData = {
  greeting: "早上好",
  userName: "张总",
  todayDate: "2026年6月21日 周日",
  todos: 3,
  alerts: 1,
  messages: 5,

  // 经营健康评分
  healthScore: {
    total: 78,
    grade: "A",
    change: 2,
    dimensions: [
      { name: "财务健康", score: 82, fullMark: 100 },
      { name: "税务合规", score: 75, fullMark: 100 },
      { name: "运营效率", score: 80, fullMark: 100 },
      { name: "成长潜力", score: 70, fullMark: 100 },
      { name: "风险控制", score: 76, fullMark: 100 },
      { name: "合规水平", score: 85, fullMark: 100 },
    ],
  },

  // 关键经营数据
  keyMetrics: [
    {
      key: "revenue",
      label: "本月营收",
      value: 1280000,
      display: "128.0万",
      unit: "元",
      change: 12,
      trend: "up",
      icon: "trending-up",
      color: "primary",
      sparkline: [98, 102, 95, 110, 105, 118, 122, 115, 128],
    },
    {
      key: "profit",
      label: "本月利润",
      value: 230000,
      display: "23.0万",
      unit: "元",
      change: 8,
      trend: "up",
      icon: "piggy-bank",
      color: "accent",
      sparkline: [18, 19, 17, 20, 19, 21, 22, 20, 23],
    },
    {
      key: "cashflow",
      label: "现金流",
      value: 4560000,
      display: "充裕",
      unit: "",
      change: 5,
      trend: "up",
      icon: "droplets",
      color: "info",
      status: "healthy",
      sparkline: [40, 42, 41, 43, 44, 43, 45, 44, 45.6],
    },
  ],

  // 智能预警
  alertsList: [
    {
      id: "a01",
      level: "high",
      icon: "alert-triangle",
      title: "客户A订单量下降40%",
      desc: "苏州宏达科技本月订单量较上月下降40%，建议本周内回访",
      action: "查看详情",
      time: "2小时前",
    },
    {
      id: "a02",
      level: "warning",
      icon: "calendar-clock",
      title: "增值税申报截止：3天后",
      desc: "2026年6月增值税申报截止日6月24日，请尽快完成申报",
      action: "一键申报",
      time: "今日提醒",
    },
    {
      id: "a03",
      level: "info",
      icon: "package",
      title: "原材料库存预警",
      desc: "45#钢材库存仅剩8天用量，建议及时补货",
      action: "去采购",
      time: "5小时前",
    },
    {
      id: "a04",
      level: "warning",
      icon: "file-text",
      title: "3份合同即将到期",
      desc: "与苏州联发的年度采购合同将于7月15日到期",
      action: "查看合同",
      time: "昨日",
    },
  ],

  // 快捷功能
  quickActions: [
    { key: "bookkeeping", label: "记账", icon: "book-open", path: "/finance/invoices", color: "#1E3A5F" },
    { key: "tax", label: "税务", icon: "receipt", path: "/tax", color: "#D4AF37" },
    { key: "finance", label: "融资", icon: "banknote", path: "/finance-service", color: "#38A169" },
    { key: "hr", label: "招聘", icon: "users", path: "/hr", color: "#3182CE" },
    { key: "inventory", label: "库存", icon: "package", path: "/supply-chain", color: "#DD6B20" },
    { key: "marketing", label: "营销", icon: "megaphone", path: "/marketing", color: "#805AD5" },
    { key: "contract", label: "合同", icon: "file-signature", path: "/legal", color: "#E53E3E" },
    { key: "policy", label: "政策", icon: "landmark", path: "/policy", color: "#0D9488" },
    { key: "diagnosis", label: "诊断", icon: "activity", path: "/growth", color: "#1E3A5F" },
    { key: "consult", label: "咨询", icon: "message-circle", path: "/consultation", color: "#D4AF37" },
    { key: "dashboard", label: "看板", icon: "bar-chart-3", path: "/dashboard", color: "#3182CE" },
    { key: "more", label: "更多", icon: "grid-3x3", path: "/workspace", color: "#718096" },
  ],

  // 行业动态
  industryNews: {
    policy: [
      { id: "p01", source: "国家税务总局", time: "2小时前", title: "制造业研发费用加计扣除比例提升至120%", summary: "财政部、税务总局联合发布通知，制造业企业研发费用加计扣除比例由100%提升至120%。" },
      { id: "p02", source: "江苏省工信厅", time: "昨日", title: "2026年度专精特新中小企业申报启动", summary: "申报截止日期为7月31日，符合条件的企业可获最高50万元奖励。" },
      { id: "p03", source: "国务院", time: "2天前", title: "延续优化增值税小规模纳税人政策", summary: "月销售额10万元以下免征增值税政策延续至2027年底。" },
    ],
    competitor: [
      { id: "c01", source: "企查查", time: "3小时前", title: "竞品B获得A轮融资2000万", summary: "同行业竞品苏州恒达精密完成A轮融资，将扩大产能。" },
      { id: "c02", source: "招聘平台", time: "昨日", title: "竞品C大规模招聘研发人员", summary: "竞品C本周新增15个研发岗位，薪资高于行业均值20%。" },
    ],
    industry: [
      { id: "i01", source: "中国机械工业联合会", time: "今日", title: "5月制造业PMI回升至51.2%", summary: "制造业景气度连续三个月位于扩张区间，精密制造细分领域增长显著。" },
      { id: "i02", source: "经济日报", time: "昨日", title: "原材料价格指数环比下降2.3%", summary: "钢材、铝材等主要原材料价格回落，有利于制造业成本控制。" },
    ],
  },
};
