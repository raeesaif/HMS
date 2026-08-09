import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { QuickActionCard } from './QuickActionCard';

export function QuickActions({ actions = [] }) {
  const navigate = useNavigate();
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Jump straight to what you need</p>
      </CardHeader>
      <div className="grid gap-3 px-5 py-5 sm:grid-cols-2 xl:grid-cols-1">
        {actions.map((action) => (
          <QuickActionCard
            key={action.id}
            icon={action.icon}
            label={action.label}
            description={action.description}
            onClick={() => navigate(action.path)}
          />
        ))}
      </div>
    </Card>
  );
}
