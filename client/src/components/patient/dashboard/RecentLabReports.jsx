import { FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/patient/StatusBadge';
import { labReportStatusMap } from '@/components/patient/statusMaps';

export function RecentLabReports({ reports = [], onViewAll }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">Recent Lab Reports</CardTitle>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View All
        </Button>
      </CardHeader>
      {reports.length === 0 ? (
        <EmptyState icon={FlaskConical} title="No laboratory reports available." />
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[560px]">
            <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
              <TableRow className="hover:bg-transparent">
                {['Test', 'Ordered By', 'Date', 'Status', 'Result'].map((label) => (
                  <TableHead key={label} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5">
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report, index) => (
                <TableRow key={report.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
                  <TableCell className="px-4 py-3 pl-5 text-sm font-medium text-slate-900">{report.testName}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-slate-600">{report.orderedBy}</TableCell>
                  <TableCell className="px-4 py-3 text-xs text-slate-500">{report.sampleDate}</TableCell>
                  <TableCell className="px-4 py-3">
                    <StatusBadge status={report.status} map={labReportStatusMap} />
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs text-slate-500">{report.status === 'Completed' ? 'Available' : 'Not available'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}
