import { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/super-admin/DatePicker';
import { announcementTypeOptions, announcementPriorityOptions, recipientOptions, channelOptions } from '@/data/superAdmin/notifications';

function CreateAnnouncementForm({ onOpenChange, onSave }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('Announcement');
  const [priority, setPriority] = useState('Medium');
  const [recipients, setRecipients] = useState('All Hospitals');
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [channels, setChannels] = useState(['Email', 'In-App']);
  const [errors, setErrors] = useState({});

  const toggleChannel = (channel, checked) => {
    setChannels((current) => (checked ? [...current, channel] : current.filter((item) => item !== channel)));
  };

  const handleSave = () => {
    const nextErrors = {};
    if (!title.trim()) nextErrors.title = 'Title is required';
    if (!message.trim()) nextErrors.message = 'Message is required';
    if (channels.length === 0) nextErrors.channels = 'Select at least one channel';
    if (scheduleEnabled && !scheduleDate) nextErrors.scheduleDate = 'Select a schedule date';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave({
      title: title.trim(),
      message: message.trim(),
      type,
      priority,
      recipients,
      channels,
      schedule: scheduleEnabled ? scheduleDate : null,
      scheduledFor: scheduleEnabled ? scheduleDate : null,
    });
    onOpenChange(false);
    toast.success(scheduleEnabled ? 'Announcement scheduled' : 'Announcement sent');
  };

  return (
    <>
      <div className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
        <div className="space-y-1">
          <FieldLabel>Title *</FieldLabel>
          <Input value={title} onChange={(event) => setTitle(event.target.value)} aria-invalid={!!errors.title} />
          {errors.title && <FieldError>{errors.title}</FieldError>}
        </div>
        <div className="space-y-1">
          <FieldLabel>Message *</FieldLabel>
          <Textarea value={message} onChange={(event) => setMessage(event.target.value)} className="min-h-24 resize-none" aria-invalid={!!errors.message} />
          {errors.message && <FieldError>{errors.message}</FieldError>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>Type</FieldLabel>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {announcementTypeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <FieldLabel>Priority</FieldLabel>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {announcementPriorityOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1">
          <FieldLabel>Recipients</FieldLabel>
          <Select value={recipients} onValueChange={setRecipients}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {recipientOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <FieldLabel>Channels</FieldLabel>
          <div className="flex flex-wrap gap-3">
            {channelOptions.map((channel) => (
              <label key={channel} className="flex items-center gap-2 text-sm">
                <Checkbox checked={channels.includes(channel)} onCheckedChange={(checked) => toggleChannel(channel, checked)} />
                {channel}
              </label>
            ))}
          </div>
          {errors.channels && <FieldError>{errors.channels}</FieldError>}
        </div>

        <div className="space-y-2 border-t border-slate-100 pt-3">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Checkbox checked={scheduleEnabled} onCheckedChange={setScheduleEnabled} />
            Schedule for later
          </label>
          {scheduleEnabled && (
            <div className="space-y-1">
              <FieldLabel>Schedule Date</FieldLabel>
              <DatePicker date={scheduleDate} onSelect={setScheduleDate} />
              {errors.scheduleDate && <FieldError>{errors.scheduleDate}</FieldError>}
            </div>
          )}
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSave}>{scheduleEnabled ? 'Schedule Announcement' : 'Send Announcement'}</Button>
      </DialogFooter>
    </>
  );
}

export function CreateNotificationDialog({ open, onOpenChange, onSave }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Send Announcement</DialogTitle>
          <DialogDescription>Broadcast a message to hospitals or admins on the platform.</DialogDescription>
        </DialogHeader>

        <CreateAnnouncementForm key={open ? 'open' : 'closed'} onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}
