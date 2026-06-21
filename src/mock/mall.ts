// 内部商城 Mock 数据

// 商品分类
export const categories = [
  { id: "all", name: "全部商品", icon: "Grid3x3" },
  { id: "office", name: "办公用品", icon: "Briefcase", count: 48 },
  { id: "tea", name: "茶礼品", icon: "Coffee", count: 26 },
  { id: "digital", name: "数码电子", icon: "Smartphone", count: 32 },
  { id: "daily", name: "生活日用", icon: "Home", count: 56 },
  { id: "gift", name: "商务礼品", icon: "Gift", count: 18 },
  { id: "food", name: "食品饮料", icon: "UtensilsCrossed", count: 24 },
];

// 商品列表
export interface Product {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  unit: string;
  stock: number;
  sales: number;
  rating: number;
  reviews: number;
  tags: string[];
  desc: string;
  color: string;
  hot?: boolean;
  new?: boolean;
}

export const products: Product[] = [
  // 办公用品
  { id: "p001", name: "得力 A4 打印纸 70g（5包/箱）", category: "office", categoryName: "办公用品", price: 128, originalPrice: 158, unit: "箱", stock: 320, sales: 1286, rating: 4.9, reviews: 326, tags: ["热销", "包邮"], desc: "白色复印纸，平整挺度好，适配各类打印机", color: "#3182CE", hot: true },
  { id: "p002", name: "晨光 中性笔 0.5mm 黑色（50支/盒）", category: "office", categoryName: "办公用品", price: 45, originalPrice: 58, unit: "盒", stock: 580, sales: 2156, rating: 4.8, reviews: 512, tags: ["热销"], desc: "书写顺滑，速干不晕染，办公必备", color: "#1E3A5F", hot: true },
  { id: "p003", name: "得力 订书机 标准型 + 订书钉", category: "office", categoryName: "办公用品", price: 32, unit: "套", stock: 180, sales: 685, rating: 4.7, reviews: 168, tags: [], desc: "金属材质，耐用省力，含1000枚订书钉", color: "#3182CE" },
  { id: "p004", name: "文件收纳架 五层抽屉式", category: "office", categoryName: "办公用品", price: 189, originalPrice: 239, unit: "个", stock: 86, sales: 326, rating: 4.6, reviews: 89, tags: ["新品"], desc: "环保PP材质，大容量分类收纳", color: "#3182CE", new: true },
  { id: "p005", name: "便利贴 76x76mm 5色装（10本）", category: "office", categoryName: "办公用品", price: 28, unit: "套", stock: 420, sales: 968, rating: 4.7, reviews: 234, tags: [], desc: "强粘性不脱落，色彩柔和", color: "#3182CE" },
  { id: "p006", name: "得力 计算器 12位太阳能", category: "office", categoryName: "办公用品", price: 68, unit: "台", stock: 156, sales: 412, rating: 4.8, reviews: 96, tags: [], desc: "双电源，大屏显示，按键灵敏", color: "#3182CE" },

  // 茶礼品
  { id: "p101", name: "西湖龙井 明前特级 250g 礼盒装", category: "tea", categoryName: "茶礼品", price: 388, originalPrice: 488, unit: "盒", stock: 68, sales: 326, rating: 4.9, reviews: 158, tags: ["热销", "礼盒"], desc: "明前嫩芽，栗香持久，商务馈赠佳品", color: "#38A169", hot: true },
  { id: "p102", name: "武夷星 大红袍 礼盒 200g", category: "tea", categoryName: "茶礼品", price: 298, originalPrice: 368, unit: "盒", stock: 92, sales: 218, rating: 4.8, reviews: 124, tags: ["礼盒"], desc: "岩骨花香，醇厚回甘，精美礼盒", color: "#D4AF37" },
  { id: "p103", name: "云南普洱 熟茶饼 357g", category: "tea", categoryName: "茶礼品", price: 268, unit: "饼", stock: 120, sales: 186, rating: 4.7, reviews: 86, tags: [], desc: "陈香浓郁，汤色红亮，越陈越香", color: "#DD6B20" },
  { id: "p104", name: "福鼎白茶 白牡丹 150g 罐装", category: "tea", categoryName: "茶礼品", price: 198, originalPrice: 248, unit: "罐", stock: 145, sales: 268, rating: 4.8, reviews: 112, tags: ["新品"], desc: "毫香蜜韵，清甜爽口，日常口粮茶", color: "#38A169", new: true },
  { id: "p105", name: "商务茶具套装 青瓷 8件套", category: "tea", categoryName: "茶礼品", price: 458, originalPrice: 568, unit: "套", stock: 48, sales: 126, rating: 4.9, reviews: 68, tags: ["礼盒", "热销"], desc: "含盖碗+品茗杯+公道杯，送礼自用皆宜", color: "#38A169", hot: true },
  { id: "p106", name: "安溪铁观音 浓香型 250g", category: "tea", categoryName: "茶礼品", price: 168, unit: "袋", stock: 210, sales: 345, rating: 4.6, reviews: 156, tags: [], desc: "兰花香气，醇厚甘鲜", color: "#38A169" },

  // 数码电子
  { id: "p201", name: "罗技 无线鼠标 M275", category: "digital", categoryName: "数码电子", price: 89, originalPrice: 119, unit: "个", stock: 236, sales: 856, rating: 4.8, reviews: 412, tags: ["热销"], desc: "人体工学设计，2.4G无线，即插即用", color: "#1E3A5F", hot: true },
  { id: "p202", name: "小米 10000mAh 充电宝", category: "digital", categoryName: "数码电子", price: 99, originalPrice: 129, unit: "个", stock: 180, sales: 624, rating: 4.7, reviews: 286, tags: [], desc: "双向快充，轻薄便携，双USB输出", color: "#1E3A5F" },
  { id: "p203", name: "绿联 USB-C 拓展坞 7合1", category: "digital", categoryName: "数码电子", price: 168, originalPrice: 219, unit: "个", stock: 96, sales: 326, rating: 4.8, reviews: 158, tags: ["新品"], desc: "HDMI+USB3.0+PD快充+SD读卡", color: "#1E3A5F", new: true },
  { id: "p204", name: "JBL 便携蓝牙音箱", category: "digital", categoryName: "数码电子", price: 299, originalPrice: 399, unit: "个", stock: 64, sales: 186, rating: 4.7, reviews: 96, tags: [], desc: "IP67防水，12小时续航，低音强劲", color: "#1E3A5F" },

  // 生活日用
  { id: "p301", name: "清风 抽纸 3层120抽（24包/箱）", category: "daily", categoryName: "生活日用", price: 69, originalPrice: 89, unit: "箱", stock: 480, sales: 1862, rating: 4.9, reviews: 685, tags: ["热销", "包邮"], desc: "原生木浆，柔韧亲肤，整箱实惠", color: "#DD6B20", hot: true },
  { id: "p302", name: "蓝月亮 洗手液 抑菌 500ml（3瓶）", category: "daily", categoryName: "生活日用", price: 49, unit: "套", stock: 320, sales: 756, rating: 4.7, reviews: 234, tags: [], desc: "抑菌99.9%，温和不伤手", color: "#3182CE" },
  { id: "p303", name: "茶花 垃圾袋 45x50cm 加厚（100只）", category: "daily", categoryName: "生活日用", price: 35, originalPrice: 45, unit: "卷", stock: 560, sales: 1124, rating: 4.6, reviews: 312, tags: [], desc: "加厚不破，承重5kg，点断式", color: "#DD6B20" },
  { id: "p304", name: "小米 电热水壶 1.5L", category: "daily", categoryName: "生活日用", price: 129, originalPrice: 159, unit: "个", stock: 86, sales: 268, rating: 4.8, reviews: 124, tags: [], desc: "食品级不锈钢，双层防烫，自动断电", color: "#1E3A5F" },

  // 商务礼品
  { id: "p401", name: "定制商务笔记本 A5 烫金logo", category: "gift", categoryName: "商务礼品", price: 78, originalPrice: 98, unit: "本", stock: 580, sales: 968, rating: 4.8, reviews: 286, tags: ["可定制"], desc: "PU皮面，烫金企业logo，128页内页", color: "#805AD5" },
  { id: "p402", name: "商务保温杯 316不锈钢 500ml", category: "gift", categoryName: "商务礼品", price: 158, originalPrice: 198, unit: "个", stock: 186, sales: 426, rating: 4.9, reviews: 186, tags: ["热销", "可定制"], desc: "12小时保温，磨砂质感，可印logo", color: "#805AD5", hot: true },
  { id: "p403", name: "高档签字笔套装 金属笔杆", category: "gift", categoryName: "商务礼品", price: 128, unit: "套", stock: 120, sales: 268, rating: 4.7, reviews: 96, tags: ["礼盒"], desc: "金属烤漆笔杆，旋转出芯，含礼盒", color: "#805AD5" },

  // 食品饮料
  { id: "p501", name: "农夫山泉 550ml（24瓶/箱）", category: "food", categoryName: "食品饮料", price: 48, unit: "箱", stock: 680, sales: 2156, rating: 4.9, reviews: 568, tags: ["热销", "包邮"], desc: "天然饮用水，整箱实惠", color: "#3182CE", hot: true },
  { id: "p502", name: "雀巢 咖啡 1+2 原味（100条）", category: "food", categoryName: "食品饮料", price: 89, originalPrice: 109, unit: "盒", stock: 280, sales: 856, rating: 4.7, reviews: 312, tags: [], desc: "醇香原味，提神醒脑，办公必备", color: "#DD6B20" },
  { id: "p503", name: "三只松鼠 每日坚果 750g", category: "food", categoryName: "食品饮料", price: 99, originalPrice: 129, unit: "袋", stock: 186, sales: 426, rating: 4.8, reviews: 186, tags: [], desc: "30小袋独立包装，混合坚果", color: "#DD6B20" },
];

