import { useNavigate } from 'react-router-dom';
import { Bell, Building2, ChevronRight, CreditCard, Puzzle, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const iconMap = { building: Building2, users: Users, creditcard: CreditCard, puzzle: Puzzle, bell: Bell };

export function QuickActionsGrid({ actions, onAction }) {
  const navigate = useNavigate();

  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-1">
        {actions.map((action) => {
          const Icon = iconMap[action.icon] ?? Building2;
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => (onAction ? onAction(action) : navigate(action.path))}
              className="group flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-4 text-left shadow-sm transition-colors hover:border-sky-200 hover:bg-sky-50/50"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                <Icon className="size-5" />
              </div>
              <p className="min-w-0 flex-1 truncate text-sm font-medium text-slate-900">{action.label}</p>
              <ChevronRight className="size-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400" />
            </button>
          );
        })}
      </div>
    </Card>
  );
}
