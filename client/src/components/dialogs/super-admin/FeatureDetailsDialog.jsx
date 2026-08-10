import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { featureStatusMap } from '@/components/super-admin/statusMaps';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value ?? '—'}</p>
    </div>
  );
}

export function FeatureDetailsDialog({ feature, open, onOpenChange }) {
  if (!feature) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <StatusBadge status={feature.status} map={featureStatusMap} />
          <DialogTitle>{feature.name}</DialogTitle>
          <DialogDescription>{feature.description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoField label="Category" value={feature.category} />
          <InfoField label="Feature Key" value={feature.key} />
          <InfoField label="Usage (30 days)" value={feature.usageCount.toLocaleString()} />
          <InfoField label="Enabled Hospitals" value={feature.enabledHospitals} />
          <InfoField label="Disabled Hospitals" value={feature.disabledHospitals} />
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Available Plans</p>
          <div className="flex flex-wrap gap-2">
            {feature.plans.map((planName) => (
              <span key={planName} className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                {planName}
              </span>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
