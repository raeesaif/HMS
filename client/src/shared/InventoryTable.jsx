import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import { DataTable } from '@/shared/DataTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MEDICATION_CATEGORIES } from '@/constants/pharmacy';
import { inventoryData } from '@/data/pharmacy';

const STATUS_STYLES = {
  'In stock': { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  'Low stock': { dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50' },
  'Out of stock': { dot: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
};

const BAR_STYLES = {
  'In stock': 'bg-emerald-500',
  'Low stock': 'bg-amber-500',
  'Out of stock': 'bg-slate-200',
};

const HeaderLabel = ({ children, className = '' }) => (
  <span
    className={`text-[11px] font-semibold uppercase tracking-wider text-slate-400 ${className}`}
  >
    {children}
  </span>
);

const NativeSelect = ({ className = '', children, ...props }) => (
  <select
    className={`h-9 shrink-0 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition-colors focus-visible:border-blue-400 focus-visible:ring-3 focus-visible:ring-blue-100 ${className}`}
    {...props}
  >
    {children}
  </select>
);

const buildInventoryColumns = ({ onReorder, onEdit }) => [
  {
    accessorKey: 'sku',
    header: () => <HeaderLabel>SKU</HeaderLabel>,
    cell: (info) => <span className="text-slate-500">{info.getValue()}</span>,
  },
  {
    accessorKey: 'medication',
    header: () => <HeaderLabel>Medication</HeaderLabel>,
    cell: (info) => (
      <span className="font-medium text-slate-800">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: 'category',
    header: () => <HeaderLabel>Category</HeaderLabel>,
    cell: (info) => <span className="text-slate-500">{info.getValue()}</span>,
  },
  {
    id: 'stockLevel',
    header: () => <HeaderLabel>Stock level</HeaderLabel>,
    cell: ({ row }) => {
      const { stock, maxLevel, status, unit } = row.original;
      return (
        <div className="flex items-center gap-2.5">
          <div className="h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${BAR_STYLES[status] ?? BAR_STYLES['In stock']}`}
              style={{
                width: `${stock <= 0 ? 0 : Math.min(100, Math.round((stock / maxLevel) * 100))}%`,
              }}
            />
          </div>
          <span className="text-sm text-slate-600">
            {stock} {unit}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'expires',
    header: () => <HeaderLabel>Expires</HeaderLabel>,
    cell: (info) => <span className="text-slate-500">{info.getValue()}</span>,
  },
  {
    accessorKey: 'status',
    header: () => <HeaderLabel>Status</HeaderLabel>,
    cell: (info) => {
      const status = info.getValue();
      const style = STATUS_STYLES[status] ?? STATUS_STYLES['In stock'];
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.bg} ${style.text}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
          {status}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: () => <HeaderLabel className="block text-right">Actions</HeaderLabel>,
    cell: ({ row }) => {
      const item = row.original;
      const showReorder =
        item.status === 'Low stock' || item.status === 'Out of stock';
      return (
        <div className="flex items-center justify-end gap-1.5">
          {showReorder && (
            <Button size="sm" onClick={() => onReorder?.(item)}>
              Reorder
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => onEdit?.(item)}>
            Edit
          </Button>
        </div>
      );
    },
  },
];

const InventoryTable = ({
  data = inventoryData,
  onReorder,
  onEdit,
}) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const columns = useMemo(
    () => buildInventoryColumns({ onReorder, onEdit }),
    [onReorder, onEdit]
  );

  const filteredData = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data.filter((item) => {
      const matchesSearch =
        !query ||
        item.sku.toLowerCase().includes(query) ||
        item.medication.toLowerCase().includes(query);
      const matchesCategory = category === 'all' || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [data, search, category]);

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800">Inventory</h3>
          <p className="mt-0.5 text-sm text-slate-400">Sorted by stock level</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <NativeSelect
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            {MEDICATION_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </NativeSelect>
          <div className="relative w-full sm:w-56">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search medication..."
              className="h-9 rounded-lg pr-9"
            />
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  );
};

export default InventoryTable;
