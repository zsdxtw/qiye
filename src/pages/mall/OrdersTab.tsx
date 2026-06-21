import { orders } from "@/mock/mall";
import type { Order } from "@/mock/mall";
import { Package, Clock, CheckCircle2, Truck, XCircle, Download, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const fmt = (n: number) => `¥${n.toLocaleString()}`;

const statusConfig: Record<
  Order["status"],
  { label: string; color: string; bg: string; icon: typeof Clock }
> = {
  pending: { label: "待审批", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  paid: { label: "已支付", color: "text-info", bg: "bg-info/10", icon: CheckCircle2 },
  shipped: { label: "已发货", color: "text-info", bg: "bg-info/10", icon: Truck },
  completed: { label: "已完成", color: "text-success", bg: "bg-success/10", icon: CheckCircle2 },
  cancelled: { label: "已取消", color: "text-ink-mute", bg: "bg-gray-100", icon: XCircle },
};

export default function OrdersTab() {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* 操作栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-caption text-ink-mute">
          <Package className="w-4 h-4" />
          共 {orders.length} 笔订单 · 累计采购 <span className="text-primary font-semibold tnum">¥1.86万</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="qj-btn-ghost text-caption flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> 导出
          </button>
        </div>
      </div>

      {/* 订单状态统计 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {(["pending", "paid", "shipped", "completed", "cancelled"] as const).map((s) => {
          const config = statusConfig[s];
          const count = orders.filter((o) => o.status === s).length;
          const Icon = config.icon;
          return (
            <div key={s} className="qj-card p-4 flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", config.bg)}>
                <Icon className={cn("w-5 h-5", config.color)} />
              </div>
              <div>
                <div className="text-h2 tnum font-bold text-ink">{count}</div>
                <div className="text-mini text-ink-mute">{config.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 订单列表 */}
      <div className="space-y-4">
        {orders.map((order) => {
          const config = statusConfig[order.status];
          const StatusIcon = config.icon;
          return (
            <div key={order.id} className="qj-card p-5 hover:shadow-float transition-all">
              {/* 订单头部 */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-50 mb-3">
                <div className="flex items-center gap-3">
                  <span className="tnum text-body text-primary font-medium">{order.orderNo}</span>
                  <span className="text-mini text-ink-mute">{order.createdAt}</span>
                </div>
                <span className={cn("qj-badge", config.bg, config.color)}>
                  <StatusIcon className="w-3 h-3" />
                  {order.statusLabel}
                </span>
              </div>

              {/* 商品列表 */}
              <div className="space-y-2 mb-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-ink-mute" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-caption text-ink font-medium truncate">{item.name}</div>
                      {item.spec && <div className="text-mini text-ink-mute">{item.spec}</div>}
                    </div>
                    <div className="text-caption text-ink-mute tnum">x{item.qty}</div>
                    <div className="text-caption tnum text-ink font-medium w-20 text-right">{fmt(item.price * item.qty)}</div>
                  </div>
                ))}
              </div>

              {/* 订单信息 */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <div className="flex items-center gap-4 text-mini text-ink-mute">
                  <span>申请人：<span className="text-ink-soft">{order.applicant}</span></span>
                  <span>部门：<span className="text-ink-soft">{order.department}</span></span>
                  <span>用途：<span className="text-ink-soft">{order.purpose}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-caption text-ink-mute">合计</span>
                  <span className="text-h3 tnum font-bold text-danger">{fmt(order.totalAmount)}</span>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-gray-50">
                {order.status === "pending" && (
                  <>
                    <button className="px-3 py-1.5 rounded-md text-caption text-ink-mute border border-gray-200 hover:bg-gray-50 transition-colors">
                      撤销
                    </button>
                    <button className="px-3 py-1.5 rounded-md text-caption text-primary border border-primary-100 hover:bg-primary-50 transition-colors">
                      修改
                    </button>
                  </>
                )}
                {order.status === "shipped" && (
                  <button className="px-3 py-1.5 rounded-md text-caption text-success border border-success/30 hover:bg-success/10 transition-colors flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> 查看物流
                  </button>
                )}
                {order.status === "completed" && (
                  <button className="px-3 py-1.5 rounded-md text-caption text-primary border border-primary-100 hover:bg-primary-50 transition-colors flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> 再次采购
                  </button>
                )}
                <button className="px-3 py-1.5 rounded-md text-caption text-ink-soft hover:bg-gray-50 transition-colors">
                  订单详情
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
