import { Heart } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const productLinks = ['Features', 'Pricing', 'Integrations', 'Changelog'];
const companyLinks = ['About', 'Careers', 'Press', 'Partners'];
const resourceLinks = ['Docs', 'Blog', 'Help Center', 'API'];
const legalLinks = ['Privacy', 'Terms', 'Security', 'HIPAA'];

const socialIcons = [
  { icon: FaFacebook, label: 'Facebook' },
  { icon: FaTwitter, label: 'Twitter' },
  { icon: FaLinkedin, label: 'LinkedIn' },
  { icon: FaInstagram, label: 'Instagram' },
];

function FooterColumn({ title, links, hoverClass = 'hover:text-white' }) {
  return (
    <div>
      <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className={`text-slate-400 ${hoverClass} text-sm transition-colors`}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="bg-[#0f1729] px-6 py-14 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0077B6]">
                <Heart
                  className="h-4.5 w-4.5 text-white"
                  fill="white"
                  strokeWidth={0}
                />
              </div>
              <span className="text-lg font-bold text-white">MediCore</span>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Modern hospital management — built for the teams delivering care
              every day.
            </p>

            <form className="mt-5 flex max-w-sm">
              <input
                type="email"
                placeholder="your@hospital.com"
                className="w-full rounded-l-md border border-slate-700 bg-[#1a2438] px-3.5 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-[#00B4D8]"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-r-md bg-[#00B4D8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#00a3c4] transition-colors"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-6 flex gap-3">
              {socialIcons.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a2438] text-slate-300 hover:bg-primary hover:text-white transition-colors"
                >
                  <Icon
                    className="h-4 w-4"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <FooterColumn title="Product" links={productLinks} hoverClass="hover:text-primary" />
          <FooterColumn title="Company" links={companyLinks} hoverClass="hover:text-primary" />
          <FooterColumn title="Resources" links={resourceLinks} hoverClass="hover:text-primary" />
          <FooterColumn title="Legal" links={legalLinks} hoverClass="hover:text-primary" />
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-slate-800" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-sm text-slate-500 md:flex-row">
          <p>© 2026 MediCore HMS. All rights reserved.</p>
          <p>Made with care for healthcare teams.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
