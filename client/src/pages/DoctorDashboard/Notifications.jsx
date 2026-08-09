import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AlertOctagon, Bell, BellRing, CalendarClock, CheckCheck, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchInput } from '@/shared/SearchInput';
import { Pagination } from '@/shared/Pagination';
import { EmptyState } from '@/shared/EmptyState';
import { doctorNotifications } from '@/data/doctorNotifications';
import { doctorProfile } from '@/data/doctor';
import { NotificationStatsCard } from '@/components/doctor/notifications/NotificationStatsCard';
import { NotificationFilters } from '@/components/doctor/notifications/NotificationFilters';
import { NotificationList } from '@/components/doctor/notifications/NotificationList';
import { NotificationDetailsDialog } from '@/components/dialogs/doctor/NotificationDetailsDialog';
import { MarkAllNotificationsDialog } from '@/components/dialogs/doctor/MarkAllNotificationsDialog';
import { ArchiveNotificationDialog } from '@/components/dialogs/doctor/ArchiveNotificationDialog';
import { StatsRowSkeleton, FiltersSkeleton, NotificationListSkeleton } from '@/components/doctor/notifications/LoadingSkeleton';

const PAGE_SIZE = 6;

const toISODate = (date) => date.toISOString().slice(0, 10);

const DEFAULT_FILTERS = { status: 'all', priority: 'all', type: 'all', datePreset: 'all', customDate: null };

