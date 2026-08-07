import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { AlertTriangle, CheckCircle2, ClipboardList, Filter, ListTodo, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/shared/Pagination';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { useNurseTasks } from '@/hooks/useNurseTasks';
import { taskPriorities, taskStatuses, taskWards } from '@/data/nurseTasks';
import { TaskStatsCard } from '@/components/nurse/tasks/TaskStatsCard';
import { TaskTable } from '@/components/nurse/tasks/TaskTable';
import { TaskDetailsSheet } from '@/components/nurse/tasks/TaskDetailsSheet';
import { CompleteTaskDialog } from '@/components/nurse/tasks/CompleteTaskDialog';
import { TaskStatsSkeleton, TaskTableSkeleton } from '@/components/nurse/tasks/LoadingSkeleton';

const PAGE_SIZE = 6;

const wardOptions = taskWards.map((ward) => ({ value: ward, label: ward }));

const nowTimestamp = () =>
  `Today, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

const Tasks = () => {
  const { data: tasks, setData: setTasks, loading, refetch } = useNurseTasks();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [wardFilter, setWardFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const [activeTaskId, setActiveTaskId] = useState(null);
  const [openPanel, setOpenPanel] = useState(null);

  const activeTask = tasks.find((task) => task.id === activeTaskId) ?? null;
  const hasActiveFilters =
    statusFilter !== 'all' || priorityFilter !== 'all' || wardFilter !== 'all' || Boolean(dateFilter);

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.patientName.toLowerCase().includes(query) ||
        task.taskName.toLowerCase().includes(query) ||
        task.doctor.toLowerCase().includes(query);
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      const matchesWard = wardFilter === 'all' || task.ward === wardFilter;
      const matchesDate = !dateFilter || task.taskDate === dateFilter;
      return matchesSearch && matchesStatus && matchesPriority && matchesWard && matchesDate;
    });
  }, [tasks, search, statusFilter, priorityFilter, wardFilter, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const withPageReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const clearFilters = () => {
    setStatusFilter('all');
    setPriorityFilter('all');
    setWardFilter('all');
    setDateFilter('');
    setPage(1);
  };

  const handlePanelOpenChange = (next) => {
    if (!next) setOpenPanel(null);
  };

  const updateTask = (taskId, updater) =>
    setTasks((current) => current.map((task) => (task.id === taskId ? updater(task) : task)));

  const handleAction = (action, task) => {
    setActiveTaskId(task.id);
    if (action === 'view-details') {
      setOpenPanel('details');
    } else if (action === 'start-task') {
      updateTask(task.id, (current) => ({
        ...current,
        status: 'in-progress',
        timeline: { ...current.timeline, startedAt: nowTimestamp() },
      }));
      toast.success(`${task.taskName} started for ${task.patientName}`);
    } else if (action === 'complete-task') {
      setOpenPanel('complete');
    } else if (action === 'add-notes') {
      toast.success(`Nursing notes flow opened for ${task.patientName}`);
    } else if (action === 'request-doctor-review') {
      toast.success(`${task.doctor} notified about ${task.taskName} for ${task.patientName}`);
    } else if (action === 'report-issue') {
      toast.success(`Issue reported for task ${task.id}`);
    }
  };

  const handleConfirmComplete = (taskId, form) => {
    updateTask(taskId, (task) => ({
      ...task,
      status: 'completed',
      timeline: {
        ...task.timeline,
        startedAt: task.timeline.startedAt || nowTimestamp(),
        completedAt: nowTimestamp(),
        completedBy: 'Nurse E. Owusu',
      },
      completionNotes: form.completionNotes,
    }));
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === 'pending').length,
    completed: tasks.filter((task) => task.status === 'completed').length,
    highPriority: tasks.filter((task) => task.priority === 'high' || task.priority === 'emergency').length,
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Tasks</h1>
          <p className="mt-1 text-sm text-slate-500">Manage and complete assigned nursing tasks.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <SearchInput
            value={search}
            onChange={withPageReset(setSearch)}
            placeholder="Search patient, task or doctor"
            className="sm:w-72"
          />
          <Button variant="outline" onClick={() => setShowFilters((prev) => !prev)} aria-expanded={showFilters}>
            <Filter /> Filters
          </Button>
          <Button variant="outline" onClick={refetch} disabled={loading}>
            <RefreshCw className={loading ? 'animate-spin' : ''} /> Refresh
          </Button>
        </div>
      </section>

      {showFilters && (
        <section className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-white p-3">
          <FilterDropdown
            label="Task Status"
            allLabel="All Statuses"
            value={statusFilter}
            onChange={withPageReset(setStatusFilter)}
            options={taskStatuses}
          />
          <FilterDropdown
            label="Priority"
            allLabel="All Priorities"
            value={priorityFilter}
            onChange={withPageReset(setPriorityFilter)}
            options={taskPriorities}
          />
          <FilterDropdown
            label="Ward"
            allLabel="All Wards"
            value={wardFilter}
            onChange={withPageReset(setWardFilter)}
            options={wardOptions}
          />
          <Input
            type="date"
            value={dateFilter}
            onChange={(event) => withPageReset(setDateFilter)(event.target.value)}
            className="h-10 w-full sm:w-40"
            aria-label="Task date"
          />
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </section>
      )}

      {loading ? (
        <TaskStatsSkeleton />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <TaskStatsCard icon={ListTodo} tone="blue" count={stats.total} title="Total Tasks" description="Assigned to you today" />
          <TaskStatsCard icon={ClipboardList} tone="amber" count={stats.pending} title="Pending Tasks" description="Not yet started" />
          <TaskStatsCard icon={CheckCircle2} tone="green" count={stats.completed} title="Completed Tasks" description="Finished today" />
          <TaskStatsCard icon={AlertTriangle} tone="red" count={stats.highPriority} title="High Priority Tasks" description="High or emergency priority" />
        </section>
      )}

      <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
        {loading ? (
          <TaskTableSkeleton />
        ) : (
          <TaskTable
            tasks={paginatedTasks}
            onAction={handleAction}
            emptyTitle={tasks.length === 0 ? 'No nursing tasks assigned.' : 'No matching tasks'}
            emptyDescription={
              tasks.length === 0
                ? 'Tasks assigned to you will appear here.'
                : 'Adjust your search or filters to see more results.'
            }
          />
        )}

        {!loading && filteredTasks.length > 0 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(
              currentPage * PAGE_SIZE,
              filteredTasks.length
            )} of ${filteredTasks.length} tasks`}
            className="border-t border-border px-5 py-4"
          />
        )}
      </Card>

      <TaskDetailsSheet task={activeTask} open={openPanel === 'details'} onOpenChange={handlePanelOpenChange} />
      <CompleteTaskDialog
        task={activeTask}
        open={openPanel === 'complete'}
        onOpenChange={handlePanelOpenChange}
        onConfirm={handleConfirmComplete}
      />
    </div>
  );
};

export default Tasks;
