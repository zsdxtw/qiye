import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  accentColor?: string;
  sparkline?: number[];
  className?: string;
}

export default function StatCard({
  label,
  value,
  change,
  trend = "neutral",
  icon,
  accentColor = "#1E3A5F",
  className,
}: StatCardProps) {
  const isPositive = trend === "up";
  const isNegative = trend === "down";
  const trendColor = change === undefined ? "" : isPositive ? "text-success" : isNegative ? "text-danger" : "text-ink-mute";

  return (
    <div className={cn("qj-card p-5 transition-all hover:shadow-float", className)}>
      <div className="flex items-start justify-between mb-3">
        <div className="text-caption text-ink-mute">{label}</div>
        {icon && (
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
          >
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-end gap-2 mb-1">
        <div className="text-h1 tnum text-ink font-bold" style={{ color: accentColor }}>
          {value}
        </div>
        {change !== undefined && (
          <div className={cn("flex items-center text-caption tnum pb-1", trendColor)}>
            {isPositive && <ArrowUpRight className="w-3.5 h-3.5" />}
            {isNegative && <ArrowDownRight className="w-3.5 h-3.5" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="text-mini text-ink-mute">较上月</div>
    </div>
  );
}
