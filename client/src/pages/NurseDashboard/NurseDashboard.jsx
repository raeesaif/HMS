import { useState } from 'react';
import {
  Activity,
  BedDouble,
  ClipboardList,
  NotebookPen,
  Pill,
  Plus,
  UsersRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  HandoverNote,
  NurseSummaryCard,
  Panel,
  PatientVitals,
  TaskRow,
} from '@/shared/NurseDashboardComponents';
import { WardBedsCard } from '@/shared/WardBedsCard';
import {
  nurseTasksData,
  shiftHandoverNotes,
  wardPatientVitals,
} from '@/data/nurse';

const summaryCards = [
  {
    icon: UsersRound,
    tone: 'blue',
    value: '18',
    label: 'Assigned Patients',
    detail: 'Ward 4B · Shift AM',
  },
  {
    icon: BedDouble,
    tone: 'green',
    value: '6 / 20',
    label: 'Beds Available',
    detail: '70% occupancy',
  },
  {
    icon: Pill,
    tone: 'amber',
    value: '12',
    label: 'Medications Due',
    detail: 'Next in 20 min',
  },
  {
    icon: ClipboardList,
    tone: 'red',
    value: '5',
    label: 'Pending Tasks',
    detail: '2 overdue',
  },
];

const NurseDashboard = () => {
  const [tasks, setTasks] = useState(nurseTasksData);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  const [logMessage, setLogMessage] = useState('');

  const toggleTask = (index) => {
    setTasks((current) =>
      current.map((task, taskIndex) =>
        taskIndex === index ? { ...task, done: !task.done } : task
      )
    );
  };

  const saveNote = () => {
    if (!note.trim()) return;
    setSaved(true);
    setNote('');
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Nurse station — Ward 4B
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Shift 07:00 – 15:00 · Charge nurse: E. Owusu
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-sky-500 hover:text-sky-600">
            <NotebookPen /> Handover notes
          </Button>
          <Button>
            <Plus /> Log vitals
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <NurseSummaryCard key={card.label} {...card} />
        ))}
      </section>

      {logMessage && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Vitals logging opened for {logMessage}.
        </div>
      )}

      <PatientVitals
        patients={wardPatientVitals}
        onLog={(patient) => setLogMessage(`${patient.name} (${patient.bed})`)}
      />

      <section className="grid gap-4 xl:grid-cols-3">
        <Panel
          title="Medications & tasks"
          subtitle="Check off as you complete"
          className="min-h-106.25"
        >
          <div className="space-y-1 p-3">
            {tasks.map((task, index) => (
              <TaskRow
                key={task.title}
                task={task}
                onToggle={() => toggleTask(index)}
              />
            ))}
          </div>
        </Panel>

        <WardBedsCard />

        <Panel
          title="Shift handover"
          subtitle="Notes for the next shift"
          action={<Activity className="size-5 text-sky-500" />}
          className="min-h-106.25"
        >
          <div className="space-y-3 p-5">
            {shiftHandoverNotes.map((entry) => (
              <HandoverNote key={entry.bed} bed={entry.bed} text={entry.text} />
            ))}
            <Textarea
              value={note}
              onChange={(event) => {
                setNote(event.target.value);
                setSaved(false);
              }}
              placeholder="Add handover note..."
              className="min-h-24 resize-none bg-slate-50"
            />
            <Button className="w-full" onClick={saveNote}>
              Save note
            </Button>
            {saved && (
              <p className="text-center text-xs text-emerald-600">
                Note saved for the next shift.
              </p>
            )}
          </div>
        </Panel>
      </section>
    </div>
  );
};

export default NurseDashboard;
