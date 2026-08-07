import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { AlertTriangle, Bell, BellRing, CalendarClock, MailCheck, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pagination } from '@/shared/Pagination';
import { SearchInput } from '@/shared/SearchInput';
import { useNurseNotifications } from '@/hooks/useNurseNotifications';
import { NotificationStatsCard } from '@/components/nurse/notifications/NotificationStatsCard';
import { NotificationFilter } from '@/components/nurse/notifications/NotificationFilter';
import { NotificationList } from '@/components/nurse/notifications/NotificationList';
import { NotificationDetailsSheet } from '@/components/nurse/notifications/NotificationDetailsSheet';
import {
  NotificationListSkeleton,
  NotificationStatsSkeleton,
} from '@/components/nurse/notifications/LoadingSkeleton';

const PAGE_SIZE = 6;
const todayISO = () => new Date().toISOString().slice(0, 10);

const Notifications = () => {
  const { data: notifications, setData: setNotifications, loading, refetch } = useNurseNotifications();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [page, setPage] = useState(1);

  const [activeNotificationId, setActiveNotificationId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const activeNotification = notifications.find((notification) => notification.id === activeNotificationId) ?? null;
  const hasActiveFilters = statusFilter !== 'all' || priorityFilter !== 'all' || typeFilter !== 'all';

  const visibleNotifications = useMemo(
    () => notifications.filter((notification) => !notification.isArchived),
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    const query = search.trim().toLowerCase();
    return visibleNotifications.filter((notification) => {
      const matchesSearch =
        !query ||
        notification.title.toLowerCase().includes(query) ||
        notification.patientName?.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === 'all' || (statusFilter === 'unread' ? !notification.isRead : notification.isRead);
      const matchesPriority = priorityFilter === 'all' || notification.priority === priorityFilter;
      const matchesType = typeFilter === 'all' || notification.type === typeFilter;
      return matchesSearch && matchesStatus && matchesPriority && matchesType;
    });
  }, [visibleNotifications, search, statusFilter, priorityFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredNotifications.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedNotifications = filteredNotifications.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const withPageReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const clearFilters = () => {
    setStatusFilter('all');
    setPriorityFilter('all');
    setTypeFilter('all');
    setPage(1);
  };

  const updateNotification = (notificationId, updater) =>
    setNotifications((current) =>
      current.map((notification) => (notification.id === notificationId ? updater(notification) : notification))
    );

  const handleAction = (action, notification) => {
    if (action === 'view-details') {
      setActiveNotificationId(notification.id);
      setDetailsOpen(true);
    } else if (action === 'mark-as-read') {
      updateNotification(notification.id, (current) => ({ ...current, isRead: true }));
      toast.success('Notification marked as read');
    } else if (action === 'archive') {
      updateNotification(notification.id, (current) => ({ ...current, isArchived: true }));
      toast.success('Notification archived');
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const stats = {
    total: visibleNotifications.length,
    unread: visibleNotifications.filter((notification) => !notification.isRead).length,
    critical: visibleNotifications.filter((notification) => notification.priority === 'critical').length,
    today: visibleNotifications.filter((notification) => notification.createdDate === todayISO()).length,
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Notifications</h1>
          <p className="mt-1 text-sm text-slate-500">Stay updated with patient care alerts and hospital activities.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <SearchInput
            value={search}
            onChange={withPageReset(setSearch)}
            placeholder="Search patient or notification title"
            className="sm:w-72"
          />
          <Button variant="outline" onClick={refetch} disabled={loading}>
            <RefreshCw className={loading ? 'animate-spin' : ''} /> Refresh
          </Button>
          <Button onClick={handleMarkAllAsRead} disabled={loading || stats.unread === 0}>
            <MailCheck /> Mark All as Read
          </Button>
        </div>
      </section>

      {loading ? (
        <NotificationStatsSkeleton />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <NotificationStatsCard
            icon={Bell}
            tone="blue"
            count={stats.total}
            title="Total Notifications"
            description="Across all categories"
          />
          <NotificationStatsCard
            icon={BellRing}
            tone="amber"
            count={stats.unread}
            title="Unread"
            description="Awaiting your review"
          />
          <NotificationStatsCard
            icon={AlertTriangle}
            tone="red"
            count={stats.critical}
            title="Critical Alerts"
            description="Requires urgent attention"
          />
          <NotificationStatsCard
            icon={CalendarClock}
            tone="green"
            count={stats.today}
            title="Today's Notifications"
            description="Received today"
          />
        </section>
      )}

      <NotificationFilter
        status={statusFilter}
        onStatusChange={withPageReset(setStatusFilter)}
        priority={priorityFilter}
        onPriorityChange={withPageReset(setPriorityFilter)}
        type={typeFilter}
        onTypeChange={withPageReset(setTypeFilter)}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
        {loading ? (
          <NotificationListSkeleton />
        ) : (
          <NotificationList
            notifications={paginatedNotifications}
            onAction={handleAction}
            emptyTitle={visibleNotifications.length === 0 ? 'No notifications available.' : 'No matching notifications'}
            emptyDescription={
              visibleNotifications.length === 0
                ? 'Patient care alerts and hospital activity updates will appear here.'
                : 'Adjust your search or filters to see more results.'
            }
          />
        )}

        {!loading && filteredNotifications.length > 0 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            showingLabel={`Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(
              currentPage * PAGE_SIZE,
              filteredNotifications.length
            )} of ${filteredNotifications.length} notifications`}
            className="border-t border-border px-5 py-4"
          />
        )}
      </Card>

      <NotificationDetailsSheet notification={activeNotification} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </div>
  );
};

export default Notifications;
