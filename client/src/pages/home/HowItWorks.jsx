import SectionHeader from './SectionHeader';

const steps = [
  { n: 1, title: 'Sign Up', desc: 'Create your MediCore account in minutes.' },
  { n: 2, title: 'Setup Hospital Profile', desc: 'Configure departments, wards and services.' },
  { n: 3, title: 'Add Staff & Doctors', desc: 'Invite your team with role-based access.' },
  { n: 4, title: 'Go Live', desc: 'Start managing patients and operations.' },
];

const HowItWorks = () => {
  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How it works"
          title="Up and running in four simple steps"
          subtitle="From signup to first patient — most hospitals go live within a week."
        />
        <div className="relative mt-12 grid gap-8 md:grid-cols-4">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-0.5 md:block"
            style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}
          />
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-xl bg-card p-6 text-center shadow-sm">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-lg font-bold text-primary-foreground ring-4 ring-background">
                {s.n}
              </div>
              <h3 className="mt-4 text-base font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
