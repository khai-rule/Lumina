'use client';

import Icon from '@/components/ui/AppIcon';

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
  const getVariantStyles = (variant?: Action['variant']) => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-subtle hover:shadow-hover';
      case 'success':
        return 'bg-success text-success-foreground hover:bg-success/90 shadow-subtle hover:shadow-hover';
      default:
        return 'bg-card text-foreground border border-border hover:bg-muted shadow-subtle hover:shadow-hover';
    }
  };

  const positionClasses =
    position === 'bottom-right' ?'fixed bottom-6 right-6 lg:bottom-8 lg:right-8' :'absolute top-4 right-4';

  return (
    <div className={`${positionClasses} z-dropdown`}>
      <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            disabled={action.disabled}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-md font-medium text-sm transition-default focus-ring disabled:opacity-50 disabled:cursor-not-allowed ${getVariantStyles(
              action.variant
            )}`}
            title={action.label}
          >
            <Icon name={action.icon as any} size={18} />
            <span className="hidden lg:inline">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionToolbar;