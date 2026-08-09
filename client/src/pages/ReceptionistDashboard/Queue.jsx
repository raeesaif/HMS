import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { ReceptionStatsCard } from '@/components/reception/ReceptionStatsCard';
import { FilterBar } from '@/components/reception/FilterBar';
import { ErrorState } from '@/components/reception/ErrorState';
import { StatsRowSkeleton, TableSkeleton } from '@/components/reception/LoadingSkeleton';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { QueueTable } from '@/components/reception/queue/QueueTable';
import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';
import { DeleteConfirmDialog } from '@/components/dialogs/common/DeleteConfirmDialog';
import { useQueue } from '@/hooks/useQueue';
import { callPatient, markWithDoctor, completeQueueEntry, removeFromQueue } from '@/services/queueService';
import { getQueueSummary, queueStatusOptions } from '@/data/receptionistQueue';

const ACTION_LABELS = {
  call: { title: 'Call this patient?', description: 'The patient will be called to proceed to the doctor.', confirmLabel: 'Call Patient' },
  'with-doctor': { title: 'Mark as with doctor?', description: 'This updates the queue status to reflect the patient is now with the doctor.', confirmLabel: 'Confirm' },
  complete: { title: 'Complete this queue entry?', description: 'This marks the consultation as complete and removes the patient from the active queue.', confirmLabel: 'Complete' },
  skip: { title: 'Skip this patient?', description: 'The patient will be moved to the back of the queue.', confirmLabel: 'Skip' },
};

const actionHandlers = {
  call: callPatient,
  'with-doctor': markWithDoctor,
  complete: completeQueueEntry,
  skip: removeFromQueue,
};

const statusAfterAction = {
  call: 'Called',
  'with-doctor': 'With Doctor',
  complete: 'Completed',
  skip: 'Waiting',
};

const Queue = () => {
  const { queue, setQueue, isLoading, error, reload } = useQueue();

  const [status, setStatus] = useState('all');
  const [activeEntry, setActiveEntry] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [removeTarget, setRemoveTarget] = useState(null);

  const filteredQueue = useMemo(() => {
    return queue.filter((entry) => status === 'all' || entry.status === status);
  }, [queue, status]);

  const summary = useMemo(() => getQueueSummary(queue), [queue]);

  const handleAction = (action, entry) => {
    if (action === 'remove') {
      setRemoveTarget(entry);
      return;
    }
    setActiveEntry(entry);
    setPendingAction(action);
  };

  const closePending = (next) => {
    if (!next) {
      setPendingAction(null);
      setActiveEntry(null);
    }
  };

  const handleConfirmAction = () => {
    if (!activeEntry || !pendingAction) return;
    const request = actionHandlers[pendingAction];
    request(activeEntry.id).then(() => {
      setQueue((current) =>
        current.map((entry) => (entry.id === activeEntry.id ? { ...entry, status: statusAfterAction[pendingAction] } : entry))
      );
      toast.success(`${activeEntry.patientName} — ${ACTION_LABELS[pendingAction].confirmLabel.toLowerCase()}d`);
    });
    setPendingAction(null);
    setActiveEntry(null);
  };

  const handleRemove = () => {
    if (!removeTarget) return;
    removeFromQueue(removeTarget.id).then(() => {
      setQueue((current) => current.map((entry) => (entry.id === removeTarget.id ? { ...entry, status: 'Cancelled' } : entry)));
      toast.success(`${removeTarget.patientName} removed from the queue`);
    });
    setRemoveTarget(null);
  };

  const actionCopy = pendingAction ? ACTION_LABELS[pendingAction] : null;

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Waiting Queue</h1>
        <p className="mt-1 text-sm text-slate-500">Track and manage the live patient waiting queue.</p>
      </section>

      {isLoading ? (
        <StatsRowSkeleton count={3} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-3">
          <ReceptionStatsCard icon="clock" tone="amber" value={summary.waitingCount} title="Current Waiting Count" />
          <ReceptionStatsCard icon="clock" tone="blue" value={`${summary.averageWaitMinutes} min`} title="Average Waiting Time" />
          <ReceptionStatsCard
            icon="users"
            tone="red"
            value={summary.longestWaitingPatient?.patientName ?? '—'}
            title="Longest Waiting Patient"
            description={summary.longestWaitingPatient ? `${summary.longestWaitingPatient.waitingMinutes} minutes` : undefined}
          />
        </section>
      )}

      {error ? (
        <ErrorState onRetry={reload} />
      ) : (
        <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
          <div className="border-b border-border p-5">
            <FilterBar>
              <FilterDropdown label="Status" value={status} onChange={setStatus} options={queueStatusOptions.map((option) => ({ value: option, label: option }))} />
            </FilterBar>
          </div>

          {isLoading ? (
            <TableSkeleton rows={5} cols={8} />
          ) : (
            <QueueTable queue={filteredQueue} onAction={handleAction} onClearFilters={() => setStatus('all')} />
          )}
        </Card>
      )}

      <ConfirmDialog
        open={!!pendingAction}
        onOpenChange={closePending}
        title={actionCopy?.title}
        description={actionCopy?.description}
        confirmLabel={actionCopy?.confirmLabel}
        onConfirm={handleConfirmAction}
      />

      <DeleteConfirmDialog
        open={!!removeTarget}
        onOpenChange={(next) => !next && setRemoveTarget(null)}
        title="Remove from queue?"
        description={removeTarget ? `${removeTarget.patientName} will be removed from the waiting queue.` : undefined}
        confirmLabel="Remove"
        onConfirm={handleRemove}
      />
    </div>
  );
};

export default Queue;
