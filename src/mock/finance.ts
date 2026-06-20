// 财务模块 Mock 数据
export const financeOverview = {
  stats: [
    { label: "本月营收", value: 1280000, display: "128.0万", change: 12, trend: "up" },
    { label: "本月利润", value: 230000, display: "23.0万", change: 8, trend: "up" },
    { label: "本月支出", value: 1050000, display: "105.0万", change: 15, trend: "up" },
    { label: "应收账款", value: 860000, display: "86.0万", change: -5, trend: "down" },
  ],
  // 营收利润趋势（近12个月）
  revenueProfitTrend: {
    months: ["7月", "8月", "9月", "10月", "11月", "12月", "1月", "2月", "3月", "4月", "5月", "6月"],
    revenue: [95, 98, 102, 88, 110, 105, 118, 122, 115, 108, 118, 128],
    profit: [16, 17, 19, 14, 20, 19, 21, 22, 20, 19, 21, 23],
    cost: [79, 81, 83, 74, 90, 86, 97, 100, 95, 89, 97, 105],
  },
  // 科目余额分布
  accountBalance: [
    { name: "货币资金", value: 4560000 },
    { name: "应收账款", value: 860000 },
    { name: "存货", value: 1280000 },
    { name: "固定资产", value: 3200000 },
    { name: "应付账款", value: 540000 },
    { name: "短期借款", value: 1000000 },
  ],
  // 现金流瀑布
  cashflowData: [
    { name: "期初余额", value: 420 },
    { name: "销售回款", value: 128 },
    { name: "采购支出", value: -65 },
    { name: "工资支出", value: -32 },
    { name: "税费支出", value: -18 },
    { name: "其他收支", value: 8 },
    { name: "期末余额", value: 441 },
  ],
};

// 发票列表
export const invoices = [
  { id: "inv001", code: "32000000001234567890", type: "进项", category: "原材料采购", amount: 86000, taxAmount: 11180, totalAmount: 97180, seller: "苏州钢铁贸易有限公司", date: "2026-06-18", status: "已入账" },
  { id: "inv002", code: "32000000002345678901", type: "销项", category: "产品销售", amount: 156000, taxAmount: 20280, totalAmount: 176280, buyer: "苏州宏达科技有限公司", date: "2026-06-17", status: "已入账" },
  { id: "inv003", code: "32000000003456789012", type: "进项", category: "设备采购", amount: 230000, taxAmount: 29900, totalAmount: 259900, seller: "上海精密机床有限公司", date: "2026-06-15", status: "待入账" },
  { id: "inv004", code: "32000000004567890123", type: "销项", category: "产品销售", amount: 98000, taxAmount: 12740, totalAmount: 110740, buyer: "无锡联创机械有限公司", date: "2026-06-14", status: "已入账" },
  { id: "inv005", code: "32000000005678901234", type: "进项", category: "办公用品", amount: 5600, taxAmount: 728, totalAmount: 6328, seller: "苏州办公伙伴有限公司", date: "2026-06-12", status: "已入账" },
  { id: "inv006", code: "32000000006789012345", type: "销项", category: "加工服务", amount: 45000, taxAmount: 5850, totalAmount: 50850, buyer: "常州恒利五金制品厂", date: "2026-06-10", status: "待入账" },
  { id: "inv007", code: "32000000007890123456", type: "进项", category: "物流运输", amount: 12000, taxAmount: 1080, totalAmount: 13080, seller: "顺丰速运有限公司", date: "2026-06-08", status: "已入账" },
  { id: "inv008", code: "32000000008901234567", type: "销项", category: "产品销售", amount: 210000, taxAmount: 27300, totalAmount: 237300, buyer: "南京东方机电有限公司", date: "2026-06-05", status: "已入账" },
];

// 凭证列表
export const vouchers = [
  { id: "v001", number: "记-2026-06-001", date: "2026-06-18", summary: "采购原材料-钢材", debit: "原材料", credit: "银行存款", amount: 97180, maker: "陈丽华", status: "已审核" },
  { id: "v002", number: "记-2026-06-002", date: "2026-06-17", summary: "销售产品-宏达科技", debit: "银行存款", credit: "主营业务收入", amount: 176280, maker: "陈丽华", status: "已审核" },
  { id: "v003", number: "记-2026-06-003", date: "2026-06-15", summary: "采购设备-精密机床", debit: "固定资产", credit: "银行存款", amount: 259900, maker: "陈丽华", status: "待审核" },
  { id: "v004", number: "记-2026-06-004", date: "2026-06-14", summary: "销售产品-联创机械", debit: "银行存款", credit: "主营业务收入", amount: 110740, maker: "陈丽华", status: "已审核" },
  { id: "v005", number: "记-2026-06-005", date: "2026-06-12", summary: "采购办公用品", debit: "管理费用", credit: "银行存款", amount: 6328, maker: "陈丽华", status: "已审核" },
  { id: "v006", number: "记-2026-06-006", date: "2026-06-10", summary: "加工服务收入-恒利五金", debit: "应收账款", credit: "主营业务收入", amount: 50850, maker: "陈丽华", status: "待审核" },
];
