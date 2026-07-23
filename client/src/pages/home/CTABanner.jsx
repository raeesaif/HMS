import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTABanner = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl p-10 text-center md:p-16"
        style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)',
            backgroundSize: '36px 36px, 48px 48px',
          }}
        />
        <div className="relative">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to Modernize Your Hospital?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
            Join 500+ hospitals delivering better care with MediCore. Start your 14-day free trial today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm transition hover:bg-white/90"
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
