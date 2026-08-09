import { FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { LabReportCard } from './LabReportCard';
import { EmptyState } from '@/shared/EmptyState';
import { CardListSkeleton } from './LoadingSkeleton';

export function PendingLabReports({
  reports = [],
  isLoading = false,
  onViewAll,
  onViewReport,
  onReviewResult,
}) {
  return (
    <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-5">
        <div>
          <CardTitle className="text-base font-semibold">Pending Lab Reports</CardTitle>
          <p className="mt-0.5 text-xs text-slate-500">Results awaiting your review</p>
        </div>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View All Lab Reports
        </Button>
      </CardHeader>
      <div className="space-y-2.5 px-5 py-5">
        {isLoading ? (
          <CardListSkeleton count={3} />
        ) : reports.length === 0 ? (
          <EmptyState
            icon={FlaskConical}
            title="No pending lab reports"
            description="All lab results have been reviewed."
          />
        ) : (
          reports.map((report) => (
            <LabReportCard
              key={report.id}
              report={report}
              onViewReport={onViewReport}
              onReviewResult={onReviewResult}
            />
          ))
        )}
      </div>
    </Card>
  );
}
