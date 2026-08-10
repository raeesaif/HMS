import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from '@/shared/EmptyState';
import { StatusBadge } from '@/components/patient/StatusBadge';
import { recordStatusMap } from '@/components/patient/statusMaps';

export function RecentMedicalRecords({ records = [], onViewAll, onView }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">Recent Medical Records</CardTitle>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View All
        </Button>
      </CardHeader>
      {records.length === 0 ? (
        <EmptyState icon={FileText} title="No medical records available." />
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[560px]">
            <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
              <TableRow className="hover:bg-transparent">
                {['Date', 'Doctor', 'Department', 'Type', 'Status'].map((label) => (
                  <TableHead key={label} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5">
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record, index) => (
                <TableRow
                  key={record.id}
                  onClick={() => onView(record)}
                  className={`cursor-pointer border-b-0 hover:bg-slate-50 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}
                >
                  <TableCell className="px-4 py-3 pl-5 text-sm text-slate-900">{record.date}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-slate-600">{record.doctorName}</TableCell>
                  <TableCell className="px-4 py-3 text-xs text-slate-500">{record.department}</TableCell>
                  <TableCell className="px-4 py-3 text-xs text-slate-500">{record.visitType}</TableCell>
                  <TableCell className="px-4 py-3">
                    <StatusBadge status={record.status} map={recordStatusMap} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}
