# 企管家（Qijia Business OS）App 完整开发设计方案

> **定位**：面向中国中小企业的"一站式智能经营管家"
> **核心理念**：让老板少操心，让企业更赚钱
> **Slogan**：一个App，管遍企业大小事；三务顾问+AI成长助手，让老板决策更聪明
> **产品形态**：App（iOS/Android）+ 微信小程序 + Web管理后台
> **架构模式**：「1+10+N」——1个AI经营助手核心大脑 + 10大服务板块 + N个行业插件

---

## 目录

1. App 原型设计
2. 数据库设计
3. API 设计
4. 技术架构图
5. 开发排期
6. AI 助手 Prompt 设计
7. 三务咨询工作流
8. 智能成长算法设计

---

## 1. App 原型设计

### 1.0 设计规范（Design Token）

#### 1.0.1 色彩系统

| Token 名称 | 色值 | 用途 |
|---|---|---|
| `color-primary` | `#1E3A5F` | 主色（深蓝），顶栏/主按钮/重点标题 |
| `color-primary-light` | `#2C5282` | 主色悬浮态 |
| `color-accent` | `#D4AF37` | 强调色（金），评分/勋章/关键数据 |
| `color-bg` | `#FFFFFF` | 页面背景 |
| `color-card` | `#F7F8FA` | 卡片背景 |
| `color-text-primary` | `#1A202C` | 主文本 |
| `color-text-secondary` | `#718096` | 次要文本 |
| `color-success` | `#38A169` | 成功/正向数据 |
| `color-warning` | `#DD6B20` | 提醒/橙色预警 |
| `color-danger` | `#E53E3E` | 警告/负向数据 |
| `color-info` | `#3182CE` | 信息/链接 |

#### 1.0.2 字体与字号

- 中文：PingFang SC / Noto Sans SC
- 英文/数字：Inter
- 字号阶梯：`H1 24px / H2 20px / H3 17px / Body 15px / Caption 13px / Mini 11px`
- 数字（金额/评分）使用 Inter Tabular Nums，等宽对齐

#### 1.0.3 间距与圆角

- 间距基准 4px：`4 / 8 / 12 / 16 / 20 / 24 / 32`
- 卡片圆角：`12px`；按钮圆角：`8px`；标签圆角：`4px`
- 卡片阴影：`0 2px 8px rgba(30,58,95,0.08)`

#### 1.0.4 图标规范

- 风格：线性图标，2px 描边，圆角线帽
- 尺寸：导航 `24×24`、列表 `20×20`、装饰 `32×32`
- 图标库：自绘 SVG + Phosphor Icons 补充

---

### 1.1 首页（老板驾驶舱）

**页面定位**：老板打开 App 第一眼，3 秒掌握企业经营全貌。

#### 1.1.1 页面布局（自上而下）

```
┌─────────────────────────────────────────┐
│ 状态栏（系统）                            │
├─────────────────────────────────────────┤
│ [Logo]企管家          🔔(3) ⚙️            │  ← 顶部导航栏 H56
│   切换企业：深圳XX科技有限公司 ▾          │     企业切换下拉
├─────────────────────────────────────────┤
│ 👋 早上好，张总！今天是 6月21日 周六       │  ← 问候区 H72
│ 今日待办 3 项 · 预警 1 项 · 查看 >        │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ 📊 经营健康评分            78/100   │ │  ← 健康评分卡片 H140
│ │ [六维雷达图迷你版]   较上月 ↑3分     │ │     点击进入诊断详情
│ │ 评级：良好  点击查看诊断报告 >       │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ┌──────────┬──────────┬──────────────┐ │
│ │💰本月营收 │📈本月利润 │💧现金流       │ │  ← 核心指标三列卡片 H96
│ │ ¥128万   │ ¥23万    │ 充裕 ✅       │ │
│ │ ↑12%     │ ↑8%      │ 可用¥450万   │ │
│ └──────────┴──────────┴──────────────┘ │
├─────────────────────────────────────────┤
│ 🔔 智能预警                       全部 >│  ← 预警区块
│ ┌─────────────────────────────────────┐ │
│ │⚠️ 客户A订单量下降40%，建议关注       │ │
│ │  风险等级：中 · 2小时前              │ │
│ ├─────────────────────────────────────┤ │
│ │📅 增值税申报截止：3天后              │ │
│ │  立即处理 >                          │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │🤖 AI经营助手                         │ │  ← AI助手入口卡片 H88
│ │"张总，本月毛利率32%，高于行业均值…"  │ │
│ │ [点击对话] [生成今日简报]            │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ⚡ 快捷功能                              │  ← 功能宫格 4×3
│ ┌────┬────┬────┬────┐                  │
│ │📒记账│🧾税务│💳融资│👤招聘│            │
│ ├────┼────┼────┼────┤                  │
│ │📦库存│📣营销│📝合同│🏛政策│            │
│ ├────┼────┼────┼────┤                  │
│ │🩺诊断│💼咨询│⋯更多│    │            │
│ └────┴────┴────┴────┘                  │
├─────────────────────────────────────────┤
│ 📰 资讯速递                       更多 >│  ← 资讯Tab
│ [行业动态][竞品情报][政策速递]            │
│ • 制造业PMI回升至51.2，景气度改善        │
│ • 竞品B推出新品，定价下探8%              │
│ • 小微企业增值税减免政策延续至2027年     │
├─────────────────────────────────────────┤
│ [首页] [工作台] [AI助手] [消息] [我的]    │  ← 底部Tab H64
└─────────────────────────────────────────┘
```

#### 1.1.2 组件清单

| 组件 | 说明 | 交互 |
|---|---|---|
| `AppBar` | 高56，深蓝底白字，右侧消息红点+设置 | 点击消息进消息中心，设置进设置页 |
| `CompanySwitcher` | 企业名称+下拉箭头 | 点击弹出企业列表Sheet，支持多企业切换 |
| `GreetingCard` | 根据时段显示问候，展示待办/预警数 | 点击跳转待办列表 |
| `HealthScoreCard` | 评分大数字+迷你雷达图+趋势 | 点击进入智能成长诊断详情 |
| `MetricTripleCard` | 三列等分，营收/利润/现金流 | 点击单列进入对应看板 |
| `AlertList` | 预警卡片列表，最多展示3条 | 点击进入处理流程，左滑可忽略 |
| `AIEntryCard` | AI助手一句话摘要+两个快捷按钮 | 点击进入AI对话页 |
| `QuickGrid` | 4列宫格，长按可编辑排序 | 点击进入对应功能模块 |
| `NewsTabs` | 三Tab资讯流 | 点击查看资讯详情 |
| `BottomNav` | 5Tab，中间AI助手凸起金色 | Tab切换，AI助手为圆形金色按钮 |

#### 1.1.3 交互说明

1. **下拉刷新**：刷新所有首页数据，显示"经营数据更新中…"Loading
2. **健康评分卡**：雷达图点击单维度可弹出该维度说明气泡
3. **预警卡片**：右滑标记已读，左滑"稍后提醒"，点击进入处理流程
4. **快捷宫格**：长按2秒进入编辑模式，可拖拽排序，支持收藏置顶
5. **AI助手摘要**：每日8:00自动生成，根据用户行为动态更新一句话

---

### 1.2 工作台页面

**页面定位**：十大服务板块统一入口，支持个性化定制。

#### 1.2.1 页面布局

```
┌─────────────────────────────────────────┐
│ 工作台                    🔍 搜索  ✏️编辑│
├─────────────────────────────────────────┤
│ 📌 我的常用                              │  ← 收藏区（横向滚动）
│ ┌────┐┌────┐┌────┐                      │
│ │记账 ││税务 ││诊断 │  →                 │
│ └────┘└────┘└────┘                      │
├─────────────────────────────────────────┤
│ 🕐 最近使用                              │
│ • 发票扫描 · 10分钟前                    │
│ • 增值税申报 · 昨天 14:30                │
├─────────────────────────────────────────┤
│ 📦 全部服务                              │
│ ┌─────────────────────────────────────┐ │
│ │ 📊 智能财务中心              >        │ │  ← 板块卡片
│ │ 本月营收¥128万 · 凭证86张            │ │     每张展示关键摘要
│ │ [记账] [报表] [发票] [预算]          │ │
│ ├─────────────────────────────────────┤ │
│ │ 💳 金融服务超市              >        │ │
│ │ 可贷额度¥300万 · 3款产品匹配         │ │
│ │ [融资] [保险] [收款] [现金流]        │ │
│ ├─────────────────────────────────────┤ │
│ │ 🧾 智能税务中心              >        │ │
│ │ 下次申报：3天后 · 风险0项            │ │
│ │ [算税] [申报] [风控] [优惠]          │ │
│ ├─────────────────────────────────────┤ │
│ │ 👤 人力资源管家              >        │ │
│ │ 在职32人 · 本月待发薪¥48万           │ │
│ │ [招聘] [考勤] [薪酬] [培训]          │ │
│ ├─────────────────────────────────────┤ │
│ │ 📦 供应链与进销存            >        │ │
│ │ 库存预警5项 · 待发货8单              │ │
│ │ [采购] [库存] [CRM] [物流]           │ │
│ ├─────────────────────────────────────┤ │
│ │ 📣 营销获客中心              >        │ │
│ │ 本月新增线索126 · 转化率18%          │ │
│ │ [官网] [名片] [会员] [获客]          │ │
│ ├─────────────────────────────────────┤ │
│ │ 📝 法律合规中心              >        │ │
│ │ 待审合同2份 · 证书到期1项            │ │
│ │ [合同] [签署] [知产] [法务]          │ │
│ ├─────────────────────────────────────┤ │
│ │ 🏛 政策服务大厅              >        │ │
│ │ 匹配政策8项 · 预估补贴¥12万          │ │
│ │ [雷达] [匹配] [补贴] [申报]          │ │
│ ├─────────────────────────────────────┤ │
│ │ 🩺 智能成长中心              >        │ │
│ │ 健康评分78 · 诊断报告已生成          │ │
│ │ [诊断] [雷达] [沙盘] [建议]          │ │
│ ├─────────────────────────────────────┤ │
│ │ 💼 三务咨询中心              >        │ │
│ │ 进行中咨询1项 · 专家在线12位         │ │
│ │ [税务] [法务] [财务] [联动]          │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ [首页] [工作台] [AI助手] [消息] [我的]    │
└─────────────────────────────────────────┘
```

#### 1.2.2 组件清单

| 组件 | 说明 | 交互 |
|---|---|---|
| `SearchBar` | 顶部搜索，支持功能/数据/政策搜索 | 点击展开全屏搜索页 |
| `EditButton` | 进入编辑模式，可拖拽排序、隐藏板块 | 编辑态卡片右上角出现删除/排序控件 |
| `FavoriteStrip` | 横向滚动收藏功能 | 点击直达功能，长按移除 |
| `RecentList` | 最近使用记录，最多5条 | 点击继续上次操作 |
| `ModuleCard` | 板块大卡片：图标+名称+摘要+子功能标签 | 点击卡片进板块首页，点子功能直达 |
| `SubFunctionTag` | 板块下4个子功能快捷标签 | 点击直达子功能 |

#### 1.2.3 交互说明

1. **编辑模式**：点击右上角✏️，所有卡片可拖拽排序，长按板块卡片可隐藏/显示
2. **摘要数据**：每个板块卡片实时展示关键指标，5分钟刷新一次
3. **子功能标签**：根据用户使用频率动态排序，最常用的排第一
4. **空状态**：未开通板块显示"即将上线"灰态卡片，点击可预约

---

### 1.3 AI 助手页面

**页面定位**：类微信对话式交互，支持多模态输入与富媒体回复。

#### 1.3.1 页面布局

```
┌─────────────────────────────────────────┐
│ ← AI经营助手        🎙️语音  ⋯更多        │
├─────────────────────────────────────────┤
│           🤖 您的专属经营管家            │  ← 助手介绍卡
│   基于企业实时数据，随时为您服务         │
├─────────────────────────────────────────┤
│                                         │
│  [快捷问题]                              │  ← 快捷按钮区
│  ┌────────┐ ┌────────┐ ┌────────┐      │
│  │查本月营收│ │税务风险 │ │生成经营 │      │
│  │        │ │ 分析   │ │ 报告   │      │
│  └────────┘ └────────┘ └────────┘      │
│                                         │
│  🤖 张总早上好！本月经营概况：            │  ← AI消息气泡
│  ┌─────────────────────────────────┐    │
│  │ 📊 本月经营简报                  │    │  ← 数据卡片嵌入
│  │ 营收 ¥128万 ↑12%                 │    │
│  │ 利润 ¥23万 ↑8%                   │    │
│  │ 健康评分 78 ↑3                   │    │
│  └─────────────────────────────────┘    │
│  建议关注：客户A订单下降40%              │
│  [查看详情] [生成完整报告]               │  ← 操作按钮嵌入
│                                         │
│              我：分析一下税务风险 🙋      │  ← 用户消息气泡（右）
│                                         │
│  🤖 好的，已为您扫描税务风险：            │
│  ┌─────────────────────────────────┐    │
│  │ ⚠️ 税务风险扫描（共2项）          │    │  ← 图表卡片嵌入
│  │ [风险等级分布饼图]                │    │
│  │ 1. 进项发票集中度高 · 中风险      │    │
│  │ 2. 增值税税负率偏低 · 低风险      │    │
│  └─────────────────────────────────┘    │
│  [查看风控详情] [咨询税务顾问]           │
│                                         │
├─────────────────────────────────────────┤
│ [+] [📎] [输入消息...]    [😊] [发送]    │  ← 输入栏
└─────────────────────────────────────────┘
```

#### 1.3.2 组件清单

| 组件 | 说明 | 交互 |
|---|---|---|
| `ChatHeader` | 返回+标题+语音切换+更多 | 语音切换进入语音对话模式 |
| `QuickQuestionBar` | 横向滚动快捷问题按钮 | 点击直接发送该问题 |
| `AIMessageBubble` | AI消息气泡，左对齐，深蓝头像 | 支持长按复制/重新生成 |
| `UserMessageBubble` | 用户消息气泡，右对齐，金色底 | 长按可撤回/复制 |
| `DataCard` | 嵌入式数据卡片 | 点击可展开详情或跳转 |
| `ChartCard` | 嵌入式图表（饼图/折线/柱状） | 点击全屏查看，支持下钻 |
| `ActionButtonGroup` | 操作按钮组 | 点击触发对应动作（跳转/生成/咨询） |
| `InputBar` | 输入栏：附件+输入框+表情+发送 | 支持文字/图片/文件，语音长按说话 |
| `VoiceButton` | 语音输入按钮 | 长按录音，松开发送，上滑取消 |
| `TypingIndicator` | AI正在输入动画（三个跳动点） | 等待响应时展示 |

#### 1.3.3 交互说明

1. **多模态输入**：支持文字、语音（ASR）、图片（发票/合同识别）、文件
2. **流式回复**：AI回复采用流式输出（打字机效果），首字延迟<1秒
3. **上下文记忆**：保留最近20轮对话上下文，支持"接着上面说的…"
4. **工具调用**：AI可调用查数据、生成图表、创建任务、发起咨询等工具
5. **快捷问题**：根据当前时间/待办/预警动态生成（如申报期前显示"一键算税"）
6. **语音播报**：AI回复可点击🔊播报（TTS），支持后台播放
7. **历史记录**：对话按会话分组，支持搜索历史对话

