import { CalendarClock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function WorkScheduleCard({ schedule }) {
  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold">Work Schedule</CardTitle>
        <p className="text-xs text-slate-500">Set by hospital administration</p>
      </CardHeader>
      <CardContent className="space-y-1.5 pt-3">
        {schedule.map((entry) => (
          <div
            key={entry.day}
            className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
              entry.isOff ? 'bg-slate-50 text-slate-400' : 'bg-white text-slate-700 ring-1 ring-slate-100'
            }`}
          >
            <span className="font-medium">{entry.day}</span>
            {entry.isOff ? (
              <span>Off</span>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <CalendarClock className="size-3.5 text-sky-500" />
                {entry.startTime} - {entry.endTime}
                <span className="text-xs text-slate-400">({entry.shift})</span>
              </span>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
