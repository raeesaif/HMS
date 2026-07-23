import { useState } from 'react';
import { Activity, Check, ClipboardList, Stethoscope, UserCog } from 'lucide-react';
import SectionHeader from './SectionHeader';

const roles = [
  { key: 'admin', icon: UserCog, title: 'Admin', desc: 'Full oversight of hospital operations, staff, and finance.' },
  { key: 'doctor', icon: Stethoscope, title: 'Doctor', desc: 'Patient records, prescriptions, and appointment queue.' },
  { key: 'nurse', icon: Activity, title: 'Nurse', desc: 'Vitals, medication rounds, and bed assignments.' },
  { key: 'reception', icon: ClipboardList, title: 'Receptionist', desc: 'Registrations, bookings, and billing at the front desk.' },
];

const Roles = () => {
  const [active, setActive] = useState('admin');
  const current = roles.find((r) => r.key === active);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Role-based access"
        title="A dashboard tailored to every team member"
        subtitle="Everyone sees exactly what they need — nothing more, nothing less."
      />
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {roles.map((r) => {
          const isActive = r.key === active;
          return (
            <button
              key={r.key}
              onClick={() => setActive(r.key)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-foreground hover:border-primary/40'
              }`}
            >
              <r.icon className="h-4 w-4" />
              {r.title}
            </button>
          );
        })}
      </div>
      <div className="mt-10 grid gap-8 rounded-2xl border border-border bg-card p-6 md:grid-cols-2 md:p-10">
        <div>
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
            <current.icon className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-2xl font-bold">{current.title} Dashboard</h3>
          <p className="mt-2 text-muted-foreground">{current.desc}</p>
          <ul className="mt-6 space-y-2 text-sm">
            {['Personalized workspace', 'Role-scoped permissions', 'Real-time updates', 'Mobile & tablet ready'].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" /> {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {current.title} preview
          </div>
          <div className="space-y-3">
            {[70, 45, 90, 60].map((w, i) => (
              <div key={i} className="rounded-lg bg-card p-3 shadow-sm">
                <div className="h-2 w-24 rounded bg-primary/70" />
                <div className="mt-2 h-2 rounded bg-muted" style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roles;
