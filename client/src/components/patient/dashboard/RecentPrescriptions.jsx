import { Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from '@/shared/EmptyState';

export function RecentPrescriptions({ prescriptions = [], onViewAll }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-5">
        <CardTitle className="text-base font-semibold">Recent Prescriptions</CardTitle>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View All
        </Button>
      </CardHeader>
      {prescriptions.length === 0 ? (
        <EmptyState icon={Pill} title="No active prescriptions." />
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[600px]">
            <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
              <TableRow className="hover:bg-transparent">
                {['Medicine', 'Doctor', 'Dosage', 'Frequency', 'Start Date', 'End Date'].map((label) => (
                  <TableHead key={label} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5">
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptions.map((prescription, index) => (
                <TableRow key={prescription.id} className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
                  <TableCell className="px-4 py-3 pl-5 text-sm font-medium text-slate-900">{prescription.medicine}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-slate-600">{prescription.doctorName}</TableCell>
                  <TableCell className="px-4 py-3 text-xs text-slate-500">{prescription.dosage}</TableCell>
                  <TableCell className="px-4 py-3 text-xs text-slate-500">{prescription.frequency}</TableCell>
                  <TableCell className="px-4 py-3 text-xs text-slate-500">{prescription.startDate}</TableCell>
                  <TableCell className="px-4 py-3 text-xs text-slate-500">{prescription.endDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}
