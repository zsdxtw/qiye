// 智擎 SaaS 平台模拟数据（中国企业场景，金额单位：人民币万元）

// ============ AI 经营驾驶舱 ============
export const dashboardData = {
  greeting: '早上好，李总',
  date: '2026年6月21日 周日',
  reportTime: '今日经营简报已于 08:00 自动生成',
  aiSummary: {
    text: '本月经营整体稳健，营收 682 万元，环比增长 8.2%，主要受华东区域夏季促销拉动。毛利率 28.6%，较上月下降 2.3 个百分点，主因原材料采购成本上涨 12%。现金流覆盖月数 4.2 个月，处于安全区间，但需关注华联账款逾期 18 天带来的回款风险。库存周转 6.8 次，C 品类（季节性商品）周转放缓至 3.2 次，建议启动促销清仓。',
    highlights: [
      { value: '682万', label: '本月营收', tone: 'ok' as const },
      { value: '28.6%', label: '毛利率', tone: 'amber' as const },
      { value: '4.2月', label: '现金流覆盖', tone: 'ok' as const },
      { value: '18天', label: '华联账款逾期', tone: 'warn' as const },
    ],
  },
  metrics: [
    { label: '本月营收', value: '682', unit: '万', change: '+8.2%', trend: 'up' as const, sub: '环比上月' },
    { label: '毛利率', value: '28.6', unit: '%', change: '-2.3pp', trend: 'down' as const, sub: '原材料成本上涨' },
    { label: '现金流覆盖', value: '4.2', unit: '月', change: '+0.3月', trend: 'up' as const, sub: '安全水位 3 月' },
    { label: '库存周转', value: '6.8', unit: '次', change: '-0.4次', trend: 'down' as const, sub: 'C 品类周转放缓' },
  ],
  revenueTrend: {
    months: ['1月', '2月', '3月', '4月', '5月', '6月'],
    revenue: [520, 548, 612, 588, 630, 682],
    profit: [148, 158, 182, 165, 178, 195],
  },
  aiSuggestions: [
    {
      id: 's1',
      title: '与原材料供应商重新议价',
      desc: '近 3 月钢材采购均价上涨 12%，建议与核心供应商东方钢铁锁定 3 个月期货价格，预计可降低成本 8-10%。',
      impact: '预计节省 18 万/月',
      agent: '采购 Agent',
    },
    {
      id: 's2',
      title: '催收华联逾期账款 32 万',
      desc: '华联账款逾期 18 天，回款概率 42%。建议立即启动催收流程，可使用 AI 生成的催收函模板。',
      impact: '回收 32 万，提升现金流',
      agent: '财务 Agent',
    },
    {
      id: 's3',
      title: 'C 品类启动促销清库存',
      desc: 'C 品类（季节性商品）库存 186 万，周转 3.2 次低于均值。建议 7 折促销，预计 30 天清空 70%。',
      impact: '回笼资金 130 万',
      agent: '销售 Agent',
    },
    {
      id: 's4',
      title: '申报高新技术企业政策',
      desc: '检测到企业符合 2026 年高新技术企业认定条件，可享受 15% 企业所得税优惠，预估 3 年节税 280 万。',
      impact: '3 年节税 280 万',
      agent: '政策 Agent',
    },
  ],
  riskSummary: { high: 2, medium: 3, resolved: 5 },
  todos: [
    { id: 't1', type: '审批', title: '采购订单 PO-2026-0618 待审批', time: '2 小时前', urgent: true },
    { id: 't2', type: '申报', title: '增值税申报截止 6 月 25 日', time: '剩余 4 天', urgent: true },
    { id: 't3', type: '到期', title: '员工张伟劳动合同 7 月 1 日到期', time: '剩余 10 天', urgent: false },
    { id: 't4', type: '审批', title: '差旅报销 3 笔待审批', time: '今日', urgent: false },
  ],
};

