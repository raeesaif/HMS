import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import PageHeader from '@/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChangePasswordDialog } from '@/shared/ChangePasswordDialog';

const AdminSettings = () => {
  const [passwordOpen, setPasswordOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 -m-4 sm:-m-6 p-4 sm:p-6">
      <PageHeader title="Settings" subtitle="Manage your account security" />

      <div className="mt-4 max-w-xl">
        <Card className="rounded-xl border-border shadow-sm">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Keep your account secure with a strong password.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <p className="font-mono text-lg tracking-widest text-slate-400">•••••••••••</p>
            <Button variant="outline" onClick={() => setPasswordOpen(true)}>
              <KeyRound className="h-4 w-4 mr-2" />
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>

      <ChangePasswordDialog open={passwordOpen} onOpenChange={setPasswordOpen} />
    </div>
  );
};

export default AdminSettings;
