import { LayoutGrid } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/shared/EmptyState';
import { CatalogActionsMenu } from './CatalogActionsMenu';

const columns = ['Name', 'Description', 'Status', 'Created At', ''];

export function CatalogTable({ items, icon: Icon = LayoutGrid, entityLabel, pluralLabel, onAction, onClearFilters }) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={Icon}
        title={`No ${(pluralLabel ?? `${entityLabel}s`).toLowerCase()} found`}
        description="Try adjusting your search, or add a new one."
        action={
          <Button variant="outline" onClick={onClearFilters}>
            Clear Filters
          </Button>
        }
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[720px]">
        <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
          <TableRow className="hover:bg-transparent">
            {columns.map((label) => (
              <TableHead key={label || 'actions'} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5 last:pr-5">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 text-sm font-medium text-slate-900">{item.name}</TableCell>
              <TableCell className="max-w-xs truncate px-4 py-3.5 text-xs text-slate-500">{item.description || '—'}</TableCell>
              <TableCell className="px-4 py-3.5">
                <Badge
                  variant="outline"
                  className={item.isActive ? 'border-transparent bg-green-100 text-green-700' : 'border-transparent bg-slate-100 text-slate-600'}
                >
                  {item.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">
                {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
              </TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end">
                  <CatalogActionsMenu item={item} onAction={onAction} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