// ============ 风险预警中心 ============
export const riskData = {
  counts: { high: 2, medium: 3, resolved: 5 },
  items: [
    {
      id: 'r1',
      level: 'high' as const,
      title: '现金流风险 · 华联账款逾期',
      time: '2 小时前',
      description: '华联账款逾期 18 天，回款概率降至 42%',
      analysis: '该客户近 3 月下单频率下降 40%，其所在零售行业景气度下行。客户应付账款周转天数从 45 天延长至 68 天。',
      impact: '若该笔 32 万坏账，现金流覆盖月数将从 4.2 降至 3.1，逼近警戒水位。',
      actions: [
        { label: '查看应对方案', type: 'secondary' as const },
        { label: '一键催收', type: 'primary' as const },
        { label: '标记已处理', type: 'secondary' as const },
      ],
    },
    {
      id: 'r2',
      level: 'high' as const,
      title: '库存滞销风险 · C 品类周转放缓',
      time: '5 小时前',
      description: 'C 品类（季节性商品）库存 186 万，周转率降至 3.2 次',
      analysis: '近 30 天 C 品类销量同比下降 35%，库存可售天数达 92 天，远超 45 天警戒线。7 月后将进入淡季，滞销风险加剧。',
      impact: '若按当前销售速度，需 92 天清空，期间仓储成本 1.2 万/月，且存在过期损耗风险。',
      actions: [
        { label: '查看应对方案', type: 'secondary' as const },
        { label: '启动促销', type: 'primary' as const },
        { label: '标记已处理', type: 'secondary' as const },
      ],
    },
    {
      id: 'r3',
      level: 'medium' as const,
      title: '毛利率下滑 · 原材料成本上涨',
      time: '1 天前',
      description: '本月毛利率 28.6%，环比下降 2.3 个百分点',
      analysis: '主因钢材采购均价上涨 12%，未及时向下游传导。同行业平均毛利率 31.2%，存在 2.6pp 差距。',
      impact: '若维持现状，预计下月毛利率将降至 26%，月利润减少 18 万。',
      actions: [
        { label: '查看应对方案', type: 'secondary' as const },
        { label: '启动议价', type: 'primary' as const },
      ],
    },
    {
      id: 'r4',
      level: 'medium' as const,
      title: '客户流失风险 · 东方零售活跃度下降',
      time: '1 天前',
      description: '东方零售近 30 天未下单，流失风险评分 72',
      analysis: '该客户历史月均下单 45 万，近 2 月下单频率下降 60%。沟通记录显示其正在评估竞品。',
      impact: '若流失，年营收减少约 540 万，毛利率影响 1.8pp。',
      actions: [
        { label: '查看挽回话术', type: 'secondary' as const },
        { label: '一键外呼', type: 'primary' as const },
      ],
    },
    {
      id: 'r5',
      level: 'medium' as const,
      title: '税务风险 · 进项发票异常',
      time: '2 天前',
      description: '检测到 3 张进项发票存在疑点',
      analysis: 'AI 税务扫描发现 3 张来自同一供应商的发票金额异常接近免税起征点，存在虚开风险。',
      impact: '若被税务机关核查，可能面临补税及罚款，预估影响 8-15 万。',
      actions: [
        { label: '查看发票详情', type: 'secondary' as const },
        { label: '标记已处理', type: 'secondary' as const },
      ],
    },
  ],
};

// ============ 智能票据 ============
export const invoiceData = {
  stats: { total: 248, pending: 12, recognized: 186, voucher: 50 },
  list: [
    { id: 'INV-2026-0618-001', date: '2026-06-18', type: '增值税专用发票', amount: 18.6, supplier: '东方钢铁有限公司', status: 'voucher' as const },
    { id: 'INV-2026-0618-002', date: '2026-06-18', type: '增值税普通发票', amount: 3.2, supplier: '顺丰物流', status: 'recognized' as const },
    { id: 'INV-2026-0617-008', date: '2026-06-17', type: '增值税专用发票', amount: 56.8, supplier: '华东原材料市场', status: 'voucher' as const },
    { id: 'INV-2026-0617-007', date: '2026-06-17', type: '餐饮发票', amount: 0.86, supplier: '锦江饭店', status: 'recognized' as const },
    { id: 'INV-2026-0616-012', date: '2026-06-16', type: '增值税专用发票', amount: 12.4, supplier: '恒达包装', status: 'pending' as const },
    { id: 'INV-2026-0616-011', date: '2026-06-16', type: '差旅发票', amount: 2.3, supplier: '携程商旅', status: 'recognized' as const },
    { id: 'INV-2026-0615-009', date: '2026-06-15', type: '增值税专用发票', amount: 8.9, supplier: '京华印刷', status: 'voucher' as const },
    { id: 'INV-2026-0615-008', date: '2026-06-15', type: '办公用品', amount: 1.2, supplier: '晨光文具', status: 'pending' as const },
  ],
  ocrPreview: {
    invoiceCode: '31000000001234567',
    invoiceNumber: '06187653',
    date: '2026-06-18',
    buyer: '华联商贸有限公司',
    seller: '东方钢铁有限公司',
    amount: '18.6 万元',
    tax: '2.42 万元',
    total: '21.02 万元',
    voucher: {
      debit: '原材料采购 18.60 万 / 应交税费-进项税 2.42 万',
      credit: '应付账款 21.02 万',
    },
  },
};

// ============ 应收应付 ============
export const receivableData = {
  summary: {
    receivable: 486.5,
    payable: 312.8,
    receivableChange: '+5.2%',
    payableChange: '-3.1%',
  },
  agingDistribution: {
    '0-30天': 285.6,
    '31-60天': 128.4,
    '61-90天': 52.3,
    '90天+': 20.2,
  },
  heatmap: {
    customers: ['华联超市', '东方零售', '京东自营', '永辉超市', '盒马鲜生', '大润发', '沃尔玛', '家乐福'],
    periods: ['0-30天', '31-60天', '61-90天', '90天+'],
    data: [
      [45.2, 12.8, 0, 0],
      [38.6, 0, 18.4, 0],
      [62.3, 28.5, 0, 0],
      [25.8, 15.6, 8.2, 0],
      [18.4, 22.3, 0, 5.6],
      [32.1, 0, 0, 0],
      [28.5, 18.6, 12.4, 8.2],
      [15.6, 8.4, 0, 6.4],
    ],
  },
  highRisk: [
    { customer: '华联超市', amount: 32.0, overdue: 18, recoveryRate: 42, level: 'high' as const },
    { customer: '盒马鲜生', amount: 28.4, overdue: 12, recoveryRate: 48, level: 'high' as const },
    { customer: '家乐福', amount: 21.2, overdue: 8, recoveryRate: 55, level: 'medium' as const },
    { customer: '永辉超市', amount: 15.6, overdue: 5, recoveryRate: 62, level: 'medium' as const },
  ],
};

// ============ 资金管理 ============
export const cashflowData = {
  accounts: [
    { bank: '工商银行', account: '6222 **** 1234', balance: 286.5, type: '基本户' },
    { bank: '建设银行', account: '6227 **** 5678', balance: 152.3, type: '一般户' },
    { bank: '招商银行', account: '6225 **** 9012', balance: 98.6, type: '一般户' },
    { bank: '支付宝', account: '企业账户', balance: 32.4, type: '三方' },
  ],
  totalBalance: 569.8,
  forecast: {
    months: ['4月', '5月', '6月', '7月', '8月', '9月'],
    actual: [485, 520, 569.8, null, null, null],
    predicted: [null, null, 569.8, 542, 498, 465],
    safeLine: 300,
    warningLine: 200,
  },
  gapWarning: {
    month: '8 月',
    gap: -42,
    suggestion: '建议提前收回华联账款 32 万，并申请银行短期流动资金贷款 50 万，可覆盖 8 月资金缺口。',
  },
};

// ============ 采购管理 ============
export const purchaseData = {
  stats: { totalOrders: 86, monthAmount: 248.6, pendingApproval: 3, supplierCount: 42 },
  orders: [
    { id: 'PO-2026-0618-008', supplier: '东方钢铁有限公司', date: '2026-06-18', amount: 56.8, status: '待审批' as const, items: 12 },
    { id: 'PO-2026-0617-007', supplier: '恒达包装', date: '2026-06-17', amount: 12.4, status: '已下单' as const, items: 5 },
    { id: 'PO-2026-0616-006', supplier: '华东原材料市场', date: '2026-06-16', amount: 38.2, status: '已收货' as const, items: 8 },
    { id: 'PO-2026-0615-005', supplier: '京华印刷', date: '2026-06-15', amount: 8.9, status: '已收货' as const, items: 3 },
    { id: 'PO-2026-0614-004', supplier: '顺丰物流', date: '2026-06-14', amount: 3.2, status: '已付款' as const, items: 1 },
    { id: 'PO-2026-0613-003', supplier: '晨光文具', date: '2026-06-13', amount: 1.2, status: '已付款' as const, items: 2 },
  ],
  suppliers: [
    { name: '东方钢铁有限公司', rating: 'A', amount: 186.5, onTime: 95, aiSuggestion: '建议锁定 3 个月期货价格，预计降低成本 8-10%' },
    { name: '华东原材料市场', rating: 'A', amount: 128.4, onTime: 92, aiSuggestion: '付款周期可从 30 天延长至 45 天' },
    { name: '恒达包装', rating: 'B', amount: 56.8, onTime: 85, aiSuggestion: '近 2 月交货延迟率上升 15%，建议引入备选供应商' },
    { name: '京华印刷', rating: 'B', amount: 32.4, onTime: 88, aiSuggestion: '报价高于市场均价 6%，建议重新议价' },
  ],
};

// ============ 销售管理 ============
export const salesData = {
  stats: { totalOrders: 326, monthAmount: 682.5, monthGrowth: 8.2, customerCount: 128 },
  channels: [
    { name: '线下门店', amount: 312.6, ratio: 45.8, growth: 5.2 },
    { name: '电商平台', amount: 218.4, ratio: 32.0, growth: 15.6 },
    { name: '分销渠道', amount: 98.5, ratio: 14.4, growth: -2.3 },
    { name: '企业直销', amount: 53.0, ratio: 7.8, growth: 12.4 },
  ],
  orders: [
    { id: 'SO-2026-0618-026', customer: '华联超市', channel: '分销渠道', date: '2026-06-18', amount: 32.0, status: '待发货' as const },
    { id: 'SO-2026-0618-025', customer: '京东自营', channel: '电商平台', date: '2026-06-18', amount: 86.4, status: '已发货' as const },
    { id: 'SO-2026-0617-024', customer: '永辉超市', channel: '分销渠道', date: '2026-06-17', amount: 45.6, status: '已签收' as const },
    { id: 'SO-2026-0617-023', customer: '盒马鲜生', channel: '电商平台', date: '2026-06-17', amount: 28.4, status: '已签收' as const },
    { id: 'SO-2026-0616-022', customer: '大润发', channel: '线下门店', date: '2026-06-16', amount: 38.2, status: '已签收' as const },
    { id: 'SO-2026-0616-021', customer: '沃尔玛', channel: '分销渠道', date: '2026-06-16', amount: 52.8, status: '已签收' as const },
  ],
  forecast: {
    nextMonth: 728,
    confidence: 86,
    factors: ['夏季促销活动', '电商渠道增长趋势', 'C 品类清库存'],
  },
};

// ============ 库存管理 ============
export const inventoryData = {
  stats: { totalValue: 486.5, turnover: 6.8, slowAmount: 186.0, expiringAmount: 32.4 },
  items: [
    { sku: 'A-001', name: '不锈钢板材 1.2mm', stock: 8600, unit: '张', daysAvailable: 28, status: 'normal' as const, value: 86.5 },
    { sku: 'A-002', name: '不锈钢管材 Φ25', stock: 4200, unit: '米', daysAvailable: 35, status: 'normal' as const, value: 42.3 },
    { sku: 'B-001', name: '包装纸箱 大号', stock: 28000, unit: '个', daysAvailable: 45, status: 'normal' as const, value: 28.6 },
    { sku: 'C-001', name: '夏季凉席 单人', stock: 8600, unit: '件', daysAvailable: 92, status: 'slow' as const, value: 86.4 },
    { sku: 'C-002', name: '便携风扇 USB', stock: 5200, unit: '台', daysAvailable: 78, status: 'slow' as const, value: 52.3 },
    { sku: 'C-003', name: '冰垫 降温坐垫', stock: 3200, unit: '件', daysAvailable: 65, status: 'slow' as const, value: 32.1 },
    { sku: 'D-001', name: '食品原料 面粉', stock: 1200, unit: '袋', daysAvailable: 22, status: 'expiring' as const, value: 18.6 },
    { sku: 'D-002', name: '食品原料 食用油', stock: 860, unit: '桶', daysAvailable: 18, status: 'expiring' as const, value: 13.8 },
  ],
  aiRestock: [
    { sku: 'A-001', name: '不锈钢板材 1.2mm', current: 8600, suggested: 12000, reason: '近 30 天日均消耗 310 张，按 45 天安全库存建议补货' },
    { sku: 'A-002', name: '不锈钢管材 Φ25', current: 4200, suggested: 6000, reason: '7-9 月为销售旺季，预计需求增长 25%' },
    { sku: 'B-001', name: '包装纸箱 大号', current: 28000, suggested: 40000, reason: '电商渠道订单增长 15%，包装需求同步上升' },
  ],
};

