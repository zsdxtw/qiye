// 智能成长模块 Mock 数据

// 六维健康评分明细
export const healthDetail = {
  total: 78,
  grade: "A",
  change: 2,
  rank: "前25%",
  dimensions: [
    {
      key: "finance",
      name: "财务健康",
      score: 82,
      weight: "25%",
      change: 3,
      benchmark: 75,
      subMetrics: [
        { name: "毛利率", value: "32%", benchmark: "30%", status: "good" },
        { name: "净利率", value: "18%", benchmark: "8%", status: "excellent" },
        { name: "营收增长率", value: "12%", benchmark: "10%", status: "good" },
        { name: "应收账款周转天数", value: "60天", benchmark: "60天", status: "normal" },
      ],
      suggestion: "财务状况优于行业基准，净利率表现突出，建议保持。",
    },
    {
      key: "tax",
      name: "税务合规",
      score: 75,
      weight: "20%",
      change: -1,
      benchmark: 78,
      subMetrics: [
        { name: "申报及时率", value: "100%", benchmark: "100%", status: "excellent" },
        { name: "税负率合理性", value: "3.2%", benchmark: "3.6%", status: "good" },
        { name: "风险项数量", value: "2项", benchmark: "0项", status: "warning" },
        { name: "稽查记录", value: "无", benchmark: "无", status: "excellent" },
      ],
      suggestion: "存在2项税务风险需处理，建议尽快完成库存盘点调整。",
    },
    {
      key: "operation",
      name: "运营效率",
      score: 80,
      weight: "20%",
      change: 4,
      benchmark: 72,
      subMetrics: [
        { name: "库存周转天数", value: "32天", benchmark: "45天", status: "excellent" },
        { name: "订单履约率", value: "97%", benchmark: "95%", status: "good" },
        { name: "人均产值", value: "16.5万", benchmark: "14万", status: "good" },
        { name: "客户复购率", value: "45%", benchmark: "40%", status: "good" },
      ],
      suggestion: "运营效率显著优于行业，库存周转表现优异。",
    },
    {
      key: "growth",
      name: "成长潜力",
      score: 70,
      weight: "15%",
      change: 2,
      benchmark: 68,
      subMetrics: [
        { name: "客户增长率", value: "12%", benchmark: "15%", status: "warning" },
        { name: "市场份额", value: "3.2%", benchmark: "5%", status: "warning" },
        { name: "新品营收占比", value: "18%", benchmark: "20%", status: "normal" },
        { name: "数字化程度", value: "中等", benchmark: "中等", status: "normal" },
      ],
      suggestion: "客户增长率略低于行业，建议加强获客渠道建设。",
    },
    {
      key: "risk",
      name: "风险控制",
      score: 76,
      weight: "10%",
      change: 0,
      benchmark: 74,
      subMetrics: [
        { name: "现金流安全垫", value: "4.5月", benchmark: "3月", status: "excellent" },
        { name: "资产负债率", value: "42%", benchmark: "50%", status: "good" },
        { name: "客户集中度", value: "35%", benchmark: "30%", status: "warning" },
        { name: "供应商集中度", value: "28%", benchmark: "30%", status: "good" },
      ],
      suggestion: "现金流充裕，但客户集中度偏高，建议拓展客户群体。",
    },
    {
      key: "compliance",
      name: "合规水平",
      score: 85,
      weight: "10%",
      change: 5,
      benchmark: 80,
      subMetrics: [
        { name: "合同合规率", value: "96%", benchmark: "95%", status: "good" },
        { name: "社保合规率", value: "100%", benchmark: "100%", status: "excellent" },
        { name: "知识产权完备度", value: "12项", benchmark: "8项", status: "good" },
        { name: "资质有效期", value: "有效", benchmark: "有效", status: "good" },
      ],
      suggestion: "合规水平优秀，社保与知识产权管理规范。",
    },
  ],
};

// 决策沙盘 - 模拟方案
export const simulations = [
  {
    id: "sim001",
    scenario: "产品涨价10%",
    type: "price_change",
    createdAt: "2026-06-20 15:30",
    results: {
      revenueChange: 1.2,
      profitChange: 10.0,
      volumeChange: -8,
      churnRate: 5,
      newMargin: 35,
    },
    status: "saved",
  },
  {
    id: "sim002",
    scenario: "扩大产能20%",
    type: "capacity_change",
    createdAt: "2026-06-18 11:00",
    results: {
      revenueChange: 18,
      profitChange: 15,
      costChange: 22,
      paybackMonths: 14,
    },
    status: "saved",
  },
  {
    id: "sim003",
    scenario: "增加营销投入30%",
    type: "ad_spend",
    createdAt: "2026-06-15 09:45",
    results: {
      revenueChange: 8,
      profitChange: 3,
      customerGrowth: 25,
      roi: 2.4,
    },
    status: "saved",
  },
];

// 市场雷达
export const marketRadar = {
  industryIndex: {
    current: 112.5,
    change: 2.3,
    trend: [105, 108, 106, 110, 109, 112, 115, 113, 112.5],
    months: ["10月", "11月", "12月", "1月", "2月", "3月", "4月", "5月", "6月"],
  },
  competitorDynamics: [
    { name: "苏州恒达精密", event: "获得A轮融资2000万", time: "3小时前", impact: "medium", category: "融资" },
    { name: "无锡精工科技", event: "新增15个研发岗位招聘", time: "昨日", impact: "low", category: "招聘" },
    { name: "常州利达机械", event: "新增3项实用新型专利", time: "2天前", impact: "low", category: "知识产权" },
    { name: "南京东方机电", event: "中标某国企500万采购项目", time: "3天前", impact: "high", category: "中标" },
    { name: "苏州恒达精密", event: "经营范围新增进出口业务", time: "5天前", impact: "medium", category: "工商变更" },
  ],
  policyTimeline: [
    { date: "2026-06-20", title: "制造业研发费用加计扣除提升至120%", level: "high", impact: "预计年节税8.5万" },
    { date: "2026-06-15", title: "专精特新中小企业申报启动", level: "medium", impact: "最高奖励50万" },
    { date: "2026-06-10", title: "小规模纳税人免税政策延续", level: "low", impact: "延续至2027年底" },
    { date: "2026-06-05", title: "制造业转型升级专项资金申报", level: "high", impact: "最高补贴100万" },
  ],
};
