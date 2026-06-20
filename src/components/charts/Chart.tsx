import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { getThemeColors } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { EChartsOption } from 'echarts';

interface ChartProps {
  option: EChartsOption;
  height?: number | string;
  className?: string;
  dark?: boolean;
}

export function Chart({ option, height = 280, className, dark = false }: ChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const colors = getThemeColors();
    const chart = echarts.init(ref.current, undefined, {
      renderer: 'svg',
    });
    chartRef.current = chart;

    const mergedOption: EChartsOption = {
      animation: false,
      textStyle: {
        fontFamily: '"Work Sans", "Noto Sans CJK SC", sans-serif',
        color: dark ? colors.muted : colors.ink,
        fontSize: 12,
      },
      color: [colors.accent, colors.accent2, colors.ok, colors.amber, colors.warn],
      grid: { top: 30, right: 16, bottom: 32, left: 48, containLabel: true },
      tooltip: {
        trigger: 'axis',
        backgroundColor: dark ? colors.ink : '#fff',
        borderColor: colors.rule,
        borderWidth: 1,
        textStyle: { color: dark ? '#fff' : colors.ink, fontSize: 12 },
        extraCssText: 'box-shadow: 0 4px 12px rgba(14,21,37,.12); border-radius: 8px;',
      },
      legend: {
        textStyle: { color: dark ? colors.muted : colors.muted, fontSize: 12 },
        icon: 'roundRect',
        itemWidth: 12,
        itemHeight: 8,
        top: 0,
      },
      ...option,
    };

    chart.setOption(mergedOption);

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
      chartRef.current = null;
    };
  }, [option, dark]);

  return (
    <div
      ref={ref}
      className={cn('w-full', className)}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    />
  );
}