---

### 1.4 三务咨询页面

**页面定位**：税务/法务/财务三大专业咨询统一入口。

#### 1.4.1 页面布局

```
┌─────────────────────────────────────────┐
│ ← 三务咨询                       🔍      │
├─────────────────────────────────────────┤
│ ┌──────────────────────────────────────┐│
│ │ 🤖 AI自助 │ 👨‍💼在线顾问 │ 🎓专家预约  ││  ← 服务层级Tab
│ │  免费     │  ¥99/次    │  ¥599/次   ││
│ └──────────────────────────────────────┘│
├─────────────────────────────────────────┤
│ [税务咨询] [法务咨询] [财务咨询] [三务联动]│  ← 咨询类型Tab
├─────────────────────────────────────────┤
│ 📋 我的咨询记录                          │  ← 咨询记录列表
│ ┌─────────────────────────────────────┐ │
│ │🟢 进行中 · 税务咨询 · AI自助         │ │
│ │ 关于小微企业增值税减免的咨询          │ │
│ │ 最后更新：10分钟前                   │ │
│ │ [继续咨询]                          │ │
│ ├─────────────────────────────────────┤ │
│ │✅ 已完成 · 法务咨询 · 专家预约        │ │
│ │ 劳动合同解除赔偿问题                  │ │
│ │ 2026-06-15 · 已出报告                │ │
│ │ [查看报告] [再次咨询]                │ │
│ ├─────────────────────────────────────┤ │
│ │✅ 已完成 · 财务咨询 · 在线顾问        │ │
│ │ 年终奖税务筹划方案                    │ │
│ │ 2026-06-10 · 已出报告                │ │
│ │ [查看报告]                           │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ 🚀 发起新咨询                            │
│ ┌─────────────────────────────────────┐ │
│ │ 📝 描述您的问题                       │ │
│ │ [多行输入框]                         │ │
│ │ 📎 上传相关材料（合同/发票/报表）      │ │
│ │ [选择咨询类型 ▾] [选择服务层级 ▾]     │ │
│ │ [立即开始咨询]                       │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ 📚 知识库                                │  ← 知识库入口
│ 🔥 热门：小微企业税收优惠 | 劳动用工风险  │
│ [搜索知识库 >]                          │
├─────────────────────────────────────────┤
│ [首页] [工作台] [AI助手] [消息] [我的]    │
└─────────────────────────────────────────┘
```

#### 1.4.2 咨询详情页（对话式）

```
┌─────────────────────────────────────────┐
│ ← 税务咨询·进行中    📞(如在线) ⋯更多    │
│   服务：专家预约 · 专家：李税务师         │
├─────────────────────────────────────────┤
│ 📌 咨询摘要                              │
│ 类型：税务咨询 | 问题：增值税减免适用     │
│ 状态：专家分析中 · 预计30分钟出报告       │
├─────────────────────────────────────────┤
│                                         │
│  👤 我：我公司年营收450万，能享受小规模... │
│                                         │
│  🎓 李税务师：您好，根据您的情况...        │
│  ┌─────────────────────────────────┐    │
│  │ 📄 咨询报告（初稿）               │    │  ← 报告卡片
│  │ 一、适用政策：财税〔2023〕1号      │    │
│  │ 二、减免金额测算：年减税约¥8.6万   │    │
│  │ 三、申报操作指引                   │    │
│  │ [查看完整报告] [下载PDF]          │    │
│  └─────────────────────────────────┘    │
│  [追问] [确认采纳] [申请专家复核]        │
│                                         │
├─────────────────────────────────────────┤
│ [+] [输入...] [发送]                     │
└─────────────────────────────────────────┘
```

#### 1.4.3 组件清单

| 组件 | 说明 | 交互 |
|---|---|---|
| `ServiceLevelTab` | AI自助/在线顾问/专家预约三档 | 切换显示对应价格与流程 |
| `ConsultTypeTab` | 税务/法务/财务/三务联动 | 切换咨询类型 |
| `ConsultRecordCard` | 咨询记录卡片，含状态徽章 | 点击进入咨询详情 |
| `StatusBadge` | 状态徽章：进行中/已完成/已关闭 | 不同状态不同颜色 |
| `NewConsultForm` | 发起新咨询表单 | 提交后根据层级进入不同流程 |
| `KnowledgeBaseEntry` | 知识库搜索入口 | 点击进入知识库搜索页 |
| `ConsultReportCard` | 咨询报告卡片 | 支持查看/下载PDF/分享 |
| `ExpertInfoBar` | 专家信息条（专家模式） | 显示专家资质，可发起通话 |

---

### 1.5 数据看板页面

**页面定位**：可自定义的可视化数据看板，支持拖拽布局。

#### 1.5.1 页面布局

```
┌─────────────────────────────────────────┐
│ ← 数据看板     [日][周][月][季][年] ✏️编辑│  ← 时间维度切换
├─────────────────────────────────────────┤
│ 看板：经营总览 ▾    2026年6月    📤导出   │  ← 看板切换+导出
├─────────────────────────────────────────┤
│ ┌──────────────┬───────────────────────┐│
│ │ 📈 营收趋势    │ 🥧 收入结构           ││  ← 可拖拽图表卡
│ │ [折线图]      │ [饼图]                ││
│ │ 本月¥128万    │ 产品A 45%             ││
│ │ ↑12%         │ 产品B 30%             ││
│ │              │ 服务 25%              ││
│ └──────────────┴───────────────────────┘│
│ ┌──────────────────────────────────────┐│
│ │ 📊 六维健康诊断 [雷达图]              ││
│ │ 财务78 税务85 运营72 成长68 风控80 合规││
│ └──────────────────────────────────────┘│
│ ┌──────────────┬───────────────────────┐│
│ │ 📉 利润分析    │ 💧 现金流仪表盘       ││
│ │ [柱状图]      │ [仪表盘]              ││
│ │ 毛利率32%     │ 充裕 85/100           ││
│ └──────────────┴───────────────────────┘│
│ ┌──────────────────────────────────────┐│
│ │ 🔻 客户转化漏斗 [漏斗图]              ││
│ │ 线索126→商机45→成交18                 ││
│ └──────────────────────────────────────┘│
├─────────────────────────────────────────┤
│ [+ 添加图表组件]                         │  ← 添加组件
└─────────────────────────────────────────┘
```

#### 1.5.2 组件清单

| 组件 | 说明 | 交互 |
|---|---|---|
| `TimeRangeSwitcher` | 日/周/月/季/年切换 | 切换后所有图表联动刷新 |
| `DashboardSwitcher` | 看板模板下拉（经营总览/财务/税务/营销） | 切换不同看板 |
| `ChartCard` | 图表卡片容器，支持拖拽 | 长按拖拽调整位置/大小 |
| `LineChart` | 折线图（趋势） | 点击数据点显示明细，双击下钻 |
| `BarChart` | 柱状图（对比） | 点击柱子下钻 |
| `PieChart` | 饼图（结构） | 点击扇区下钻 |
| `RadarChart` | 雷达图（多维评估） | 点击维度查看详情 |
| `FunnelChart` | 漏斗图（转化） | 点击阶段查看明细 |
| `GaugeChart` | 仪表盘（评分） | 点击查看评分构成 |
| `AddWidgetButton` | 添加图表组件 | 弹出组件库选择Sheet |
| `ExportButton` | 导出看板为图片/PDF/Excel | 调用系统分享 |

#### 1.5.3 交互说明

1. **拖拽布局**：编辑模式下，长按图表卡片可拖拽到任意位置，支持2×2网格
2. **数据下钻**：点击图表元素，弹出下级明细（如点击"产品A"查看产品A订单列表）
3. **联动筛选**：点击某图表元素，其他图表按该维度联动筛选
4. **自定义看板**：可保存自定义看板模板，支持命名与切换
5. **时间对比**：支持选择对比期（如本月vs上月，环比/同比）

---

### 1.6 个人中心页面

**页面定位**：账户管理、企业设置、订阅服务、帮助中心。

#### 1.6.1 页面布局

```
┌─────────────────────────────────────────┐
│ ⚙️ 设置                                  │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ 👤 [头像]                            │ │  ← 用户信息卡
│ │ 张总 · 老板                          │ │
│ │ 深圳XX科技有限公司                    │ │
│ │ 🏆 专业版会员 · 有效期至2027-06-30    │ │
│ │ [升级旗舰版 >]                       │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ 🏢 我的企业                              │
│ ┌─────────────────────────────────────┐ │
│ │ 深圳XX科技有限公司（当前）    >       │ │
│ │ 广州XX分公司                >        │ │
│ │ [+ 添加企业]                        │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ⚙️ 通用设置                              │
│ 🔔 消息通知              已开启 >        │
│ 🔒 隐私与安全            人脸/指纹 >     │
│ 🌙 深色模式              跟随系统 >      │
│ 🌐 语言                  简体中文 >      │
├─────────────────────────────────────────┤
│ 💼 账户与订阅                            │
│ 📦 我的订阅              专业版 >        │
│ 💳 支付方式              2张卡 >         │
│ 🧾 账单记录              >               │
│ 🎫 优惠券                3张可用 >       │
├─────────────────────────────────────────┤
│ 🛠 工具与服务                            │
│ 📤 数据导出              >               │
│ 🔗 第三方授权            银行/电子税务局 >│
│ 📱 邀请同事              >               │
│ 🏪 行业插件市场          制造业已安装 >   │
├─────────────────────────────────────────┤
│ ❓ 帮助与反馈                            │
│ 📖 使用帮助              >               │
│ 🎓 新手引导              >               │
│ 💬 在线客服              >               │
│ ⭐ 评价我们              >               │
│ 📜 关于企管家            v2.0.1 >        │
├─────────────────────────────────────────┤
│           [退出登录]                      │
├─────────────────────────────────────────┤
│ [首页] [工作台] [AI助手] [消息] [我的]    │
└─────────────────────────────────────────┘
```

#### 1.6.2 组件清单

| 组件 | 说明 | 交互 |
|---|---|---|
| `UserProfileCard` | 头像+姓名+角色+企业+会员等级 | 点击编辑资料 |
| `MembershipBanner` | 会员等级与升级入口 | 点击进入会员中心 |
| `EnterpriseList` | 企业列表，当前企业高亮 | 点击切换企业，长按管理 |
| `SettingGroup` | 设置项分组容器 | — |
| `SettingItem` | 单个设置项：图标+标题+副标题+箭头 | 点击进入对应设置页 |
| `LogoutButton` | 退出登录 | 二次确认弹窗 |

---

### 1.7 全局交互规范

#### 1.7.1 加载状态

- **页面加载**：骨架屏（Skeleton），灰色块占位，0.8s内出现内容
- **下拉刷新**：自定义动画（金币旋转），文案"经营数据更新中…"
- **按钮加载**：按钮内 Spinner，禁用防重复提交
- **AI加载**：打字机动画+三个跳动点+"正在为您分析…"

#### 1.7.2 空状态

- 每个空状态页配插画+文案+引导按钮
- 例：无发票时显示"还没有发票记录，点击拍照记账开始吧"

#### 1.7.3 弹窗规范

- **Toast**：操作成功/失败提示，2秒自动消失，居中
- **Dialog**：重要确认（删除/支付/申报），居中模态，遮罩不可点击关闭
- **ActionSheet**：底部弹出选择（如选择服务层级），支持上下滑动
- **Snackbar**：可带操作按钮的提示（如"已删除 撤销"），底部

#### 1.7.4 手势规范

- 左滑：删除/忽略（列表项）
- 右滑：标记已读/收藏
- 长按：进入编辑模式/复制
- 双指缩放：图表全屏查看
- 下拉：刷新

#### 1.7.5 无障碍

- 所有图标配语义化标签（SemanticsLabel）
- 文本支持系统动态字号
- 对比度满足 WCAG AA 标准（≥4.5:1）
- 支持屏幕阅读器（VoiceOver/TalkBack）

---

## 2. 数据库设计

### 2.1 ER 图（文字版）

```
┌─────────────┐       ┌──────────────┐       ┌─────────────────┐
│   users     │1─────*│company_members│*─────1│   companies     │
│  用户表      │       │  成员关系表    │       │   企业表         │
└──────┬──────┘       └──────┬───────┘       └────────┬────────┘
       │1                    │1                       │1
       │                     │                        │
       │*                    │*                       │*
┌──────┴──────┐       ┌──────┴───────┐       ┌────────┴────────┐
│permissions  │       │  roles       │       │  enterprises_   │
│  权限表      │*─────1│  角色表       │1─────*│  plugins(行业插件)│
└─────────────┘       └──────────────┘       └─────────────────┘

【财务模块】
companies 1─────* accounts(科目) 1─────* vouchers(凭证) *─────1 accounts
companies 1─────* invoices(发票)
companies 1─────* bank_flows(银行流水)
companies 1─────* financial_reports(报表)

【税务模块】
companies 1─────* tax_declarations(申报)
tax_policies 1─────* tax_declarations
companies 1─────* tax_risks(风险)

【三务咨询模块】
users 1─────* consultations(咨询) *─────1 experts(专家)
consultations 1─────* consultation_messages(消息)
experts 1─────* expert_schedules(排班)
knowledge_base(知识库) 独立表

【智能成长模块】
companies 1─────* health_scores(评分)
companies 1─────* diagnosis_reports(报告)
market_data(市场数据) 独立表
companies 1─────* simulations(模拟)

【关联关系总览】
users ──(company_members)── companies
companies ──1:N── accounts/vouchers/invoices/bank_flows/financial_reports
companies ──1:N── tax_declarations/tax_risks
companies ──1:N── consultations/health_scores/diagnosis_reports/simulations
consultations ──1:N── consultation_messages
consultations ──N:1── experts
experts ──1:N── expert_schedules
tax_policies ──1:N── tax_declarations
```

### 2.2 核心表结构

#### 2.2.1 用户与企业模块

**表：users（用户表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | 用户ID |
| phone | VARCHAR(20) | UNIQUE, NOT NULL | 手机号（登录账号） |
| password_hash | VARCHAR(128) | NOT NULL | 密码哈希（bcrypt） |
| name | VARCHAR(50) | NOT NULL | 姓名 |
| avatar_url | VARCHAR(255) | | 头像URL |
| email | VARCHAR(100) | | 邮箱 |
| id_card_no | VARCHAR(64) | ENCRYPTED | 身份证号（加密存储） |
| realname_status | TINYINT | DEFAULT 0 | 实名状态：0未实名 1已实名 |
| last_login_at | DATETIME | | 最后登录时间 |
| last_login_ip | VARCHAR(45) | | 最后登录IP |
| status | TINYINT | DEFAULT 1 | 状态：0禁用 1正常 |
| created_at | DATETIME | NOT NULL | 创建时间 |
| updated_at | DATETIME | NOT NULL | 更新时间 |

**索引**：`uk_phone(phone)`、`idx_status(status)`

