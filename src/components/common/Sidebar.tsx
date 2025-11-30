'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Folder,
  PlusCircle,
  Map,
  FileText,
  Presentation,
  BarChart,
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  User,
  PanelLeft,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NavItem {
  label: string;
  path: string;
  icon: any;
  badge?: number;
  tooltip?: string;
}

interface AppSidebarProps {
  user: any; // Using any for now to avoid strict type issues with Supabase User type, can be refined later
}

const AppSidebar = ({ user }: AppSidebarProps) => {
  const pathname = usePathname();
  const { setOpen } = useSidebar();

  const navigationItems: NavItem[] = [
    {
      label: 'Projects',
      path: '/project-dashboard',
      icon: Folder,
      tooltip: 'View and manage all projects',
    },
    {
      label: 'Project Setup',
      path: '/project-setup',
      icon: PlusCircle,
      tooltip: 'Create and configure new projects',
    },
    {
      label: 'Phase Navigation',
      path: '/phase-navigation',
      icon: Map,
      tooltip: 'Navigate through SDLC phases',
    },
    {
      label: 'Requirements',
      path: '/requirements-management',
      icon: FileText,
      tooltip: 'Manage project requirements',
    },
    {
      label: 'Diagrams',
      path: '/diagram-creation',
      icon: Presentation,
      tooltip: 'Create and edit diagrams',
    },
    {
      label: 'Analytics',
      path: '/progress-analytics',
      icon: BarChart,
      tooltip: 'View progress and insights',
    },
  ];

  const isActive = (path: string) => pathname === path;

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Phase Completed',
      message: 'Requirements phase completed successfully',
      time: '5 min ago',
    },
    {
      id: 2,
      type: 'warning',
      title: 'AI Recommendation',
      message: 'Consider adding more test cases',
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'info',
      title: 'New Feature',
      message: 'Diagram templates now available',
      time: '2 hours ago',
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || 'User';
  const displayEmail = user?.email || 'No email';

  return (
    <Sidebar collapsible="icon" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/project-dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="font-semibold text-sm">SN</span>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">SDLC Navigator</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)} tooltip={item.tooltip}>
                    <Link href={item.path}>
                      <item.icon />
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
           {/* Notifications */}
           <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" tooltip="Notifications">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
                    <Bell className="size-4" />
                    {notifications.length > 0 && (
                      <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Notifications</span>
                    <span className="text-xs text-muted-foreground">{notifications.length} New</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="start" side="right">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="h-72">
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                       <div className="flex items-center gap-2 w-full">
                          {getNotificationIcon(notification.type)}
                          <span className="font-medium text-sm">{notification.title}</span>
                          <span className="ml-auto text-xs text-muted-foreground">{notification.time}</span>
                       </div>
                       <p className="text-xs text-muted-foreground pl-6">{notification.message}</p>
                    </DropdownMenuItem>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>

          {/* User Profile */}
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="User Profile">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                <User className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">{displayName}</span>
                <span className="text-xs text-muted-foreground">{displayEmail}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;