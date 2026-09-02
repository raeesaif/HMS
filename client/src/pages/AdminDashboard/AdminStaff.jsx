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
import { dutyRosterData } from '@/data/staff';
import { useDoctorsList, useNursesList, useReceptionistsList } from '@/hooks/useAuth';
import { useDepartments } from '@/hooks/useDepartments';

const STAFF_TABS = [
  { value: 'doctor', label: 'Doctors' },
  { value: 'nurse', label: 'Nurses' },
  { value: 'receptionist', label: 'Receptionists' },
];

const formatShift = (shiftStart, shiftEnd) =>
  shiftStart && shiftEnd ? `${shiftStart} – ${shiftEnd}` : '—';

const formatDutyStatus = (dutyStatus) => (dutyStatus === 'On Duty' ? 'On duty' : 'Off duty');

const AdminStaff = () => {
  const { data: doctors = [], isLoading: doctorsLoading } = useDoctorsList();
  const { data: nurses = [], isLoading: nursesLoading } = useNursesList();
  const { data: receptionists = [], isLoading: receptionistsLoading } = useReceptionistsList();
  const { data: departments = [] } = useDepartments();

  const departmentNameById = useMemo(
    () => Object.fromEntries(departments.map((department) => [department.id, department.name])),
    [departments]
  );

  const fetchedStaff = useMemo(
    () => [
      ...doctors.map((doctor) => ({
        id: doctor._id,
        type: 'doctor',
        name: `Dr. ${doctor.firstName} ${doctor.lastName}`,
        role: '—',
        department: '—',
        rating: '—',
        patients: '—',
        status: '—',
        shift: '—',
        email: '—',
        phone: '—',
      })),
      ...nurses.map((nurse) => ({
        id: nurse._id,
        type: 'nurse',
        name: `${nurse.firstName} ${nurse.lastName}`,
        role: `Nurse · ${nurse.ward || '—'}`,
        department: departmentNameById[nurse.department] ?? '—',
        rating: '—',
        patients: '—',
        status: formatDutyStatus(nurse.dutyStatus),
        shift: formatShift(nurse.shiftStart, nurse.shiftEnd),
        email: nurse.email,
        phone: nurse.phone ?? '—',
        licenseNumber: nurse.licenseNumber,
      })),
      ...receptionists.map((receptionist) => ({
        id: receptionist._id,
        type: 'receptionist',
        name: `${receptionist.firstName} ${receptionist.lastName}`,
        role: `Receptionist · ${receptionist.staffDepartment || '—'}`,
        department: receptionist.staffDepartment ?? '—',
        rating: '—',
        patients: '—',
        status: formatDutyStatus(receptionist.dutyStatus),
        shift: formatShift(receptionist.shiftStart, receptionist.shiftEnd),
        email: receptionist.email,
        phone: receptionist.phone ?? '—',
      })),
    ],
    [doctors, nurses, receptionists, departmentNameById]
  );

  // No PATCH endpoint exists for staff edits yet, so edits made via
  // StaffEditDialog/AssignPatientDialog are held as local overrides layered
  // on top of the server-fetched list rather than persisted.
  const [overrides, setOverrides] = useState({});
  const staff = useMemo(
    () => fetchedStaff.map((member) => (overrides[member.id] ? { ...member, ...overrides[member.id] } : member)),
    [fetchedStaff, overrides]
  );

  const [activeTab, setActiveTab] = useState('doctor');
  const [activeDialog, setActiveDialog] = useState(null);
  const [viewingMember, setViewingMember] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [assigningNurse, setAssigningNurse] = useState(null);

  const handleSaveMember = (updated) => {
    setOverrides((prev) => ({ ...prev, [updated.id]: updated }));
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

  const isLoading = doctorsLoading || nursesLoading || receptionistsLoading;

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

      {isLoading ? (
        <p className="mt-4 text-sm text-slate-500">Loading staff…</p>
      ) : (
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
      )}

      {activeTab === 'doctor' && !isLoading && (
        <div className="mt-4">
          <DutyRoster data={dutyRosterData} />
        </div>
      )}

      <AddDoctorDialog
        open={activeDialog === 'doctor'}
        onOpenChange={(next) => setActiveDialog(next ? 'doctor' : null)}
      />
      <AddNurseDialog
        open={activeDialog === 'nurse'}
        onOpenChange={(next) => setActiveDialog(next ? 'nurse' : null)}
      />
      <AddReceptionistDialog
        open={activeDialog === 'receptionist'}
        onOpenChange={(next) => setActiveDialog(next ? 'receptionist' : null)}
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
