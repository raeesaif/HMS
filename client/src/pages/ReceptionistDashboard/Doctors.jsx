import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { FilterBar } from '@/components/reception/FilterBar';
import { ErrorState } from '@/components/reception/ErrorState';
import { FiltersSkeleton, TableSkeleton } from '@/components/reception/LoadingSkeleton';
import { DoctorsTable } from '@/components/reception/doctors/DoctorsTable';
import { DoctorScheduleDialog } from '@/components/dialogs/receptionist/DoctorScheduleDialog';
import { useDoctors } from '@/hooks/useDoctors';
import { doctorStatusOptions, departmentOptions } from '@/data/receptionistDoctors';

const Doctors = () => {
  const navigate = useNavigate();
  const { doctors, isLoading, error, reload } = useDoctors();

  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('all');
  const [status, setStatus] = useState('all');

  const [activeDoctor, setActiveDoctor] = useState(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const filteredDoctors = useMemo(() => {
    const query = search.trim().toLowerCase();
    return doctors.filter((doctor) => {
      const matchesSearch = !query || doctor.name.toLowerCase().includes(query) || doctor.specialization.toLowerCase().includes(query);
      const matchesDepartment = department === 'all' || doctor.department === department;
      const matchesStatus = status === 'all' || doctor.status === status;
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [doctors, search, department, status]);

  const handleClearFilters = () => {
    setSearch('');
    setDepartment('all');
    setStatus('all');
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Doctors On Duty</h1>
        <p className="mt-1 text-sm text-slate-500">Check doctor availability to schedule appointments efficiently.</p>
      </section>

      {error ? (
        <ErrorState onRetry={reload} />
      ) : (
        <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
          <div className="border-b border-border p-5">
            {isLoading ? (
              <FiltersSkeleton />
            ) : (
              <FilterBar>
                <SearchInput value={search} onChange={setSearch} placeholder="Search by doctor or specialization..." className="sm:w-72" />
                <FilterDropdown label="Department" value={department} onChange={setDepartment} options={departmentOptions.map((option) => ({ value: option, label: option }))} />
                <FilterDropdown label="Status" value={status} onChange={setStatus} options={doctorStatusOptions.map((option) => ({ value: option, label: option }))} />
              </FilterBar>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton rows={6} cols={8} />
          ) : (
            <DoctorsTable
              doctors={filteredDoctors}
              onViewSchedule={(doctor) => {
                setActiveDoctor(doctor);
                setScheduleOpen(true);
              }}
              onViewAppointments={() => navigate('/reception/appointments')}
              onClearFilters={handleClearFilters}
            />
          )}
        </Card>
      )}

      <DoctorScheduleDialog doctor={activeDoctor} open={scheduleOpen} onOpenChange={setScheduleOpen} />
    </div>
  );
};

export default Doctors;
