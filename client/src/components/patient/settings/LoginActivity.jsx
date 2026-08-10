import { History } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from '@/shared/EmptyState';

const statusClass = {
  'Successful Login': 'border-transparent bg-emerald-100 text-emerald-600',
  'Failed Login': 'border-transparent bg-rose-100 text-rose-600',
  'Password Changed': 'border-transparent bg-sky-100 text-sky-600',
  '2FA Enabled': 'border-transparent bg-violet-100 text-violet-600',
};

export function LoginActivity({ activity }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="border-b border-border px-5 py-5">
        <CardTitle className="text-sm font-semibold">Login Activity</CardTitle>
        <p className="mt-0.5 text-xs text-slate-500">Recent authentication events on your account</p>
      </CardHeader>
      {activity.length === 0 ? (
        <EmptyState icon={History} title="No login activity" description="Login activity will appear here." />
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[750px]">
            <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
              <TableRow className="hover:bg-transparent">
                {['Date', 'Time', 'Device', 'Browser', 'OS', 'IP Address', 'Status'].map((label) => (
                  <TableHead key={label} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5 last:pr-5">
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {activity.map((entry, index) => (
                <TableRow key={entry.id} className={`border-b-0 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
                  <TableCell className="px-4 py-3 pl-5 text-slate-900">{entry.date}</TableCell>
                  <TableCell className="px-4 py-3 text-slate-600">{entry.time}</TableCell>
                  <TableCell className="px-4 py-3 text-slate-600">{entry.device}</TableCell>
                  <TableCell className="px-4 py-3 text-slate-600">{entry.browser}</TableCell>
                  <TableCell className="px-4 py-3 text-slate-600">{entry.os}</TableCell>
                  <TableCell className="px-4 py-3 font-mono text-xs text-slate-500">{entry.ip}</TableCell>
                  <TableCell className="px-4 py-3 pr-5">
                    <Badge variant="outline" className={statusClass[entry.status] ?? ''}>
                      {entry.status}
                    </Badge>
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
