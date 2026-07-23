import PageHeader from '@/shared/PageHeader';
import { BedDouble } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import { UsersRound } from 'lucide-react';
import { DollarSign } from 'lucide-react';
import StateCard from '@/shared/StatsCard';
import AdmissionsDischargesChart from '@/charts/AdmissionsDischargesChart';
import VisitsByDepartmentChart from '@/charts/VisitsByDepartmentChart';
const STATE_CARD = [
  {
    title: 'Total Patients',
    value: '12,483',
    icon: <UsersRound />,
    color: 'blue',
  },
  {
    title: 'Available Beds',
    value: '84 / 220',
    icon: <BedDouble />,
    color: 'green',
  },
  {
    title: "Today's Appointments",
    value: 156,
    icon: <CalendarDays />,
    color: 'yellow',
  },
  {
    title: 'Revenue (This Month)',
    value: '$482,910',
    icon: <DollarSign />,
    color: 'cyan',
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100 -m-4 sm:-m-6 p-4 sm:p-6">
      <PageHeader
        title="Dashbaord"
        subtitle="Real-time overview of hospital operations"
      />
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-4">
          {STATE_CARD?.map((item, index) => (
            <StateCard key={index} {...item} />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
          <AdmissionsDischargesChart />
          <VisitsByDepartmentChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
