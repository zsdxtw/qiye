import { PageHeader } from '@/components/layout/AppLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Table } from '@/components/ui/Table';
import { Chart } from '@/components/charts/Chart';
import { Callout } from '@/components/ui/Callout';
import { payrollData } from '@/data/mockData';
import { Users, Wallet, Landmark, Receipt } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EChartsOption } from 'echarts';

export default function Payroll() {
  const d = payrollData;

  const structureOption: EChartsOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
    legend: { bottom: 0, icon: 'circle' },
    series: [
      {
        type: 'pie',
        radius: ['50%', '75%'],
        center: ['50%', '45%'],
        label: { formatter: '{b}\n{c}%', fontSize: 11, color: '#5B6478' },
        labelLine: { length: 6, length2: 6 },
        data: [
          { name: '基本工资', value: d.salaryStructure.base * 100, itemStyle: { color: '#4F46E5' } },
          { name: '绩效', value: d.salaryStructure.performance * 100, itemStyle: { color: '#0EA5E9' } },
          { name: '补贴', value: d.salaryStructure.allowance * 100, itemStyle: { color: '#16A37B' } },
          { name: '奖金', value: d.salaryStructure.bonus * 100, itemStyle: { color: '#E08A1E' } },
        ],
      },
    ],
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="薪酬核算"
        subtitle="薪资方案、社保公积金与个税自动计算"
        action={<Button variant="primary">生成本月工资单</Button>}
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="发薪人数" value={d.stats.totalStaff} unit="人" />
        <StatCard icon={Wallet} label="本月工资总额" value={d.stats.monthPayroll} unit="万" highlight />
        <StatCard icon={Landmark} label="社保公积金" value={d.stats.socialInsurance} unit="万" />
        <StatCard icon={Receipt} label="代扣个税" value={d.stats.tax} unit="万" />
      </div>

      {/* 薪资结构 + 社保公积金 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader title="薪资结构" subtitle="本月薪资构成比例" />
          <Chart option={structureOption} height={280} />
        </Card>

        <Card>
          <CardHeader title="社保公积金比例" subtitle="五险一金缴纳比例（公司 / 个人）" />
          <div className="space-y-2.5">
            {Object.entries(d.socialInsurance).map(([name, rates]) => (
              <div key={name} className="flex items-center justify-between py-2 border-b border-rule last:border-b-0">
                <span className="text-sm text-ink w-20">{name === 'pension' ? '养老' : name === 'medical' ? '医疗' : name === 'unemployment' ? '失业' : name === 'injury' ? '工伤' : name === 'maternity' ? '生育' : '公积金'}</span>
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <div className="text-muted">公司</div>
                    <div className="font-mono font-semibold text-accent">{(rates.company * 100).toFixed(1)}%</div>
                  </div>
                  <div className="text-rule">/</div>
                  <div className="text-right">
                    <div className="text-muted">个人</div>
                    <div className="font-mono font-semibold text-amber">{(rates.personal * 100).toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 mt-1 border-t-2 border-ink/10">
              <span className="text-sm font-semibold text-ink">合计</span>
              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <div className="font-mono font-bold text-accent">{(Object.values(d.socialInsurance).reduce((s, r) => s + r.company, 0) * 100).toFixed(1)}%</div>
                </div>
                <div className="text-rule">/</div>
                <div className="text-right">
                  <div className="font-mono font-bold text-amber">{(Object.values(d.socialInsurance).reduce((s, r) => s + r.personal, 0) * 100).toFixed(1)}%</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 员工薪资明细 */}
      <Card>
        <CardHeader title="员工薪资明细" subtitle="本月核算结果（单位：元）" action={<Tag type="ai">✦ AI 自动核算</Tag>} />
        <Table
          columns={[
            { key: 'name', title: '姓名' },
            { key: 'department', title: '部门' },
            { key: 'position', title: '职位' },
            { key: 'base', title: '基本工资', align: 'right', render: (r) => <span className="font-mono">{r.base.toLocaleString()}</span> },
            { key: 'performance', title: '绩效', align: 'right', render: (r) => <span className="font-mono">{r.performance.toLocaleString()}</span> },
            { key: 'gross', title: '应发合计', align: 'right', render: (r) => <span className="font-mono font-semibold">{r.gross.toLocaleString()}</span> },
            { key: 'tax', title: '个税', align: 'right', render: (r) => <span className="font-mono text-warn">{r.tax.toLocaleString()}</span> },
            { key: 'net', title: '实发', align: 'right', render: (r) => <span className="font-mono font-bold text-ok">{r.net.toLocaleString()}</span> },
          ]}
          data={d.employees}
          rowKey={(r) => r.id}
        />
      </Card>

      {/* 个税税率表 */}
      <Callout variant="info" title="个税累计预扣税率表（综合所得）">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-2">
          {d.taxBrackets.map((b, i) => (
            <div key={i} className="border border-rule rounded-card-sm p-2.5 bg-bg2">
              <div className="text-2xs text-muted font-mono mb-1">级数 {i + 1}</div>
              <div className="text-xs text-ink font-medium mb-1">{b.range}</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-accent font-mono">{b.rate}</span>
                <span className="text-2xs text-muted">速算扣除 {b.deduction}</span>
              </div>
            </div>
          ))}
        </div>
      </Callout>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, unit, highlight }: { icon: typeof Users; label: string; value: number; unit: string; highlight?: boolean }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-muted">{label}</div>
        <div className="w-8 h-8 rounded-card-sm bg-accent-soft flex items-center justify-center">
          <Icon className="w-4 h-4 text-accent" />
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={cn('text-2xl font-bold font-mono', highlight ? 'text-accent' : 'text-ink')}>{value}</span>
        <span className="text-sm text-muted">{unit}</span>
      </div>
    </Card>
  );
}
