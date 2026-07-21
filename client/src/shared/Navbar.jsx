import {
  ChevronDown,
  LogOut,
  LayoutDashboard,
  User as UserIcon,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';
const links = [
  { to: '#', label: 'Features' },
  { to: '#', label: 'Pricing' },
  { to: '#', label: 'About' },
  { to: '#', label: 'Contact' },
];

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-16 bg-card/80 backdrop-blur-xl border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* ── Logo ── */}
        <div className="flex gap-2 items-center">
          <HeartPulse className="bg-primary rounded-lg  py-2 px-2 text-white w-10 h-10  " />
          <Link to="/" className="text-2xl font-medium ">
            MediCore
          </Link>
        </div>

        {/* ── Center Nav Links ── */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            return (
              <Link
                key={link.to}
                to={link.to}
                className={
                  'relative px-4 py-2 text-sm text-foreground hover:text-primary'
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* ── Right Side ── */}
        <div className="flex items-center gap-3">
          <>
            <Button
              variant="outline"
              className="hidden sm:inline-flex   border-primary/50 text-primary hover:text-primary  cursor-pointer "
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold cursor-pointer px-3 ">
              Get Starting
            </Button>
          </>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
