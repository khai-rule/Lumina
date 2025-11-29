'use client';

import Icon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';

interface Action {
  id: string;
  label: string;
  icon: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success';
  disabled?: boolean;
}

interface QuickActionToolbarProps {
  actions: Action[];
  position?: 'top-right' | 'bottom-right';
}

const QuickActionToolbar = ({
  actions,
  position = 'top-right',
}: QuickActionToolbarProps) => {
  const positionClasses =
    position === 'bottom-right' ? 'fixed bottom-6 right-6 lg:bottom-8 lg:right-8' : 'absolute top-4 right-4';

  return (
    <div className={`${positionClasses} z-dropdown`}>
      <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
        {actions.map((action) => (
          <Button
            key={action.id}
            onClick={action.onClick}
            disabled={action.disabled}
            variant={action.variant === 'primary' ? 'default' : action.variant || 'outline'}
            className="shadow-sm"
            title={action.label}
          >
            <Icon name={action.icon as any} size={18} className="mr-2" />
            <span className="hidden lg:inline">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionToolbar;