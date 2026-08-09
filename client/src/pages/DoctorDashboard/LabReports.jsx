import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AlertTriangle, CheckCircle2, Clock3, ListChecks, Plus, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/shared/SearchInput';
import { Pagination } from '@/shared/Pagination';
import { doctorLabReports } from '@/data/doctorLabReports';
import { getPatientById } from '@/data/doctorPatients';
import { doctorProfile } from '@/data/doctor';
import { LabReportStatsCard } from '@/components/doctor/lab-reports/LabReportStatsCard';
import { LabReportFilters } from '@/components/doctor/lab-reports/LabReportFilters';
import { LabReportTable } from '@/components/doctor/lab-reports/LabReportTable';
import { LabReportDetailsSheet } from '@/components/doctor/lab-reports/LabReportDetailsSheet';
import { ClinicalInterpretationDialog } from '@/components/doctor/lab-reports/ClinicalInterpretationDialog';
import { RequestLabTestDialog } from '@/components/doctor/lab-reports/RequestLabTestDialog';
import { StatsRowSkeleton, FiltersSkeleton, TableSkeleton } from '@/components/doctor/lab-reports/LoadingSkeleton';

const PAGE_SIZE = 6;

const toISODate = (date) => date.toISOString().slice(0, 10);
const todayLabel = () =>
  new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
const nowStamp = () =>
  new Date().toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const generateReportId = (reports) => {
  const maxNumber = reports.reduce((max, report) => {
    const number = parseInt(report.id.replace('LAB-', ''), 10);
    return Number.isFinite(number) ? Math.max(max, number) : max;
  }, 7000);
  return `LAB-${maxNumber + 1}`;
};

const PENDING_STATUSES = ['Requested', 'Sample Collected', 'Processing'];
const DEFAULT_FILTERS = { reportStatus: 'all', resultStatus: 'all', testType: 'all', datePreset: 'all', customDate: null };

