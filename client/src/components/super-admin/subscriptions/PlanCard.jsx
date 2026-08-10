import { Copy, Eye, MoreVertical, SquarePen, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { subscriptionStatusMap } from '@/components/super-admin/statusMaps';

export function PlanCard({ plan, subscriberCount, onAction }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between pb-0">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-base font-semibold text-slate-900">{plan.name}</p>
            <StatusBadge status={plan.status} map={subscriptionStatusMap} />
          </div>
          <p className="mt-1 text-xs text-slate-500">{plan.description}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Plan actions" />}>
            <MoreVertical className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onAction('edit', plan)}>
              <SquarePen /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction('duplicate', plan)}>
              <Copy /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction('view-subscribers', plan)}>
              <Users /> View Subscribers
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {plan.status === 'Archived' ? (
              <DropdownMenuItem onClick={() => onAction('activate', plan)}>Activate</DropdownMenuItem>
            ) : (
              <DropdownMenuItem variant="destructive" onClick={() => onAction('archive', plan)}>
                Archive
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-slate-900">${plan.monthlyPrice}</span>
          <span className="text-xs text-slate-500">/mo</span>
        </div>
        <p className="text-xs text-slate-500">${plan.yearlyPrice}/year · {plan.trialDays} day trial</p>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
          <p>Max users: <span className="font-medium text-slate-900">{plan.maxUsers}</span></p>
          <p>Features: <span className="font-medium text-slate-900">{plan.features.length}</span></p>
          <p>Storage: <span className="font-medium text-slate-900">{plan.storageLimitGB} GB</span></p>
          <p>Subscribers: <span className="font-medium text-slate-900">{subscriberCount}</span></p>
        </div>

        <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => onAction('view-details', plan)}>
          <Eye /> View Details
        </Button>
      </CardContent>
    </Card>
  );
}
