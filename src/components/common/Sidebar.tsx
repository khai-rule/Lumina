'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: number;
  tooltip?: string;
}

const Sidebar = ({ isCollapsed = false, onToggleCollapse }: SidebarProps) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(isCollapsed);

  const navigationItems: NavItem[] = [
    {
      label: 'Projects',
      path: '/project-dashboard',
      icon: 'FolderIcon',
      tooltip: 'View and manage all projects',
    },
    {
      label: 'Project Setup',
      path: '/project-setup',
      icon: 'PlusCircleIcon',
      tooltip: 'Create and configure new projects',
    },
    {
      label: 'Phase Navigation',
      path: '/phase-navigation',
      icon: 'MapIcon',
      tooltip: 'Navigate through SDLC phases',
    },
    {
      label: 'Requirements',
      path: '/requirements-management',
      icon: 'DocumentTextIcon',
      tooltip: 'Manage project requirements',
    },
    {
      label: 'Diagrams',
      path: '/diagram-creation',
      icon: 'PresentationChartLineIcon',
      tooltip: 'Create and edit diagrams',
    },
    {
      label: 'Analytics',
      path: '/progress-analytics',
      icon: 'ChartBarIcon',
      tooltip: 'View progress and insights',
    },
  ];

  const handleToggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onToggleCollapse?.(newCollapsed);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <aside
      className={`lg:fixed top-0 left-0 h-screen bg-card border-r border-border transition-layout z-sidebar ${
        collapsed ? 'w-sidebar-collapsed' : 'w-sidebar'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          {!collapsed && (
            <Link href="/project-dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-sm">SN</span>
              </div>
              <span className="font-semibold text-foreground text-base">SDLC Navigator</span>
            </Link>
          )}
          {collapsed && (
            <Link href="/project-dashboard" className="flex items-center justify-center w-full">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-sm">SN</span>
              </div>
            </Link>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Button
                  asChild
                  variant={isActive(item.path) ? 'default' : 'ghost'}
                  className={`w-full justify-start ${collapsed ? 'px-2' : 'px-3'} mb-1`}
                  title={collapsed ? item.tooltip : undefined}
                >
                  <Link href={item.path}>
                    <Icon
                      name={item.icon as any}
                      size={20}
                      className={`flex-shrink-0 ${collapsed ? '' : 'mr-3'}`}
                    />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-accent text-accent-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Collapse Toggle */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleToggleCollapse}
            className="w-full justify-center"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon
              name={collapsed ? 'ChevronRightIcon' : 'ChevronLeftIcon'}
              size={20}
            />
            {!collapsed && <span className="ml-3">Collapse</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;