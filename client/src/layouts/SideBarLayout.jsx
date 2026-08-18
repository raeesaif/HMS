import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { LogOut, HeartPulse } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { roleNavigation, roleLabel } from '@/config/sidebarConfig';

function NavItem({ item }) {
  return (
    <SidebarMenuItem key={item.name}>
      <NavLink to={item.path}>
        {({ isActive }) => (
          <SidebarMenuButton
            isActive={isActive}
            className="text-white/80 hover:bg-white/10 hover:text-white data-[active=true]:bg-black/15 data-[active=true]:text-white data-[active=true]:font-semibold cursor-pointer "
          >
            <span className="flex items-center gap-3">
              <item.icon size={18} />
              <span>{item.name}</span>
            </span>
          </SidebarMenuButton>
        )}
      </NavLink>
    </SidebarMenuItem>
  );
}

const SideBarLayout = ({ role: roleProp } = {}) => {
  const navigate = useNavigate();

  // Local dev toggle: change this to preview a different role's nav when no
  // roleProp is supplied. Layouts scoped to a single role (e.g.
  // SuperAdminLayout) should always pass `role` explicitly instead of
  // relying on this value.
  const role = roleProp ?? 'admin';
  // const navigation = roleNavigation[role] || roleNavigation.admin;
  const navigation = roleNavigation[role] ?? roleNavigation.admin;
  const isGrouped = Array.isArray(navigation) && navigation.length > 0 && 'group' in navigation[0];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <>
      <Sidebar collapsible="icon" style={{ '--sidebar': '#0077B6' }}>
        <SidebarHeader className="border-b border-white/10">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00B4D8]">
              <HeartPulse size={18} className="text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold text-white">MediCore</span>
              <span className="text-xs text-white/70">{roleLabel[role]}</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {isGrouped ? (
            navigation.map((section) => (
              <SidebarGroup key={section.group}>
                <SidebarGroupLabel className="text-white/50">{section.group}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-1">
                    {section.items.map((item) => (
                      <NavItem key={item.name} item={item} />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))
          ) : (
            <SidebarMenu className="gap-1 px-2 py-4">
              {navigation?.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </SidebarMenu>
          )}
        </SidebarContent>
        <SidebarFooter className="border-t border-white/10">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                type="button"
                onClick={handleLogout}
                className="text-white/90 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <LogOut size={18} />
                <span className="font-semibold">Sign out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default SideBarLayout;
