import { useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function DatePicker({ date, onSelect, placeholder = 'Pick a date', className = '' }) {
  const [open, setOpen] = useState(false);
  const label = date
    ? new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
    : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button type="button" variant="outline" className={`w-full justify-start gap-2 ${className}`} />}>
        <CalendarIcon className="size-4" />
        {label}
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          selected={date}
          onSelect={(nextDate) => {
            onSelect?.(nextDate);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
