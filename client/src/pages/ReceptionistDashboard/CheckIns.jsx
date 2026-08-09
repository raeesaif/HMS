import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { Pagination } from '@/shared/Pagination';
import { FilterBar } from '@/components/reception/FilterBar';
import { ErrorState } from '@/components/reception/ErrorState';
import { FiltersSkeleton, TableSkeleton } from '@/components/reception/LoadingSkeleton';
import { CheckInsTable } from '@/components/reception/checkins/CheckInsTable';
import { CheckInDialog } from '@/components/dialogs/receptionist/CheckInDialog';
import { DeleteConfirmDialog } from '@/components/dialogs/common/DeleteConfirmDialog';
import { useCheckIns } from '@/hooks/useCheckIns';
import { checkInPatient, markNoShow } from '@/services/checkInService';
import { checkInStatusOptions } from '@/data/receptionistCheckIns';

const PAGE_SIZE = 8;

const CheckIns = () => {
  const navigate = useNavigate();
  const { checkIns, setCheckIns, isLoading, error, reload } = useCheckIns();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);

  const [activeCheckIn, setActiveCheckIn] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

  const filteredCheckIns = useMemo(() => {
    const query = search.trim().toLowerCase();
    return checkIns.filter((checkIn) => {
      const matchesSearch = !query || checkIn.patientName.toLowerCase().includes(query) || checkIn.doctorName.toLowerCase().includes(query);
      const matchesStatus = status === 'all' || checkIn.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [checkIns, search, status]);

  const totalPages = Math.max(1, Math.ceil(filteredCheckIns.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedCheckIns = filteredCheckIns.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const resetPage = () => setPage(1);
  const handleClearFilters = () => {
    setSearch('');
    setStatus('all');
    resetPage();
  };

  const closeDialog = (next) => {
    if (!next) setOpenDialog(null);
  };

  const handleAction = (action, checkIn) => {
    setActiveCheckIn(checkIn);
    if (action === 'view-appointment') {
      navigate('/reception/appointments');
      return;
    }
    setOpenDialog(action);
  };

  const handleConfirmCheckIn = (checkInId, payload) => {
    checkInPatient(checkInId, payload).then(() => {
      setCheckIns((current) => current.map((entry) => (entry.id === checkInId ? { ...entry, ...payload, status: 'Checked In' } : entry)));
    });
  };

  const handleNoShow = () => {
    if (!activeCheckIn) return;
    markNoShow(activeCheckIn.id).then(() => {
      setCheckIns((current) => current.map((entry) => (entry.id === activeCheckIn.id ? { ...entry, status: 'No Show' } : entry)));
      setOpenDialog(null);
      toast.success(`${activeCheckIn.patientName} marked as No Show`);
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Check-ins</h1>
        <p className="mt-1 text-sm text-slate-500">Confirm patient arrivals and assign queue numbers.</p>
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
                <SearchInput value={search} onChange={(value) => { setSearch(value); resetPage(); }} placeholder="Search by patient or doctor..." className="sm:w-72" />
                <FilterDropdown
                  label="Status"
                  value={status}
                  onChange={(value) => { setStatus(value); resetPage(); }}
                  options={checkInStatusOptions.map((option) => ({ value: option, label: option }))}
                />
              </FilterBar>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton rows={6} cols={7} />
          ) : (
            <CheckInsTable checkIns={paginatedCheckIns} onAction={handleAction} onClearFilters={handleClearFilters} />
          )}

          {!isLoading && filteredCheckIns.length > 0 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, filteredCheckIns.length)} of ${filteredCheckIns.length} check-ins`}
              className="border-t border-border px-5 py-4"
            />
          )}
        </Card>
      )}

      <CheckInDialog checkIn={openDialog === 'check-in' ? activeCheckIn : null} open={openDialog === 'check-in'} onOpenChange={closeDialog} onConfirm={handleConfirmCheckIn} />
      <DeleteConfirmDialog
        open={openDialog === 'no-show'}
        onOpenChange={closeDialog}
        title="Mark as No Show?"
        description={activeCheckIn ? `${activeCheckIn.patientName} will be marked as not having arrived for their appointment.` : undefined}
        confirmLabel="Mark No Show"
        onConfirm={handleNoShow}
      />
    </div>
  );
};

export default CheckIns;
