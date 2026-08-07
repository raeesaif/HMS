import { History } from 'lucide-react';
import { EmptyState } from '@/shared/EmptyState';

function HistoryEntry({ entry, isLast }) {
  return (
    <li className="relative flex gap-3 pb-5 last:pb-0">
      {!isLast && <span className="absolute top-3 left-[5px] h-full w-px bg-slate-200" aria-hidden="true" />}
      <span className="relative mt-1.5 size-2.5 shrink-0 rounded-full bg-sky-500 ring-4 ring-sky-100" />
      <div className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white p-3">
        <p className="text-xs font-medium text-slate-500">{entry.timestamp}</p>
        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm sm:grid-cols-3">
          <p><span className="text-slate-400">BP:</span> <span className="font-medium text-slate-800">{entry.bp}</span></p>
          <p><span className="text-slate-400">HR:</span> <span className="font-medium text-slate-800">{entry.hr}</span></p>
          <p><span className="text-slate-400">Temp:</span> <span className="font-medium text-slate-800">{entry.temp}</span></p>
          <p><span className="text-slate-400">RR:</span> <span className="font-medium text-slate-800">{entry.rr}</span></p>
          <p><span className="text-slate-400">SpO2:</span> <span className="font-medium text-slate-800">{entry.spo2}</span></p>
        </div>
        <p className="mt-2 text-xs text-slate-400">Recorded by {entry.recordedBy}</p>
      </div>
    </li>
  );
}

export function VitalsHistoryTimeline({ history }) {
  if (!history || history.length === 0) {
    return <EmptyState icon={History} title="No previous readings recorded yet." />;
  }

  return (
    <ol className="space-y-0">
      {history.map((entry, index) => (
        <HistoryEntry key={entry.timestamp} entry={entry} isLast={index === history.length - 1} />
      ))}
    </ol>
  );
}