**表：companies（企业表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | 企业ID |
| name | VARCHAR(100) | NOT NULL | 企业名称 |
| credit_code | VARCHAR(32) | UNIQUE | 统一社会信用代码 |
| legal_person | VARCHAR(50) | | 法定代表人 |
| industry | VARCHAR(50) | | 行业（枚举） |
| scale | VARCHAR(20) | | 企业规模（微型/小型/中型） |
| revenue_range | VARCHAR(30) | | 营收区间 |
| registered_at | DATE | | 注册日期 |
| address | VARCHAR(255) | | 注册地址 |
| contact_phone | VARCHAR(20) | | 联系电话 |
| tax_type | TINYINT | | 纳税人类型：1一般 2小规模 |
| logo_url | VARCHAR(255) | | 企业Logo |
| status | TINYINT | DEFAULT 1 | 状态 |
| created_at | DATETIME | NOT NULL | 创建时间 |
| updated_at | DATETIME | NOT NULL | 更新时间 |

**索引**：`uk_credit_code(credit_code)`、`idx_industry(industry)`

**表：company_members（企业成员关系表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | ID |
| company_id | BIGINT | FK, NOT NULL | 企业ID |
| user_id | BIGINT | FK, NOT NULL | 用户ID |
| role_id | BIGINT | FK | 角色ID |
| member_role | VARCHAR(20) | NOT NULL | 成员角色：boss/finance/admin/staff |
| joined_at | DATETIME | NOT NULL | 加入时间 |
| status | TINYINT | DEFAULT 1 | 状态：0待激活 1正常 2已退出 |
| created_at | DATETIME | NOT NULL | 创建时间 |

**索引**：`uk_company_user(company_id, user_id)`、`idx_user_id(user_id)`

**表：roles（角色表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | 角色ID |
| company_id | BIGINT | FK | 企业ID（NULL为系统角色） |
| name | VARCHAR(50) | NOT NULL | 角色名称 |
| code | VARCHAR(50) | NOT NULL | 角色编码 |
| description | VARCHAR(255) | | 描述 |
| created_at | DATETIME | NOT NULL | 创建时间 |

**表：permissions（权限表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | 权限ID |
| parent_id | BIGINT | DEFAULT 0 | 父权限ID |
| name | VARCHAR(50) | NOT NULL | 权限名称 |
| code | VARCHAR(100) | UNIQUE | 权限编码（如 finance:invoice:scan） |
| type | TINYINT | | 类型：1菜单 2按钮 3接口 |
| path | VARCHAR(255) | | 前端路由/接口路径 |
| sort | INT | DEFAULT 0 | 排序 |

**表：role_permissions（角色权限关联表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| role_id | BIGINT | FK, NOT NULL | 角色ID |
| permission_id | BIGINT | FK, NOT NULL | 权限ID |

**索引**：`uk_role_permission(role_id, permission_id)`

---

#### 2.2.2 财务模块

**表：accounts（科目表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | 科目ID |
| company_id | BIGINT | FK, NOT NULL | 企业ID |
| code | VARCHAR(30) | NOT NULL | 科目编码（如1001） |
| name | VARCHAR(50) | NOT NULL | 科目名称 |
| parent_id | BIGINT | DEFAULT 0 | 父科目ID |
| level | TINYINT | NOT NULL | 层级（1-4级） |
| direction | TINYINT | NOT NULL | 余额方向：1借 2贷 |
| category | VARCHAR(20) | | 类别：资产/负债/权益/成本/损益 |
| balance | DECIMAL(18,2) | DEFAULT 0 | 余额 |
| is_enabled | TINYINT | DEFAULT 1 | 是否启用 |
| created_at | DATETIME | NOT NULL | 创建时间 |

**索引**：`uk_company_code(company_id, code)`、`idx_parent_id(parent_id)`

**表：vouchers（凭证表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | 凭证ID |
| company_id | BIGINT | FK, NOT NULL | 企业ID |
| voucher_no | VARCHAR(30) | NOT NULL | 凭证号 |
| voucher_date | DATE | NOT NULL | 凭证日期 |
| period | VARCHAR(7) | NOT NULL | 会计期间（如2026-06） |
| summary | VARCHAR(255) | | 摘要 |
| attachments | JSON | | 附件URL数组 |
| source | TINYINT | DEFAULT 1 | 来源：1手工 2AI记账 3导入 |
| ai_confidence | DECIMAL(5,2) | | AI置信度（0-100） |
| status | TINYINT | DEFAULT 0 | 状态：0草稿 1已审核 2已过账 |
| created_by | BIGINT | FK | 创建人 |
| audited_by | BIGINT | FK | 审核人 |
| created_at | DATETIME | NOT NULL | 创建时间 |

**索引**：`uk_company_voucher_no(company_id, voucher_no)`、`idx_period(period)`、`idx_voucher_date(voucher_date)`

**表：voucher_entries（凭证明细表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | ID |
| voucher_id | BIGINT | FK, NOT NULL | 凭证ID |
| account_id | BIGINT | FK, NOT NULL | 科目ID |
| debit_amount | DECIMAL(18,2) | DEFAULT 0 | 借方金额 |
| credit_amount | DECIMAL(18,2) | DEFAULT 0 | 贷方金额 |
| summary | VARCHAR(255) | | 摘要 |
| aux_info | JSON | | 辅助核算（客户/供应商/项目） |

**索引**：`idx_voucher_id(voucher_id)`、`idx_account_id(account_id)`

**表：invoices（发票表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | 发票ID |
| company_id | BIGINT | FK, NOT NULL | 企业ID |
| invoice_type | TINYINT | NOT NULL | 类型：1进项 2销项 |
| invoice_code | VARCHAR(20) | | 发票代码 |
| invoice_no | VARCHAR(20) | NOT NULL | 发票号码 |
| invoice_date | DATE | NOT NULL | 开票日期 |
| buyer_name | VARCHAR(100) | | 购方名称 |
| seller_name | VARCHAR(100) | | 销方名称 |
| amount | DECIMAL(18,2) | NOT NULL | 金额（不含税） |
| tax_amount | DECIMAL(18,2) | NOT NULL | 税额 |
| total_amount | DECIMAL(18,2) | NOT NULL | 价税合计 |
| tax_rate | DECIMAL(5,2) | | 税率 |
| image_url | VARCHAR(255) | | 发票图片URL |
| ocr_raw | JSON | | OCR原始识别结果 |
| ocr_status | TINYINT | DEFAULT 0 | OCR状态：0待识别 1已识别 2失败 |
| voucher_id | BIGINT | FK | 关联凭证ID |
| status | TINYINT | DEFAULT 1 | 状态：0作废 1正常 |
| created_at | DATETIME | NOT NULL | 创建时间 |

**索引**：`uk_company_invoice(company_id, invoice_code, invoice_no)`、`idx_invoice_date(invoice_date)`、`idx_invoice_type(invoice_type)`

**表：bank_flows（银行流水表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | ID |
| company_id | BIGINT | FK, NOT NULL | 企业ID |
| bank_account | VARCHAR(30) | NOT NULL | 银行账号 |
| trade_date | DATETIME | NOT NULL | 交易时间 |
| trade_amount | DECIMAL(18,2) | NOT NULL | 交易金额 |
| trade_direction | TINYINT | NOT NULL | 方向：1收入 2支出 |
| counterparty | VARCHAR(100) | | 对方账户名 |
| counterparty_account | VARCHAR(30) | | 对方账号 |
| summary | VARCHAR(255) | | 摘要 |
| balance | DECIMAL(18,2) | | 交易后余额 |
| voucher_id | BIGINT | FK | 关联凭证ID |
| sync_status | TINYINT | DEFAULT 0 | 同步状态：0未同步 1已同步 |
| created_at | DATETIME | NOT NULL | 创建时间 |

**索引**：`idx_company_trade_date(company_id, trade_date)`、`idx_sync_status(sync_status)`

**表：financial_reports（财务报表表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | ID |
| company_id | BIGINT | FK, NOT NULL | 企业ID |
| report_type | VARCHAR(20) | NOT NULL | 类型：balance/income/cashflow |
| period | VARCHAR(7) | NOT NULL | 期间（如2026-06） |
| report_data | JSON | NOT NULL | 报表数据（结构化） |
| generated_by | TINYINT | DEFAULT 1 | 生成方式：1自动 2手动 |
| created_at | DATETIME | NOT NULL | 创建时间 |

**索引**：`uk_company_type_period(company_id, report_type, period)`

---

#### 2.2.3 税务模块

**表：tax_declarations（纳税申报表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | ID |
| company_id | BIGINT | FK, NOT NULL | 企业ID |
| tax_type | VARCHAR(20) | NOT NULL | 税种：vat/enterprise_tax/personal_tax等 |
| period | VARCHAR(7) | NOT NULL | 所属期 |
| taxable_amount | DECIMAL(18,2) | | 计税依据 |
| tax_amount | DECIMAL(18,2) | | 应纳税额 |
| deduction_amount | DECIMAL(18,2) | | 抵扣金额 |
| actual_amount | DECIMAL(18,2) | | 实际应补退税额 |
| declaration_data | JSON | | 申报表数据 |
| status | TINYINT | DEFAULT 0 | 状态：0待申报 1已确认 2已申报 3申报失败 4已缴款 |
| declared_at | DATETIME | | 申报时间 |
| declaration_no | VARCHAR(50) | | 申报流水号 |
| created_at | DATETIME | NOT NULL | 创建时间 |

**索引**：`uk_company_type_period(company_id, tax_type, period)`、`idx_status(status)`

**表：tax_policies（税收政策表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | ID |
| title | VARCHAR(200) | NOT NULL | 政策标题 |
| policy_no | VARCHAR(50) | | 文号 |
| tax_type | VARCHAR(20) | | 适用税种 |
| applicable_industry | JSON | | 适用行业 |
| applicable_scale | JSON | | 适用企业规模 |
| region | VARCHAR(50) | | 适用地区 |
| effective_from | DATE | | 生效日期 |
| effective_to | DATE | | 失效日期 |
| content | TEXT | | 政策内容 |
| summary | VARCHAR(500) | | AI摘要 |
| embedding | VECTOR(1536) | | 向量嵌入（用于语义检索） |
| source_url | VARCHAR(255) | | 来源链接 |
| created_at | DATETIME | NOT NULL | 创建时间 |

**索引**：`idx_tax_type(tax_type)`、`idx_effective(effective_from, effective_to)`

**表：tax_risks（税务风险记录表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | ID |
| company_id | BIGINT | FK, NOT NULL | 企业ID |
| risk_type | VARCHAR(50) | NOT NULL | 风险类型 |
| risk_level | TINYINT | NOT NULL | 等级：1低 2中 3高 |
| description | VARCHAR(500) | | 风险描述 |
| suggestion | VARCHAR(500) | | 建议措施 |
| related_data | JSON | | 相关数据 |
| status | TINYINT | DEFAULT 0 | 状态：0未处理 1已忽略 2已解决 |
| detected_at | DATETIME | NOT NULL | 检测时间 |
| resolved_at | DATETIME | | 解决时间 |

**索引**：`idx_company_status(company_id, status)`、`idx_risk_level(risk_level)`

---

#### 2.2.4 三务咨询模块

**表：consultations（咨询记录表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | ID |
| company_id | BIGINT | FK, NOT NULL | 企业ID |
| user_id | BIGINT | FK, NOT NULL | 发起用户ID |
| consult_type | TINYINT | NOT NULL | 类型：1税务 2法务 3财务 4三务联动 |
| service_level | TINYINT | NOT NULL | 层级：1AI自助 2在线顾问 3专家预约 |
| expert_id | BIGINT | FK | 专家ID（顾问/专家模式） |
| title | VARCHAR(200) | | 咨询标题 |
| question | TEXT | NOT NULL | 问题描述 |
| attachments | JSON | | 附件URL数组 |
| status | TINYINT | DEFAULT 0 | 状态：0待受理 1进行中 2待确认 3已完成 4已关闭 5已退款 |
| report_url | VARCHAR(255) | | 咨询报告URL |
| blockchain_hash | VARCHAR(128) | | 区块链存证哈希 |
| order_id | BIGINT | FK | 关联订单ID |
| amount | DECIMAL(18,2) | | 咨询费用 |
| satisfaction | TINYINT | | 满意度评分1-5 |
| created_at | DATETIME | NOT NULL | 创建时间 |
| closed_at | DATETIME | | 关闭时间 |

**索引**：`idx_company_status(company_id, status)`、`idx_user_id(user_id)`、`idx_expert_id(expert_id)`

**表：consultation_messages（咨询消息表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | ID |
| consultation_id | BIGINT | FK, NOT NULL | 咨询ID |
| sender_type | TINYINT | NOT NULL | 发送方：1用户 2AI 3顾问 4专家 5系统 |
| sender_id | BIGINT | | 发送方ID |
| content | TEXT | | 消息内容 |
| message_type | TINYINT | DEFAULT 1 | 类型：1文字 2图片 3文件 4语音 5卡片 |
| extra_data | JSON | | 附加数据（卡片/报告等） |
| created_at | DATETIME | NOT NULL | 创建时间 |

**索引**：`idx_consultation_id(consultation_id)`、`idx_created_at(created_at)`

**表：experts（专家表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | ID |
| name | VARCHAR(50) | NOT NULL | 姓名 |
| avatar_url | VARCHAR(255) | | 头像 |
| expertise | TINYINT | NOT NULL | 领域：1税务 2法务 3财务 |
| title | VARCHAR(50) | | 职称（注册税务师/律师/CPA） |
| cert_no | VARCHAR(64) | | 执业证号 |
| org | VARCHAR(100) | | 所属机构 |
| intro | TEXT | | 简介 |
| rating | DECIMAL(3,2) | DEFAULT 5.0 | 评分 |
| consult_count | INT | DEFAULT 0 | 咨询次数 |
| price | DECIMAL(18,2) | | 单次价格 |
| online_status | TINYINT | DEFAULT 0 | 在线状态：0离线 1在线 2忙碌 |
| status | TINYINT | DEFAULT 1 | 状态 |
| created_at | DATETIME | NOT NULL | 创建时间 |

**索引**：`idx_expertise(expertise)`、`idx_online_status(online_status)`

**表：expert_schedules（专家排班表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | ID |
| expert_id | BIGINT | FK, NOT NULL | 专家ID |
| schedule_date | DATE | NOT NULL | 日期 |
| time_slot | VARCHAR(20) | NOT NULL | 时段（如09:00-10:00） |
| status | TINYINT | DEFAULT 0 | 状态：0空闲 1已预约 2不可用 |
| consultation_id | BIGINT | FK | 关联咨询ID |
| created_at | DATETIME | NOT NULL | 创建时间 |

**索引**：`uk_expert_date_slot(expert_id, schedule_date, time_slot)`

**表：knowledge_base（知识库表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | ID |
| category | TINYINT | NOT NULL | 分类：1税务 2法务 3财务 |
| title | VARCHAR(200) | NOT NULL | 标题 |
| content | TEXT | NOT NULL | 内容 |
| tags | JSON | | 标签数组 |
| source | VARCHAR(100) | | 来源 |
| embedding | VECTOR(1536) | | 向量嵌入 |
| view_count | INT | DEFAULT 0 | 浏览次数 |
| status | TINYINT | DEFAULT 1 | 状态 |
| created_at | DATETIME | NOT NULL | 创建时间 |
| updated_at | DATETIME | NOT NULL | 更新时间 |

