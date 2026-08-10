import { Activity, Database, KeyRound, Mail, HardDrive, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { systemHealthMap } from '@/components/super-admin/statusMaps';

const iconMap = {
  api: Activity,
  database: Database,
  auth: KeyRound,
  email: Mail,
  storage: HardDrive,
  payments: CreditCard,
};

export function SystemHealthGrid({ health }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">System Health</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3">
        {health.map((item) => {
          const Icon = iconMap[item.id] ?? Activity;
          return (
            <div key={item.id} className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <Icon className="size-4 text-slate-400" />
                <StatusBadge status={item.status} map={systemHealthMap} />
              </div>
              <p className="mt-2 text-sm font-medium text-slate-900">{item.name}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
