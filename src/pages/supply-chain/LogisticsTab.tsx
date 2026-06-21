import { inTransitOrders, logisticsStats, trackingTimeline } from "@/mock/supplyChain";
import { Truck, MapPin, CheckCircle2, Clock, Package, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

const statusBadge: Record<string, string> = {
  运输中: "bg-info/10 text-info",
  已签收: "bg-success/10 text-success",
  待发货: "bg-warning/10 text-warning",
};

const fmt = (n: number) => `¥${n.toLocaleString()}`;

export default function LogisticsTab() {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* 物流统计卡 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="qj-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-caption text-ink-mute">平均时效</span>
          </div>
          <div className="text-h2 tnum font-bold text-primary">{logisticsStats.avgDays}<span className="text-body text-ink-mute font-normal ml-1">天</span></div>
        </div>
        <div className="qj-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span className="text-caption text-ink-mute">准时率</span>
          </div>
          <div className="text-h2 tnum font-bold text-success">{logisticsStats.onTimeRate}<span className="text-body text-ink-mute font-normal ml-1">%</span></div>
        </div>
        <div className="qj-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-4 h-4 text-info" />
            <span className="text-caption text-ink-mute">在途订单</span>
          </div>
          <div className="text-h2 tnum font-bold text-info">{inTransitOrders.filter((o) => o.status === "运输中").length}<span className="text-body text-ink-mute font-normal ml-1">单</span></div>
        </div>
        <div className="qj-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-accent" />
            <span className="text-caption text-ink-mute">合作承运商</span>
          </div>
          <div className="text-h2 tnum font-bold text-accent">{logisticsStats.carriers.length}<span className="text-body text-ink-mute font-normal ml-1">家</span></div>
        </div>
      </div>

      {/* 在途订单 */}
      <div className="qj-card p-5">
        <h3 className="text-h3 font-semibold text-ink mb-4 flex items-center gap-2">
          <Truck className="w-4 h-4 text-info" /> 在途订单
        </h3>
        <div className="space-y-4">
          {inTransitOrders.map((o) => (
            <div key={o.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-card transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="tnum text-body text-primary font-medium">{o.orderNo}</span>
                  <span className="text-caption text-ink-soft">{o.customer}</span>
                  <span className={`qj-badge ${statusBadge[o.status]}`}>{o.status}</span>
                </div>
                <div className="text-caption tnum text-ink-mute">{fmt(o.amount)}</div>
              </div>

              {/* 路线信息 */}
              <div className="flex items-center gap-3 mb-3 text-caption">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-success" />
                  <span className="text-ink-soft">{o.fromCity}</span>
                </div>
                <Navigation className="w-3.5 h-3.5 text-ink-mute" />
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-danger" />
                  <span className="text-ink-soft">{o.toCity}</span>
                </div>
                <span className="text-ink-mute">·</span>
                <span className="text-ink-mute">{o.carrier}</span>
                <span className="text-ink-mute">·</span>
                <span className="tnum text-ink-mute">{o.trackingNo}</span>
              </div>

              {/* 进度条 */}
              <div className="mb-2">
                <div className="flex items-center justify-between text-mini text-ink-mute mb-1.5">
                  <span>发货：{o.shipDate}</span>
                  <span className="text-primary font-medium">{o.progress}%</span>
                  <span>预计送达：{o.eta}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all", o.progress === 100 ? "bg-success" : "bg-info")}
                    style={{ width: `${o.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 承运商统计 + 物流轨迹 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* 承运商统计 */}
        <div className="qj-card p-5">
          <h3 className="text-h3 font-semibold text-ink mb-4">承运商时效统计</h3>
          <div className="space-y-3">
            {logisticsStats.carriers.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <div className="w-24 text-body text-ink-soft shrink-0">{c.name}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-mini text-ink-mute mb-1">
                    <span className="tnum">{c.count}单 · 均时 {c.avgDays}天</span>
                    <span className="tnum text-success font-medium">{c.onTimeRate}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", c.onTimeRate >= 95 ? "bg-success" : c.onTimeRate >= 90 ? "bg-info" : "bg-warning")}
                      style={{ width: `${c.onTimeRate}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 物流轨迹时间线 */}
        <div className="qj-card p-5">
          <h3 className="text-h3 font-semibold text-ink mb-4 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-accent" /> 物流轨迹
            <span className="text-caption text-ink-mute font-normal ml-1">(SF1234567890)</span>
          </h3>
          <div className="relative pl-6">
            {/* 时间线竖线 */}
            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-100" />
            <div className="space-y-4">
              {trackingTimeline.map((t, idx) => (
                <div key={idx} className="relative">
                  {/* 节点 */}
                  <div
                    className={cn(
                      "absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center",
                      t.done ? "bg-success border-success" : "bg-white border-gray-300"
                    )}
                  >
                    {t.done && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <div className={cn("pb-1", !t.done && "opacity-60")}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={cn("text-body font-medium", t.done ? "text-ink" : "text-ink-mute")}>{t.location}</span>
                      {!t.done && idx === trackingTimeline.findIndex((x) => !x.done) && (
                        <span className="qj-badge bg-accent/15 text-accent-dark">当前</span>
                      )}
                    </div>
                    <p className="text-caption text-ink-soft">{t.desc}</p>
                    <span className="text-mini text-ink-mute tnum">{t.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
