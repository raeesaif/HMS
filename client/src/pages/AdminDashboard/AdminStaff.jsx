import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import PageHeader from '@/shared/PageHeader';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import StaffGrid from '@/shared/StaffGrid';
import DutyRoster from '@/shared/DutyRoster';
import AddDoctorDialog from '@/dialogs/AddDoctorDialog';
import AddNurseDialog from '@/dialogs/AddNurseDialog';
import AddReceptionistDialog from '@/dialogs/AddReceptionistDialog';
import { doctorsData, dutyRosterData } from '@/data/staff';

const AdminStaff = () => {
  const [staff, setStaff] = useState(doctorsData);
  const [activeDialog, setActiveDialog] = useState(null);

  const addStaffMember = (member) => {
    setStaff((prev) => [{ id: `S-${100 + prev.length}`, ...member }, ...prev]);
  };

  const handleAddDoctor = (values) => {
    addStaffMember({
      name: `Dr. ${values.name}`,
      role: values.specialty,
      department: values.department,
      rating: '—',
      patients: '—',
      status: values.status,
      shift: `${values.shiftStart} – ${values.shiftEnd}`,
      email: values.email,
      phone: values.phone,
    });
  };

  const handleAddNurse = (values) => {
    addStaffMember({
      name: values.name,
      role: `Nurse · ${values.ward}`,
      department: values.department,
      rating: '—',
      patients: '—',
      status: values.status,
      shift: `${values.shiftStart} – ${values.shiftEnd}`,
      email: values.email,
      phone: values.phone,
    });
  };

  const handleAddReceptionist = (values) => {
    addStaffMember({
      name: values.name,
      role: `Receptionist · ${values.desk}`,
      department: '—',
      rating: '—',
      patients: '—',
      status: values.status,
      shift: `${values.shiftStart} – ${values.shiftEnd}`,
      email: values.email,
      phone: values.phone,
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 -m-4 sm:-m-6 p-4 sm:p-6">
      <div className="flex justify-between items-center">
        <PageHeader title="Doctors & Staff" subtitle="Profiles, departments and shift schedules" />

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button />}>
            <Plus className="h-4 w-4 mr-2" />
            Add staff member
            <ChevronDown className="h-4 w-4 ml-1.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setActiveDialog('doctor')}>
              Add Doctor
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveDialog('nurse')}>
              Add Nurse
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveDialog('receptionist')}>
              Add Receptionist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-4">
        <StaffGrid data={staff} />
      </div>

      <div className="mt-4">
        <DutyRoster data={dutyRosterData} />
      </div>

      <AddDoctorDialog
        open={activeDialog === 'doctor'}
        onOpenChange={(next) => setActiveDialog(next ? 'doctor' : null)}
        onAdd={handleAddDoctor}
      />
      <AddNurseDialog
        open={activeDialog === 'nurse'}
        onOpenChange={(next) => setActiveDialog(next ? 'nurse' : null)}
        onAdd={handleAddNurse}
      />
      <AddReceptionistDialog
        open={activeDialog === 'receptionist'}
        onOpenChange={(next) => setActiveDialog(next ? 'receptionist' : null)}
        onAdd={handleAddReceptionist}
      />
    </div>
  );
};

export default AdminStaff;
