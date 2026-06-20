import { PageHeader } from '@/components/layout/AppLayout';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Table } from '@/components/ui/Table';
import { invoiceData } from '@/data/mockData';
import { UploadCloud, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusMap = {
  pending: { label: '待识别', type: 'medium' as const },
  recognized: { label: '已识别', type: 'ai' as const },
  voucher: { label: '已生成凭证', type: 'safe' as const },
};

export default function Invoices() {
  const d = invoiceData;

  return (
    <div className="space-y-5">
      <PageHeader
        title="智能票据"
        subtitle="AI OCR 自动识别发票信息，一键生成会计凭证"
        action={<Button variant="primary"><UploadCloud className="w-4 h-4" />批量上传</Button>}
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="text-xs text-muted mb-1">本月票据总数</div>
          <div className="text-2xl font-bold font-mono text-ink">{d.stats.total}</div>
        </Card>
        <Card>
          <div className="text-xs text-muted mb-1">待识别</div>
          <div className="text-2xl font-bold font-mono text-amber">{d.stats.pending}</div>
        </Card>
        <Card>
          <div className="text-xs text-muted mb-1">已识别</div>
          <div className="text-2xl font-bold font-mono text-accent">{d.stats.recognized}</div>
        </Card>
        <Card>
          <div className="text-xs text-muted mb-1">已生成凭证</div>
          <div className="text-2xl font-bold font-mono text-ok">{d.stats.voucher}</div>
        </Card>
      </div>

      {/* 上传区 + AI 识别预览 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader title="拖拽上传" subtitle="支持 JPG / PNG / PDF，单次最多 50 张" />
          <div className="border-2 border-dashed border-rule rounded-card p-8 text-center hover:border-accent hover:bg-accent-soft/30 transition-colors cursor-pointer">
            <UploadCloud className="w-10 h-10 text-accent mx-auto mb-3" />
            <p className="text-sm text-ink font-medium mb-1">点击或拖拽发票到此处上传</p>
            <p className="text-xs text-muted">AI 将自动识别发票代码、号码、金额、税额等信息</p>
          </div>
        </Card>

        <Card variant="leftBar" barColor="accent">
          <CardHeader title="AI 识别预览" action={<Tag type="ai">✦ AI</Tag>} />
          <div className="space-y-2.5 text-sm">
            <PreviewRow label="发票代码" value={d.ocrPreview.invoiceCode} />
            <PreviewRow label="发票号码" value={d.ocrPreview.invoiceNumber} />
            <PreviewRow label="开票日期" value={d.ocrPreview.date} />
            <PreviewRow label="销方" value={d.ocrPreview.seller} />
            <PreviewRow label="金额" value={d.ocrPreview.amount} highlight />
            <PreviewRow label="税额" value={d.ocrPreview.tax} />
            <PreviewRow label="价税合计" value={d.ocrPreview.total} highlight />
          </div>
          <div className="mt-4 pt-3 border-t border-rule">
            <div className="text-2xs font-mono text-accent mb-2">✦ 自动生成凭证</div>
            <div className="text-xs text-muted leading-relaxed">
              <div>借：{d.ocrPreview.voucher.debit}</div>
              <div>贷：{d.ocrPreview.voucher.credit}</div>
            </div>
            <Button size="sm" className="mt-3 w-full">确认生成凭证</Button>
          </div>
        </Card>
      </div>

      {/* 票据列表 */}
      <Card>
        <CardHeader
          title="票据列表"
          subtitle="本月已上传票据"
          action={<Button variant="secondary" size="sm">批量生成凭证</Button>}
        />
        <Table
          columns={[
            { key: 'id', title: '票据编号' },
            { key: 'date', title: '日期', width: '120px' },
            { key: 'type', title: '类型' },
            {
              key: 'amount', title: '金额(万)', align: 'right',
              render: (r) => <span className="font-mono font-semibold">{r.amount.toFixed(2)}</span>,
            },
            { key: 'supplier', title: '供应商' },
            {
              key: 'status', title: '状态',
              render: (r) => {
                const s = statusMap[r.status];
                return <Tag type={s.type}>{s.label}</Tag>;
              },
            },
            {
              key: 'action', title: '操作', align: 'right',
              render: () => (
                <button className="text-accent text-xs hover:underline flex items-center gap-1 ml-auto">
                  <Eye className="w-3 h-3" /> 查看
                </button>
              ),
            },
          ]}
          data={d.list}
          rowKey={(r) => r.id}
        />
      </Card>
    </div>
  );
}

function PreviewRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted text-xs">{label}</span>
      <span className={cn('font-mono', highlight ? 'text-accent font-bold' : 'text-ink')}>{value}</span>
    </div>
  );
}
