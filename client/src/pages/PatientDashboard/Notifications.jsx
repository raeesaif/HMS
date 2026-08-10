import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CheckCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { Pagination } from '@/shared/Pagination';
import { FilterBar } from '@/components/patient/FilterBar';
import { ErrorState } from '@/components/patient/ErrorState';
import { FiltersSkeleton, TableSkeleton } from '@/components/patient/LoadingSkeleton';
import { NotificationsList } from '@/components/patient/notifications/NotificationsList';
import { NotificationDetailsDialog } from '@/components/dialogs/patient/NotificationDetailsDialog';
import { DeleteConfirmDialog } from '@/components/dialogs/common/DeleteConfirmDialog';
import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';
import { usePatientNotifications } from '@/hooks/patient/usePatientNotifications';
import { markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } from '@/services/patient/notificationService';
import { notificationTypeOptions } from '@/data/patientNotifications';

const PAGE_SIZE = 6;

const Notifications = () => {
  const navigate = useNavigate();
  const { notifications, setNotifications, isLoading, error, reload } = usePatientNotifications();

  const [search, setSearch] = useState('');
  const [readStatus, setReadStatus] = useState('all');
  const [type, setType] = useState('all');
  const [priority, setPriority] = useState('all');
  const [page, setPage] = useState(1);

  const [activeNotification, setActiveNotification] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [markAllOpen, setMarkAllOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredNotifications = useMemo(() => {
    const query = search.trim().toLowerCase();
    return notifications.filter((notification) => {
      const matchesSearch = !query || notification.title.toLowerCase().includes(query) || notification.message.toLowerCase().includes(query);
      const matchesRead = readStatus === 'all' || (readStatus === 'unread' ? !notification.isRead : notification.isRead);
      const matchesType = type === 'all' || notification.type === type;
      const matchesPriority = priority === 'all' || notification.priority === priority;
      return matchesSearch && matchesRead && matchesType && matchesPriority;
    });
  }, [notifications, search, readStatus, type, priority]);

  const totalPages = Math.max(1, Math.ceil(filteredNotifications.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedNotifications = filteredNotifications.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  const resetPage = () => setPage(1);
  const handleClearFilters = () => {
    setSearch('');
    setReadStatus('all');
    setType('all');
    setPriority('all');
    resetPage();
  };

  const markAsRead = (notificationId) => {
    markNotificationAsRead(notificationId).then(() => {
      setNotifications((current) => current.map((notification) => (notification.id === notificationId ? { ...notification, isRead: true } : notification)));
    });
  };

  const handleAction = (action, notification) => {
    setActiveNotification(notification);
    if (action === 'view-details') {
      markAsRead(notification.id);
      setDetailsOpen(true);
    } else if (action === 'mark-as-read') {
      markAsRead(notification.id);
    } else if (action === 'delete') {
      setDeleteTarget(notification);
    }
  };

  const handleNavigate = (path) => {
    setDetailsOpen(false);
    navigate(path);
  };

  const handleConfirmMarkAll = () => {
    markAllNotificationsAsRead().then(() => {
      setNotifications((current) => current.map((notification) => ({ ...notification, isRead: true })));
      setMarkAllOpen(false);
      toast.success('All notifications marked as read.');
    });
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    deleteNotification(deleteTarget.id).then(() => {
      setNotifications((current) => current.filter((notification) => notification.id !== deleteTarget.id));
      setDeleteTarget(null);
      toast.success('Notification deleted');
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="outline" className="border-sky-200 text-sky-600">
                {unreadCount} Unread
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">Stay updated on your appointments, prescriptions, and billing.</p>
        </div>
        <Button variant="outline" onClick={() => setMarkAllOpen(true)} disabled={unreadCount === 0}>
          <CheckCheck /> Mark All as Read
        </Button>
      </section>

      {error ? (
        <ErrorState onRetry={reload} />
      ) : (
        <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
          <div className="border-b border-border p-5">
            {isLoading ? (
              <FiltersSkeleton />
            ) : (
              <FilterBar>
                <SearchInput value={search} onChange={(value) => { setSearch(value); resetPage(); }} placeholder="Search notifications..." className="sm:w-64" />
                <FilterDropdown
                  label="Status"
                  value={readStatus}
                  onChange={(value) => { setReadStatus(value); resetPage(); }}
                  options={[
                    { value: 'unread', label: 'Unread' },
                    { value: 'read', label: 'Read' },
                  ]}
                />
                <FilterDropdown
                  label="Type"
                  value={type}
                  onChange={(value) => { setType(value); resetPage(); }}
                  options={notificationTypeOptions.map((option) => ({ value: option, label: option }))}
                />
                <FilterDropdown
                  label="Priority"
                  value={priority}
                  onChange={(value) => { setPriority(value); resetPage(); }}
                  options={[
                    { value: 'High', label: 'High' },
                    { value: 'Medium', label: 'Medium' },
                    { value: 'Low', label: 'Low' },
                  ]}
                />
              </FilterBar>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton rows={5} cols={4} />
          ) : (
            <NotificationsList notifications={paginatedNotifications} onAction={handleAction} onClearFilters={handleClearFilters} />
          )}

          {!isLoading && filteredNotifications.length > 0 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, filteredNotifications.length)} of ${filteredNotifications.length} notifications`}
              className="border-t border-border px-5 py-4"
            />
          )}
        </Card>
      )}

      <NotificationDetailsDialog open={detailsOpen} onOpenChange={setDetailsOpen} notification={activeNotification} onNavigate={handleNavigate} />
      <ConfirmDialog
        open={markAllOpen}
        onOpenChange={setMarkAllOpen}
        title="Mark all notifications as read?"
        description="All unread notifications will be marked as read."
        confirmLabel="Mark All as Read"
        onConfirm={handleConfirmMarkAll}
      />
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(next) => !next && setDeleteTarget(null)}
        title="Delete this notification?"
        description={deleteTarget ? `"${deleteTarget.title}" will be permanently removed.` : undefined}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Notifications;
