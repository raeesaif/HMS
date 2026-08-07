import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const defaultBedStates = [
  'occupied', 'occupied', 'available', 'occupied', 'occupied',
  'available', 'occupied', 'reserved', 'occupied', 'occupied',
  'available', 'occupied', 'occupied', 'reserved', 'available',
  'occupied', 'occupied', 'available', 'occupied', 'occupied',
];

const bedStyles = {
  available: 'bg-emerald-100 text-emerald-500',
  occupied: 'bg-rose-100 text-rose-500',
  reserved: 'bg-amber-100 text-amber-500',
};

const legend = [
  ['available', 'Available'],
  ['occupied', 'Occupied'],
  ['reserved', 'Reserved'],
];

/** Reusable ward occupancy grid. Pass a different ward title or bed state list as needed. */
export function WardBedsCard({ title = 'Ward 4B beds', bedStates = defaultBedStates }) {
  const available = bedStates.filter((state) => state === 'available').length;
  const reserved = bedStates.filter((state) => state === 'reserved').length;

  return (
    <Card className="min-h-[525px] gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold text-slate-900">{title}</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">
          {available} available · {reserved} reserved
        </p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col px-5 py-5">
        <div className="grid grid-cols-5 gap-2">
          {bedStates.map((state, index) => (
            <div
              key={`${state}-${index}`}
              className={`flex aspect-square items-center justify-center rounded-lg text-sm font-medium ${bedStyles[state]}`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-700">
          {legend.map(([state, label]) => (
            <span key={state} className="flex items-center gap-1.5">
              <i className={`size-3 rounded-sm ${bedStyles[state].split(' ')[0]}`} />
              {label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
