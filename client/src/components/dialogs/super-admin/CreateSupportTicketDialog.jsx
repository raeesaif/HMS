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
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ticketCategoryOptions, ticketPriorityOptions } from '@/data/superAdmin/support';
import { hospitals } from '@/data/superAdmin/hospitals';

function CreateTicketForm({ onOpenChange, onSave }) {
  const [hospitalId, setHospitalId] = useState('');
  const [userName, setUserName] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const nextErrors = {};
    if (!hospitalId) nextErrors.hospitalId = 'Select a hospital';
    if (!userName.trim()) nextErrors.userName = 'Contact name is required';
    if (!subject.trim()) nextErrors.subject = 'Subject is required';
    if (!category) nextErrors.category = 'Select a category';
    if (!description.trim()) nextErrors.description = 'Description is required';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const hospital = hospitals.find((h) => h.id === hospitalId);
    onSave({
      hospitalId,
      hospitalName: hospital?.name ?? 'Unknown Hospital',
      userName: userName.trim(),
      subject: subject.trim(),
      category,
      priority,
      messages: [{ id: `m-${Date.now()}`, author: userName.trim(), body: description.trim(), timestamp: new Date().toLocaleString() }],
    });
    onOpenChange(false);
    toast.success('Support ticket created');
  };

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>Hospital *</FieldLabel>
            <Select value={hospitalId} onValueChange={setHospitalId}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.hospitalId}>
                <SelectValue placeholder="Select hospital" />
              </SelectTrigger>
              <SelectContent>
                {hospitals.map((hospital) => (
                  <SelectItem key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.hospitalId && <FieldError>{errors.hospitalId}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Contact Name *</FieldLabel>
            <Input value={userName} onChange={(event) => setUserName(event.target.value)} aria-invalid={!!errors.userName} />
            {errors.userName && <FieldError>{errors.userName}</FieldError>}
          </div>
        </div>

        <div className="space-y-1">
          <FieldLabel>Subject *</FieldLabel>
          <Input value={subject} onChange={(event) => setSubject(event.target.value)} aria-invalid={!!errors.subject} />
          {errors.subject && <FieldError>{errors.subject}</FieldError>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>Category *</FieldLabel>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.category}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {ticketCategoryOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <FieldError>{errors.category}</FieldError>}
          </div>
          <div className="space-y-1">
            <FieldLabel>Priority</FieldLabel>
            <Select value={priority} onValueChange={setPriority}>
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
        </div>

        <div className="space-y-1">
          <FieldLabel>Description *</FieldLabel>
          <Textarea value={description} onChange={(event) => setDescription(event.target.value)} className="min-h-24 resize-none" aria-invalid={!!errors.description} />
          {errors.description && <FieldError>{errors.description}</FieldError>}
        </div>
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button onClick={handleSave}>Create Ticket</Button>
      </DialogFooter>
    </>
  );
}

export function CreateSupportTicketDialog({ open, onOpenChange, onSave }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Support Ticket</DialogTitle>
          <DialogDescription>Log a new support ticket on behalf of a hospital.</DialogDescription>
        </DialogHeader>

        <CreateTicketForm key={open ? 'open' : 'closed'} onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}
