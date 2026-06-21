import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { scStats } from "@/mock/supplyChain";
import ProcurementTab from "@/pages/supply-chain/ProcurementTab";
import InventoryTab from "@/pages/supply-chain/InventoryTab";
import SalesTab from "@/pages/supply-chain/SalesTab";
import CRMTab from "@/pages/supply-chain/CRMTab";
import LogisticsTab from "@/pages/supply-chain/LogisticsTab";
import {
  Package,
  Truck,
  AlertTriangle,
  Building2,
  ShoppingCart,
  TrendingUp,
  Boxes,
  Users,
  Navigation,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  package: Package,
  truck: Truck,
  alert: AlertTriangle,
  building: Building2,
  "shopping-cart": ShoppingCart,
  "trending-up": TrendingUp,
};

const tabs = [
  { key: "procurement", label: "采购管理", icon: ShoppingCart, component: ProcurementTab },
  { key: "inventory", label: "库存管理", icon: Boxes, component: InventoryTab },
  { key: "sales", label: "销售管理", icon: TrendingUp, component: SalesTab },
  { key: "crm", label: "CRM 客户", icon: Users, component: CRMTab },
  { key: "logistics", label: "物流追踪", icon: Navigation, component: LogisticsTab },
];

export default function SupplyChain() {
  const [activeTab, setActiveTab] = useState("procurement");
  const ActiveComponent = tabs.find((t) => t.key === activeTab)?.component || ProcurementTab;

  return (
    <div className="p-6 space-y-5">
      <PageHeader title="供应链与进销存" subtitle="采购管理 · 库存预警 · CRM · 物流追踪" />

      {/* 顶部统计卡 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {scStats.map((stat) => {
          const Icon = iconMap[stat.icon] || Package;
          const trendColor = stat.good
            ? "text-success"
            : stat.trend === "up"
            ? "text-success"
            : "text-danger";
          return (
            <div key={stat.label} className="qj-card p-4 hover:shadow-float transition-all">
              <div className="flex items-center justify-between mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  <Icon className="w-4 h-4" strokeWidth={2} />
                </div>
                {stat.change !== 0 && (
                  <span className={cn("text-mini tnum", trendColor)}>
                    {stat.trend === "up" ? "+" : ""}
                    {stat.change}
                  </span>
                )}
              </div>
              <div className="text-h2 tnum font-bold text-ink mb-0.5">{stat.value}</div>
              <div className="text-mini text-ink-mute">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Tab 导航 */}
      <div className="qj-card p-1.5 flex items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg text-body font-medium transition-all whitespace-nowrap",
                active
                  ? "bg-primary text-white shadow-md"
                  : "text-ink-soft hover:bg-card hover:text-ink"
              )}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 内容 */}
      <ActiveComponent />
    </div>
  );
}
