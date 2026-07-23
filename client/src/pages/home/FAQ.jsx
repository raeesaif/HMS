import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionHeader from './SectionHeader';

const items = [
  { q: 'What is MediCore HMS?', a: 'MediCore is an all-in-one Hospital Management System that unifies patients, appointments, beds, billing, pharmacy and analytics into one platform.' },
  { q: 'Is our patient data secure?', a: 'Yes. We follow industry-standard encryption in transit and at rest, and support HIPAA-aligned workflows with granular role-based access.' },
  { q: 'Can I customize modules?', a: 'Absolutely — enable or disable modules per department, and configure custom roles, forms and workflows to fit how your hospital works.' },
  { q: 'Is there a free trial?', a: 'Every plan comes with a 14-day free trial. No credit card required to get started.' },
];

const FAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-muted/40 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
        <div className="mt-10 space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className="rounded-xl border border-border bg-card">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold">{it.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                </button>
                <div className={`grid overflow-hidden transition-all ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="min-h-0">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