**索引**：`idx_category(category)`

---

#### 2.2.5 智能成长模块

**表：health_scores（健康评分记录表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | ID |
| company_id | BIGINT | FK, NOT NULL | 企业ID |
| period | VARCHAR(7) | NOT NULL | 期间 |
| total_score | DECIMAL(5,2) | NOT NULL | 总分（0-100） |
| finance_score | DECIMAL(5,2) | | 财务维度分 |
| tax_score | DECIMAL(5,2) | | 税务维度分 |
| operation_score | DECIMAL(5,2) | | 运营维度分 |
| growth_score | DECIMAL(5,2) | | 成长维度分 |
| risk_score | DECIMAL(5,2) | | 风控维度分 |
| compliance_score | DECIMAL(5,2) | | 合规维度分 |
| score_detail | JSON | | 评分明细（各子项） |
| grade | VARCHAR(10) | | 评级：A/B/C/D |
| created_at | DATETIME | NOT NULL | 创建时间 |

**索引**：`uk_company_period(company_id, period)`

**表：diagnosis_reports（诊断报告表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | ID |
| company_id | BIGINT | FK, NOT NULL | 企业ID |
| period | VARCHAR(7) | NOT NULL | 期间 |
| report_type | TINYINT | DEFAULT 1 | 类型：1月度 2季度 3年度 4专项 |
| score_id | BIGINT | FK | 关联评分ID |
| summary | TEXT | | 报告摘要 |
| strengths | JSON | | 优势项 |
| weaknesses | JSON | | 待改进项 |
| suggestions | JSON | | AI建议（数组） |
| report_content | LONGTEXT | | 完整报告内容（富文本） |
| report_url | VARCHAR(255) | | PDF报告URL |
| status | TINYINT | DEFAULT 1 | 状态 |
| created_at | DATETIME | NOT NULL | 创建时间 |

**索引**：`idx_company_period(company_id, period)`

**表：market_data（市场数据表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | ID |
| data_type | TINYINT | NOT NULL | 类型：1行业指数 2竞品动态 3政策 4市场趋势 |
| industry | VARCHAR(50) | | 行业 |
| title | VARCHAR(200) | | 标题 |
| content | TEXT | | 内容 |
| data_value | JSON | | 结构化数据值 |
| source | VARCHAR(100) | | 数据来源 |
| data_date | DATE | | 数据日期 |
| created_at | DATETIME | NOT NULL | 创建时间 |

**索引**：`idx_type_date(data_type, data_date)`、`idx_industry(industry)`

**表：simulations（决策模拟记录表）**

| 字段 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | BIGINT | PK, AUTO | ID |
| company_id | BIGINT | FK, NOT NULL | 企业ID |
| user_id | BIGINT | FK, NOT NULL | 用户ID |
| title | VARCHAR(200) | | 模拟标题 |
| scenario | JSON | NOT NULL | 假设条件（如涨价10%） |
| assumptions | JSON | | 模型假设参数 |
| result | JSON | | 模拟结果（营收/利润/客户流失/现金流） |
| model_version | VARCHAR(20) | | 模型版本 |
| status | TINYINT | DEFAULT 1 | 状态 |
| created_at | DATETIME | NOT NULL | 创建时间 |

**索引**：`idx_company_id(company_id)`

---

### 2.3 数据库设计补充说明

#### 2.3.1 分库分表策略

- **水平分库**：按 `company_id` 哈希分库（16库），单库承载约6000家企业
- **大表分表**：`vouchers`、`bank_flows`、`invoices` 按 `company_id` + `period` 分表
- **冷热分离**：3年以上历史数据归档至 ClickHouse，热数据保留 MySQL

#### 2.3.2 缓存策略

| 数据 | 缓存位置 | TTL | 失效策略 |
|---|---|---|---|
| 用户会话 | Redis | 7天 | 滑动续期 |
| 企业基础信息 | Redis | 1小时 | 写时失效 |
| 首页仪表盘 | Redis | 5分钟 | 定时刷新 |
| 健康评分 | Redis | 1小时 | 月度更新失效 |
| 政策知识库向量 | Milvus | 持久 | 增量更新 |

#### 2.3.3 数据安全

- 敏感字段（身份证、银行卡号）AES-256 加密存储
- 手机号脱敏展示（138****8888）
- 全表软删除（`deleted_at` 字段），物理删除需审批
- 全量操作审计日志记录至独立 `audit_logs` 表

---

## 3. API 设计

### 3.1 通用约定

#### 3.1.1 基础信息

- **Base URL**：`https://api.qijia.com`
- **协议**：HTTPS（TLS 1.3）
- **数据格式**：JSON（UTF-8）
- **认证方式**：Bearer Token（JWT）
- **请求头**：

```
Authorization: Bearer <access_token>
X-Company-Id: <企业ID>
X-App-Version: 2.0.1
X-Platform: ios|android|miniapp|web
Content-Type: application/json
```

#### 3.1.2 统一响应格式

**成功响应**：

```json
{
  "code": 0,
  "message": "success",
  "data": { },
  "request_id": "req_abc123",
  "timestamp": 1718928000
}
```

**错误响应**：

```json
{
  "code": 40001,
  "message": "参数错误：手机号格式不正确",
  "data": null,
  "request_id": "req_abc123",
  "timestamp": 1718928000
}
```

#### 3.1.3 分页约定

请求参数：`page`（页码，从1开始）、`page_size`（每页条数，默认20，最大100）

响应：

```json
{
  "list": [],
  "total": 1280,
  "page": 1,
  "page_size": 20,
  "total_pages": 64
}
```

#### 3.1.4 错误码定义

| 错误码 | HTTP状态 | 说明 |
|---|---|---|
| 0 | 200 | 成功 |
| 40001 | 400 | 参数错误 |
| 40002 | 400 | 参数缺失 |
| 40101 | 401 | 未登录或Token失效 |
| 40102 | 401 | Token过期 |
| 40301 | 403 | 无权限访问 |
| 40302 | 403 | 企业成员权限不足 |
| 40401 | 404 | 资源不存在 |
| 40901 | 409 | 资源冲突（如手机号已注册） |
| 42201 | 422 | 业务校验失败（如余额不足） |
| 42901 | 429 | 请求过于频繁（限流） |
| 50001 | 500 | 服务器内部错误 |
| 50002 | 500 | 数据库错误 |
| 50301 | 503 | 服务暂不可用（降级） |
| 50401 | 504 | AI服务超时 |
| 50402 | 504 | 第三方服务超时（如电子税务局） |

---

### 3.2 认证与授权模块

#### 3.2.1 POST /api/v1/auth/login（登录）

**请求参数**：

```json
{
  "phone": "13800138000",
  "password": "Abc123456",
  "captcha": "8a3n",
  "captcha_id": "cap_xxx",
  "platform": "ios",
  "device_id": "device_uuid"
}
```

**响应**：

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiJ9...",
    "refresh_token": "ref_xxx",
    "expires_in": 7200,
    "user": {
      "id": 1001,
      "name": "张总",
      "avatar_url": "https://oss.qijia.com/avatar/1001.jpg",
      "phone": "138****8000"
    },
    "companies": [
      {
        "company_id": 2001,
        "name": "深圳XX科技有限公司",
        "role": "boss",
        "is_current": true
      }
    ]
  }
}
```

#### 3.2.2 POST /api/v1/auth/refresh（刷新Token）

**请求**：

```json
{ "refresh_token": "ref_xxx" }
```

**响应**：

```json
{
  "code": 0,
  "data": {
    "access_token": "eyJ...",
    "expires_in": 7200
  }
}
```

#### 3.2.3 GET /api/v1/user/me（获取当前用户信息）

**响应**：

```json
{
  "code": 0,
  "data": {
    "id": 1001,
    "name": "张总",
    "avatar_url": "...",
    "phone": "138****8000",
    "email": "zhang@xx.com",
    "realname_status": 1,
    "current_company": {
      "company_id": 2001,
      "name": "深圳XX科技有限公司",
      "role": "boss",
      "member_role": "boss",
      "permissions": ["finance:*", "tax:*", "consultation:*"]
    }
  }
}
```

---

### 3.3 财务模块

#### 3.3.1 POST /api/v1/finance/invoice/scan（扫描发票）

**请求**（multipart/form-data）：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| image | File | 是 | 发票图片 |
| invoice_type | Int | 否 | 1进项 2销项（不传则自动识别） |

**响应**：

```json
{
  "code": 0,
  "data": {
    "invoice_id": 50001,
    "ocr_status": 1,
    "ai_confidence": 98.5,
    "invoice": {
      "invoice_type": 1,
      "invoice_code": "044001800111",
      "invoice_no": "12345678",
      "invoice_date": "2026-06-15",
      "buyer_name": "深圳XX科技有限公司",
      "seller_name": "广州YY供应商",
      "amount": 10000.00,
      "tax_amount": 1300.00,
      "total_amount": 11300.00,
      "tax_rate": 13.00,
      "image_url": "https://oss.qijia.com/invoice/50001.jpg"
    },
    "ai_suggestion": {
      "account_code": "1601",
      "account_name": "原材料",
      "summary": "采购原材料",
      "voucher_draft": {
        "entries": [
          { "account_code": "1601", "debit": 10000.00, "credit": 0 },
          { "account_code": "2221.01", "debit": 1300.00, "credit": 0 },
          { "account_code": "2202", "debit": 0, "credit": 11300.00 }
        ]
      }
    }
  }
}
```

#### 3.3.2 GET /api/v1/finance/dashboard（财务仪表盘）

**请求参数**（Query）：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| period | String | 否 | 期间，默认当月，如2026-06 |
| compare | Boolean | 否 | 是否返回环比数据 |

**响应**：

```json
{
  "code": 0,
  "data": {
    "period": "2026-06",
    "revenue": {
      "current": 1280000.00,
      "previous": 1143000.00,
      "change_rate": 0.12,
      "trend": [
        { "date": "2026-06-01", "value": 42000 },
        { "date": "2026-06-02", "value": 38000 }
      ]
    },
    "profit": {
      "current": 230000.00,
      "change_rate": 0.08,
      "margin": 0.18
    },
    "cash_flow": {
      "status": "abundant",
      "available": 4500000.00,
      "inflow": 980000.00,
      "outflow": 620000.00,
      "net": 360000.00
    },
    "ar": { "total": 860000.00, "overdue": 120000.00 },
    "ap": { "total": 540000.00, "due_soon": 80000.00 }
  }
}
```

#### 3.3.3 GET /api/v1/finance/report/{type}

**路径参数**：`type` ∈ `balance`(资产负债) / `income`(利润) / `cashflow`(现金流量)

**请求参数**：`period`（必填）

**响应**：

```json
{
  "code": 0,
  "data": {
    "type": "income",
    "period": "2026-06",
    "report_data": {
      "operating_revenue": 1280000.00,
      "operating_cost": 870000.00,
      "gross_profit": 410000.00,
      "operating_expenses": 180000.00,
      "operating_profit": 230000.00,
      "net_profit": 195000.00,
      "items": [
        { "name": "营业收入", "amount": 1280000.00, "level": 1 },
        { "name": "主营业务收入", "amount": 1200000.00, "level": 2 }
      ]
    },
    "report_url": "https://oss.qijia.com/report/xxx.pdf"
  }
}
```

---

### 3.4 税务模块

#### 3.4.1 POST /api/v1/tax/calculate（自动算税）

**请求**：

```json
{
  "tax_type": "vat",
  "period": "2026-06"
}
```

**响应**：

```json
{
  "code": 0,
  "data": {
    "tax_type": "vat",
    "period": "2026-06",
    "calculation": {
      "output_tax": 156000.00,
      "input_tax": 98000.00,
      "deduction": 2000.00,
      "payable": 56000.00,
      "detail": [
        { "item": "销项税额", "amount": 156000.00 },
        { "item": "进项税额", "amount": -98000.00 },
        { "item": "进项税额转出", "amount": 2000.00 }
      ]
    },
    "declaration_form": {
      "form_type": "增值税及附加税费申报表(小规模)",
      "fields": { }
    },
    "warnings": [
      { "level": "low", "message": "进项发票集中度较高，建议分散采购" }
    ]
  }
}
```

#### 3.4.2 POST /api/v1/tax/declare（一键申报）

**请求**：

```json
{
  "tax_type": "vat",
  "period": "2026-06",
  "declaration_data": { },
  "confirm": true
}
```

**响应**：

```json
{
  "code": 0,
  "data": {
    "declaration_id": 80001,
    "declaration_no": "DECL20260621001",
    "status": "submitted",
    "submitted_at": "2026-06-21T10:30:00Z",
    "tax_authority_response": {
      "accept_status": "accepted",
      "accept_no": "TAX2026062100088",
      "payable_amount": 56000.00,
      "pay_deadline": "2026-07-15"
    }
  }
}
```

#### 3.4.3 GET /api/v1/tax/calendar（申报日历）

**请求参数**：`year`、`month`

**响应**：

```json
{
  "code": 0,
  "data": {
    "year": 2026,
    "month": 6,
    "items": [
      {
        "tax_type": "vat",
        "period": "2026-06",
        "deadline": "2026-07-15",
        "days_left": 24,
        "status": "pending",
        "estimated_amount": 56000.00
      },
      {
        "tax_type": "personal_tax",
        "period": "2026-06",
        "deadline": "2026-07-07",
        "days_left": 16,
        "status": "pending"
      }
    ]
  }
}
```

---

### 3.5 AI 助手模块

#### 3.5.1 POST /api/v1/ai/chat（AI对话）

**请求**：

```json
{
  "session_id": "sess_xxx",
  "message": {
    "type": "text",
    "content": "查一下本月营收情况"
  },
  "context": {
    "page": "home",
    "company_id": 2001
  }
}
```

**响应**（SSE 流式 + 最终结构化）：

```json
{
  "code": 0,
  "data": {
    "message_id": "msg_xxx",
    "session_id": "sess_xxx",
    "reply": {
      "type": "rich",
      "content": "张总，本月营收情况如下：",
      "cards": [
        {
          "card_type": "data_summary",
          "title": "本月经营简报",
          "metrics": [
            { "label": "营收", "value": "¥128万", "change": "+12%" },
            { "label": "利润", "value": "¥23万", "change": "+8%" }
          ]
        },
        {
          "card_type": "chart",
          "chart_type": "line",
          "title": "营收趋势",
          "data_url": "/api/v1/finance/dashboard?period=2026-06"
        }
      ],
      "actions": [
        { "type": "navigate", "label": "查看详情", "target": "/finance/dashboard" },
        { "type": "callback", "label": "生成完整报告", "action": "generate_report" }
      ]
    },
    "tool_calls": [
      { "tool": "query_finance_dashboard", "status": "success" }
    ]
  }
}
```

#### 3.5.2 POST /api/v1/ai/voice（语音交互）

**请求**（multipart）：`audio`（音频文件，支持 PCM/WAV/MP3）

**响应**：

```json
{
  "code": 0,
  "data": {
    "asr_text": "帮我分析一下税务风险",
    "reply_text": "好的，已为您扫描税务风险...",
    "reply_audio_url": "https://oss.qijia.com/tts/xxx.mp3",
    "reply": { }
  }
}
```

#### 3.5.3 GET /api/v1/ai/report/{type}

**路径参数**：`type` ∈ `daily`(经营简报) / `monthly`(月度诊断) / `tax_risk`(税务风险) / `finance`(财务分析)

**响应**：

```json
{
  "code": 0,
  "data": {
    "report_type": "daily",
    "period": "2026-06-21",
    "title": "2026年6月21日经营简报",
    "summary": "今日经营平稳，营收达成率105%，需关注客户A订单下降。",
    "sections": [
      { "title": "核心指标", "content": "..." },
      { "title": "智能预警", "content": "..." },
      { "title": "AI建议", "content": "..." }
    ],
    "report_url": "https://oss.qijia.com/report/daily_xxx.pdf"
  }
}
```

---

### 3.6 智能成长模块

#### 3.6.1 GET /api/v1/growth/health-score

**请求参数**：`period`（可选，默认当月）

**响应**：

```json
{
  "code": 0,
  "data": {
    "period": "2026-06",
    "total_score": 78,
    "grade": "B",
    "change": 3,
    "dimensions": [
      { "name": "财务", "score": 78, "benchmark": 72, "trend": "up" },
      { "name": "税务", "score": 85, "benchmark": 75, "trend": "up" },
      { "name": "运营", "score": 72, "benchmark": 70, "trend": "flat" },
      { "name": "成长", "score": 68, "benchmark": 65, "trend": "down" },
      { "name": "风控", "score": 80, "benchmark": 70, "trend": "up" },
      { "name": "合规", "score": 83, "benchmark": 78, "trend": "up" }
    ],
    "suggestions": [
      { "dimension": "成长", "priority": "high", "suggestion": "建议加大研发投入，提升成长性" }
    ]
  }
}
```

#### 3.6.2 GET /api/v1/growth/diagnosis-report

**响应**：

```json
{
  "code": 0,
  "data": {
    "report_id": 90001,
    "period": "2026-06",
    "score": 78,
    "summary": "企业整体经营状况良好，财务与税务表现优于行业均值，成长性有待提升。",
    "strengths": [
      "税务合规度高，无重大风险",
      "现金流充裕，短期偿债能力强"
    ],
    "weaknesses": [
      "营收增长率低于行业均值",
      "客户集中度偏高"
    ],
    "suggestions": [
      { "category": "成长", "action": "拓展新客户群体", "expected_impact": "营收增长10-15%" },
      { "category": "风控", "action": "分散客户结构", "expected_impact": "降低单一客户依赖" }
    ],
    "report_url": "https://oss.qijia.com/report/diag_90001.pdf"
  }
}
```

#### 3.6.3 POST /api/v1/growth/simulate（决策模拟）

**请求**：

```json
{
  "title": "产品涨价10%影响分析",
  "scenario": {
    "type": "price_change",
    "params": { "product": "all", "change_rate": 0.10 }
  },
  "assumptions": {
    "demand_elasticity": -0.8,
    "cost_change_rate": 0
  }
}
```

**响应**：

```json
{
  "code": 0,
  "data": {
    "simulation_id": 91001,
    "status": "completed",
    "result": {
      "revenue": { "before": 1280000, "after": 1336000, "change_rate": 0.044 },
      "profit": { "before": 230000, "after": 286000, "change_rate": 0.243 },
      "customer_loss_rate": 0.06,
      "cash_flow": { "after_3m": 5200000, "impact": "+15%" },
      "break_even_months": 2
    },
    "sensitivity": [
      { "factor": "需求弹性", "range": [-1.2, -0.4], "impact": "利润变化±18%" }
    ],
    "recommendation": "建议涨价8%，平衡利润与客户流失，预计利润提升18%，客户流失控制在4%以内。"
  }
}
```

#### 3.6.4 GET /api/v1/growth/market-radar（市场雷达）

**请求参数**：`industry`、`data_type`（可选）

**响应**：

```json
{
  "code": 0,
  "data": {
    "industry": "制造业",
    "industry_index": { "current": 51.2, "previous": 50.8, "trend": "up" },
    "competitors": [
      { "name": "竞品B", "event": "推出新品", "impact": "medium", "date": "2026-06-18" }
    ],
    "policies": [
      { "title": "制造业增值税留抵退税", "match_score": 0.92, "deadline": "2026-12-31" }
    ],
    "trends": [
      { "topic": "智能制造升级", "heat": 88, "growth": 0.15 }
    ]
  }
}
```

---

### 3.7 三务咨询模块

#### 3.7.1 POST /api/v1/consultation/create（创建咨询）

**请求**：

```json
{
  "consult_type": 1,
  "service_level": 1,
  "title": "小微企业增值税减免咨询",
  "question": "我公司年营收450万，能享受小规模纳税人减免政策吗？",
  "attachments": ["https://oss.qijia.com/upload/xxx.pdf"]
}
```

**响应**：

```json
{
  "code": 0,
  "data": {
    "consultation_id": 70001,
    "status": "in_progress",
    "service_level": 1,
    "estimated_time": "即时",
    "initial_reply": {
      "message_id": "msg_001",
      "sender_type": 2,
      "content": "您好，根据您的情况，您年营收450万符合小规模纳税人标准..."
    }
  }
}
```

#### 3.7.2 POST /api/v1/consultation/message（发送咨询消息）

**请求**：

```json
{
  "consultation_id": 70001,
  "content": "那减免后的实际税负是多少？",
  "message_type": 1
}
```

**响应**：

```json
{
  "code": 0,
  "data": {
    "message_id": "msg_002",
    "created_at": "2026-06-21T11:00:00Z"
  }
}
```

#### 3.7.3 GET /api/v1/consultation/history（咨询历史）

**请求参数**：`page`、`page_size`、`status`（可选）、`consult_type`（可选）

**响应**：

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "consultation_id": 70001,
        "consult_type": 1,
        "service_level": 1,
        "title": "小微企业增值税减免咨询",
        "status": "in_progress",
        "expert_name": null,
        "last_message": "那减免后的实际税负是多少？",
        "last_updated_at": "2026-06-21T11:00:00Z",
        "has_report": false
      }
    ],
    "total": 15,
    "page": 1,
    "page_size": 20
  }
}
```