// ============ 客户管理 CRM ============
export const crmData = {
  stats: { total: 128, active: 96, churnRisk: 18, monthNew: 8 },
  customers: [
    { id: 'C-001', name: '华联超市', contact: '王经理 138****6234', lastOrder: '2026-06-18', totalAmount: 1286.5, churnRisk: 42, level: 'A' },
    { id: 'C-002', name: '东方零售', contact: '李总 139****8821', lastOrder: '2026-05-20', totalAmount: 986.4, churnRisk: 72, level: 'A' },
    { id: 'C-003', name: '京东自营', contact: '张经理 137****4562', lastOrder: '2026-06-18', totalAmount: 2156.8, churnRisk: 18, level: 'S' },
    { id: 'C-004', name: '永辉超市', contact: '陈经理 136****9815', lastOrder: '2026-06-17', totalAmount: 856.3, churnRisk: 35, level: 'A' },
    { id: 'C-005', name: '盒马鲜生', contact: '刘经理 135****3214', lastOrder: '2026-06-17', totalAmount: 628.4, churnRisk: 48, level: 'B' },
    { id: 'C-006', name: '大润发', contact: '赵经理 134****6587', lastOrder: '2026-06-16', totalAmount: 728.6, churnRisk: 28, level: 'A' },
    { id: 'C-007', name: '沃尔玛', contact: '孙经理 133****2148', lastOrder: '2026-06-16', totalAmount: 1086.2, churnRisk: 22, level: 'S' },
    { id: 'C-008', name: '家乐福', contact: '周经理 132****8965', lastOrder: '2026-05-28', totalAmount: 528.4, churnRisk: 55, level: 'B' },
  ],
  retentionScript: '东方零售李总您好，近期注意到贵司采购频率有所调整。基于我们 3 年的合作基础，特为您申请了老客户专属优惠方案：1) 本季度订单享 95 折；2) 优先供货保障；3) 延长账期至 45 天。期待与您进一步沟通，请问本周三下午方便吗？',
};

// ============ 考勤排班 ============
export const attendanceData = {
  stats: {
    attendance: 96.8,
    late: 8,
    absent: 3,
    leave: 5,
    totalStaff: 186,
  },
  weeklyStats: {
    days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    attendance: [182, 184, 180, 183, 181, 96, 32],
    late: [5, 3, 8, 4, 6, 2, 0],
  },
  schedule: [
    { name: '销售部', morning: ['张伟', '李娜', '王强'], afternoon: ['张伟', '李娜', '王强'], evening: ['王强'] },
    { name: '仓储部', morning: ['刘洋', '陈静'], afternoon: ['刘洋', '陈静', '赵磊'], evening: ['赵磊', '孙浩'] },
    { name: '财务部', morning: ['周敏', '吴芳'], afternoon: ['周敏', '吴芳'], evening: [] },
    { name: '行政部', morning: ['郑洁'], afternoon: ['郑洁'], evening: [] },
  ],
  workHours: [
    { department: '销售部', headcount: 48, avgHours: 176, overtime: 28 },
    { department: '仓储部', headcount: 62, avgHours: 168, overtime: 35 },
    { department: '财务部', headcount: 12, avgHours: 172, overtime: 12 },
    { department: '行政部', headcount: 8, avgHours: 168, overtime: 5 },
    { department: '采购部', headcount: 16, avgHours: 174, overtime: 18 },
    { department: '其他', headcount: 40, avgHours: 170, overtime: 15 },
  ],
};

