import { PageHeader } from '@/components/layout/AppLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Table } from '@/components/ui/Table';
import { Chart } from '@/components/charts/Chart';
import { attendanceData } from '@/data/mockData';
import { Users, Clock, CalendarX, CalendarOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EChartsOption } from 'echarts';

export default function Attendance() {
  const d = attendanceData;

  const weeklyOption: EChartsOption = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['出勤人数', '迟到人数'] },
    xAxis: {
      type: 'category',
      data: d.weeklyStats.days,
      axisLine: { lineStyle: { color: '#E3E7F0' } },
      axisLabel: { color: '#5B6478' },
    },
    yAxis: [
      { type: 'value', name: '出勤', axisLine: { show: false }, splitLine: { lineStyle: { color: '#E3E7F0', type: 'dashed' } }, axisLabel: { color: '#5B6478' } },
      { type: 'value', name: '迟到', axisLine: { show: false }, splitLine: { show: false }, axisLabel: { color: '#5B6478' } },
    ],
    series: [
      {
        name: '出勤人数',
        type: 'bar',
        data: d.weeklyStats.attendance,
        itemStyle: { color: '#4F46E5', borderRadius: [4, 4, 0, 0] },
        barWidth: '40%',
      },
      {
        name: '迟到人数',
        type: 'line',
        yAxisIndex: 1,
        data: d.weeklyStats.late,
        smooth: true,
        lineStyle: { color: '#E08A1E', width: 2 },
        itemStyle: { color: '#E08A1E' },
        symbol: 'circle',
        symbolSize: 6,
      },
    ],
  };

  return (
    <div className="space-y-5">
      <PageHeader title="考勤排班" subtitle="打卡汇总、排班管理与工时统计" />

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="在册员工" value={d.stats.totalStaff} unit="人" color="accent" />
        <StatCard icon={Clock} label="出勤率" value={d.stats.attendance} unit="%" color="ok" />
        <StatCard icon={CalendarX} label="迟到" value={d.stats.late} unit="人" color="amber" />
        <StatCard icon={CalendarOff} label="缺勤 / 请假" value={`${d.stats.absent} / ${d.stats.leave}`} unit="人" color="warn" />
      </div>

      {/* 周出勤趋势 + 排班表 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3">
          <CardHeader title="本周出勤趋势" subtitle="出勤人数与迟到人数对比" />
          <Chart option={weeklyOption} height={300} />
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="今日排班" subtitle="各部门班次安排" />
          <div className="space-y-3">
            {d.schedule.map((s) => (
              <div key={s.name} className="border border-rule rounded-card-sm p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-ink">{s.name}</span>
                  <Tag type="default">{s.morning.length + s.afternoon.length + s.evening.length} 人次</Tag>
                </div>
                <div className="grid grid-cols-3 gap-2 text-2xs">
                  <div>
                    <div className="text-muted mb-1">早班</div>
                    <div className="text-ink font-mono">{s.morning.length} 人</div>
                  </div>
                  <div>
                    <div className="text-muted mb-1">中班</div>
                    <div className="text-ink font-mono">{s.afternoon.length} 人</div>
                  </div>
                  <div>
                    <div className="text-muted mb-1">晚班</div>
                    <div className="text-ink font-mono">{s.evening.length || '-'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 工时统计 */}
      <Card>
        <CardHeader title="工时统计" subtitle="本月各部门工时与加班情况" />
        <Table
          columns={[
            { key: 'department', title: '部门' },
            { key: 'headcount', title: '人数', align: 'center', render: (r) => <span className="font-mono">{r.headcount}</span> },
            { key: 'avgHours', title: '平均工时', align: 'right', render: (r) => <span className="font-mono">{r.avgHours} h</span> },
            {
              key: 'overtime', title: '加班工时', align: 'right',
              render: (r) => (
                <span className={cn('font-mono font-semibold', r.overtime > 25 ? 'text-warn' : r.overtime > 15 ? 'text-amber' : 'text-ink')}>
                  {r.overtime} h
                </span>
              ),
            },
            {
              key: 'ratio', title: '加班占比', align: 'right',
              render: (r) => (
                <div className="flex items-center justify-end gap-2">
                  <div className="w-16 h-1.5 bg-rule rounded-full overflow-hidden">
                    <div
                      className={cn('h-full rounded-full', r.overtime > 25 ? 'bg-warn' : r.overtime > 15 ? 'bg-amber' : 'bg-ok')}
                      style={{ width: `${Math.min((r.overtime / r.avgHours) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-muted w-10">{((r.overtime / r.avgHours) * 100).toFixed(0)}%</span>
                </div>
              ),
            },
          ]}
          data={d.workHours}
          rowKey={(r) => r.department}
        />
      </Card>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, unit, color }: { icon: typeof Users; label: string; value: number | string; unit: string; color: 'accent' | 'ok' | 'amber' | 'warn' }) {
  const colorMap = {
    accent: 'bg-accent-soft text-accent',
    ok: 'bg-ok-soft text-ok',
    amber: 'bg-amber-soft text-amber',
    warn: 'bg-warn-soft text-warn',
  };
  return (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-muted">{label}</div>
        <div className={cn('w-8 h-8 rounded-card-sm flex items-center justify-center', colorMap[color])}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold font-mono text-ink">{value}</span>
        <span className="text-sm text-muted">{unit}</span>
      </div>
    </Card>
  );
}
