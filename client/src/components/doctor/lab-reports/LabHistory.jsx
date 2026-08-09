import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LabResultStatusBadge } from './LabResultStatusBadge';

function summarizeResult(results) {
  if (!results || results.length === 0) return 'Pending';
  if (results.length === 1) return `${results[0].result} ${results[0].unit}`.trim();
  return `${results.length} results`;
}

export function LabHistory({ reports = [], onViewReport }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Patient Lab History</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        {reports.length === 0 ? (
          <p className="text-sm text-slate-500">No laboratory history available.</p>
        ) : (
          <div className="space-y-2">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">{report.testName}</p>
                  <p className="text-xs text-slate-500">
                    {report.reportDate || report.requestedDate} · {summarizeResult(report.results)} ·{' '}
                    {report.orderingDoctor}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <LabResultStatusBadge status={report.resultStatus} />
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    title="View Report"
                    aria-label="View Report"
                    onClick={() => onViewReport(report)}
                  >
                    <Eye className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
