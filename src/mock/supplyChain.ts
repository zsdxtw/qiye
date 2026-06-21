// 供应链与进销存模块 Mock 数据

// 顶部统计指标
export const scStats = [
  { label: "库存周转天数", value: "32天", change: -3, trend: "down" as const, good: true, icon: "package", color: "#1E3A5F" },
  { label: "待发货订单", value: "12单", change: 4, trend: "up" as const, icon: "truck", color: "#DD6B20" },
  { label: "库存预警", value: "3项", change: -1, trend: "down" as const, good: true, icon: "alert", color: "#E53E3E" },
  { label: "活跃供应商", value: "48家", change: 2, trend: "up" as const, icon: "building", color: "#D4AF37" },
  { label: "本月采购额", value: "86.5万", change: 12, trend: "up" as const, icon: "shopping-cart", color: "#3182CE" },
  { label: "本月销售额", value: "128万", change: 8, trend: "up" as const, icon: "trending-up", color: "#38A169" },
];

// ============ 采购管理 ============
export const purchaseOrders = [
  { id: "PO-20260601", supplier: "上海钢铁集团", category: "原材料", amount: 128000, quantity: 50, unit: "吨", status: "已发货", date: "2026-06-15", expectedDate: "2026-06-22", buyer: "王建国" },
  { id: "PO-20260602", supplier: "深圳电子元件有限公司", category: "电子件", amount: 56400, quantity: 1200, unit: "件", status: "待审批", date: "2026-06-18", expectedDate: "2026-06-28", buyer: "王建国" },
  { id: "PO-20260603", supplier: "杭州包装材料厂", category: "包装材", amount: 18900, quantity: 5000, unit: "个", status: "已完成", date: "2026-06-12", expectedDate: "2026-06-18", buyer: "刘志强" },
  { id: "PO-20260604", supplier: "苏州机械配件公司", category: "标准件", amount: 87300, quantity: 800, unit: "套", status: "已发货", date: "2026-06-19", expectedDate: "2026-06-25", buyer: "王建国" },
  { id: "PO-20260605", supplier: "南京精密轴承", category: "标准件", amount: 42600, quantity: 2000, unit: "个", status: "待审批", date: "2026-06-20", expectedDate: "2026-06-30", buyer: "刘志强" },
  { id: "PO-20260606", supplier: "无锡塑料制品", category: "辅料", amount: 15800, quantity: 3000, unit: "件", status: "已完成", date: "2026-06-10", expectedDate: "2026-06-16", buyer: "刘志强" },
  { id: "PO-20260607", supplier: "常州五金机电", category: "工具", amount: 32500, quantity: 150, unit: "件", status: "已发货", date: "2026-06-17", expectedDate: "2026-06-24", buyer: "王建国" },
  { id: "PO-20260608", supplier: "上海钢铁集团", category: "原材料", amount: 96000, quantity: 40, unit: "吨", status: "已完成", date: "2026-06-05", expectedDate: "2026-06-12", buyer: "王建国" },
];

// 采购金额趋势（近6个月）
export const purchaseTrend = {
  months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  amounts: [72, 68, 85, 79, 77, 86.5],
  orderCount: [18, 15, 22, 19, 21, 24],
};

// 供应商分布（按采购金额）
export const supplierDistribution = [
  { name: "上海钢铁集团", value: 448000 },
  { name: "苏州机械配件公司", value: 187300 },
  { name: "深圳电子元件", value: 156400 },
  { name: "南京精密轴承", value: 102600 },
  { name: "常州五金机电", value: 82500 },
  { name: "其他供应商", value: 156000 },
];

// 供应商评级
export const supplierRatings = [
  { name: "上海钢铁集团", level: "A", orders: 28, amount: 448000, onTimeRate: 98, qualityRate: 99, contact: "李经理 138****1234" },
  { name: "苏州机械配件公司", level: "A", orders: 18, amount: 187300, onTimeRate: 95, qualityRate: 97, contact: "张经理 139****5678" },
  { name: "深圳电子元件有限公司", level: "B", orders: 12, amount: 156400, onTimeRate: 88, qualityRate: 95, contact: "陈经理 137****9012" },
  { name: "南京精密轴承", level: "B", orders: 9, amount: 102600, onTimeRate: 92, qualityRate: 96, contact: "王经理 136****3456" },
  { name: "常州五金机电", level: "B", orders: 7, amount: 82500, onTimeRate: 85, qualityRate: 93, contact: "赵经理 135****7890" },
];

