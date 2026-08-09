import { AlertTriangle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LabResultStatusBadge } from './LabResultStatusBadge';

export function LabResultTable({ results = [] }) {
  if (results.length === 0) {
    return <p className="text-sm text-slate-500">No results available yet. This report is still being processed.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <Table className="min-w-[520px]">
        <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
          <TableRow className="hover:bg-transparent">
            {['Test', 'Result', 'Unit', 'Reference Range', 'Status'].map((label) => (
              <TableHead key={label} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-4 last:pr-4">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => {
            const isAbnormal = result.status !== 'Normal';
            return (
              <TableRow
                key={`${result.test}-${index}`}
                className={`border-b-0 ${isAbnormal ? 'bg-rose-50/50' : index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}
              >
                <TableCell className="px-4 py-3 pl-4 font-medium text-slate-900">{result.test}</TableCell>
                <TableCell className={`px-4 py-3 ${isAbnormal ? 'font-semibold text-rose-600' : 'text-slate-700'}`}>
                  <span className="inline-flex items-center gap-1.5">
                    {isAbnormal && <AlertTriangle className="size-3.5 text-rose-500" />}
                    {result.result}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-slate-500">{result.unit}</TableCell>
                <TableCell className="px-4 py-3 text-slate-500">{result.referenceRange}</TableCell>
                <TableCell className="px-4 py-3 pr-4">
                  <LabResultStatusBadge status={result.status} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
