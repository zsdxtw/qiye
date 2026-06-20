import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface Column<T> {
  key: string;
  title: string;
  render?: (row: T) => ReactNode;
  width?: string;
  align?: 'left' | 'right' | 'center';
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey?: (row: T, index: number) => string;
  onRowClick?: (row: T) => void;
  rowClassName?: (row: T) => string;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey = (_, i) => String(i),
  onRowClick,
  rowClassName,
}: TableProps<T>) {
  return (
    <div className="rounded-card overflow-hidden border border-rule">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ink text-white">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 font-semibold text-left whitespace-nowrap',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center',
                  )}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={rowKey(row, index)}
                className={cn(
                  'border-t border-rule transition-colors',
                  index % 2 === 0 ? 'bg-bg2' : 'bg-bg',
                  onRowClick && 'cursor-pointer hover:bg-accent-soft/50',
                  rowClassName?.(row),
                )}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'px-4 py-3 text-ink',
                      col.align === 'right' && 'text-right tabular',
                      col.align === 'center' && 'text-center',
                    )}
                  >
                    {col.render ? col.render(row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