// ============ 库存管理 ============
export const lowStockItems = [
  { id: "m01", name: "不锈钢板材 304", sku: "STEEL-304-001", category: "原材料", current: 120, safe: 500, unit: "张", days: 18, status: "紧急", value: 36000 },
  { id: "m02", name: "电机轴承 6204", sku: "BRG-6204-002", category: "标准件", current: 45, safe: 200, unit: "个", days: 12, status: "预警", value: 2250 },
  { id: "m03", name: "包装纸箱 A型", sku: "BOX-A-003", category: "包装材", current: 280, safe: 800, unit: "个", days: 9, status: "预警", value: 4200 },
  { id: "m04", name: "不锈钢板材 316", sku: "STEEL-316-004", category: "原材料", current: 85, safe: 300, unit: "张", days: 15, status: "紧急", value: 38250 },
  { id: "m05", name: "M8 不锈钢螺栓", sku: "BLT-M8-005", category: "标准件", current: 1500, safe: 5000, unit: "个", days: 22, status: "预警", value: 1800 },
];

// 库存分类分布
export const inventoryCategory = [
  { name: "原材料", value: 580000, count: 28 },
  { name: "标准件", value: 320000, count: 56 },
  { name: "电子件", value: 180000, count: 42 },
  { name: "包装材", value: 86000, count: 18 },
  { name: "辅料", value: 64000, count: 35 },
  { name: "工具", value: 50000, count: 22 },
];

// 库存周转趋势
export const inventoryTurnover = {
  months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  turnover: [38, 36, 35, 34, 33, 32],
  industry: [45, 44, 44, 43, 43, 42],
};

// 入库/出库记录
export const stockMovements = [
  { id: "mv01", type: "in", material: "不锈钢板材 304", quantity: 200, operator: "刘志强", date: "2026-06-20 14:30", ref: "PO-20260601" },
  { id: "mv02", type: "out", material: "电机轴承 6204", quantity: 50, operator: "陈丽华", date: "2026-06-20 10:15", ref: "SO-20260601" },
  { id: "mv03", type: "in", material: "包装纸箱 A型", quantity: 1000, operator: "刘志强", date: "2026-06-19 16:00", ref: "PO-20260603" },
  { id: "mv04", type: "out", material: "M8 不锈钢螺栓", quantity: 800, operator: "陈丽华", date: "2026-06-19 11:20", ref: "SO-20260602" },
  { id: "mv05", type: "in", material: "电机轴承 6204", quantity: 500, operator: "刘志强", date: "2026-06-18 09:45", ref: "PO-20260605" },
  { id: "mv06", type: "out", material: "不锈钢板材 316", quantity: 30, operator: "陈丽华", date: "2026-06-18 14:00", ref: "SO-20260603" },
];

// ============ 销售管理 ============
export const salesOrders = [
  { id: "SO-20260601", customer: "北京智联科技", product: "精密轴承组件", amount: 256000, quantity: 800, unit: "套", status: "待发货", date: "2026-06-19", deliveryDate: "2026-06-26", salesperson: "刘志强" },
  { id: "SO-20260602", customer: "广州恒达制造", product: "不锈钢结构件", amount: 134500, quantity: 120, unit: "件", status: "已发货", date: "2026-06-18", deliveryDate: "2026-06-25", salesperson: "刘志强" },
  { id: "SO-20260603", customer: "深圳创新电子", product: "精密机械零件", amount: 98700, quantity: 500, unit: "个", status: "已完成", date: "2026-06-15", deliveryDate: "2026-06-20", salesperson: "王建国" },
  { id: "SO-20260604", customer: "上海华联商贸", product: "标准件套装", amount: 76200, quantity: 300, unit: "套", status: "待发货", date: "2026-06-20", deliveryDate: "2026-06-27", salesperson: "刘志强" },
  { id: "SO-20260605", customer: "成都西部集团", product: "定制机械组件", amount: 188000, quantity: 60, unit: "套", status: "生产中", date: "2026-06-17", deliveryDate: "2026-07-05", salesperson: "王建国" },
  { id: "SO-20260606", customer: "杭州未来科技", product: "精密轴承组件", amount: 145000, quantity: 450, unit: "套", status: "已发货", date: "2026-06-16", deliveryDate: "2026-06-23", salesperson: "刘志强" },
  { id: "SO-20260607", customer: "武汉光谷电子", product: "不锈钢结构件", amount: 89000, quantity: 85, unit: "件", status: "已完成", date: "2026-06-12", deliveryDate: "2026-06-18", salesperson: "王建国" },
  { id: "SO-20260608", customer: "南京江北制造", product: "精密机械零件", amount: 112000, quantity: 600, unit: "个", status: "生产中", date: "2026-06-19", deliveryDate: "2026-07-01", salesperson: "刘志强" },
];