const DoctorNotifications = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(doctorNotifications);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(DEFAULT_FILTERS.status);
  const [priority, setPriority] = useState(DEFAULT_FILTERS.priority);
  const [type, setType] = useState(DEFAULT_FILTERS.type);
  const [datePreset, setDatePreset] = useState(DEFAULT_FILTERS.datePreset);
  const [customDate, setCustomDate] = useState(DEFAULT_FILTERS.customDate);
  const [page, setPage] = useState(1);

  const [activeNotificationId, setActiveNotificationId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [markAllOpen, setMarkAllOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const activeNotification = notifications.find((n) => n.id === activeNotificationId) ?? null;
  const activeNotifications = useMemo(() => notifications.filter((n) => !n.archived), [notifications]);

  const { todayISO, yesterdayISO, weekStartISO } = useMemo(() => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const weekStart = new Date();
    weekStart.setDate(today.getDate() - 6);
    return { todayISO: toISODate(today), yesterdayISO: toISODate(yesterday), weekStartISO: toISODate(weekStart) };
  }, []);

  const matchesDatePreset = (createdAt) => {
    const isoDate = createdAt.slice(0, 10);
    if (datePreset === 'all') return true;
    if (datePreset === 'today') return isoDate === todayISO;
    if (datePreset === 'yesterday') return isoDate === yesterdayISO;
    if (datePreset === 'week') return isoDate >= weekStartISO && isoDate <= todayISO;
    if (datePreset === 'custom') return customDate ? isoDate === customDate : true;
    return true;
  };

  const filteredNotifications = useMemo(() => {
    const query = search.trim().toLowerCase();
    return activeNotifications
      .filter((notification) => {
        const matchesSearch =
          !query ||
          notification.title.toLowerCase().includes(query) ||
          notification.message.toLowerCase().includes(query);
        const matchesStatus =
          status === 'all' || (status === 'unread' ? !notification.isRead : notification.isRead);
        const matchesPriority = priority === 'all' || notification.priority === priority;
        const matchesType = type === 'all' || notification.type === type;
        return matchesSearch && matchesStatus && matchesPriority && matchesType && matchesDatePreset(notification.createdAt);
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNotifications, search, status, priority, type, datePreset, customDate, todayISO, yesterdayISO, weekStartISO]);

  const totalPages = Math.max(1, Math.ceil(filteredNotifications.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedNotifications = filteredNotifications.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const unreadCount = activeNotifications.filter((n) => !n.isRead).length;
  const stats = {
    total: activeNotifications.length,
    unread: unreadCount,
    critical: activeNotifications.filter((n) => n.priority === 'Critical').length,
    today: activeNotifications.filter((n) => n.createdAt.slice(0, 10) === todayISO).length,
  };

  const resetPage = () => setPage(1);

  const handleSearchChange = (value) => {
    setSearch(value);
    resetPage();
  };

  const withReset = (setter) => (value) => {
    setter(value);
    resetPage();
  };

  const handleCustomDateChange = (date) => {
    setCustomDate(toISODate(date));
    resetPage();
  };

  const handleClearFilters = () => {
    setSearch('');
    setStatus(DEFAULT_FILTERS.status);
    setPriority(DEFAULT_FILTERS.priority);
    setType(DEFAULT_FILTERS.type);
    setDatePreset(DEFAULT_FILTERS.datePreset);
    setCustomDate(DEFAULT_FILTERS.customDate);
    resetPage();
  };

  const loadNotifications = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  const handleRefresh = () => {
    loadNotifications();
    toast.success('Notifications refreshed');
  };

  const markAsRead = (notificationId) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId && !notification.isRead
          ? { ...notification, isRead: true, readAt: new Date().toISOString(), readBy: `Dr. ${doctorProfile.name}` }
          : notification
      )
    );
  };

  const handleAction = (action, notification) => {
    setActiveNotificationId(notification.id);

    switch (action) {
      case 'view-details':
        markAsRead(notification.id);
        setDetailsOpen(true);
        break;
      case 'mark-as-read':
        markAsRead(notification.id);
        break;
      case 'go-to-lab-report':
        markAsRead(notification.id);
        navigate('/doctor/lab-reports');
        break;
      case 'go-to-prescription':
        markAsRead(notification.id);
        navigate('/doctor/prescriptions');
        break;
      case 'go-to-appointment':
        markAsRead(notification.id);
        navigate('/doctor/appointments');
        break;
      case 'go-to-patient':
        markAsRead(notification.id);
        navigate('/doctor/patients');
        break;
      case 'archive':
        setArchiveOpen(true);
        break;
      default:
        break;
    }
  };

  const handleNavigateFromDetails = (path) => {
    setDetailsOpen(false);
    navigate(path);
  };

  const handleConfirmArchive = () => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === activeNotificationId ? { ...notification, archived: true } : notification
      )
    );
    setArchiveOpen(false);
    toast.success('Notification archived');
  };

  const handleConfirmMarkAll = () => {
    const now = new Date().toISOString();
    setNotifications((current) =>
      current.map((notification) =>
        !notification.isRead
          ? { ...notification, isRead: true, readAt: now, readBy: `Dr. ${doctorProfile.name}` }
          : notification
      )
    );
    setMarkAllOpen(false);
    toast.success('All notifications marked as read.');
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-card px-5 py-5 shadow-sm lg:flex-row lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="outline" className="border-sky-200 text-sky-600">
                {unreadCount} Unread
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">Stay updated with important patient care and hospital activities.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setMarkAllOpen(true)} disabled={unreadCount === 0}>
            <CheckCheck /> Mark All as Read
          </Button>
          <Button variant="outline" size="icon" onClick={handleRefresh} aria-label="Refresh notifications">
            <RefreshCw className="size-4" />
          </Button>
        </div>
      </section>

      {isLoading ? (
        <StatsRowSkeleton />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <NotificationStatsCard
            icon={Bell}
            tone="blue"
            title="Total Notifications"
            value={stats.total}
            description="Active notifications for you"
          />
          <NotificationStatsCard
            icon={BellRing}
            tone="amber"
            title="Unread"
            value={stats.unread}
            description="Notifications awaiting review"
          />
          <NotificationStatsCard
            icon={AlertOctagon}
            tone="red"
            title="Critical Alerts"
            value={stats.critical}
            description="Requiring immediate attention"
          />
          <NotificationStatsCard
            icon={CalendarClock}
            tone="green"
            title="Today's Notifications"
            value={stats.today}
            description="Received today"
          />
        </section>
      )}

      <Card className="gap-0 rounded-xl border-border px-5 py-5 shadow-sm">
        {isLoading ? (
          <FiltersSkeleton />
        ) : (
          <div className="flex flex-col gap-3">
            <SearchInput
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by title, patient, or description"
              className="w-full sm:w-80"
            />
            <NotificationFilters
              status={status}
              onStatusChange={withReset(setStatus)}
              priority={priority}
              onPriorityChange={withReset(setPriority)}
              type={type}
              onTypeChange={withReset(setType)}
              datePreset={datePreset}
              onDatePresetChange={withReset(setDatePreset)}
              customDate={customDate}
              onCustomDateChange={handleCustomDateChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        )}
      </Card>

      <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
        {hasError ? (
          <EmptyState
            icon={AlertOctagon}
            title="Unable to load notifications."
            description="Something went wrong while loading your notifications."
            action={
              <Button size="sm" onClick={loadNotifications}>
                Try Again
              </Button>
            }
            className="py-16"
          />
        ) : isLoading ? (
          <NotificationListSkeleton />
        ) : (
          <NotificationList notifications={paginatedNotifications} onAction={handleAction} onClearFilters={handleClearFilters} />
        )}

        {!isLoading && !hasError && filteredNotifications.length > 0 && (
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

      <NotificationDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        notification={activeNotification}
        onNavigate={handleNavigateFromDetails}
      />
      <MarkAllNotificationsDialog open={markAllOpen} onOpenChange={setMarkAllOpen} onConfirm={handleConfirmMarkAll} />
      <ArchiveNotificationDialog open={archiveOpen} onOpenChange={setArchiveOpen} onConfirm={handleConfirmArchive} />
    </div>
  );
};

export default DoctorNotifications;