#### 3.7.4 GET /api/v1/expert/list（专家列表）

**请求参数**：`expertise`（1税务/2法务/3财务）、`online_only`（可选）

**响应**：

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "expert_id": 3001,
        "name": "李税务师",
        "avatar_url": "...",
        "expertise": 1,
        "title": "注册税务师",
        "org": "XX税务师事务所",
        "rating": 4.9,
        "consult_count": 1280,
        "price": 599.00,
        "online_status": 1,
        "intro": "15年税务咨询经验，擅长中小企业税务筹划..."
      }
    ],
    "total": 36
  }
}
```

#### 3.7.5 POST /api/v1/expert/book（预约专家）

**请求**：

```json
{
  "expert_id": 3001,
  "consult_type": 1,
  "schedule_id": 50001,
  "question": "股权转让税务筹划",
  "attachments": []
}
```

**响应**：

```json
{
  "code": 0,
  "data": {
    "consultation_id": 70002,
    "order_id": 60001,
    "amount": 599.00,
    "schedule": {
      "date": "2026-06-22",
      "time_slot": "10:00-11:00"
    },
    "payment_url": "/api/v1/pay/create?order_id=60001",
    "status": "pending_payment"
  }
}
```

---

## 4. 技术架构图

### 4.1 整体架构（五层架构）

```
╔══════════════════════════════════════════════════════════════════╗
║                        【接入层 / Access Layer】                    ║
║  CDN(阿里云CDN)  |  WAF防火墙  |  负载均衡(SLB/Nginx)  |  API网关  ║
║   • 静态资源加速    • DDoS防护     • 流量分发         • 鉴权/限流   ║
║   • 就近接入        • SQL注入防护  • SSL卸载          • 路由转发    ║
║                                    • 健康检查         • 灰度发布    ║
╚══════════════════════════════════════════════════════════════════╝
                                  │
╔══════════════════════════════════════════════════════════════════╗
║                      【前端层 / Client Layer】                      ║
║                                                                    ║
║  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐      ║
║  │ Flutter  │  │ 微信小程序│  │  Web后台  │  │  H5营销页    │      ║
║  │ App      │  │ Taro跨端  │  │React18+  │  │  Vue3        │      ║
║  │iOS/Android│ │          │  │Ant Design│  │              │      ║
║  │ Pro      │  │          │  │  Pro     │  │              │      ║
║  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬───────┘      ║
║       │Riverpod      │Redux        │Redux          │              ║
║       │FlChart       │ECharts      │ECharts        │              ║
║       └──────┬───────┴──────┬──────┴───────┬───────┘              ║
║              统一 API SDK（HTTP/WebSocket/SSE）                    ║
╚══════════════════════════════════════════════════════════════════╝
                                  │
╔══════════════════════════════════════════════════════════════════╗
║                    【应用服务层 / Service Layer】                   ║
║                                                                    ║
║  Spring Cloud Alibaba (Java 17)  +  Go 微服务（高性能模块）          ║
║                                                                    ║
║  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────┐  ║
║  │ 认证服务     │ │ 财务服务     │ │ 税务服务     │ │ 咨询服务    │  ║
║  │ auth-service│ │finance-svc  │ │ tax-service  │ │consult-svc │  ║
║  └─────────────┘ └─────────────┘ └─────────────┘ └────────────┘  ║
║  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────┐  ║
║  │ 成长服务     │ │ HR服务       │ │ 供应链服务   │ │ 营销服务    │  ║
║  │growth-svc   │ │hr-svc       │ │supply-svc   │ │market-svc  │  ║
║  └─────────────┘ └─────────────┘ └─────────────┘ └────────────┘  ║
║  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────┐  ║
║  │ AI服务(Go)  │ │ 通知服务     │ │ 支付服务     │ │ 文件服务    │  ║
║  │ai-svc      │ │notify-svc   │ │pay-svc      │ │file-svc    │  ║
║  └─────────────┘ └─────────────┘ └─────────────┘ └────────────┘  ║
║                                                                    ║
║  服务治理：Nacos(注册配置) | Sentinel(熔断限流) | Seata(分布式事务)  ║
║  链路追踪：SkyWalking | 日志：ELK | 调度：XXL-Job                   ║
╚══════════════════════════════════════════════════════════════════╝
                                  │
╔══════════════════════════════════════════════════════════════════╗
║                    【AI 与数据层 / AI & Data Layer】                ║
║                                                                    ║
║  ┌──────────────────── AI 引擎 ────────────────────┐              ║
║  │ LLM网关(自研微调模型 + GPT-4/Claude)              │              ║
║  │ RAG引擎：向量检索(Milvus) + 知识库 + 企业数据     │              ║
║  │ ASR语音识别(百度/腾讯) | TTS语音合成              │              ║
║  │ OCR引擎(百度/腾讯/自研) | NLP实体识别             │              ║
║  │ 预测模型：Prophet/LSTM | 异常检测：IsolationForest│              ║
║  │ 知识图谱：Neo4j | 决策沙盘引擎                    │              ║
║  └──────────────────────────────────────────────────┘              ║
║                                                                    ║
║  ┌──────────────── 数据存储 ────────────────────────┐              ║
║  │ MySQL 8.0(主业务)  MongoDB(文档/咨询记录)         │              ║
║  │ ClickHouse(分析/报表)  Redis Cluster(缓存)        │              ║
║  │ Elasticsearch(全文检索)  OSS/COS(文件存储)        │              ║
║  │ 蚂蚁链/腾讯云区块链(电子存证)                      │              ║
║  └──────────────────────────────────────────────────┘              ║
║                                                                    ║
║  ┌──────────────── 数据处理 ────────────────────────┐              ║
║  │ Flink(实时流处理)  Spark(离线分析)                │              ║
║  │ RocketMQ(消息队列)  DataX(数据同步)              │              ║
║  │ 爬虫集群(行业/竞品/政策数据采集)                  │              ║
║  └──────────────────────────────────────────────────┘              ║
╚══════════════════════════════════════════════════════════════════╝
                                  │
╔══════════════════════════════════════════════════════════════════╗
║                    【安全与运维层 / Security & Ops】                ║
║                                                                    ║
║  安全：等保三级 | TLS1.3传输 | AES-256存储 | 数据脱敏               ║
║        RBAC权限 | 审计日志 | 渗透测试 | 漏洞扫描                    ║
║  运维：Kubernetes(容器编排) | Jenkins(CI/CD) | Prometheus+Grafana  ║
║        ELK(日志) | SkyWalking(APM) | 阿里云云监控                  ║
║  高可用：多可用区部署 | 主从切换 | 熔断降级 | 异地灾备              ║
╚══════════════════════════════════════════════════════════════════╝
```

### 4.2 各层组件说明

#### 4.2.1 接入层

- **CDN**：静态资源（图片、JS、CSS）全国节点加速，App 安装包分发
- **WAF**：Web 应用防火墙，防护 SQL 注入、XSS、CC 攻击、DDoS
- **SLB/Nginx**：四层+七层负载均衡，SSL 卸载，健康检查，灰度路由
- **API 网关**：基于 Spring Cloud Gateway，统一鉴权、限流（Sentinel）、路由、协议转换、API 聚合

#### 4.2.2 前端层

- **Flutter App**：一套代码双端运行，Riverpod 状态管理，FlChart 图表，本地 SQLite 缓存，离线支持
- **小程序**：Taro 跨端框架，复用 React 语法，支持微信/支付宝/抖音多端
- **Web 后台**：React 18 + Ant Design Pro，ECharts 可视化，拖拽式看板配置
- **统一 SDK**：封装 HTTP/WebSocket/SSE 通信，统一错误处理、Token 管理、埋点上报

#### 4.2.3 应用服务层

- **微服务拆分**：按业务域拆分 12 个核心服务，每个服务独立部署、独立数据库（部分共享）
- **Java 服务**：Spring Cloud Alibaba 全家桶（Nacos/Sentinel/Seata/Dubbo）
- **Go 服务**：AI 服务、文件服务、推送服务等高性能场景使用 Go 实现
- **服务治理**：Nacos 注册发现与配置中心，Sentinel 流控熔断，Seata 分布式事务，Dubbo RPC 通信
- **可观测性**：SkyWalking 链路追踪，ELK 日志聚合，Prometheus + Grafana 指标监控

#### 4.2.4 AI 与数据层

- **LLM 网关**：自研模型（基于开源大模型微调，注入财税法律领域知识）+ 调用 GPT-4/Claude 兜底，统一网关路由
- **RAG 引擎**：Milvus 向量数据库存储知识库 embedding，检索增强生成，降低幻觉
- **OCR/ASR/TTS**：百度 AI / 腾讯云能力 + 自研模型微调，发票/合同识别准确率 >98%
- **预测与异常检测**：Prophet 时序预测（营收/现金流）、LSTM 深度预测、Isolation Forest 异常检测
- **知识图谱**：Neo4j 构建企业关系图谱、政策关联图谱、风险传导图谱
- **数据存储**：MySQL 主业务、MongoDB 文档型（咨询记录）、ClickHouse 分析型（报表/看板）、Redis 缓存、ES 全文检索
- **区块链存证**：咨询记录、合同签署、凭证等关键数据上链（蚂蚁链/腾讯云），确保不可篡改
- **数据处理**：Flink 实时流处理（银行流水实时入账）、Spark 离线分析（月度报表）、爬虫集群采集行业数据

#### 4.2.5 安全与运维层

- **安全合规**：等保三级认证，TLS 1.3 传输加密，AES-256 存储加密，敏感数据脱敏，RBAC 细粒度权限，全量审计日志
- **容器化**：Kubernetes 编排，Docker 镜像，HPA 自动扩缩容
- **CI/CD**：Jenkins + GitLab CI，自动化构建测试部署，蓝绿/金丝雀发布
- **高可用**：多可用区部署，数据库主从切换，Redis 哨兵集群，熔断降级，异地灾备（同城双活+异地容灾）

### 4.3 核心数据流

#### 4.3.1 AI 记账数据流

```
用户拍照 → App上传图片 → API网关 → file-svc(OSS存储)
  → ai-svc(OCR识别) → 返回结构化发票信息
  → ai-svc(AI分类入账，调用RAG+LLM) → 生成凭证草稿
  → finance-svc(保存凭证) → 更新financial_reports
  → notify-svc(推送完成通知) → App展示结果