// ============ 薪酬核算 ============
export const payrollData = {
  stats: {
    totalStaff: 186,
    monthPayroll: 286.5,
    socialInsurance: 68.4,
    tax: 32.6,
    avgSalary: 1.54,
  },
  salaryStructure: {
    base: 0.6,
    performance: 0.25,
    allowance: 0.1,
    bonus: 0.05,
  },
  socialInsurance: {
    pension: { company: 0.16, personal: 0.08 },
    medical: { company: 0.095, personal: 0.02 },
    unemployment: { company: 0.005, personal: 0.005 },
    injury: { company: 0.002, personal: 0 },
    maternity: { company: 0.008, personal: 0 },
    housing: { company: 0.07, personal: 0.07 },
  },
  employees: [
    { id: 'E-001', name: '张伟', department: '销售部', position: '销售经理', base: 8000, performance: 4500, allowance: 1200, gross: 13700, tax: 825, net: 11638 },
    { id: 'E-002', name: '李娜', department: '销售部', position: '销售主管', base: 6500, performance: 3200, allowance: 800, gross: 10500, tax: 545, net: 8930 },
    { id: 'E-003', name: '王强', department: '仓储部', position: '仓储主管', base: 6000, performance: 2000, allowance: 600, gross: 8600, tax: 391, net: 7344 },
    { id: 'E-004', name: '刘洋', department: '仓储部', position: '库管员', base: 4500, performance: 1000, allowance: 400, gross: 5900, tax: 129, net: 5046 },
    { id: 'E-005', name: '周敏', department: '财务部', position: '财务经理', base: 9000, performance: 3500, allowance: 1000, gross: 13500, tax: 805, net: 11490 },
    { id: 'E-006', name: '郑洁', department: '行政部', position: '行政专员', base: 5000, performance: 1500, allowance: 500, gross: 7000, tax: 245, net: 6030 },
  ],
  taxBrackets: [
    { range: '0 - 36,000', rate: '3%', deduction: 0 },
    { range: '36,000 - 144,000', rate: '10%', deduction: 2520 },
    { range: '144,000 - 300,000', rate: '20%', deduction: 16920 },
    { range: '300,000 - 420,000', rate: '25%', deduction: 31920 },
    { range: '420,000 - 660,000', rate: '30%', deduction: 52920 },
  ],
};

// ============ AI 对话助手预设对话 ============
export const aiChatPresets = [
  {
    user: '下个月现金流够不够发工资',
    ai: {
      agent: '财务 Agent',
      content: '根据现金流预测，7 月预计可用资金 542 万元，当月工资支出 286.5 万元，**完全覆盖**且有 255.5 万元结余。\n\n但需注意 8 月资金缺口：预计可用资金 498 万元，而应付账款 + 工资 + 到期贷款合计 540 万元，**缺口 42 万元**。\n\n建议提前收回华联账款 32 万，并申请银行短期流动资金贷款 50 万以覆盖缺口。',
      source: '资金管理模块 + 薪酬核算模块',
      confidence: 88,
      actions: [
        { label: '一键催收华联账款', type: 'primary' as const },
        { label: '查看资金调度方案', type: 'secondary' as const },
      ],
    },
  },
  {
    user: '哪个产品最赚钱',
    ai: {
      agent: '销售 Agent',
      content: '本月单品毛利分析显示：\n\n**不锈钢板材 1.2mm** 毛利最高，贡献 86.5 万元，毛利率 32%；\n**包装纸箱** 销量最大但毛利较低，贡献 18.6 万元，毛利率 18%；\n**夏季凉席** 毛利 28% 但周转缓慢，占用资金 86.4 万元。\n\n建议加大不锈钢板材推广力度，同时清理夏季凉席库存。',
      source: '销售管理模块 + 库存管理模块',
      confidence: 92,
      actions: [{ label: '查看单品毛利详情', type: 'primary' as const }],
    },
  },
  {
    user: '有哪些政策可以申报',
    ai: {
      agent: '政策 Agent',
      content: '根据企业画像（年营收 1.2 亿、员工 186 人、行业：商贸批发），已为您匹配 6 项可申报政策：\n\n1. **高新技术企业认定** - 所得税减按 15%，预估 3 年节税 280 万（匹配度 92%）\n2. **中小企业数字化转型补贴** - 最高补贴 50 万（匹配度 88%）\n3. **稳岗补贴** - 按失业保险费 50% 返还，预估 18 万（匹配度 95%）\n4. **研发费用加计扣除** - 按 100% 比例加计扣除（匹配度 80%）\n\n其中高新技术企业认定申报截止 9 月 30 日，建议优先准备材料。',
      source: '政策情报中心',
      confidence: 90,
      actions: [
        { label: '查看申报材料清单', type: 'primary' as const },
        { label: '进入政策情报中心', type: 'secondary' as const },
      ],
    },
  },
];