// 销售趋势
export const salesTrend = {
  months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  amounts: [98, 105, 112, 108, 118, 128],
  orderCount: [32, 35, 38, 36, 40, 42],
};

// 销售渠道分布
export const salesChannels = [
  { name: "老客户复购", value: 68 },
  { name: "主动开发", value: 15 },
  { name: "线上询盘", value: 10 },
  { name: "展会获客", value: 7 },
];

// 热销产品排行
export const hotProducts = [
  { name: "精密轴承组件", sales: 486000, count: 1850, growth: 18 },
  { name: "不锈钢结构件", sales: 352000, count: 320, growth: 12 },
  { name: "精密机械零件", sales: 287000, count: 2100, growth: 8 },
  { name: "标准件套装", sales: 198000, count: 780, growth: -3 },
  { name: "定制机械组件", sales: 188000, count: 60, growth: 25 },
];

// ============ CRM 客户 ============
export const topCustomers = {
  names: ["北京智联科技", "广州恒达制造", "深圳创新电子", "上海华联商贸", "成都西部集团"],
  values: [856000, 624000, 487000, 352000, 298000],
};

// 客户分级
export const customerLevels = [
  { level: "钻石客户", count: 3, revenue: 1820000, color: "#805AD5", desc: "年采购额 > 100万" },
  { level: "金卡客户", count: 8, revenue: 2480000, color: "#D4AF37", desc: "年采购额 30-100万" },
  { level: "银卡客户", count: 15, revenue: 1860000, color: "#A0AEC0", desc: "年采购额 10-30万" },
  { level: "普通客户", count: 42, revenue: 1240000, color: "#3182CE", desc: "年采购额 < 10万" },
];

// 客户列表
export const customerList = [
  { id: "c01", name: "北京智联科技", contact: "周总", phone: "138****0001", level: "钻石", totalAmount: 856000, lastOrder: "2026-06-19", status: "活跃", industry: "电子科技" },
  { id: "c02", name: "广州恒达制造", contact: "吴总", phone: "139****0002", level: "钻石", totalAmount: 624000, lastOrder: "2026-06-18", status: "活跃", industry: "机械制造" },
  { id: "c03", name: "深圳创新电子", contact: "郑总", phone: "137****0003", level: "钻石", totalAmount: 487000, lastOrder: "2026-06-15", status: "活跃", industry: "电子科技" },
  { id: "c04", name: "上海华联商贸", contact: "孙总", phone: "136****0004", level: "金卡", totalAmount: 352000, lastOrder: "2026-06-20", status: "活跃", industry: "商贸" },
  { id: "c05", name: "成都西部集团", contact: "钱总", phone: "135****0005", level: "金卡", totalAmount: 298000, lastOrder: "2026-06-17", status: "活跃", industry: "制造业" },
  { id: "c06", name: "杭州未来科技", contact: "赵总", phone: "134****0006", level: "金卡", totalAmount: 268000, lastOrder: "2026-06-16", status: "活跃", industry: "电子科技" },
  { id: "c07", name: "武汉光谷电子", contact: "李总", phone: "133****0007", level: "金卡", totalAmount: 215000, lastOrder: "2026-06-12", status: "沉睡", industry: "电子科技" },
  { id: "c08", name: "南京江北制造", contact: "王总", phone: "132****0008", level: "金卡", totalAmount: 188000, lastOrder: "2026-06-19", status: "活跃", industry: "机械制造" },
];

