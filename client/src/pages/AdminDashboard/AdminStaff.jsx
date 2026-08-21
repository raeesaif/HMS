import { useMemo, useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import PageHeader from '@/shared/PageHeader';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import StaffGrid from '@/shared/StaffGrid';
import DutyRoster from '@/shared/DutyRoster';
import AddDoctorDialog from '@/dialogs/AddDoctorDialog';
import AddNurseDialog from '@/dialogs/AddNurseDialog';
import AddReceptionistDialog from '@/dialogs/AddReceptionistDialog';
import StaffDetailsDialog from '@/dialogs/StaffDetailsDialog';
import StaffEditDialog from '@/dialogs/StaffEditDialog';
import AssignPatientDialog from '@/dialogs/AssignPatientDialog';
import { doctorsData, nursesData, receptionistsData, dutyRosterData } from '@/data/staff';

const STAFF_TABS = [
  { value: 'doctor', label: 'Doctors' },
  { value: 'nurse', label: 'Nurses' },
  { value: 'receptionist', label: 'Receptionists' },
];

const AdminStaff = () => {
  const [staff, setStaff] = useState([...doctorsData, ...nursesData, ...receptionistsData]);
  const [activeTab, setActiveTab] = useState('doctor');
  const [activeDialog, setActiveDialog] = useState(null);
  const [viewingMember, setViewingMember] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [assigningNurse, setAssigningNurse] = useState(null);

  const addStaffMember = (member) => {
    setStaff((prev) => [{ id: `S-${100 + prev.length}`, ...member }, ...prev]);
  };

  const handleAddDoctor = (values) => {
    addStaffMember({
      type: 'doctor',
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
      type: 'nurse',
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
      type: 'receptionist',
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

  const handleSaveMember = (updated) => {
    setStaff((prev) => prev.map((member) => (member.id === updated.id ? updated : member)));
  };

  const handleOpenEdit = (member) => {
    setViewingMember(null);
    setEditingMember(member);
  };

  const staffByTab = useMemo(
    () =>
      STAFF_TABS.reduce((acc, tab) => {
        acc[tab.value] = staff.filter((member) => member.type === tab.value);
        return acc;
      }, {}),
    [staff]
  );

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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {STAFF_TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
                <span className="ml-1.5 text-xs text-muted-foreground">
                  ({staffByTab[tab.value]?.length ?? 0})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {STAFF_TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-4">
              <StaffGrid
                data={staffByTab[tab.value] ?? []}
                onView={setViewingMember}
                onEdit={handleOpenEdit}
                onAssignPatients={setAssigningNurse}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {activeTab === 'doctor' && (
        <div className="mt-4">
          <DutyRoster data={dutyRosterData} />
        </div>
      )}

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
      <StaffDetailsDialog
        open={!!viewingMember}
        onOpenChange={(next) => !next && setViewingMember(null)}
        member={viewingMember}
        onEdit={handleOpenEdit}
      />
      <StaffEditDialog
        open={!!editingMember}
        onOpenChange={(next) => !next && setEditingMember(null)}
        member={editingMember}
        onSave={handleSaveMember}
      />
      <AssignPatientDialog
        open={!!assigningNurse}
        onOpenChange={(next) => !next && setAssigningNurse(null)}
        nurse={assigningNurse}
        onSave={handleSaveMember}
      />
    </div>
  );
};

export default AdminStaff;
