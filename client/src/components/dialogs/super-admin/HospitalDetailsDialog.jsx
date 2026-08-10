import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { PlanBadge } from '@/components/super-admin/PlanBadge';
import { hospitalStatusMap } from '@/components/super-admin/statusMaps';
import { getBillingStats, transactions } from '@/data/superAdmin/billing';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value ?? '—'}</p>
    </div>
  );
}

export function HospitalDetailsDialog({ hospital, open, onOpenChange }) {
  if (!hospital) return null;

  const hospitalTransactions = transactions.filter((t) => t.hospitalId === hospital.id);
  const billingStats = getBillingStats(hospitalTransactions);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={hospital.status} map={hospitalStatusMap} />
            <PlanBadge plan={hospital.plan} />
          </div>
          <DialogTitle>{hospital.name}</DialogTitle>
          <DialogDescription>{hospital.code} · {hospital.city}, {hospital.country}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Hospital Information</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <InfoField label="Email" value={hospital.email} />
                <InfoField label="Phone" value={hospital.phone} />
                <InfoField label="Address" value={hospital.address} />
                <InfoField label="Registration Date" value={hospital.registrationDate} />
                <InfoField label="Last Activity" value={hospital.lastActivity} />
                {hospital.trialEndsAt && <InfoField label="Trial Ends" value={hospital.trialEndsAt} />}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Admin Information</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <InfoField label="Admin Name" value={hospital.adminName} />
                <InfoField label="Admin Email" value={hospital.adminEmail} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="pt-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Object.entries(hospital.users).map(([role, count]) => (
                <div key={role} className="rounded-lg border border-slate-200 p-3">
                  <p className="text-xs capitalize text-slate-500">{role}</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{count.toLocaleString()}</p>
                </div>
              ))}
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Total Users</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{hospital.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="pt-4">
            <div className="grid grid-cols-3 gap-3">
              <InfoField label="Total Paid" value={`$${billingStats.totalRevenue.toLocaleString()}`} />
              <InfoField label="Pending" value={billingStats.pendingPayments} />
              <InfoField label="Failed" value={billingStats.failedPayments} />
            </div>
            <div className="mt-3 space-y-1.5">
              {hospitalTransactions.slice(0, 5).map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm">
                  <span className="text-slate-600">{t.date} · {t.plan}</span>
                  <span className="font-medium text-slate-900">${t.amount.toLocaleString()}</span>
                </div>
              ))}
              {hospitalTransactions.length === 0 && <p className="text-sm text-slate-500">No transactions recorded.</p>}
            </div>
          </TabsContent>

          <TabsContent value="features" className="pt-4">
            {hospital.planDetails ? (
              <div className="flex flex-wrap gap-2">
                {hospital.planDetails.features.map((featureKey) => (
                  <span key={featureKey} className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium capitalize text-sky-700">
                    {featureKey.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No plan details available.</p>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