// 客户跟进记录
export const followUps = [
  { id: "f01", customer: "北京智联科技", content: "确认下季度采购计划，预计追加 30万订单", salesperson: "刘志强", date: "2026-06-20", nextDate: "2026-06-25", priority: "高" },
  { id: "f02", customer: "武汉光谷电子", content: "客户已 30 天未下单，电话回访了解需求", salesperson: "王建国", date: "2026-06-19", nextDate: "2026-06-22", priority: "高" },
  { id: "f03", customer: "广州恒达制造", content: "反馈产品质量良好，讨论新规格定制需求", salesperson: "刘志强", date: "2026-06-18", nextDate: "2026-06-28", priority: "中" },
  { id: "f04", customer: "成都西部集团", content: "提交定制方案报价，等待客户确认", salesperson: "王建国", date: "2026-06-17", nextDate: "2026-06-24", priority: "中" },
  { id: "f05", customer: "上海华联商贸", content: "完成本月第3笔订单，客户满意度高", salesperson: "刘志强", date: "2026-06-20", nextDate: "2026-07-05", priority: "低" },
];

// ============ 物流追踪 ============
export const inTransitOrders = [
  {
    id: "SO-20260601",
    orderNo: "SO-20260601",
    customer: "北京智联科技",
    carrier: "顺丰速运",
    trackingNo: "SF1234567890",
    amount: 256000,
    status: "运输中",
    fromCity: "苏州",
    toCity: "北京",
    shipDate: "2026-06-20",
    eta: "2026-06-23",
    progress: 60,
  },
  {
    id: "SO-20260602",
    orderNo: "SO-20260602",
    customer: "广州恒达制造",
    carrier: "德邦物流",
    trackingNo: "DB9876543210",
    amount: 134500,
    status: "运输中",
    fromCity: "苏州",
    toCity: "广州",
    shipDate: "2026-06-19",
    eta: "2026-06-24",
    progress: 45,
  },
  {
    id: "SO-20260606",
    orderNo: "SO-20260606",
    customer: "杭州未来科技",
    carrier: "京东物流",
    trackingNo: "JD5678901234",
    amount: 145000,
    status: "运输中",
    fromCity: "苏州",
    toCity: "杭州",
    shipDate: "2026-06-20",
    eta: "2026-06-22",
    progress: 80,
  },
  {
    id: "SO-20260607",
    orderNo: "SO-20260607",
    customer: "武汉光谷电子",
    carrier: "顺丰速运",
    trackingNo: "SF2345678901",
    amount: 89000,
    status: "已签收",
    fromCity: "苏州",
    toCity: "武汉",
    shipDate: "2026-06-15",
    eta: "2026-06-18",
    progress: 100,
  },
];

// 物流时效统计
export const logisticsStats = {
  avgDays: 3.2,
  onTimeRate: 94,
  carriers: [
    { name: "顺丰速运", count: 28, avgDays: 2.8, onTimeRate: 98 },
    { name: "德邦物流", count: 18, avgDays: 3.5, onTimeRate: 92 },
    { name: "京东物流", count: 15, avgDays: 2.5, onTimeRate: 96 },
    { name: "中通快运", count: 12, avgDays: 4.2, onTimeRate: 88 },
  ],
};

// 物流轨迹时间线（示例订单）
export const trackingTimeline = [
  { time: "2026-06-20 16:30", location: "苏州市", desc: "已揽件，快件已发出", done: true },
  { time: "2026-06-20 22:15", location: "苏州转运中心", desc: "快件已到达转运中心", done: true },
  { time: "2026-06-21 08:00", location: "无锡转运中心", desc: "快件已到达转运中心", done: true },
  { time: "2026-06-21 14:20", location: "运输中", desc: "快件正在运往【北京转运中心】", done: true },
  { time: "2026-06-22 09:00", location: "北京转运中心", desc: "快件预计到达北京转运中心", done: false },
  { time: "2026-06-23 10:00", location: "北京市", desc: "预计派送，请保持电话畅通", done: false },
];