const DoctorLabReports = () => {
  const navigate = useNavigate();

  const [labReports, setLabReports] = useState(doctorLabReports);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [reportStatus, setReportStatus] = useState(DEFAULT_FILTERS.reportStatus);
  const [resultStatus, setResultStatus] = useState(DEFAULT_FILTERS.resultStatus);
  const [testType, setTestType] = useState(DEFAULT_FILTERS.testType);
  const [datePreset, setDatePreset] = useState(DEFAULT_FILTERS.datePreset);
  const [customDate, setCustomDate] = useState(DEFAULT_FILTERS.customDate);
  const [page, setPage] = useState(1);

  const [activeReportId, setActiveReportId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [interpretationOpen, setInterpretationOpen] = useState(false);
  const [requestTestOpen, setRequestTestOpen] = useState(false);
  const [requestPrefillPatientId, setRequestPrefillPatientId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const activeReport = labReports.find((report) => report.id === activeReportId) ?? null;
  const activeReportHistory = activeReport
    ? labReports.filter((report) => report.patientId === activeReport.patientId)
    : [];

  const { todayISO, weekStartISO, monthStartISO } = useMemo(() => {
    const today = new Date();
    const weekStart = new Date();
    weekStart.setDate(today.getDate() - 6);
    const monthStart = new Date();
    monthStart.setMonth(today.getMonth() - 1);
    return { todayISO: toISODate(today), weekStartISO: toISODate(weekStart), monthStartISO: toISODate(monthStart) };
  }, []);

  const matchesDatePreset = (isoDate) => {
    if (datePreset === 'all') return true;
    if (!isoDate) return false;
    if (datePreset === 'today') return isoDate === todayISO;
    if (datePreset === 'week') return isoDate >= weekStartISO && isoDate <= todayISO;
    if (datePreset === 'month') return isoDate >= monthStartISO && isoDate <= todayISO;
    if (datePreset === 'custom') return customDate ? isoDate === customDate : true;
    return true;
  };

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();
    return labReports.filter((report) => {
      const patient = getPatientById(report.patientId);
      const matchesSearch =
        !query ||
        report.id.toLowerCase().includes(query) ||
        report.testName.toLowerCase().includes(query) ||
        report.patientId.toLowerCase().includes(query) ||
        patient?.name.toLowerCase().includes(query);
      const matchesReportStatus = reportStatus === 'all' || report.reportStatus === reportStatus;
      const matchesResultStatus = resultStatus === 'all' || report.resultStatus === resultStatus;
      const matchesTestType = testType === 'all' || report.testType === testType;
      return (
        matchesSearch && matchesReportStatus && matchesResultStatus && matchesTestType && matchesDatePreset(report.isoRequestedDate)
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labReports, search, reportStatus, resultStatus, testType, datePreset, customDate, todayISO, weekStartISO, monthStartISO]);

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedReports = filteredReports.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const stats = useMemo(() => {
    const today = todayLabel();
    return {
      pending: labReports.filter((report) => PENDING_STATUSES.includes(report.reportStatus)).length,
      readyForReview: labReports.filter((report) => report.reportStatus === 'Ready for Review').length,
      abnormal: labReports.filter((report) => ['Abnormal', 'Critical'].includes(report.resultStatus)).length,
      reviewedToday: labReports.filter((report) => report.reportStatus === 'Reviewed' && report.reportDate === today)
        .length,
    };
  }, [labReports]);

  const resetPage = () => setPage(1);

  const handleSearchChange = (value) => {
    setSearch(value);
    resetPage();
  };

  const withReset = (setter) => (value) => {
    setter(value);
    resetPage();
  };

  const handleCustomDateChange = (date) => {
    setCustomDate(toISODate(date));
    resetPage();
  };

  const handleClearFilters = () => {
    setSearch('');
    setReportStatus(DEFAULT_FILTERS.reportStatus);
    setResultStatus(DEFAULT_FILTERS.resultStatus);
    setTestType(DEFAULT_FILTERS.testType);
    setDatePreset(DEFAULT_FILTERS.datePreset);
    setCustomDate(DEFAULT_FILTERS.customDate);
    resetPage();
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Lab reports refreshed');
    }, 600);
  };

  const updateReport = (reportId, updater) =>
    setLabReports((current) => current.map((report) => (report.id === reportId ? updater(report) : report)));

  const handleAction = (action, report) => {
    setActiveReportId(report.id);

    switch (action) {
      case 'view-report':
        setDetailsOpen(true);
        break;
      case 'review-results':
        if (report.reportStatus === 'Ready for Review') {
          const now = nowStamp();
          updateReport(report.id, (current) => ({
            ...current,
            reportStatus: 'Reviewed',
            audit: { ...current.audit, reviewedBy: `Dr. ${doctorProfile.name}`, reviewedAt: now, lastUpdated: now },
          }));
        }
        setDetailsOpen(true);
        break;
      case 'view-patient':
        navigate('/doctor/patients');
        break;
      case 'view-medical-records':
        navigate('/doctor/medical-records');
        break;
      case 'create-prescription':
        navigate('/doctor/prescriptions');
        break;
      case 'add-clinical-interpretation':
        setInterpretationOpen(true);
        break;
      case 'request-follow-up-test':
        setRequestPrefillPatientId(report.patientId);
        setRequestTestOpen(true);
        break;
      default:
        break;
    }
  };

  const handleSelectHistoryReport = (report) => {
    setActiveReportId(report.id);
  };

  const handleSaveInterpretation = (reportId, data) => {
    const now = nowStamp();
    updateReport(reportId, (current) => ({
      ...current,
      interpretation: { ...data, interpretedBy: `Dr. ${doctorProfile.name}`, interpretedAt: now },
      audit: { ...current.audit, lastUpdated: now },
    }));
  };

  const handleOpenNewRequest = () => {
    setRequestPrefillPatientId(null);
    setRequestTestOpen(true);
  };

  const handleSubmitLabRequest = (data) => {
    const now = nowStamp();
    setLabReports((current) => {
      const newReport = {
        id: generateReportId(current),
        patientId: data.patientId,
        testName: data.testName,
        testType: data.testCategory,
        requestedDate: todayLabel(),
        isoRequestedDate: data.requestedDate,
        sampleDate: '',
        reportDate: '',
        reportStatus: 'Requested',
        resultStatus: 'Pending',
        orderingDoctor: `Dr. ${doctorProfile.name}`,
        department: doctorProfile.department,
        labDepartment: '—',
        technician: null,
        processedDate: '',
        results: [],
        attachment: null,
        interpretation: null,
        priority: data.priority,
        clinicalReason: data.clinicalReason,
        instructions: data.instructions,
        audit: {
          requestedBy: `Dr. ${doctorProfile.name}`,
          requestedAt: now,
          sampleCollectedAt: null,
          processedBy: null,
          processedAt: null,
          reviewedBy: null,
          reviewedAt: null,
          lastUpdated: now,
        },
      };
      return [newReport, ...current];
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-card px-5 py-5 shadow-sm lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Lab Reports</h1>
          <p className="mt-1 text-sm text-slate-500">Review laboratory results and monitor pending investigations.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by patient, test, or report ID"
            className="w-full sm:w-72"
          />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleRefresh} aria-label="Refresh lab reports">
              <RefreshCw className="size-4" />
            </Button>
            <Button onClick={handleOpenNewRequest}>
              <Plus /> Request Lab Test
            </Button>
          </div>
        </div>
      </section>

      {isLoading ? (
        <StatsRowSkeleton />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <LabReportStatsCard
            icon={Clock3}
            tone="blue"
            title="Pending Reports"
            value={stats.pending}
            description="Requested, collected, or processing"
          />
          <LabReportStatsCard
            icon={ListChecks}
            tone="violet"
            title="Ready for Review"
            value={stats.readyForReview}
            description="Awaiting your clinical review"
          />
          <LabReportStatsCard
            icon={AlertTriangle}
            tone="orange"
            title="Abnormal Results"
            value={stats.abnormal}
            description="Abnormal or critical findings"
          />
          <LabReportStatsCard
            icon={CheckCircle2}
            tone="green"
            title="Reviewed Today"
            value={stats.reviewedToday}
            description="Reports you reviewed today"
          />
        </section>
      )}

      <Card className="gap-0 rounded-xl border-border px-5 py-5 shadow-sm">
        {isLoading ? (
          <FiltersSkeleton />
        ) : (
          <LabReportFilters
            reportStatus={reportStatus}
            onReportStatusChange={withReset(setReportStatus)}
            resultStatus={resultStatus}
            onResultStatusChange={withReset(setResultStatus)}
            testType={testType}
            onTestTypeChange={withReset(setTestType)}
            datePreset={datePreset}
            onDatePresetChange={withReset(setDatePreset)}
            customDate={customDate}
            onCustomDateChange={handleCustomDateChange}
            onClearFilters={handleClearFilters}
          />
        )}
      </Card>

      <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <LabReportTable reports={paginatedReports} onAction={handleAction} onClearFilters={handleClearFilters} />
        )}

        {!isLoading && filteredReports.length > 0 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(
              currentPage * PAGE_SIZE,
              filteredReports.length
            )} of ${filteredReports.length} lab reports`}
            className="border-t border-border px-5 py-4"
          />
        )}
      </Card>

      <LabReportDetailsSheet
        report={activeReport}
        patientReports={activeReportHistory}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onAction={handleAction}
        onSelectHistoryReport={handleSelectHistoryReport}
      />

      <ClinicalInterpretationDialog
        report={activeReport}
        open={interpretationOpen}
        onOpenChange={setInterpretationOpen}
        onSave={handleSaveInterpretation}
      />

      <RequestLabTestDialog
        open={requestTestOpen}
        onOpenChange={setRequestTestOpen}
        prefillPatientId={requestPrefillPatientId}
        onSubmit={handleSubmitLabRequest}
      />
    </div>
  );
};

export default DoctorLabReports;
