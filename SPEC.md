# 企管通 App - 设计规范

## 1. Concept & Vision

企管通是一款AI驱动的业财税法一体化战略管理平台，专为中小企业老板设计。它不是普通的管理工具，而是企业的"AI战略外脑"——从被动管理升级为主动进攻。界面设计传达专业、可信赖、智能的品牌调性，让老板在复杂商业环境中掌控全局。

## 2. Design Language

### Aesthetic Direction
**"智能指挥舱"** — 深色主题营造专注与高级感，数据可视化如同精密仪表盘，AI交互体现未来科技。整体风格：金融级专业感 + 前沿AI气质。

### Color Palette
```
--primary: #6366F1 (靛蓝紫 - 智能/科技)
--primary-light: #818CF8
--secondary: #F59E0B (琥珀金 - 财富/价值)
--accent: #10B981 (翠绿 - 增长/正向)
--danger: #EF4444 (警示红)
--warning: #F97316 (橙色警告)

--bg-primary: #0F172A (深海军蓝)
--bg-secondary: #1E293B (次级背景)
--bg-card: #334155 (卡片背景)
--bg-elevated: #475569 (浮层背景)

--text-primary: #F8FAFC
--text-secondary: #94A3B8
--text-muted: #64748B

--border: #334155
--border-light: #475569
```

### Typography
- **Display/Headers**: "Noto Sans SC" 700 weight - 简洁有力的中文显示
- **Body**: "Noto Sans SC" 400/500 weight - 高可读性
- **Data/Numbers**: "JetBrains Mono" - 数字清晰可辨
- **Fallback**: system-ui, -apple-system, sans-serif

### Spatial System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64
- Card padding: 16px (mobile), 20px (tablet+)
- Border radius: 12px (cards), 8px (buttons), 16px (modals)
- Touch target minimum: 44px

### Motion Philosophy
- **Page transitions**: 300ms ease-out slide + fade
- **Card interactions**: 200ms scale(0.98) on press, subtle shadow lift on hover
- **Data updates**: Number counting animation 600ms
- **Loading states**: Skeleton pulse 1.5s infinite
- **Micro-interactions**: 150ms for toggles, selections
- **Stagger reveals**: 80ms delay between list items on load

### Visual Assets
- **Icons**: Lucide Icons (consistent 24px, 1.5px stroke)
- **Charts**: Custom SVG with gradient fills
- **Decorative**: Subtle grid patterns, glow effects on key metrics
- **AI elements**: Animated pulse rings, brain network patterns

## 3. Layout & Structure

### Mobile-First Architecture (375px base)
```
┌─────────────────────────┐
│  Status Bar (safe area) │
├─────────────────────────┤
│  Header: Logo + 通知 + 我的 │
├─────────────────────────┤
│                         │
│  Main Content Area      │
│  (scrollable)           │
│                         │
├─────────────────────────┤
│  Bottom Tab Bar (5 items)│
│  首页 | 财务 | 业务 | 我的  │
└─────────────────────────┘
```

### Page Structure

**首页 (Dashboard)**
- AI健康度环形图 + 预警卡片
- 快捷入口网格 (6项核心功能)
- 本周关键指标滚动卡片
- 市场动态/竞业情报feed

**财务模块**
- 资金看板 (多账户汇总)
- 收支趋势图
- 发票生命周期时间线
- 报销待处理列表

**业务模块**
- 销售漏斗
- 客户CRM列表
- 进销存概览
- 项目进度

**我的/设置**
- 企业信息
- 团队成员
- AI设置
- 订阅信息

### Responsive Strategy
- Mobile: 320-428px (primary target)
- Tablet: 768px+ (2-column dashboard)
- Desktop: 1024px+ (3-column with sidebar)

## 4. Features & Interactions

### Core Features

#### 4.1 AI战略参谋首页
- **健康度评分**: 环形进度图，0-100，动态计算
- **预警卡片**: 红/橙/黄等级，推送关键风险
- **快捷操作**: 语音输入命令，AI解析执行

#### 4.2 财务模块
- **账户总览**: 银行卡、支付宝、微信等统一展示
- **AI记账**: 拍照/扫描凭证，自动识别金额和类型
- **发票管理**: 扫描录入 → 自动识别 → 关联报销

#### 4.3 业务模块
- **CRM**: 客户卡片式列表，搜索/筛选
- **进销存**: 库存预警，采购建议
- **审批流**: 待我审批 / 我发起的

#### 4.4 税费模块
- **申报日历**: 待办任务倒计时
- **一键申报**: 模拟流程引导
- **风险检测**: 发票缺口、进项抵扣分析

### Interaction Details

**卡片点击**: scale(0.98) → 跳转详情
**下拉刷新**: 弹性动画 + 数据重载
**长按操作**: 上下文菜单 (编辑/删除/分享)
**滑动操作**: 左滑快捷操作 (如标记已读)
**空状态**: 友好插画 + 引导文案
**错误状态**: 重试按钮 + 错误说明

## 5. Component Inventory

### Navigation Bar
- Fixed top, blur backdrop
- Left: Logo (24px)
- Center: Page title
- Right: Notification bell (badge) + Avatar
- States: default, scrolled (shadow增强)

### Bottom Tab Bar
- 5 tabs with icons + labels
- Active: primary color + subtle glow
- Inactive: muted gray
- Center item may be prominent CTA
- Safe area padding for notch devices

### Metric Card
- Icon + Label + Value + Trend indicator
- Trend: ↑green / ↓red / →yellow
- Hover: subtle lift shadow
- Loading: skeleton pulse

### Alert Card
- Left border color indicates severity
- Icon + Title + Description + Timestamp
- Swipe to dismiss or action buttons
- Tap to expand details

### Chart Components
- Line chart: 渐变填充, 动画绘制
- Bar chart: 圆角顶部, hover显示数值
- Pie/Donut: 中心数字, 图例可点击
- All charts: 支持触摸拖拽查看数据点

### List Items
- 56px minimum height
- Avatar/Icon left, Title + Subtitle, Right accessory
- Divider: 1px, inset 16px from left
- Active: bg highlight

### Buttons
- Primary: solid primary color, white text
- Secondary: border only, primary text
- Ghost: no border, subtle hover bg
- Sizes: sm(32px), md(44px), lg(52px)
- Loading state: spinner replacing text

### Form Inputs
- Height: 48px
- Border: 1px, rounded 8px
- Focus: primary border + subtle glow
- Error: danger border + error text below
- Label above, hint text below

### Modals & Sheets
- Bottom sheet on mobile (slide up)
- Backdrop blur + dark overlay
- Drag handle at top
- Swipe down to dismiss

## 6. Technical Approach

### Stack
- Single HTML file with embedded CSS/JS
- Vanilla JavaScript (no framework for prototype)
- CSS Custom Properties for theming
- CSS Grid + Flexbox for layout
- Intersection Observer for scroll animations

### Data Structure (Mock)
```javascript
const mockData = {
  healthScore: 78,
  alerts: [...],
  accounts: [...],
  metrics: {...},
  recentTransactions: [...]
}
```

### Key Implementation Notes
- Touch events for mobile interactions
- CSS `scroll-snap` for horizontal carousels
- `backdrop-filter` for glass morphism effects
- CSS `@media (prefers-color-scheme)` for theme detection (optional)
- Safe area insets for notched devices
- ` -webkit-tap-highlight-color: transparent` for clean taps
