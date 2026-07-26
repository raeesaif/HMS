import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { calendarEvents, CALENDAR_MONTH } from '@/data/appointments';

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const VIEW_OPTIONS = ['Month', 'Week', 'Day'];

const TODAY = { year: 2026, month: 6, day: 14 };

const EVENT_COLOR_STYLES = {
  green: 'bg-emerald-50 text-emerald-700',
  orange: 'bg-amber-50 text-amber-700',
  red: 'bg-red-50 text-red-700',
  blue: 'bg-blue-50 text-blue-700',
};

const buildMonthCells = (year, month) => {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  return Array.from({ length: totalCells }, (_, index) => {
    const day = index - firstWeekday + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });
};

const AppointmentsCalendar = ({
  events = calendarEvents,
  initialYear = CALENDAR_MONTH.year,
  initialMonth = CALENDAR_MONTH.month,
}) => {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [view, setView] = useState('Month');

  const cells = useMemo(() => buildMonthCells(year, month), [year, month]);
  const isCurrentMonth = year === TODAY.year && month === TODAY.month;

  const goToPrevMonth = () => {
    if (month === 0) {
      setYear((prev) => prev - 1);
      setMonth(11);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setYear((prev) => prev + 1);
      setMonth(0);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goToPrevMonth}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h3 className="text-base font-bold text-slate-800">
            {MONTH_LABELS[month]} {year}
          </h3>
          <button
            type="button"
            onClick={goToNextMonth}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-[3px] rounded-lg bg-slate-100 p-[3px]">
          {VIEW_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setView(option)}
              className={`cursor-pointer rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                view === option
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-100">
        <div className="grid grid-cols-7 divide-x divide-slate-100 bg-slate-50">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="px-3 py-2 text-[11px] font-semibold tracking-wider text-slate-400"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 border-t border-slate-100">
          {cells.map((day, index) => {
            const dayEvents = day ? events[day] ?? [] : [];
            const isToday = isCurrentMonth && day === TODAY.day;

            return (
              <div key={index} className={`min-h-[92px] p-2 ${day ? '' : 'bg-slate-50/40'}`}>
                {day && (
                  <>
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                        isToday ? 'bg-blue-600 font-semibold text-white' : 'text-slate-600'
                      }`}
                    >
                      {day}
                    </span>
                    <div className="mt-1.5 flex flex-col gap-1">
                      {dayEvents.map((event, eventIndex) => (
                        <span
                          key={eventIndex}
                          title={`${event.time} ${event.label}`}
                          className={`truncate rounded px-1.5 py-0.5 text-[11px] font-medium ${
                            EVENT_COLOR_STYLES[event.color] ?? EVENT_COLOR_STYLES.blue
                          }`}
                        >
                          {event.time} {event.label}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsCalendar;
