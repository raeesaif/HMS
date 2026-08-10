import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { Pagination } from '@/shared/Pagination';
import { FilterBar } from '@/components/patient/FilterBar';
import { ErrorState } from '@/components/patient/ErrorState';
import { FiltersSkeleton, TableSkeleton } from '@/components/patient/LoadingSkeleton';
import { MedicalRecordsTable } from '@/components/patient/medical-records/MedicalRecordsTable';
import { MedicalRecordDetailsDialog } from '@/components/dialogs/patient/MedicalRecordDetailsDialog';
import { useMedicalRecords } from '@/hooks/patient/useMedicalRecords';
import { visitTypeOptions } from '@/data/patientMedicalRecords';
import { doctors } from '@/data/patientDoctors';

const PAGE_SIZE = 6;

const MedicalRecords = () => {
  const { records, isLoading, error, reload } = useMedicalRecords();

  const [search, setSearch] = useState('');
  const [doctorId, setDoctorId] = useState('all');
  const [visitType, setVisitType] = useState('all');
  const [page, setPage] = useState(1);

  const [activeRecord, setActiveRecord] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    return records
      .filter((record) => {
        const matchesSearch = !query || record.diagnosis.toLowerCase().includes(query) || record.doctorName.toLowerCase().includes(query);
        const matchesDoctor = doctorId === 'all' || record.doctorId === doctorId;
        const matchesType = visitType === 'all' || record.visitType === visitType;
        return matchesSearch && matchesDoctor && matchesType;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [records, search, doctorId, visitType]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const resetPage = () => setPage(1);
  const handleClearFilters = () => {
    setSearch('');
    setDoctorId('all');
    setVisitType('all');
    resetPage();
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Medical Records</h1>
        <p className="mt-1 text-sm text-slate-500">A read-only view of your visit history. Records are managed by your care team.</p>
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
                <SearchInput value={search} onChange={(value) => { setSearch(value); resetPage(); }} placeholder="Search by diagnosis or doctor..." className="sm:w-72" />
                <FilterDropdown
                  label="Doctor"
                  value={doctorId}
                  onChange={(value) => { setDoctorId(value); resetPage(); }}
                  options={doctors.map((doctor) => ({ value: doctor.id, label: doctor.name }))}
                />
                <FilterDropdown
                  label="Record Type"
                  value={visitType}
                  onChange={(value) => { setVisitType(value); resetPage(); }}
                  options={visitTypeOptions.map((option) => ({ value: option, label: option }))}
                />
              </FilterBar>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton rows={6} cols={7} />
          ) : (
            <MedicalRecordsTable
              records={paginatedRecords}
              onView={(record) => {
                setActiveRecord(record);
                setDetailsOpen(true);
              }}
              onClearFilters={handleClearFilters}
            />
          )}

          {!isLoading && filteredRecords.length > 0 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, filteredRecords.length)} of ${filteredRecords.length} records`}
              className="border-t border-border px-5 py-4"
            />
          )}
        </Card>
      )}

      <MedicalRecordDetailsDialog record={activeRecord} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </div>
  );
};

export default MedicalRecords;
