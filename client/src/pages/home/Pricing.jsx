import { useState } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from './SectionHeader';

const tiers = [
  { name: 'Basic', monthly: 99, features: ['Up to 25 staff', 'Patient & appointment management', 'Basic reports', 'Email support'], highlight: false },
  { name: 'Professional', monthly: 249, features: ['Up to 150 staff', 'All modules included', 'Advanced analytics', 'Priority support', 'Custom roles'], highlight: true },
  { name: 'Enterprise', monthly: 599, features: ['Unlimited staff', 'Multi-branch support', 'Dedicated success manager', 'SLA & on-premise option', 'Custom integrations'], highlight: false },
];

const Pricing = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Pricing"
        title="Simple plans that scale with your hospital"
        subtitle="No hidden fees. Cancel anytime. 14-day free trial on every plan."
      />
      <div className="mt-8 flex items-center justify-center gap-3">
        <span className={`text-sm font-medium ${!yearly ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
        <button
          onClick={() => setYearly((v) => !v)}
          className="relative h-6 w-11 rounded-full bg-primary/20 transition"
          aria-label="Toggle billing period"
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-primary transition ${yearly ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
        <span className={`text-sm font-medium ${yearly ? 'text-foreground' : 'text-muted-foreground'}`}>
          Yearly{' '}
          <span className="ml-1 rounded-full bg-warning-soft px-2 py-0.5 text-[11px] font-semibold text-warning-foreground">
            Save 20%
          </span>
        </span>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {tiers.map((t) => {
          const price = yearly ? Math.round(t.monthly * 12 * 0.8) : t.monthly;
          return (
            <div
              key={t.name}
              className={`relative rounded-2xl border bg-card p-6 shadow-sm transition ${
                t.highlight ? 'border-2 border-primary shadow-lg md:-translate-y-2' : 'border-border'
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-bold">{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">${price}</span>
                <span className="text-sm text-muted-foreground">/{yearly ? 'yr' : 'mo'}</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/login"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  t.highlight
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border border-primary/30 text-primary hover:bg-primary/5'
                }`}
              >
                Start Free Trial
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Pricing;
