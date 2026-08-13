import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value ?? '—'}</p>
    </div>
  );
}

export function SecuritySummaryCard({ overview }) {
  const navigate = useNavigate();

  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <CardTitle className="text-sm font-semibold">Security Summary</CardTitle>
        <Button variant="outline" size="sm" onClick={() => navigate('/super-admin/security')}>
          Manage Security <ArrowRight />
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3">
        <div>
          <p className="text-xs text-slate-500">Two-Factor Authentication</p>
          <Badge variant="outline" className={overview.twoFactorEnabled ? 'mt-1 border-emerald-200 text-emerald-600' : 'mt-1 border-slate-300 text-slate-500'}>
            {overview.twoFactorEnabled ? (
              <>
                <ShieldCheck /> Enabled
              </>
            ) : (
              'Disabled'
            )}
          </Badge>
        </div>
        <InfoField label="Password Last Changed" value={overview.passwordLastChanged} />
        <InfoField label="Active Sessions" value={overview.activeSessionsCount} />
        <InfoField label="Recent Failed Logins" value={overview.recentFailedLogins} />
      </CardContent>
    </Card>
  );
}
