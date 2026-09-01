import { useState } from 'react';
import PageHeader from '@/shared/PageHeader';
import StateCard from '@/shared/StatsCard';
import PatientsTable from '@/shared/PatientsTable';
import AddPatientDialog from '@/dialogs/AddPatientDialog';
import { patientsData } from '@/data/patients';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const formatAdmittedDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

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
  const [patients, setPatients] = useState(patientsData);

  const handleAddPatient = (values) => {
    const newPatient = {
      id: `P-${10248 + patients.length}`,
      name: `${values.firstName} ${values.lastName}`,
      age: Number(values.age),
      sex: values.gender === 'female' ? 'F' : values.gender === 'male' ? 'M' : values.gender,
      phone: values.phone,
      department: values.department,
      bloodGroup: values.bloodGroup,
      doctor: values.doctor,
      admitted: formatAdmittedDate(values.admissionDate),
      status: values.patientStatus,
    };
    setPatients((prev) => [newPatient, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-100 -m-4 sm:-m-6 p-4 sm:p-6">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Patient Management"
          subtitle="Search, filter and manage patient records"
        />
        <AddPatientDialog
          onAdd={handleAddPatient}
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
          <PatientsTable data={patients} />
        </div>
      </div>
    </div>
  );
};

export default AdminPatients;