// 轮播图
export const banners = [
  { id: "b1", title: "办公用品专区", subtitle: "企业采购专享价 全场8折", color: "#1E3A5F", bg: "linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%)", tag: "限时" },
  { id: "b2", title: "茶礼季 · 商务馈赠", subtitle: "明前龙井 精美礼盒 满300减50", color: "#38A169", bg: "linear-gradient(135deg, #38A169 0%, #48BB78 100%)", tag: "热卖" },
  { id: "b3", title: "数码焕新", subtitle: "办公外设 一站配齐 企业账期", color: "#D4AF37", bg: "linear-gradient(135deg, #B8941F 0%, #D4AF37 100%)", tag: "新品" },
];

// 订单状态
export interface Order {
  id: string;
  orderNo: string;
  items: { name: string; qty: number; price: number; spec?: string }[];
  totalAmount: number;
  status: "pending" | "paid" | "shipped" | "completed" | "cancelled";
  statusLabel: string;
  createdAt: string;
  applicant: string;
  department: string;
  purpose: string;
}

export const orders: Order[] = [
  {
    id: "o1",
    orderNo: "SC-20260620-001",
    items: [
      { name: "得力 A4 打印纸 70g（5包/箱）", qty: 5, price: 128, spec: "5包/箱" },
      { name: "晨光 中性笔 0.5mm 黑色（50支/盒）", qty: 3, price: 45, spec: "50支/盒" },
      { name: "清风 抽纸 3层120抽（24包/箱）", qty: 2, price: 69, spec: "24包/箱" },
    ],
    totalAmount: 943,
    status: "shipped",
    statusLabel: "已发货",
    createdAt: "2026-06-20 14:30",
    applicant: "王建国",
    department: "行政部",
    purpose: "6月办公耗材补充",
  },
  {
    id: "o2",
    orderNo: "SC-20260618-002",
    items: [
      { name: "西湖龙井 明前特级 250g 礼盒装", qty: 2, price: 388, spec: "礼盒装" },
      { name: "商务茶具套装 青瓷 8件套", qty: 1, price: 458, spec: "8件套" },
    ],
    totalAmount: 1234,
    status: "completed",
    statusLabel: "已完成",
    createdAt: "2026-06-18 10:15",
    applicant: "张明远",
    department: "总经办",
    purpose: "客户拜访礼品",
  },
  {
    id: "o3",
    orderNo: "SC-20260615-003",
    items: [
      { name: "罗技 无线鼠标 M275", qty: 10, price: 89 },
      { name: "绿联 USB-C 拓展坞 7合1", qty: 5, price: 168 },
    ],
    totalAmount: 1730,
    status: "completed",
    statusLabel: "已完成",
    createdAt: "2026-06-15 16:20",
    applicant: "陈丽华",
    department: "财务部",
    purpose: "新员工入职设备配置",
  },
  {
    id: "o4",
    orderNo: "SC-20260621-004",
    items: [
      { name: "农夫山泉 550ml（24瓶/箱）", qty: 10, price: 48 },
      { name: "雀巢 咖啡 1+2 原味（100条）", qty: 3, price: 89 },
      { name: "三只松鼠 每日坚果 750g", qty: 5, price: 99 },
    ],
    totalAmount: 1102,
    status: "pending",
    statusLabel: "待审批",
    createdAt: "2026-06-21 09:30",
    applicant: "赵小燕",
    department: "人事部",
    purpose: "茶水间补给",
  },
  {
    id: "o5",
    orderNo: "SC-20260610-005",
    items: [
      { name: "定制商务笔记本 A5 烫金logo", qty: 50, price: 78 },
      { name: "商务保温杯 316不锈钢 500ml", qty: 30, price: 158 },
    ],
    totalAmount: 8640,
    status: "completed",
    statusLabel: "已完成",
    createdAt: "2026-06-10 11:00",
    applicant: "王建国",
    department: "行政部",
    purpose: "员工周年纪念礼",
  },
];

// 商城统计
export const mallStats = [
  { label: "本月采购额", value: "¥1.86万", change: 12, trend: "up" as const, icon: "ShoppingCart", color: "#1E3A5F" },
  { label: "待审批订单", value: "1单", change: 0, trend: "neutral" as const, icon: "Clock", color: "#DD6B20" },
  { label: "本月订单数", value: "8单", change: 3, trend: "up" as const, icon: "Package", color: "#38A169" },
  { label: "常用商品", value: "126件", change: 8, trend: "up" as const, icon: "Heart", color: "#D4AF37" },
];
