import { useState } from 'react';
import PageHeader from '@/shared/PageHeader';
import ReportMetricCard from '@/shared/ReportMetricCard';
import RevenueExpensesChart from '@/charts/RevenueExpensesChart';
import PatientDistributionChart from '@/charts/PatientDistributionChart';
import BedOccupancyTrendChart from '@/charts/BedOccupancyTrendChart';
import PatientOutcomesChart from '@/charts/PatientOutcomesChart';
import { Button } from '@/components/ui/button';
import { REPORT_METRICS, REPORT_PERIODS } from '@/data/reports';

const NativeSelect = ({ className = '', children, ...props }) => (
  <select
    className={`h-10 shrink-0 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition-colors focus-visible:border-blue-400 focus-visible:ring-3 focus-visible:ring-blue-100 ${className}`}
    {...props}
  >
    {children}
  </select>
);

const AdminReports = () => {
  const [period, setPeriod] = useState(REPORT_PERIODS[0]);

  return (
    <div className="min-h-screen bg-slate-100 -m-4 sm:-m-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Reports & Analytics"
          subtitle="Hospital performance overview"
        />
        <div className="flex shrink-0 items-center gap-2">
          <NativeSelect value={period} onChange={(e) => setPeriod(e.target.value)}>
            {REPORT_PERIODS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </NativeSelect>
          <Button>Download PDF</Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {REPORT_METRICS.map((item) => (
          <ReportMetricCard key={item.label} {...item} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <RevenueExpensesChart />
        <PatientDistributionChart />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BedOccupancyTrendChart />
        <PatientOutcomesChart />
      </div>
    </div>
  );
};

export default AdminReports;
