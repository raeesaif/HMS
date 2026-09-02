import { useMemo } from 'react';
import PageHeader from '@/shared/PageHeader';
import StateCard from '@/shared/StatsCard';
import PatientsTable from '@/shared/PatientsTable';
import AddPatientDialog from '@/dialogs/AddPatientDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { usePatientsList, useDoctorsList } from '@/hooks/useAuth';
import { useDepartments } from '@/hooks/useDepartments';

const formatAdmittedDate = (isoDate) => {
  if (!isoDate) return '—';
  const date = new Date(isoDate);
  return Number.isNaN(date.getTime())
    ? '—'
    : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const capitalize = (value) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : '—');

const STATE_CARD = [
  {
    title: 'Total Patients',
    value: '12,483',
  },
  {
    title: 'Admitted',
    value: '342',
  },
  {
    title: 'Discharged today',
    value: 27,
  },
  {
    title: 'Critical',
    value: '9',
  },
];

const AdminPatients = () => {
  const { data: rawPatients = [], isLoading } = usePatientsList();
  const { data: departments = [] } = useDepartments();
  const { data: doctors = [] } = useDoctorsList();

  const departmentNameById = useMemo(
    () => Object.fromEntries(departments.map((department) => [department.id, department.name])),
    [departments]
  );

  const doctorNameById = useMemo(
    () => Object.fromEntries(doctors.map((doctor) => [doctor._id, `Dr. ${doctor.firstName} ${doctor.lastName}`])),
    [doctors]
  );

  const patients = useMemo(
    () =>
      rawPatients.map((patient) => ({
        id: patient.userId ?? patient._id,
        name: `${patient.firstName} ${patient.lastName}`,
        age: patient.age ?? '—',
        sex: patient.gender === 'female' ? 'F' : patient.gender === 'male' ? 'M' : '—',
        phone: patient.phone ?? '—',
        department: departmentNameById[patient.department] ?? '—',
        bloodGroup: patient.bloodGroup ?? '—',
        doctor: doctorNameById[patient.doctor] ?? '—',
        admitted: formatAdmittedDate(patient.admissionDate),
        status: capitalize(patient.patientStatus),
      })),
    [rawPatients, departmentNameById, doctorNameById]
  );

  return (
    <div className="min-h-screen bg-slate-100 -m-4 sm:-m-6 p-4 sm:p-6">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Patient Management"
          subtitle="Search, filter and manage patient records"
        />
        <AddPatientDialog
          trigger={
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Patient
            </Button>
          }
        />
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-4">
          {STATE_CARD?.map((item, index) => (
            <StateCard key={index} {...item} />
          ))}
        </div>
        <div className="mt-4">
          {isLoading ? (
            <p className="text-sm text-slate-500">Loading patients…</p>
          ) : (
            <PatientsTable data={patients} totalCount={patients.length} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPatients;
