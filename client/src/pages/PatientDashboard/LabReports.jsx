import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { Pagination } from '@/shared/Pagination';
import { FilterBar } from '@/components/patient/FilterBar';
import { ErrorState } from '@/components/patient/ErrorState';
import { FiltersSkeleton, TableSkeleton } from '@/components/patient/LoadingSkeleton';
import { LabReportsTable } from '@/components/patient/lab-reports/LabReportsTable';
import { LabReportDetailsDialog } from '@/components/dialogs/patient/LabReportDetailsDialog';
import { useLabReports } from '@/hooks/patient/useLabReports';
import { printLabReport, downloadLabReport } from '@/lib/labReportPrint';

const PAGE_SIZE = 7;
const statusOptions = ['Ordered', 'Sample Collected', 'Processing', 'Completed', 'Cancelled'];

const LabReports = () => {
  const { labReports, isLoading, error, reload } = useLabReports();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);

  const [activeReport, setActiveReport] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();
    return labReports.filter((report) => {
      const matchesSearch = !query || report.testName.toLowerCase().includes(query) || report.orderedBy.toLowerCase().includes(query);
      const matchesStatus = status === 'all' || report.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [labReports, search, status]);

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedReports = filteredReports.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const resetPage = () => setPage(1);
  const handleClearFilters = () => {
    setSearch('');
    setStatus('all');
    resetPage();
  };

  const handleAction = (action, report) => {
    if (action === 'view') {
      setActiveReport(report);
      setDetailsOpen(true);
    } else if (action === 'download') {
      downloadLabReport(report);
    } else if (action === 'print') {
      printLabReport(report);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Lab Reports</h1>
        <p className="mt-1 text-sm text-slate-500">View and download your laboratory test results.</p>
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
                <SearchInput value={search} onChange={(value) => { setSearch(value); resetPage(); }} placeholder="Search by test or doctor..." className="sm:w-72" />
                <FilterDropdown label="Status" value={status} onChange={(value) => { setStatus(value); resetPage(); }} options={statusOptions.map((option) => ({ value: option, label: option }))} />
              </FilterBar>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton rows={6} cols={8} />
          ) : (
            <LabReportsTable reports={paginatedReports} onAction={handleAction} onClearFilters={handleClearFilters} />
          )}

          {!isLoading && filteredReports.length > 0 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, filteredReports.length)} of ${filteredReports.length} reports`}
              className="border-t border-border px-5 py-4"
            />
          )}
        </Card>
      )}

      <LabReportDetailsDialog report={activeReport} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </div>
  );
};

export default LabReports;
