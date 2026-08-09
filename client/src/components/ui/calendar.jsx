import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function toDateKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function Calendar({ selected, onSelect, className = '' }) {
  const [viewDate, setViewDate] = useState(() => (selected ? new Date(selected) : new Date()));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const startOffset = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayKey = toDateKey(new Date());
  const selectedKey = selected ? toDateKey(new Date(selected)) : null;

  const cells = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const goToMonth = (delta) => setViewDate(new Date(year, month + delta, 1));

  return (
    <div data-slot="calendar" className={cn('w-64', className)}>
      <div className="flex items-center justify-between pb-2">
        <Button variant="ghost" size="icon-sm" onClick={() => goToMonth(-1)} aria-label="Previous month">
          <ChevronLeft className="size-4" />
        </Button>
        <p className="text-sm font-medium text-slate-900">
          {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
        <Button variant="ghost" size="icon-sm" onClick={() => goToMonth(1)} aria-label="Next month">
          <ChevronRight className="size-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-slate-400">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          if (!day) return <span key={`empty-${index}`} />;
          const cellDate = new Date(year, month, day);
          const key = toDateKey(cellDate);
          const isToday = key === todayKey;
          const isSelected = key === selectedKey;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect?.(cellDate)}
              className={cn(
                'flex size-8 items-center justify-center rounded-lg text-sm text-slate-700 transition-colors hover:bg-muted',
                !isSelected && isToday && 'font-semibold text-primary',
                isSelected && 'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { Calendar };
