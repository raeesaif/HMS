import { Star } from 'lucide-react';
import SectionHeader from './SectionHeader';

const items = [
  { quote: 'MediCore cut our admissions paperwork by 60%. Our staff finally has time for patients.', name: 'Dr. Ayesha Rahman', role: "Chief Medical Officer, St. Mary's", initials: 'AR' },
  { quote: 'The role-based dashboards are brilliant — every team sees exactly what they need.', name: "James O'Connor", role: 'Hospital Administrator, Riverside', initials: 'JO' },
  { quote: "Billing that used to take days now closes in hours. Best investment we've made.", name: 'Priya Menon', role: 'Finance Director, Apollo Health', initials: 'PM' },
];

const Testimonials = () => {
  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Testimonials"
          title="Loved by hospitals worldwide"
          subtitle="Hear from the clinicians and admins running their operations on MediCore."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-primary-soft font-bold text-primary">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
