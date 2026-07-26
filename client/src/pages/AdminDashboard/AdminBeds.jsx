import PageHeader from '@/shared/PageHeader';
import WardCard from '@/shared/WardCard';
import { wardsData } from '@/data/beds';

const LEGEND = [
  { label: 'Available', dot: 'bg-emerald-500' },
  { label: 'Occupied', dot: 'bg-red-500' },
  { label: 'Reserved', dot: 'bg-amber-400' },
  { label: 'Critical', dot: 'bg-rose-400' },
];

const SUMMARY_CONFIG = [
  {
    key: 'available',
    label: 'Available',
    valueColor: 'text-emerald-600',
    badge: 'bg-emerald-50 text-emerald-700',
    dot: 'bg-emerald-500',
  },
  {
    key: 'occupied',
    label: 'Occupied',
    valueColor: 'text-red-600',
    badge: 'bg-red-50 text-red-700',
    dot: 'bg-red-500',
  },
  {
    key: 'reserved',
    label: 'Reserved',
    valueColor: 'text-amber-500',
    badge: 'bg-amber-50 text-amber-700',
    dot: 'bg-amber-500',
  },
  {
    key: 'critical',
    label: 'Critical / ICU',
    valueColor: 'text-red-600',
    badge: 'bg-red-50 text-red-700',
    dot: 'bg-red-500',
  },
];

const AdminBeds = () => {
  const summary = wardsData.reduce(
    (acc, ward) => {
      ward.beds.forEach((bed) => {
        acc[bed.status] = (acc[bed.status] ?? 0) + 1;
      });
      return acc;
    },
    { available: 0, occupied: 0, reserved: 0, critical: 0 }
  );

  return (
    <div className="min-h-screen bg-slate-100 -m-4 sm:-m-6 p-4 sm:p-6">
      <PageHeader title="Beds & Wards" subtitle="Real-time occupancy across all wards" />

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {SUMMARY_CONFIG.map((item) => (
          <div
            key={item.key}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{item.label}</p>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${item.badge}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
                Live
              </span>
            </div>
            <p className={`mt-1 text-2xl font-bold ${item.valueColor}`}>{summary[item.key]}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-5 rounded-2xl border border-slate-100 bg-white px-5 py-3 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
        {LEGEND.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm text-slate-500">
            <span className={`h-2.5 w-2.5 rounded-full ${item.dot}`} />
            {item.label}
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {wardsData.map((ward) => (
          <WardCard key={ward.id} ward={ward} />
        ))}
      </div>
    </div>
  );
};

export default AdminBeds;
