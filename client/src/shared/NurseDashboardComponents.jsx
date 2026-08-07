import { Check, HeartPulse, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const summaryStyles = {
  blue: 'bg-sky-100 text-sky-600',
  green: 'bg-emerald-100 text-emerald-500',
  amber: 'bg-amber-100 text-amber-500',
  red: 'bg-rose-100 text-rose-500',
};

export function NurseSummaryCard({ icon: Icon, tone, value, label, detail }) {
  return (
    <Card className="gap-0 rounded-xl border-border py-5 shadow-sm">
      <CardContent className="px-5">
        <div className={`mb-4 flex size-10 items-center justify-center rounded-xl ${summaryStyles[tone]}`}>
          <Icon className="size-5" />
        </div>
        <p className="text-2xl font-bold tracking-tight text-slate-900">{value}</p>
        <p className="mt-0.5 text-xs text-slate-500">{label}</p>
        <p className="mt-1 text-xs text-slate-500">{detail}</p>
      </CardContent>
    </Card>
  );
}

const vitalTone = {
  normal: 'bg-emerald-100 text-emerald-500',
  warning: 'bg-amber-100 text-amber-500',
  danger: 'bg-rose-100 text-rose-500',
};

export function VitalPill({ value, tone = 'normal' }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${vitalTone[tone]}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {value}
    </span>
  );
}

export function PatientVitals({ patients, onLog }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-5">
        <div>
          <CardTitle className="text-base font-semibold">Patient vitals</CardTitle>
          <p className="mt-0.5 text-xs text-slate-500">Live monitoring · updated 30s ago</p>
        </div>
        <button className="text-sm font-medium text-sky-500 hover:text-sky-600">View all</button>
      </CardHeader>
      <div className="overflow-x-auto">
        <Table className="min-w-[850px]">
          <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-auto px-5 py-3 text-[11px] font-medium text-slate-500">PATIENT</TableHead>
              <TableHead className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500">BED</TableHead>
              <TableHead className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500">
                <span className="inline-flex items-center gap-1"><HeartPulse className="size-3" /> HR</span>
              </TableHead>
              <TableHead className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500">BP</TableHead>
              <TableHead className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500">
                <span className="inline-flex items-center gap-1"><Thermometer className="size-3" /> TEMP</span>
              </TableHead>
              <TableHead className="h-auto px-4 py-3 text-[11px] font-medium text-slate-500">SPO₂</TableHead>
              <TableHead className="h-auto px-5 py-3 text-right text-[11px] font-medium text-slate-500">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow
                key={patient.bed}
                className={`border-b-0 hover:bg-transparent ${index % 2 ? 'bg-slate-50/70' : 'bg-white'}`}
              >
                <TableCell className="px-5 py-3.5 text-sm font-medium text-slate-900">{patient.name}</TableCell>
                <TableCell className="px-4 py-3.5 font-mono text-xs text-slate-500">{patient.bed}</TableCell>
                <TableCell className="px-4 py-3.5"><VitalPill value={patient.hr} tone={patient.tone} /></TableCell>
                <TableCell className="px-4 py-3.5"><VitalPill value={patient.bp} tone={patient.tone} /></TableCell>
                <TableCell className="px-4 py-3.5"><VitalPill value={patient.temp} tone={patient.tone} /></TableCell>
                <TableCell className="px-4 py-3.5">
                  <VitalPill value={patient.spo2} tone={patient.spo2Tone || patient.tone} />
                </TableCell>
                <TableCell className="px-5 py-3.5 text-right">
                  <Button size="sm" onClick={() => onLog(patient)}>Log</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

export function Panel({ title, subtitle, action, children, className = '' }) {
  return (
    <Card className={`gap-0 rounded-xl border-border py-0 shadow-sm ${className}`}>
      <CardHeader className="flex flex-row items-start justify-between border-b border-border px-5 py-5">
        <div>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
        </div>
        {action}
      </CardHeader>
      {children}
    </Card>
  );
}

const taskStatusStyles = {
  overdue: 'bg-rose-100 text-rose-500',
  soon: 'bg-amber-100 text-amber-500',
  scheduled: 'bg-emerald-100 text-emerald-500',
};

const taskStatusLabels = {
  overdue: 'Overdue',
  soon: 'Due soon',
  scheduled: 'Scheduled',
};

export function TaskRow({ task, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
        task.done ? 'bg-emerald-50' : 'hover:bg-slate-50'
      }`}
    >
      <span
        className={`flex size-6 shrink-0 items-center justify-center rounded-lg border ${
          task.done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-200 bg-white'
        }`}
      >
        {task.done && <Check className="size-4" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-sm font-medium ${task.done ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
          {task.title}
        </span>
        <span className="block text-xs text-slate-500">Due {task.due}</span>
      </span>
      {task.status && (
        <span className={`rounded-full px-2.5 py-1 text-xs ${taskStatusStyles[task.status]}`}>
          <span className="mr-1">●</span>
          {taskStatusLabels[task.status]}
        </span>
      )}
    </button>
  );
}

export function HandoverNote({ bed, text }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm">
      <p className="mb-1 text-xs text-slate-500">{bed}</p>
      <p className="leading-5 text-slate-800">{text}</p>
    </div>
  );
}

export function ConditionBadge({ condition, style, className = '' }) {
  if (!style) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.bg} ${style.text} ${className}`}
    >
      <span className={`size-1.5 rounded-full ${style.dot}`} />
      {style.label ?? condition}
    </span>
  );
}
