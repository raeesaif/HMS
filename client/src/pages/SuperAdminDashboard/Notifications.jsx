import { useState } from 'react';
import { Megaphone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ErrorState } from '@/components/super-admin/ErrorState';
import { TableSkeleton } from '@/components/super-admin/LoadingSkeleton';
import { ReceivedNotificationsList } from '@/components/super-admin/notifications/ReceivedNotificationsList';
import { AnnouncementsTable } from '@/components/super-admin/notifications/AnnouncementsTable';
import { CreateNotificationDialog } from '@/components/dialogs/super-admin/CreateNotificationDialog';
import { NotificationDetailsDialog } from '@/components/dialogs/super-admin/NotificationDetailsDialog';
import { useNotifications, useCreateAnnouncement, useMarkNotificationAsRead } from '@/hooks/superAdmin/useNotifications';

const Notifications = () => {
  const { data, isLoading, isError, refetch } = useNotifications();
  const createAnnouncement = useCreateAnnouncement();
  const markAsRead = useMarkNotificationAsRead();

  const [tab, setTab] = useState('received');
  const [createOpen, setCreateOpen] = useState(false);
  const [activeNotification, setActiveNotification] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleCreate = (payload) => createAnnouncement.mutate(payload);

  const handleViewReceived = (notification) => {
    setActiveNotification(notification);
    setDetailsOpen(true);
    if (!notification.isRead) markAsRead.mutate(notification.id);
  };

  const handleViewAnnouncement = (announcement) => {
    setActiveNotification(announcement);
    setDetailsOpen(true);
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Notifications</h1>
          <p className="mt-1 text-sm text-slate-500">Platform notification center and hospital-wide announcements.</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Megaphone /> Send Announcement
        </Button>
      </section>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="received">Received</TabsTrigger>
          <TabsTrigger value="sent">Sent Announcements</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>
      </Tabs>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
          {isLoading || !data ? (
            <TableSkeleton rows={4} cols={6} />
          ) : tab === 'received' ? (
            <ReceivedNotificationsList notifications={data.received} onView={handleViewReceived} />
          ) : tab === 'sent' ? (
            <AnnouncementsTable announcements={data.sent} onView={handleViewAnnouncement} emptyMessage="No announcements sent yet." />
          ) : (
            <AnnouncementsTable announcements={data.scheduled} onView={handleViewAnnouncement} emptyMessage="No scheduled announcements." />
          )}
        </Card>
      )}

      <CreateNotificationDialog open={createOpen} onOpenChange={setCreateOpen} onSave={handleCreate} />
      <NotificationDetailsDialog notification={activeNotification} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </div>
  );
};

export default Notifications;
