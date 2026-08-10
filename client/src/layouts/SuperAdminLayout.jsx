import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Bell, KeyRound, LogOut, Search, Settings2, UserRound } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SideBarLayout from './SideBarLayout';
import { roleNavigation, flattenNavigation } from '@/config/sidebarConfig';

const pageTitles = flattenNavigation(roleNavigation.superAdmin);

const superAdminProfile = {
  name: 'Admin User',
  email: 'admin@medicore.platform',
  avatarInitials: 'AU',
};

export function SuperAdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const pageTitle = pageTitles[location.pathname] ?? 'Super Admin';

  const handleLogout = () => navigate('/login');

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SideBarLayout role="superAdmin" />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <h1 className="truncate text-sm font-semibold text-foreground sm:text-base">{pageTitle}</h1>

            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search hospitals, users, invoices..."
                  className="h-8 w-64 pl-8 text-sm"
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground"
                aria-label="Notifications"
                onClick={() => navigate('/super-admin/notifications')}
              >
                <Bell className="size-4" />
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  3
                </span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted"
                    />
                  }
                >
                  <Avatar size="sm">
                    <AvatarFallback className="bg-sky-100 text-sky-600">{superAdminProfile.avatarInitials}</AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left sm:block">
                    <p className="text-xs font-medium text-foreground">{superAdminProfile.name}</p>
                    <p className="text-[10px] text-muted-foreground">{superAdminProfile.email}</p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/super-admin/profile')}>
                    <UserRound /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/super-admin/security')}>
                    <KeyRound /> Security
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/super-admin/system-settings')}>
                    <Settings2 /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                    <LogOut /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
