// 格式化工具函数

/** 格式化金额（万元） */
export function formatMoney(amount: number, unit: '万' | '元' = '万'): string {
  if (unit === '万') {
    return amount.toLocaleString('zh-CN', { maximumFractionDigits: 1 });
  }
  return amount.toLocaleString('zh-CN', { maximumFractionDigits: 2 });
}

/** 格式化百分比 */
export function formatPercent(value: number, digits = 1): string {
  return `${value.toFixed(digits)}%`;
}

/** 获取 CSS 变量值 */
export function getCssVar(name: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** 主题色对象（从 CSS 变量派生） */
export function getThemeColors() {
  return {
    accent: getCssVar('--accent') || '#4F46E5',
    accent2: getCssVar('--accent2') || '#0EA5E9',
    ink: getCssVar('--ink') || '#0E1525',
    muted: getCssVar('--muted') || '#5B6478',
    rule: getCssVar('--rule') || '#E3E7F0',
    warn: getCssVar('--warn') || '#E0584C',
    ok: getCssVar('--ok') || '#16A37B',
    amber: getCssVar('--amber') || '#E08A1E',
  };
}