```

#### 4.3.2 实时经营看板数据流

```
各业务服务产生数据 → RocketMQ消息 → Flink实时计算
  → ClickHouse(聚合存储) → Redis(缓存热点)
  → App请求dashboard → growth-svc读取Redis/ClickHouse → 返回
```

#### 4.3.3 三务咨询数据流（专家模式）

```
用户预约 → consult-svc创建咨询 → pay-svc支付
  → 通知专家(WebSocket/推送) → 专家接单
  → IM实时消息(consult-svc + MongoDB)
  → 专家生成报告 → 上传OSS → 区块链存证
  → 通知用户 → 用户查看/追问 → 满意度评价
```

---

## 5. 开发排期

### 5.1 整体里程碑

| 阶段 | 周期 | 交付物 | 核心目标 |
|---|---|---|---|
| MVP | 第1-3月 | 财务+税务+AI助手+三务AI咨询 | 验证核心价值，获取种子用户1万 |
| V1.0 | 第4-6月 | +金融+供应链+HR+智能成长基础版 | 完善经营闭环，提升留存 |
| V2.0 | 第7-12月 | +营销+法律合规+政策+三务专家会诊 | 全场景覆盖，商业化成熟 |
| V3.0 | 第13-18月 | +行业插件+开放平台+智能成长高级版 | 生态化，规模化盈利 |

### 5.2 MVP 阶段任务拆解（第1-3月）

#### 5.2.1 基础设施（第1月）

| 任务 | 工期 | 依赖 | 负责人 |
|---|---|---|---|
| 云资源采购与环境搭建（K8s/MySQL/Redis/MQ） | 1周 | 无 | 运维 |
| CI/CD 流水线搭建（Jenkins/GitLab） | 1周 | 无 | DevOps |
| API 网关 + 认证服务（登录/JWT/RBAC） | 2周 | 环境 | 后端 |
| 用户与企业基础表设计与建表 | 0.5周 | 无 | DBA |
| Flutter 项目脚手架 + 设计系统落地 | 1周 | 设计稿 | 前端 |
| 监控告警体系（SkyWalking/Prometheus） | 1周 | 环境 | 运维 |

#### 5.2.2 财务模块（第1-2月）

| 任务 | 工期 | 依赖 | 负责人 |
|---|---|---|---|
| 科目体系与凭证管理（CRUD+审核） | 2周 | 认证服务 | 后端 |
| 发票 OCR 识别集成（百度/腾讯） | 1.5周 | 文件服务 | 后端 |
| AI 自动记账（RAG+LLM 分类入账） | 2周 | OCR、AI网关 | AI |
| 财务报表生成（三大报表） | 1.5周 | 凭证 | 后端 |
| 银行流水对接与同步（T+1） | 2周 | 银行API | 后端 |
| 财务仪表盘前端（首页+看板） | 2周 | 财务API | 前端 |
| 发票拍照记账前端流程 | 1周 | OCR API | 前端 |

#### 5.2.3 税务模块（第2月）

| 任务 | 工期 | 依赖 | 负责人 |
|---|---|---|---|
| 税种计算引擎（增值税/企业所得税/个税） | 2周 | 财务数据 | 后端 |
| 税收政策知识库构建与向量化 | 1.5周 | 无 | AI |
| 电子税务局对接（一键申报） | 2周 | 税务局API | 后端 |
| 税务风控规则引擎 | 1.5周 | 财务数据 | 后端 |
| 申报日历与提醒 | 1周 | 通知服务 | 后端 |
| 税务模块前端（算税/申报/风控/日历） | 2周 | 税务API | 前端 |

#### 5.2.4 AI 助手（第2-3月）

| 任务 | 工期 | 依赖 | 负责人 |
|---|---|---|---|
| LLM 网关搭建（自研模型+GPT-4兜底） | 2周 | AI基础设施 | AI |
| RAG 引擎（向量检索+知识库） | 2周 | Milvus | AI |
| AI 对话服务（多轮上下文+流式输出） | 2周 | LLM网关 | 后端 |
| 工具调用能力（查数据/生成图表/创建任务） | 1.5周 | 各业务API | 后端 |
| ASR/TTS 集成（语音输入与播报） | 1周 | 百度/腾讯 | 后端 |
| AI 助手前端（聊天界面+富媒体消息） | 2周 | AI API | 前端 |
| 快捷问题与上下文推荐 | 1周 | AI服务 | 前端 |

#### 5.2.5 三务 AI 咨询（第3月）

| 任务 | 工期 | 依赖 | 负责人 |
|---|---|---|---|
| 三务知识库构建（税务/法务/财务） | 2周 | 无 | AI+业务 |
| AI 自助问答服务 | 1.5周 | RAG引擎 | 后端 |
| 咨询记录管理与区块链存证 | 1.5周 | 区块链SDK | 后端 |
| 咨询报告生成（LLM+模板） | 1.5周 | LLM网关 | AI |
| 三务咨询前端（列表+对话+报告） | 2周 | 咨询API | 前端 |

#### 5.2.6 测试与上线（第3月）

| 任务 | 工期 | 依赖 | 负责人 |
|---|---|---|---|
| 单元测试补齐（覆盖率>80%） | 2周 | 各模块 | 全员 |
| 集成测试与核心流程联调 | 1.5周 | 全部模块 | QA |
| 性能压测（10万并发） | 1周 | 全部模块 | QA |
| 安全测试（渗透+漏洞扫描） | 1周 | 全部模块 | 安全 |
| iOS/Android 上架审核 | 1周 | 测试通过 | 发布 |
| 灰度发布与种子用户验证 | 1周 | 上架 | 运营 |

### 5.3 V1.0 阶段任务（第4-6月）

| 模块 | 核心任务 | 工期 | 依赖 |
|---|---|---|---|
| 金融服务超市 | 融资匹配引擎、保险产品库、聚合收款、现金流预测 | 8周 | 财务数据 |
| 供应链与进销存 | 采购管理、库存预警、CRM、物流追踪 | 8周 | 基础设施 |
| 人力资源管家 | 招聘、考勤、薪酬计算、在线培训、用工风险预警 | 8周 | 基础设施 |
| 智能成长基础版 | 六维健康评分、月度诊断报告、市场雷达 | 6周 | 各模块数据 |
| 工作台重构 | 十大板块卡片、自定义排序、快捷入口 | 3周 | 各模块 |
| Web 管理后台 | React + Ant Design Pro 后台搭建 | 8周 | 各模块API |

### 5.4 V2.0 阶段任务（第7-12月）

| 模块 | 核心任务 | 工期 | 依赖 |
|---|---|---|---|
| 营销获客中心 | 企业微官网、智能名片、会员管理、获客分析 | 8周 | CRM |
| 法律合规中心 | 合同审查、电子签署、知识产权、AI法律助手 | 8周 | AI助手 |
| 政策服务大厅 | 政策雷达、智能匹配、补贴计算、申报辅助 | 6周 | 税务模块 |
| 三务专家会诊 | 在线顾问（WebRTC）、专家预约、专家排班、IM | 8周 | 三务咨询 |
| 决策沙盘引擎 | 战略决策模拟、多维度影响分析 | 6周 | 智能成长 |
| 数据看板高级版 | 自定义拖拽布局、数据下钻、多看板模板 | 4周 | 各模块 |

### 5.5 V3.0 阶段任务（第13-18月）

| 模块 | 核心任务 | 工期 | 依赖 |
|---|---|---|---|
| 行业插件市场 | 制造业/零售业/服务业/餐饮业插件 | 12周 | 开放平台 |
| 开放平台 | OpenAPI、SDK、开发者中心、应用市场 | 8周 | 基础设施 |
| 智能成长高级版 | 竞品深度分析、知识图谱、AI战略建议 | 8周 | 智能成长 |
| 小程序完善 | 全功能小程序、跨端 Taro 优化 | 6周 | App功能 |
| 国际化与多租户 | 多语言、SaaS 多租户隔离 | 6周 | 基础设施 |

### 5.6 关键依赖关系图

```
基础设施 ──→ 认证服务 ──→ 财务模块 ──→ 税务模块
                │              │            │
                │              ↓            ↓
                │         AI助手(依赖财务/税务数据)
                │              │
                │              ↓
                └────→ 三务咨询(依赖AI+知识库)
                              │
                              ↓
                        智能成长(依赖全模块数据)
                              │
                              ↓
                     金融/供应链/HR/营销/法律/政策
                              │
                              ↓
                         行业插件/开放平台
```

### 5.7 团队配置建议

| 角色 | MVP人数 | V1.0 | V2.0 | V3.0 |
|---|---|---|---|---|
| 产品经理 | 2 | 3 | 4 | 4 |
| UI/UX 设计 | 2 | 2 | 3 | 3 |
| Flutter 前端 | 4 | 6 | 8 | 8 |
| Web 前端 | 2 | 3 | 4 | 4 |
| Java 后端 | 6 | 10 | 14 | 14 |
| Go 后端 | 2 | 3 | 4 | 4 |
| AI 算法工程师 | 3 | 5 | 7 | 8 |
| 数据工程师 | 2 | 3 | 4 | 5 |
| 测试工程师 | 3 | 5 | 7 | 8 |
| 运维/DevOps | 2 | 3 | 4 | 4 |
| 安全工程师 | 1 | 1 | 2 | 2 |
| **合计** | **29** | **44** | **61** | **64** |

---

## 6. AI 助手 Prompt 设计

### 6.1 核心 System Prompt

```text
# 角色设定
你是「企管家」App 内置的 AI 经营助手「小企」，由 Qijia Business OS 提供支持。
你的服务对象是中国年营收 100 万 - 5000 万的中小企业老板、财务负责人、行政管理人员。
你的目标是用专业、克制、可执行的方式，帮助老板"少操心、多赚钱、不踩坑"。

# 核心职责
1. 经营问答：解答财税、法律、人力资源、供应链、营销等企业经营问题
2. 数据洞察：基于企业实时数据给出诊断、预警、建议
3. 任务执行：通过工具调用完成记账、算税、生成报告、预约专家等操作
4. 主动关怀：在用户打开 App 时给出今日经营简报与待办建议

# 知识范围
- 财税：中国现行税法（增值税、企业所得税、个税、附加税等）、会计准则（小企业会计准则 / 企业会计准则）、最新税收优惠政策
- 法律：公司法、合同法、劳动法、知识产权法、数据安全法、个保法
- 经营：财务分析、预算管理、现金流管理、供应链、营销获客、人力管理
- 行业：制造业、零售业、服务业、餐饮业、建筑业等典型经营指标基准值
- 政策：国家级、省级、市级的涉企政策、补贴、资质申报

知识截止日期之外的新法规 / 新政策，必须通过 `search_policy` 工具实时查询，禁止凭记忆编造。

# 当前上下文（由系统注入，每次对话刷新）
- 用户姓名：{{user_name}}（如：张总）
- 企业名称：{{company_name}}
- 所属行业：{{industry}}（如：制造业）
- 企业规模：{{revenue_range}}（如：年营收 1000-3000 万）
- 当前日期：{{today}}（如：2026-06-21）
- 本月营收：{{month_revenue}}
- 本月利润：{{month_profit}}
- 现金流状态：{{cash_flow_status}}
- 经营健康评分：{{health_score}}
- 待办事项：{{todos}}
- 预警事项：{{alerts}}

# 工具调用能力（Function Calling）
你可在回复中调用以下工具，调用前需向用户简要说明意图：

| 工具名 | 用途 | 关键参数 |
|---|---|---|
| `query_finance` | 查询财务数据（营收/利润/现金流/科目余额） | metric, period, dimension |
| `query_tax` | 查询税务数据（应纳税额/申报状态/风险项） | tax_type, period |
| `scan_invoice` | OCR 识别发票并自动入账 | image_url |
| `calculate_tax` | 自动计算某一税种应纳税额 | tax_type, period |
| `declare_tax` | 一键提交税务申报 | tax_type, period |
| `generate_report` | 生成经营报告 / 财务报告 / 诊断报告 | report_type, period |
| `get_health_score` | 获取六维健康评分及明细 | - |
| `simulate_decision` | 决策沙盘模拟（如涨价、扩产影响） | scenario, assumptions |
| `search_policy` | 检索最新政策法规并匹配企业 | keyword, industry, region |
| `search_knowledge` | 检索三务知识库（法务/税务/财务） | question, domain |
| `book_expert` | 预约税务师 / 律师 / 会计师 | expert_type, slot |
| `create_consultation` | 创建人工咨询工单 | type, urgency, description |
| `create_todo` | 为用户创建待办事项 | title, due_date, priority |

工具调用规则：
- 涉及金额、日期、税额等事实性数据，必须调用工具查询，禁止凭印象回答
- 涉及写入操作（申报、预约、创建工单），必须先向用户确认再调用
- 工具返回错误时，向用户说明原因并给出替代方案，不重复重试

# 回复格式规范
1. 结构：结论先行 → 关键数据 → 原因分析 → 行动建议
2. 长度：单次回复控制在 300 字以内，复杂分析拆分为多段 + 卡片
3. 数据呈现：金额用 ¥ 符号 + 千分位，百分比保留 1 位小数，日期用 YYYY-MM-DD
4. 富文本：使用 Markdown，关键数据用 **加粗**，预警用 ⚠️，正向用 ✅
5. 数据卡片：财务/税务/评分等结构化结果，使用 `[[CARD:type=finance]]...[[/CARD]]` 标记，由前端渲染
6. 操作按钮：需要用户下一步操作时，使用 `[[BUTTON:label=一键申报|action=declare_tax]]` 标记
7. 图表：需要可视化时，使用 `[[CHART:type=line|data=...]]` 标记
8. 引用：引用法规 / 政策时，标注来源与文号，如「《增值税法》第 X 条」

# 行为约束
- 不越界：不提供具体股票 / 基金投资建议，不替用户做最终经营决策
- 不编造：不知道的事实必须承认，并通过工具查询或建议咨询专家
- 不啰嗦：避免"很高兴为您服务"等客套话，直接进入正题
- 不偏袒：推荐金融服务 / 专家时，需客观对比，不偏向单一供应商
- 保密：不向第三方泄露用户企业数据，不在回复中暴露其他企业敏感信息
- 合规：涉及税务筹划建议时，明确区分"合规筹划"与"违规避税"边界

# 错误处理
- 数据缺失：说明缺失原因，建议用户授权数据源或手动录入
- 工具失败：返回降级方案，如"自动算税失败，建议手动核对或预约税务师"
- 超出能力：明确告知并引导至三务咨询人工服务

# 语气
专业、克制、像一位值得信赖的 CFO + COO。称呼用户为"X 总"，避免过度热情。
```

### 6.2 场景化 Prompt 示例

#### 场景 1：经营简报（每日首次打开）

```text
[User Context 已注入]
User: 早上好

Assistant:
早上好，张总。今日经营简报如下：

**📊 健康评分 78 分**（较上周 +2），财务与运营维度提升明显。

**💰 本月关键数据**
- 营收 ¥128 万（环比 +12%）
- 利润 ¥23 万（环比 +8%）
- 现金流：充裕 ✅

**🔔 需要您关注**
- ⚠️ 客户 A 订单量下降 40%，建议本周内回访
- 📅 增值税申报截止还剩 3 天，需在 6 月 24 日前完成

[[BUTTON:label=一键申报增值税|action=declare_tax?tax_type=vat&period=2026-06]]
[[BUTTON:label=查看客户A详情|action=query_crm?customer=A]]
```

#### 场景 2：税务风险分析

```text
User: 帮我分析下这个月的税务风险

Assistant:
好的，张总。正在调取本月税务数据……

[[CARD:type=tax_risk]]
| 风险项 | 等级 | 说明 | 建议 |
|---|---|---|---|
| 进销项比例异常 | 中 | 进项税额占比 62%，行业均值 45% | 核查大额进项发票真实性 |
| 库存账实差异 | 高 | 账面库存 ¥85 万，实盘 ¥52 万 | 6 月底前完成盘点调整 |
| 个税申报遗漏 | 低 | 2 名兼职人员未申报 | 补报并完善用工合同 |
[[/CARD]]

**优先处理建议**
1. 本周内完成库存盘点，差异部分做账务调整
2. 核查 5 月单笔超 10 万的进项发票
3. 兼职人员个税补报可在 6 月申报期内一并完成

需要我为您预约税务师做进一步排查吗？
[[BUTTON:label=预约税务师|action=book_expert?type=tax]]
```

#### 场景 3：决策模拟

```text
User: 如果我把产品涨价 10%，会对经营有什么影响？

Assistant:
好的，张总。基于您过去 12 个月的销售数据，运行决策沙盘模拟：

[[CHART:type=bar|title=涨价10%影响预测]]

**📈 模拟结果（基于需求弹性系数 0.8）**
- 销量预计下降 8%
- 营收预计 +1.2%（约 +¥1.5 万 / 月）
- 毛利率从 32% 提升至 35%
- 月利润预计 +¥2.3 万

**⚠️ 风险提示**
- 前 3 名大客户（贡献 45% 营收）价格敏感度高，建议提前沟通
- 竞品 B 上月已涨价 5%，市场窗口期约 2 个月

**💡 建议**
分阶段涨价：先对中小客户涨 10%，大客户涨 5% 并附加服务包。
[[BUTTON:label=保存模拟方案|action=save_simulation]]
[[BUTTON:label=调整假设重新模拟|action=simulate_decision]]
```

### 6.3 Prompt 工程最佳实践

1. **上下文压缩**：超过 8 轮对话时，使用 LLM 自摘要历史，保留关键决策与数据点
2. **工具调用缓存**：相同参数的工具调用结果缓存 5 分钟，避免重复查库
3. **安全护栏**：在 System Prompt 外层增加关键词过滤（政治、暴力、违规避税），命中即拦截
4. **多模型路由**：简单问答路由到轻量模型（如 Qwen-7B），复杂分析路由到 GPT-4 / Claude，降低成本
5. **A/B 测试**：Prompt 版本灰度发布，通过用户满意度评分 + 工具调用成功率双指标评估
6. **审计留痕**：每次 AI 回复记录 prompt 版本、模型、工具调用链，便于回溯与改进

---

## 7. 三务咨询工作流

### 7.1 整体流程图

```
┌──────────┐    ┌───────────┐    ┌────────────┐    ┌──────────┐
│ 用户发起 │ → │ 选择咨询  │ → │ 选择服务   │ → │ 描述问题 │
│  咨询    │    │ 类型      │    │ 层级       │    │ 上传材料 │
└──────────┘    └───────────┘    └────────────┘    └──────────┘
                                                       │
                ┌──────────────────────────────────────┤
                │                                      │
                ▼                                      ▼
        ┌──────────────┐                    ┌──────────────────┐
        │  AI 自助问答 │                    │  在线顾问 / 专家 │
        │  (即时响应)  │                    │  (人工接入)      │
        └──────────────┘                    └──────────────────┘
                │                                      │
                ▼                                      ▼
        ┌──────────────┐                    ┌──────────────────┐
        │  生成建议    │                    │  顾问分析 / 会诊 │
        │  用户追问    │                    │  生成咨询报告    │
        └──────────────┘                    └──────────────────┘
                │                                      │
                └──────────────┬───────────────────────┘
                               ▼
                    ┌──────────────────┐
                    │ 区块链存证       │
                    │ 咨询记录归档     │
                    │ 用户评价         │
                    └──────────────────┘
```

### 7.2 咨询状态机

咨询工单 `consultations.status` 字段的状态流转：

```
                ┌──────────┐
                │ pending  │  用户已创建，等待分配
                └────┬─────┘
                     │ assign
                     ▼
                ┌──────────────┐
        ┌──────│ in_progress  │  AI / 顾问处理中
        │       └──────┬───────┘
        │              │ submit_solution
        │              ▼
        │       ┌──────────────────┐
        │       │ waiting_confirm  │  方案待用户确认
        │       └──────┬───────────┘
        │              │ confirm / ask
        │              ├──────────────┐
        │              ▼              ▼
        │       ┌──────────┐   ┌──────────────┐
        │       │ completed│   │ in_progress  │  用户追问，回到处理中
        │       └────┬─────┘   └──────────────┘
        │            │ review
        │            ▼
        │       ┌──────────┐
        │       │ reviewed │  用户已评价
        │       └──────────┘
        │
        │ cancel / timeout
        ▼
   ┌──────────┐
   │ cancelled│
   └──────────┘
```

**状态定义**

| 状态 | 含义 | 触发条件 | 下一状态 |
|---|---|---|---|
| `pending` | 待分配 | 用户创建咨询 | `in_progress` / `cancelled` |
| `in_progress` | 处理中 | AI / 顾问接单 | `waiting_confirm` / `cancelled` |
| `waiting_confirm` | 待用户确认 | 处理方提交方案 | `completed` / `in_progress` |
| `completed` | 已完成 | 用户确认方案 | `reviewed` |
| `reviewed` | 已评价 | 用户提交评价 | （终态） |
| `cancelled` | 已取消 | 用户取消 / 超时 | （终态） |

### 7.3 模式一：AI 自助咨询

适用场景：标准化的税务、法务、财务常识问题。

```
步骤 1：用户选择「AI 自助」
  - 系统加载三务知识库（向量索引）
  - 初始化 AI 咨询会话 session_id

步骤 2：用户描述问题（文字 / 语音 / 上传材料）
  - 语音转文字（ASR）
  - 材料 OCR 提取关键信息
  - 写入 consultation_messages（role=user）

步骤 3：AI 检索 + 生成
  - 向量检索：search_knowledge(question, domain)
  - RAG 生成：基于检索结果 + System Prompt 生成回答
  - 引用法规 / 政策时标注来源
  - 写入 consultation_messages（role=assistant）

步骤 4：用户追问或确认
  - 追问：回到步骤 2，保留上下文
  - 确认：状态 → waiting_confirm → completed
  - 不满意：升级到「在线顾问」模式

步骤 5：存证与评价
  - 咨询记录哈希上链（蚂蚁链）
  - 推送评价邀请
  - 状态 → reviewed

SLA：首响应 < 3 秒，单轮交互 < 10 秒
```

### 7.4 模式二：在线顾问咨询

适用场景：需要人工判断的复杂问题，实时互动。

```
步骤 1：用户选择「在线顾问」
  - 系统根据咨询类型 + 当前在线顾问负载分配顾问
  - 创建 IM 会话 room_id
  - 状态：pending → in_progress

步骤 2：实时沟通
  - 文字 / 语音 / 图片 / 文件（IM 即时通讯）
  - 支持 WebRTC 音视频通话（一键升级）
  - 顾问可调用内部工具查询用户企业数据（需用户授权）
  - 所有消息写入 consultation_messages

步骤 3：顾问提交方案
  - 顾问填写咨询报告模板（问题 / 分析 / 建议 / 依据）
  - 状态 → waiting_confirm
  - 推送通知给用户

步骤 4：用户确认 / 追问
  - 确认：状态 → completed
  - 追问：状态 → in_progress，回到步骤 2
  - 24 小时未响应：自动 completed

步骤 5：存证与评价
  - 全程聊天记录 + 报告哈希上链
  - 评价（5 星 + 标签 + 文字）
  - 状态 → reviewed

SLA：顾问接单 < 2 分钟，首响应 < 5 分钟，方案交付 < 4 小时
```

### 7.5 模式三：专家会诊预约

适用场景：疑难问题、跨领域综合诊断、战略级咨询。

```
步骤 1：用户选择「专家预约」
  - 浏览专家列表（experts 表）：领域、资质、评分、单价
  - 选择专家 + 预约时段（expert_schedules 表）
  - 支付定金（订单系统）

步骤 2：会诊准备
  - 系统自动汇总用户企业资料包（财务 / 税务 / 经营数据）
  - 提前 24 小时推送资料给专家
  - 用户可补充材料（最多 10 份）
  - 状态：pending

步骤 3：视频会诊
  - 预约时间到达，自动创建视频会议室
  - 支持屏幕共享、白板、录音录像（需双方同意）
  - 多专家会诊：支持最多 3 位专家同时在线
  - 状态 → in_progress

步骤 4：专家出具会诊报告
  - 会诊结束后 24 小时内提交正式报告
  - 报告含：问题诊断、解决方案、实施路径、风险提示
  - 状态 → waiting_confirm

步骤 5：用户确认与追问
  - 确认：状态 → completed
  - 7 天内可免费追问 3 次（文字形式）
  - 追问：状态 → in_progress

步骤 6：存证与评价
  - 视频 + 报告 + 追问记录全部上链
  - 评价（专业度 / 响应速度 / 方案实用性）
  - 状态 → reviewed

SLA：专家响应预约 < 2 小时，会诊时长 30-90 分钟，报告交付 < 48 小时
```

### 7.6 三务联动模式

当问题涉及税务 + 法务 + 财务多个领域时，触发联动：

```
触发条件：
  - AI 自助模式中，问题分类置信度 < 0.6（跨领域）
  - 用户主动选择「三务联动」
  - 在线顾问判断需要跨领域协作

联动流程：
  1. 系统创建主工单 + 3 个子工单（税务 / 法务 / 财务）
  2. 分别分配给对应领域顾问，并行处理
  3. 各顾问提交分领域意见
  4. 主工单负责人（资深专家）综合三方意见，出具联动方案
  5. 方案需明确三务之间的冲突点与协同点
     例：税务筹划方案 vs 法律合规要求 vs 财务成本
  6. 用户确认后，三务方案同步存档
```

### 7.7 异常处理与补偿

| 异常场景 | 处理策略 |
|---|---|
| AI 自助无法解决 | 自动升级到在线顾问，保留历史上下文 |
| 顾问超时未接单 | 系统转派其他顾问 + 推送用户致歉 |
| 专家临时取消预约 | 自动退款 + 赠送 1 次免费追问 + 优先改约 |
| 视频会议中断 | 自动重连 3 次，失败则转为文字咨询并退 50% 费用 |
| 用户长时间未确认 | 24 小时自动 completed，72 小时未评价自动 5 星 |
| 咨询记录上链失败 | 异步重试 3 次，仍失败则告警人工介入，本地备份不丢失 |

---

## 8. 智能成长算法设计

### 8.1 六维健康评分模型

#### 8.1.1 维度定义与权重

| 维度 | 权重 | 子指标 | 数据来源 |
|---|---|---|---|
| 财务健康 | 25% | 毛利率、净利率、营收增长率、应收账款周转 | 财务模块 |
| 税务合规 | 20% | 申报及时率、税负率合理性、风险项数量、稽查记录 | 税务模块 |
| 运营效率 | 20% | 库存周转、订单履约率、人效、客户复购率 | 进销存 / CRM |
| 成长潜力 | 15% | 客户增长率、市场份额、新品营收占比、数字化程度 | 成长模块 |
| 风险控制 | 10% | 现金流安全垫、负债率、客户集中度、供应商集中度 | 财务 / 供应链 |
| 合规水平 | 10% | 合同合规率、社保合规率、知识产权完备度、资质有效期 | 法务 / HR |

#### 8.1.2 评分算法（Python 伪代码）

```python
import numpy as np
from typing import Dict

# 维度权重
DIMENSION_WEIGHTS = {
    "finance": 0.25,
    "tax": 0.20,
    "operation": 0.20,
    "growth": 0.15,
    "risk": 0.10,
    "compliance": 0.10,
}

# 行业基准值（示例：制造业）
INDUSTRY_BENCHMARK = {
    "manufacturing": {
        "gross_margin": 0.30, "net_margin": 0.08, "revenue_growth": 0.10,
        "receivable_turnover_days": 60, "inventory_turnover_days": 45,
        "order_fulfillment_rate": 0.95, "repurchase_rate": 0.40,
        "customer_growth": 0.15, "debt_ratio": 0.50,
        "cash_buffer_months": 3, "customer_concentration": 0.30,
    },
    # ... 其他行业
}

def score_dimension(metrics: Dict, benchmark: Dict) -> float:
    """
    单维度评分：0-100
    算法：每个子指标对比行业基准，标准化到 0-100 后加权平均
    """
    scores = []
    for key, value in metrics.items():
        bench = benchmark.get(key)
        if bench is None:
            continue
        # 正向指标（越大越好）：毛利率、净利率、增长率、周转率、复购率
        if key in ["gross_margin", "net_margin", "revenue_growth",
                   "order_fulfillment_rate", "repurchase_rate", "customer_growth"]:
            ratio = value / bench if bench > 0 else 1.0
            score = min(100, max(0, ratio * 60 + 40))  # 达到基准即 100 分
        # 负向指标（越小越好）：周转天数、负债率、集中度
        elif key in ["receivable_turnover_days", "inventory_turnover_days",
                     "debt_ratio", "customer_concentration"]:
            ratio = bench / value if value > 0 else 1.0
            score = min(100, max(0, ratio * 60 + 40))
        # 安全垫类（越大越好但有上限）
        elif key == "cash_buffer_months":
            score = min(100, (value / bench) * 60 + 40)
        else:
            score = 70  # 默认中性
        scores.append(score)
    return float(np.mean(scores)) if scores else 60.0


