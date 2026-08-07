import { ClipboardList, TriangleAlert } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from '@/shared/EmptyState';
import { TaskStatusBadge } from './TaskStatusBadge';
import { TaskPriorityBadge } from './TaskPriorityBadge';
import { TaskActionsMenu } from './TaskActionsMenu';
import { getTaskAlerts } from './getTaskAlerts';

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const columnLabels = [
  'Task ID',
  'Patient',
  'Assigned Doctor',
  'Task Name',
  'Ward',
  'Priority',
  'Due Time',
  'Status',
  'Assigned Date',
  'Actions',
];

export function TaskTable({
  tasks,
  onAction,
  emptyTitle = 'No nursing tasks assigned.',
  emptyDescription = 'Adjust your search or filters to see more results.',
}) {
  if (tasks.length === 0) {
    return <EmptyState icon={ClipboardList} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[1250px]">
        <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
          <TableRow className="hover:bg-transparent">
            {columnLabels.map((label) => (
              <TableHead
                key={label}
                className={`h-auto px-4 py-3 text-[11px] font-medium text-slate-500 first:pl-5 last:pr-5 ${
                  label === 'Actions' ? 'text-right' : ''
                }`}
              >
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task, index) => {
            const hasAlerts = getTaskAlerts(task).length > 0;
            return (
              <TableRow
                key={task.id}
                className={`border-b-0 hover:bg-slate-50 ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}
              >
                <TableCell className="px-4 py-3.5 pl-5 font-mono text-xs text-slate-500">{task.id}</TableCell>
                <TableCell className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm">
                      <AvatarFallback className="bg-sky-100 text-sky-600">{getInitials(task.patientName)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-slate-900">{task.patientName}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{task.doctor}</TableCell>
                <TableCell className="px-4 py-3.5 font-medium text-slate-900">{task.taskName}</TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{task.ward}</TableCell>
                <TableCell className="px-4 py-3.5"><TaskPriorityBadge priority={task.priority} /></TableCell>
                <TableCell className="px-4 py-3.5 text-slate-600">{task.dueTime}</TableCell>
                <TableCell className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <TaskStatusBadge status={task.status} />
                    {hasAlerts && <TriangleAlert className="size-3.5 text-amber-500" aria-label="Needs attention" />}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3.5 text-xs text-slate-500">{task.assignedDate}</TableCell>
                <TableCell className="px-4 py-3.5 pr-5 text-right">
                  <TaskActionsMenu task={task} onAction={onAction} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
