import { BedDouble } from 'lucide-react';

const BED_STATUS_STYLES = {
  available: 'bg-emerald-50 text-emerald-700',
  occupied: 'bg-red-50 text-red-600',
  reserved: 'bg-amber-50 text-amber-700',
  critical: 'bg-red-600 text-white',
};

const OCCUPANCY_THRESHOLD = 60;

const WardCard = ({ ward }) => {
  const total = ward.beds.length;
  const availableCount = ward.beds.filter((bed) => bed.status === 'available').length;
  const occupancy = Math.round(((total - availableCount) / total) * 100);
  const isHigh = occupancy > OCCUPANCY_THRESHOLD;

  const badgeClasses = isHigh
    ? 'bg-amber-50 text-amber-700'
    : 'bg-emerald-50 text-emerald-700';
  const badgeDot = isHigh ? 'bg-amber-500' : 'bg-emerald-500';
  const barColor = isHigh ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <BedDouble className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-800">{ward.name}</h3>
            <p className="mt-0.5 text-sm text-slate-400">
              {availableCount} of {total} available &middot; {occupancy}% occupancy
            </p>
          </div>
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${badgeClasses}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${badgeDot}`} />
          {occupancy}% full
        </span>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${occupancy}%` }} />
      </div>

      <div className="mt-4 grid grid-cols-10 gap-2">
        {ward.beds.map((bed) => (
          <div
            key={bed.number}
            title={`Bed ${bed.number} · ${bed.status}`}
            className={`flex h-10 items-center justify-center rounded-lg text-sm font-semibold ${
              BED_STATUS_STYLES[bed.status] ?? BED_STATUS_STYLES.available
            }`}
          >
            {bed.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WardCard;
