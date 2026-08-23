import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import SideBarLayout from './SideBarLayout';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Outlet } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/authstore';
import { useGetMe } from '@/hooks/useAuth';

const FALLBACK_PROFILE = {
  name: 'Guest User',
  email: 'guest@gmail.com',
  avatarInitials: 'G',
};

export function MainLayout() {
  const storedUser = useAuthStore((state) => state.user);
  const { data: me } = useGetMe();

  const currentUser = me ?? storedUser;
  const profile = currentUser
    ? {
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        email: currentUser.email,
        avatarInitials: `${currentUser.firstName?.[0] ?? ''}${currentUser.lastName?.[0] ?? ''}`.toUpperCase(),
      }
    : FALLBACK_PROFILE;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SideBarLayout role={currentUser?.role} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/95 backdrop-blur px-4 sm:px-6">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  3
                </span>
              </Button>
              <div className="flex items-center gap-2 rounded-lg bg-orange/50 px-3 py-1.5">
                <div>
                  <Avatar>
                    <AvatarFallback className="bg-stone-500 text-white">
                      {profile.avatarInitials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-foreground">
                    {profile.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {profile.email}
                  </p>
                </div>
              </div>
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
