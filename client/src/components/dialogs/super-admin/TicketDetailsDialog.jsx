import { useState } from 'react';
import { toast } from 'sonner';
import { Paperclip, Send } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FieldLabel } from '@/components/ui/field';
import { StatusBadge } from '@/components/super-admin/StatusBadge';
import { PriorityBadge } from '@/components/super-admin/PriorityBadge';
import { ticketStatusMap } from '@/components/super-admin/statusMaps';
import { ticketPriorityOptions, ticketStatusOptions, staffOptions } from '@/data/superAdmin/support';

export function TicketDetailsDialog({ ticket, open, onOpenChange, onReply, onAssign, onStatusChange, onPriorityChange }) {
  const [reply, setReply] = useState('');

  if (!ticket) return null;

  const handleSendReply = () => {
    if (!reply.trim()) return;
    onReply(ticket.id, { body: reply.trim(), timestamp: new Date().toLocaleString() });
    setReply('');
    toast.success('Reply sent');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={ticket.status} map={ticketStatusMap} />
            <PriorityBadge priority={ticket.priority} />
          </div>
          <DialogTitle>{ticket.subject}</DialogTitle>
          <DialogDescription>
            {ticket.id} · {ticket.hospitalName} · {ticket.userName}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="space-y-1">
            <FieldLabel>Status</FieldLabel>
            <Select value={ticket.status} onValueChange={(value) => onStatusChange(ticket.id, value)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ticketStatusOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <FieldLabel>Priority</FieldLabel>
            <Select value={ticket.priority} onValueChange={(value) => onPriorityChange(ticket.id, value)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ticketPriorityOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <FieldLabel>Assigned To</FieldLabel>
            <Select value={ticket.assignedTo} onValueChange={(value) => onAssign(ticket.id, value)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {staffOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Conversation</p>
          <div className="max-h-64 space-y-2 overflow-y-auto rounded-lg border border-slate-200 p-3">
            {ticket.messages.map((message) => (
              <div key={message.id} className="rounded-lg bg-slate-50 p-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-700">{message.author}</p>
                  <p className="text-[11px] text-slate-400">{message.timestamp}</p>
                </div>
                <p className="mt-1 text-sm text-slate-700">{message.body}</p>
              </div>
            ))}
          </div>
        </div>

        {ticket.attachments.length > 0 && (
          <div className="space-y-1.5">
            {ticket.attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
                <Paperclip className="size-3.5 text-slate-400" />
                {attachment.name}
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2 border-t border-slate-100 pt-3">
          <FieldLabel>Reply</FieldLabel>
          <Textarea value={reply} onChange={(event) => setReply(event.target.value)} className="min-h-20 resize-none" placeholder="Type your reply..." />
          <div className="flex justify-end">
            <Button onClick={handleSendReply} disabled={!reply.trim()}>
              <Send /> Send Reply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
