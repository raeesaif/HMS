import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SettingsCard } from './SettingsCard';

const columnLabels = ['Device', 'Browser', 'Operating System', 'IP Address', 'Last Active', ''];

export function SessionTable({ sessions, onLogoutSession }) {
  return (
    <SettingsCard title="Active Sessions" description="Devices currently signed in to your account." contentClassName="p-0">
      <div className="overflow-x-auto">
        <Table className="min-w-[720px]">
          <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
            <TableRow className="hover:bg-transparent">
              {columnLabels.map((label, index) => (
                <TableHead key={label || `col-${index}`} className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5 last:pr-5">
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session, index) => (
              <TableRow key={session.id} className={`border-b-0 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}>
                <TableCell className="px-4 py-3.5 pl-5 font-medium text-slate-900">
                  <div className="flex items-center gap-2">
                    {session.device}
                    {session.isCurrent && (
                      <Badge className="border-transparent bg-sky-600 font-medium text-white [a]:hover:bg-sky-600">
                        Current Session
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{session.browser}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{session.os}</TableCell>
                <TableCell className="px-4 py-3.5 font-mono text-xs text-slate-500">{session.ipAddress}</TableCell>
                <TableCell className="px-4 py-3.5 text-xs text-slate-500">{session.lastActive}</TableCell>
                <TableCell className="px-4 py-3.5 pr-5 text-right">
                  {!session.isCurrent && (
                    <Button variant="outline" size="sm" onClick={() => onLogoutSession(session)}>
                      Logout Session
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </SettingsCard>
  );
}
