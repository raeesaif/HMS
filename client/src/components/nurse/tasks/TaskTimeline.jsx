import { Check } from 'lucide-react';

function TimelineStep({ label, timestamp, meta, reached, isLast }) {
  return (
    <li className="relative flex gap-3 pb-5 last:pb-0">
      {!isLast && (
        <span
          className={`absolute top-5 left-[11px] h-full w-px ${reached ? 'bg-sky-300' : 'bg-slate-200'}`}
          aria-hidden="true"
        />
      )}
      <span
        className={`relative mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${
          reached ? 'border-sky-500 bg-sky-500 text-white' : 'border-slate-200 bg-white text-slate-300'
        }`}
      >
        {reached && <Check className="size-3.5" />}
      </span>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-medium ${reached ? 'text-slate-900' : 'text-slate-400'}`}>{label}</p>
        <p className="text-xs text-slate-500">{timestamp || 'Not yet reached'}</p>
        {meta && <p className="mt-0.5 text-xs text-slate-500">{meta}</p>}
      </div>
    </li>
  );
}

export function TaskTimeline({ timeline }) {
  const steps = [
    { label: 'Task Assigned', timestamp: timeline.assignedAt, reached: Boolean(timeline.assignedAt) },
    { label: 'Task Started', timestamp: timeline.startedAt, reached: Boolean(timeline.startedAt) },
    {
      label: 'Task Completed',
      timestamp: timeline.completedAt,
      meta: timeline.completedBy ? `Completed by ${timeline.completedBy}` : null,
      reached: Boolean(timeline.completedAt),
    },
  ];

  return (
    <ol className="space-y-0">
      {steps.map((step, index) => (
        <TimelineStep key={step.label} {...step} isLast={index === steps.length - 1} />
      ))}
    </ol>
  );
}
