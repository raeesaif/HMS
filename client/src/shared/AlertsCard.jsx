import { TriangleAlert, Activity } from 'lucide-react';

const alertsData = [
  {
    id: 1,
    type: 'critical',
    title: 'Critical: Patient #A2418 – ICU 3',
    description: 'BP dropped below threshold',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Low stock: Amoxicillin 500mg',
    description: '18 units remaining',
  },
  {
    id: 3,
    type: 'warning',
    title: 'Pending approval: Insurance claim #INV-8821',
    description: 'Awaiting admin review',
  },
  {
    id: 4,
    type: 'info',
    title: 'New appointment scheduled',
    description: 'Dr. Osei · 3:40 PM',
  },
];

const TYPE_STYLES = {
  critical: {
    bg: 'bg-red-50',
    text: 'text-red-500',
    icon: TriangleAlert,
  },
  warning: {
    bg: 'bg-amber-50',
    text: 'text-amber-500',
    icon: TriangleAlert,
  },
  info: {
    bg: 'bg-blue-50',
    text: 'text-blue-500',
    icon: Activity,
  },
};

const AlertsCard = ({
  data = alertsData,
  title = 'Alerts',
  subtitle = 'Requires attention',
}) => {
  const count = data.length;

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800">{title}</h3>
          <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>
        </div>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
          {count}
        </span>
      </div>

      <div className="my-4 border-t border-slate-100" />

      {/* Alerts list */}
      <div className="flex flex-col gap-5">
        {data.map((alert) => {
          const style = TYPE_STYLES[alert.type] ?? TYPE_STYLES.info;
          const Icon = style.icon;
          return (
            <div key={alert.id} className="flex items-start gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.bg} ${style.text}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">
                  {alert.title}
                </p>
                <p className="mt-0.5 text-sm text-slate-400">
                  {alert.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsCard;
