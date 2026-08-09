import { Mail, ShieldAlert, UserX } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function DangerZone({ onContactAdministrator, onRequestDeactivation }) {
  return (
    <div className="space-y-4">
      <Alert variant="warning">
        <ShieldAlert />
        <AlertTitle>Managed by hospital administration</AlertTitle>
        <AlertDescription>
          <p>Your role, permissions, department, and employment information are managed by the hospital administrator.</p>
          <Button variant="outline" size="sm" className="mt-2 w-fit" onClick={onContactAdministrator}>
            <Mail /> Contact Administrator
          </Button>
        </AlertDescription>
      </Alert>

      <Card className="rounded-xl border-dashed border-slate-300 bg-slate-50 shadow-none">
        <CardContent className="flex flex-col justify-between gap-3 px-5 py-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-slate-700">Account managed by administrator</p>
            <p className="mt-1 text-sm text-slate-500">
              Your account is managed by the hospital administrator. If you need account deactivation, submit a
              request below.
            </p>
          </div>
          <Button variant="outline" onClick={onRequestDeactivation}>
            <UserX /> Request Account Deactivation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
