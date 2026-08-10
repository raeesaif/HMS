import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { subscriptionStatusMap } from '@/components/super-admin/statusMaps';
import { features } from '@/data/superAdmin/features';
import { getHospitals } from '@/data/superAdmin/hospitals';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value ?? '—'}</p>
    </div>
  );
}

export function SubscriptionDetailsDialog({ plan, open, onOpenChange }) {
  if (!plan) return null;

  const subscriberCount = getHospitals().filter((hospital) => hospital.plan === plan.name).length;
  const planFeatures = features.filter((feature) => plan.features.includes(feature.id));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <StatusBadge status={plan.status} map={subscriptionStatusMap} />
          <DialogTitle>{plan.name}</DialogTitle>
          <DialogDescription>{plan.description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Monthly Price" value={`${plan.currency} ${plan.monthlyPrice}`} />
          <InfoField label="Yearly Price" value={`${plan.currency} ${plan.yearlyPrice}`} />
          <InfoField label="Trial Days" value={plan.trialDays} />
          <InfoField label="Max Users" value={plan.maxUsers} />
          <InfoField label="Storage Limit" value={`${plan.storageLimitGB} GB`} />
          <InfoField label="Subscribers" value={subscriberCount} />
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Included Features</p>
          <div className="flex flex-wrap gap-2">
            {planFeatures.length === 0 ? (
              <p className="text-sm text-slate-500">No features assigned.</p>
            ) : (
              planFeatures.map((feature) => (
                <span key={feature.id} className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                  {feature.name}
                </span>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