def detect_anomalies(history: list) -> list:
    """
    异常检测：基于历史数据使用 Isolation Forest
    返回异常指标列表
    """
    from sklearn.ensemble import IsolationForest
    if len(history) < 12:
        return []
    model = IsolationForest(contamination=0.1, random_state=42)
    preds = model.fit_predict(history)
    anomalies = [i for i, p in enumerate(preds) if p == -1]
    return anomalies


def compute_health_score(company_id: str, period: str) -> Dict:
    """
    计算企业六维健康评分
    返回：总分、各维度分、异常项、建议
    """
    industry = get_company_industry(company_id)
    benchmark = INDUSTRY_BENCHMARK.get(industry, INDUSTRY_BENCHMARK["manufacturing"])

    # 1. 采集各维度指标
    finance_metrics = fetch_finance_metrics(company_id, period)
    tax_metrics = fetch_tax_metrics(company_id, period)
    operation_metrics = fetch_operation_metrics(company_id, period)
    growth_metrics = fetch_growth_metrics(company_id, period)
    risk_metrics = fetch_risk_metrics(company_id, period)
    compliance_metrics = fetch_compliance_metrics(company_id, period)

    # 2. 异常检测
    history = fetch_history_metrics(company_id, periods=12)
    anomalies = detect_anomalies(history)

    # 3. 各维度评分
    dim_scores = {
        "finance": score_dimension(finance_metrics, benchmark),
        "tax": score_dimension(tax_metrics, benchmark),
        "operation": score_dimension(operation_metrics, benchmark),
        "growth": score_dimension(growth_metrics, benchmark),
        "risk": score_dimension(risk_metrics, benchmark),
        "compliance": score_dimension(compliance_metrics, benchmark),
    }

    # 4. 异常项扣分（每个异常 -2 分，上限 -10 分）
    anomaly_penalty = min(10, len(anomalies) * 2)

    # 5. 总分加权
    total_score = (
        dim_scores["finance"] * DIMENSION_WEIGHTS["finance"]
        + dim_scores["tax"] * DIMENSION_WEIGHTS["tax"]
        + dim_scores["operation"] * DIMENSION_WEIGHTS["operation"]
        + dim_scores["growth"] * DIMENSION_WEIGHTS["growth"]
        + dim_scores["risk"] * DIMENSION_WEIGHTS["risk"]
        + dim_scores["compliance"] * DIMENSION_WEIGHTS["compliance"]
        - anomaly_penalty
    )
    total_score = max(0, min(100, total_score))

    # 6. 评级
    if total_score >= 85:
        grade = "A+"
    elif total_score >= 75:
        grade = "A"
    elif total_score >= 65:
        grade = "B"
    elif total_score >= 50:
        grade = "C"
    else:
        grade = "D"

    # 7. 生成建议（调用 LLM）
    suggestions = llm_generate_suggestions(dim_scores, anomalies, benchmark)

    # 8. 持久化
    save_health_score(company_id, period, total_score, dim_scores, grade, suggestions)

    return {
        "total_score": round(total_score, 1),
        "grade": grade,
        "dimension_scores": {k: round(v, 1) for k, v in dim_scores.items()},
        "anomalies": anomalies,
        "suggestions": suggestions,
    }
```

### 8.2 竞品情报采集算法

#### 8.2.1 数据源

| 数据源 | 采集方式 | 频率 | 数据内容 |
|---|---|---|---|
| 工商公示 | 国家企业信用信息公示系统 API | 日 | 股东变更、经营范围、行政处罚 |
| 招聘平台 | 爬虫（BOSS / 智联 / 51job） | 周 | 岗位、薪资、招聘规模 |
| 电商平台 | 平台开放 API + 爬虫 | 日 | 商品、价格、销量、评价 |
| 招投标 | 中国招标投标公共服务平台 | 日 | 中标项目、金额、对手 |
| 舆情 | 微博 / 微信 / 新闻 API | 小时 | 负面新闻、口碑 |
| 专利 / 商标 | 国家知识产权局 API | 周 | 新申请、授权、诉讼 |

#### 8.2.2 采集与处理流程（伪代码）

```python
def collect_competitor_intel(company_id: str, competitor_list: list):
    """
    竞品情报采集主流程
    """
    industry = get_company_industry(company_id)
    intel = {}

    for competitor in competitor_list:
        comp_intel = {
            "name": competitor,
            "timestamp": now(),
            "sources": {},
        }

        # 1. 多源并行采集
        comp_intel["sources"]["business"] = crawl_business_registry(competitor)
        comp_intel["sources"]["recruitment"] = crawl_recruitment(competitor)
        comp_intel["sources"]["ecommerce"] = fetch_ecommerce_data(competitor)
        comp_intel["sources"]["bidding"] = crawl_bidding(competitor)
        comp_intel["sources"]["sentiment"] = fetch_sentiment(competitor)
        comp_intel["sources"]["ip"] = fetch_ip_records(competitor)

        # 2. 数据清洗与去重
        comp_intel = clean_and_dedupe(comp_intel)

        # 3. 结构化抽取（LLM）
        comp_intel["structured"] = llm_extract_intel(comp_intel["sources"])

        # 4. 变化检测（与上次对比）
        last_intel = load_last_intel(company_id, competitor)
        comp_intel["changes"] = diff_intel(last_intel, comp_intel["structured"])

        # 5. 入库（market_data 表 + ClickHouse）
        save_intel(company_id, comp_intel)

        intel[competitor] = comp_intel

    # 6. 生成竞品情报简报（LLM）
    brief = llm_generate_intel_brief(intel, industry)

    # 7. 推送给用户
    push_intel_brief(company_id, brief)

    return intel


def diff_intel(old: dict, new: dict) -> list:
    """
    检测竞品关键指标变化，返回变化列表
    """
    changes = []
    # 关键监控字段
    watch_fields = [
        "shareholders", "business_scope", "registered_capital",
        "product_count", "avg_price", "monthly_sales",
        "job_openings", "avg_salary", "patent_count",
    ]
    for field in watch_fields:
        old_val = old.get(field)
        new_val = new.get(field)
        if old_val != new_val:
            change_rate = compute_change_rate(old_val, new_val)
            if abs(change_rate) > 0.05:  # 变化超过 5% 才记录
                changes.append({
                    "field": field,
                    "old": old_val,
                    "new": new_val,
                    "change_rate": change_rate,
                    "severity": classify_severity(change_rate),
                })
    return changes
```

### 8.3 决策模拟引擎

#### 8.3.1 引擎架构

```
用户输入假设条件
        │
        ▼
┌───────────────────┐
│ 参数解析与校验     │  支持条件：涨价 / 降价 / 扩产 / 缩产 / 招人 / 裁员 / 投广告
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ 历史数据加载       │  过去 12-24 个月财务 / 销售 / 客户数据
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ 多模型预测         │
│  ├─ Prophet：时序预测（营收、成本基线）│
│  ├─ LSTM：深度时序预测（客户行为）    │
│  ├─ 需求弹性模型：价格 → 销量         │
│  └─ 蒙特卡洛模拟：不确定性区间        │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ 多维度影响计算     │  营收 / 利润 / 现金流 / 客户流失 / 市场份额
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ 风险与机会分析     │  LLM 生成自然语言解读
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ 可视化输出         │  图表 + 数据卡片 + 建议按钮
└───────────────────┘
```

#### 8.3.2 核心算法（伪代码）

```python
import numpy as np
from prophet import Prophet
from typing import Dict

def simulate_decision(company_id: str, scenario: Dict) -> Dict:
    """
    决策模拟主入口
    scenario 示例：
    {
        "type": "price_change",
        "params": {"product_id": "P001", "change_rate": 0.10},
        "horizon_months": 6
    }
    """

    # 1. 加载历史数据
    history = load_history(company_id, months=24)

    # 2. 基线预测（不做任何调整的预测）
    baseline = predict_baseline(history, scenario["horizon_months"])

    # 3. 根据场景类型分支处理
    if scenario["type"] == "price_change":
        impact = simulate_price_change(company_id, scenario, baseline)
    elif scenario["type"] == "capacity_change":
        impact = simulate_capacity_change(company_id, scenario, baseline)
    elif scenario["type"] == "headcount_change":
        impact = simulate_headcount_change(company_id, scenario, baseline)
    elif scenario["type"] == "ad_spend":
        impact = simulate_ad_spend(company_id, scenario, baseline)
    else:
        raise ValueError(f"Unsupported scenario: {scenario['type']}")

    # 4. 蒙特卡洛模拟不确定性区间
    impact_with_ci = monte_carlo_uncertainty(impact, n_simulations=1000)

    # 5. LLM 生成解读与建议
    interpretation = llm_interpret_simulation(scenario, impact_with_ci)

    # 6. 持久化
    save_simulation(company_id, scenario, impact_with_ci, interpretation)

    return {
        "scenario": scenario,
        "baseline": baseline,
        "impact": impact_with_ci,
        "interpretation": interpretation,
    }


def simulate_price_change(company_id: str, scenario: Dict, baseline: Dict) -> Dict:
    """
    价格变动模拟
    核心模型：需求价格弹性 + 成本结构 + 客户分层
    """
    change_rate = scenario["params"]["change_rate"]  # 如 +0.10
    product_id = scenario["params"]["product_id"]
    horizon = scenario["horizon_months"]

    # 1. 估算需求弹性系数（基于历史价格变动数据）
    elasticity = estimate_demand_elasticity(company_id, product_id)
    # elasticity 通常为负值，如 -0.8（涨价 10% 销量降 8%）

    # 2. 客户分层（价格敏感度不同）
    customer_segments = segment_customers(company_id)
    # 例：大客户敏感度 -1.2，中小客户 -0.5

    # 3. 逐月预测
    monthly_impact = []
    for month in range(1, horizon + 1):
        # 销量变化
        volume_change = elasticity * change_rate
        # 短期影响更大，长期部分客户流失后趋于稳定
        time_decay = max(0.7, 1 - 0.05 * month)
        volume_change *= time_decay

        # 营收变化 = (1 + 价格变化) * (1 + 销量变化) - 1
        revenue_change = (1 + change_rate) * (1 + volume_change) - 1

        # 成本变化（变动成本随销量，固定成本不变）
        cost_structure = get_cost_structure(company_id)
        variable_ratio = cost_structure["variable_ratio"]
        cost_change = volume_change * variable_ratio

        # 利润变化
        old_margin = baseline[month]["gross_margin"]
        new_revenue = baseline[month]["revenue"] * (1 + revenue_change)
        new_cost = baseline[month]["cost"] * (1 + cost_change)
        new_profit = new_revenue - new_cost
        old_profit = baseline[month]["revenue"] - baseline[month]["cost"]
        profit_change = (new_profit - old_profit) / old_profit if old_profit > 0 else 0

        # 客户流失估算
        churn_rate = estimate_churn(change_rate, customer_segments)

        monthly_impact.append({
            "month": month,
            "revenue": new_revenue,
            "profit": new_profit,
            "revenue_change": revenue_change,
            "profit_change": profit_change,
            "volume_change": volume_change,
            "churn_rate": churn_rate,
        })

    # 4. 汇总影响
    total_revenue_change = np.mean([m["revenue_change"] for m in monthly_impact])
    total_profit_change = np.mean([m["profit_change"] for m in monthly_impact])
    avg_churn = np.mean([m["churn_rate"] for m in monthly_impact])

    return {
        "monthly": monthly_impact,
        "summary": {
            "revenue_change": total_revenue_change,
            "profit_change": total_profit_change,
            "avg_churn_rate": avg_churn,
            "new_margin": new_profit / new_revenue,
        },
        "assumptions": {
            "demand_elasticity": elasticity,
            "customer_segments": customer_segments,
        },
    }


def monte_carlo_uncertainty(impact: Dict, n_simulations: int = 1000) -> Dict:
    """
    蒙特卡洛模拟：对关键参数加噪声，生成置信区间
    """
    base_revenue_change = impact["summary"]["revenue_change"]
    base_profit_change = impact["summary"]["profit_change"]

    # 弹性系数等参数本身有不确定性，假设服从正态分布
    revenue_samples = np.random.normal(base_revenue_change, 0.03, n_simulations)
    profit_samples = np.random.normal(base_profit_change, 0.05, n_simulations)

    return {
        **impact,
        "confidence_interval": {
            "revenue_change": {
                "p5": np.percentile(revenue_samples, 5),
                "p50": np.percentile(revenue_samples, 50),
                "p95": np.percentile(revenue_samples, 95),
            },
            "profit_change": {
                "p5": np.percentile(profit_samples, 5),
                "p50": np.percentile(profit_samples, 50),
                "p95": np.percentile(profit_samples, 95),
            },
        },
    }


def predict_baseline(history: Dict, horizon: int) -> list:
    """
    使用 Prophet 预测未来 horizon 个月的基线数据
    """
    model = Prophet(
        yearly_seasonality=True,
        weekly_seasonality=False,
        daily_seasonality=False,
    )
    df = preprocess_for_prophet(history)
    model.fit(df)
    future = model.make_future_dataframe(periods=horizon, freq="M")
    forecast = model.predict(future)
    return parse_prophet_forecast(forecast, horizon)
```

#### 8.3.3 模型选型说明

| 算法 | 用途 | 选型理由 |
|---|---|---|
| Prophet | 基线时序预测 | 中小企业数据量小、有季节性，Prophet 鲁棒性强 |
| LSTM | 客户行为深度预测 | 捕捉非线性时序模式，用于客户流失预测 |
| Isolation Forest | 异常检测 | 无监督、可解释、对小样本友好 |
| 需求弹性模型 | 价格影响测算 | 经济学经典模型，可解释性强 |
| 蒙特卡洛模拟 | 不确定性量化 | 给出置信区间，避免单点预测误导决策 |
| Neo4j 知识图谱 | 关联分析 | 挖掘企业 / 行业 / 政策之间的隐性关联 |

---

## 附录：交付物清单

| 章节 | 交付物 | 状态 |
|---|---|---|
| 1 | App 原型设计（首页 / 工作台 / AI 助手 / 三务咨询 / 数据看板 / 个人中心） | ✅ |
| 2 | 数据库设计（ER 图 + 核心表结构 + 索引 + 关联） | ✅ |
| 3 | API 设计（认证 / 财务 / 税务 / AI / 成长 / 咨询模块接口） | ✅ |
| 4 | 技术架构图（接入 / 前端 / 应用 / AI 数据 / 安全运维 五层） | ✅ |
| 5 | 开发排期（MVP / V1.0 / V2.0 / V3.0 四阶段 + 团队配置） | ✅ |
| 6 | AI 助手 Prompt 设计（System Prompt + 场景示例 + 最佳实践） | ✅ |
| 7 | 三务咨询工作流（状态机 + AI 自助 / 在线顾问 / 专家会诊 + 三务联动） | ✅ |
| 8 | 智能成长算法（六维评分 + 竞品采集 + 决策模拟引擎） | ✅ |

---

> 本方案为「企管家」App 完整开发设计方案，覆盖产品、设计、技术、算法、运营全链路，可直接作为研发立项与排期的依据。
