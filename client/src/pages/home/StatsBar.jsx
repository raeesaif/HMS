const stats = [
  { value: '500+', label: 'Hospitals Onboarded' },
  { value: '2M+', label: 'Patients Managed' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '24/7', label: 'Support Availability' },
];

const StatsBar = () => {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-extrabold text-primary sm:text-4xl">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
