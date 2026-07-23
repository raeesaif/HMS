import { BedDouble, CalendarCheck, CreditCard, FileBarChart, Pill, Users } from 'lucide-react';
import SectionHeader from './SectionHeader';

const items = [
  { icon: Users, title: 'Patient Management', desc: 'Complete electronic health records, history and demographics in one secure place.' },
  { icon: CalendarCheck, title: 'Appointment Scheduling', desc: 'Smart booking, reminders, and doctor availability across departments.' },
  { icon: BedDouble, title: 'Bed & Ward Management', desc: 'Real-time occupancy tracking with automated ward assignment.' },
  { icon: CreditCard, title: 'Billing & Invoicing', desc: 'Insurance claims, payments and receipts — all reconciled automatically.' },
  { icon: Pill, title: 'Pharmacy & Inventory', desc: 'Stock levels, expiry alerts and prescription dispensing at a glance.' },
  { icon: FileBarChart, title: 'Reports & Analytics', desc: 'Actionable insights into operations, revenue and clinical outcomes.' },
];

const Features = () => {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Features"
        title="Everything your hospital needs, in one place"
        subtitle="Modular tools built for clinicians and administrators — designed to reduce paperwork and improve care."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
