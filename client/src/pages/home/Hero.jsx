import { Link } from 'react-router-dom';
import { ArrowRight, Check, Play, ShieldCheck, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(60% 60% at 20% 10%, color-mix(in oklab, var(--primary) 15%, transparent), transparent 70%), radial-gradient(50% 50% at 90% 20%, color-mix(in oklab, var(--secondary) 18%, transparent), transparent 70%)',
        }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:py-24 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> New — AI-powered scheduling
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Manage Your Hospital,{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, var(--primary), var(--secondary))',
              }}
            >
              Effortlessly
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            One platform for patient records, appointments, beds, billing,
            pharmacy and analytics — with role-based dashboards for every team
            member.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Link>
            <button className="inline-flex items-center gap-2 rounded-lg border-2 border-secondary px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary/10 cursor-pointer ">
              <Play className="h-4 w-4" /> Watch Demo
            </button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" /> HIPAA-ready
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" /> Trusted by 500+
              Hospitals
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-destructive" />
              <span className="font-semibold text-foreground">
                24/7 Emergency Support
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute -inset-6 rounded-3xl opacity-40 blur-2xl"
            style={{
              background:
                'linear-gradient(135deg, var(--primary), var(--secondary))',
            }}
          />
          <div className="relative rounded-2xl border border-border bg-card p-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-success/70" />
              </div>
              <span className="text-xs text-muted-foreground">
                medicore.app/dashboard
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: 'Patients', value: '2,847', tone: 'primary' },
                { label: 'Beds', value: '184/220', tone: 'secondary' },
                { label: 'Revenue', value: '$92K', tone: 'success' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-border bg-muted/40 p-3"
                >
                  <div className="text-[11px] font-medium text-muted-foreground">
                    {s.label}
                  </div>
                  <div
                    className="mt-1 text-lg font-bold"
                    style={{ color: `var(--${s.tone})` }}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold">Weekly Admissions</span>
                <span className="text-[11px] text-muted-foreground">
                  Last 7 days
                </span>
              </div>
              <div className="flex h-24 items-end gap-2">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t"
                    style={{
                      height: `${h}%`,
                      background:
                        'linear-gradient(180deg, var(--secondary), var(--primary))',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg bg-success-soft px-3 py-2 text-xs">
              <span className="font-semibold text-success">● Live</span>
              <span className="text-muted-foreground">
                12 doctors on duty · 4 emergencies
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
