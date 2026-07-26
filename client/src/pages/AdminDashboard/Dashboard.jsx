import PageHeader from '@/shared/PageHeader';
import { BedDouble } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import { UsersRound } from 'lucide-react';
import { DollarSign } from 'lucide-react';
import StateCard from '@/shared/StatsCard';
import AdmissionsDischargesChart from '@/charts/AdmissionsDischargesChart';
import VisitsByDepartmentChart from '@/charts/VisitsByDepartmentChart';
import { DataTable } from '@/shared/DataTable';
import AlertsCard from '@/shared/AlertsCard';

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

const appointmentColumns = [
  {
    accessorKey: 'time',
    header: 'Time',
  },
  {
    accessorKey: 'patient',
    header: 'Patient',
  },
  {
    accessorKey: 'doctor',
    header: 'Doctor',
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];

const appointmentsData = [
  {
    time: '09:30',
    patient: 'Ama Owusu',
    doctor: 'Dr. Boateng',
    department: 'Cardiology',
    status: 'Confirmed',
  },
  {
    time: '10:15',
    patient: 'Kwesi Mensah',
    doctor: 'Dr. Adjei',
    department: 'Orthopedic',
    status: 'Pending',
  },
  {
    time: '11:00',
    patient: 'Yaa Serwaa',
    doctor: 'Dr. Osei',
    department: 'Pediatric',
    status: 'Confirmed',
  },
  {
    time: '11:45',
    patient: 'Kojo Antwi',
    doctor: 'Dr. Sarpong',
    department: 'Neurology',
    status: 'Urgent',
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
        <div className="mt-3 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-3">
          <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Upcoming appointments
                </h3>
                <p className="mt-0.5 text-sm text-slate-400">
                  Next slots today
                </p>
              </div>
              <button
                type="button"
                className="text-sm font-medium text-blue-500 hover:text-blue-600 cursor-pointer"
              >
                View all
              </button>
            </div>
            <DataTable columns={appointmentColumns} data={appointmentsData} />
          </div>
          <AlertsCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
