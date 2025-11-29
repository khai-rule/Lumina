'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  sidebarCollapsed?: boolean;
}

interface NavItem {
  label: string;
  path: string;
}

const Header = ({ sidebarCollapsed = false }: HeaderProps) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const primaryNavItems: NavItem[] = [
    { label: 'Projects', path: '/project-dashboard' },
    { label: 'Setup', path: '/project-setup' },
    { label: 'Phases', path: '/phase-navigation' },
    { label: 'Requirements', path: '/requirements-management' },
  ];

  const secondaryNavItems: NavItem[] = [
    { label: 'Diagrams', path: '/diagram-creation' },
    { label: 'Analytics', path: '/progress-analytics' },
  ];

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

  const isActive = (path: string) => pathname === path;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'CheckCircleIcon';
      case 'warning':
        return 'ExclamationTriangleIcon';
      default:
        return 'InformationCircleIcon';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-primary';
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-background border-b border-border z-sidebar transition-layout ${
        sidebarCollapsed ? 'left-sidebar-collapsed' : 'left-sidebar'
      }`}
    >
      <div className="h-full flex items-center justify-between pr-6">
        {/* Primary Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {primaryNavItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-4 py-2 rounded-md text-nav transition-default focus-ring ${
                isActive(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* More Dropdown */}
          <div className="relative group">
            <button className="px-4 py-2 rounded-md text-nav text-muted-foreground hover:bg-muted hover:text-foreground transition-default focus-ring flex items-center">
              More
              <Icon name="ChevronDownIcon" size={16} className="ml-1" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-hover opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-default">
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block px-4 py-2.5 text-nav transition-default first:rounded-t-md last:rounded-b-md ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-popover-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-default focus-ring"
          aria-label="Toggle mobile menu"
        >
          <Icon name={mobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
        </button>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Notification Center */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-default focus-ring"
              aria-label="Notifications"
            >
              <Icon name="BellIcon" size={20} />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
              )}
            </button>

            {notificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-dropdown"
                  onClick={() => setNotificationsOpen(false)}
                ></div>
                <div className="absolute top-full right-0 mt-2 w-80 bg-popover border border-border rounded-md shadow-active z-dropdown">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 border-b border-border hover:bg-muted transition-default cursor-pointer"
                      >
                        <div className="flex items-start space-x-3">
                          <Icon
                            name={getNotificationIcon(notification.type) as any}
                            size={20}
                            className={`flex-shrink-0 mt-0.5 ${getNotificationColor(notification.type)}`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-sm">
                              {notification.title}
                            </p>
                            <p className="text-muted-foreground text-sm mt-1">
                              {notification.message}
                            </p>
                            <p className="text-muted-foreground text-xs mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <button className="w-full text-center text-primary text-sm font-medium hover:underline">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile */}
          <button className="flex items-center space-x-2 p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-default focus-ring">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-secondary-foreground text-sm font-medium">JD</span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-foreground/20 z-mobile-menu lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="fixed top-16 left-0 right-0 bg-background border-b border-border shadow-active z-mobile-menu lg:hidden">
            <nav className="p-4 space-y-1">
              {[...primaryNavItems, ...secondaryNavItems].map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-md text-nav transition-default ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;