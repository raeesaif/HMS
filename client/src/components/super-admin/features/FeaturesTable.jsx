import { Eye, MoreVertical, Power, PowerOff, Puzzle, SquarePen } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { featureStatusMap } from '@/components/super-admin/statusMaps';

const columns = ['Feature', 'Category', 'Description', 'Status', 'Plans', 'Usage', ''];

export function FeaturesTable({ features, onAction, onClearFilters }) {
  if (features.length === 0) {
    return (
      <EmptyState
        icon={Puzzle}
        title="No features found"
        description="Try adjusting your filters."
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
      <Table className="min-w-[1020px]">
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
          {features.map((feature, index) => (
            <TableRow key={feature.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
              <TableCell className="px-4 py-3.5 pl-5 text-sm font-medium text-slate-900">{feature.name}</TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{feature.category}</TableCell>
              <TableCell className="max-w-[220px] truncate px-4 py-3.5 text-xs text-slate-500">{feature.description}</TableCell>
              <TableCell className="px-4 py-3.5">
                <StatusBadge status={feature.status} map={featureStatusMap} />
              </TableCell>
              <TableCell className="px-4 py-3.5 text-xs text-slate-500">{feature.plans.join(', ')}</TableCell>
              <TableCell className="px-4 py-3.5 text-sm text-slate-600">{feature.usageCount.toLocaleString()}</TableCell>
              <TableCell className="px-4 py-3.5 pr-5">
                <div className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Feature actions" />}>
                      <MoreVertical className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onAction('view', feature)}>
                        <Eye /> View Usage
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAction('edit', feature)}>
                        <SquarePen /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {feature.status === 'Disabled' ? (
                        <DropdownMenuItem onClick={() => onAction('enable', feature)}>
                          <Power /> Enable
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem variant="destructive" onClick={() => onAction('disable', feature)}>
                          <PowerOff /> Disable
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
