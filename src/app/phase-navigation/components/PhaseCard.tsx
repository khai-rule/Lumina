import Icon from '@/components/ui/AppIcon';

interface PhaseCardProps {
  phase: {
    id: string;
    name: string;
    description: string;
    status: 'completed' | 'active' | 'pending' | 'locked';
    progress: number;
    completedTasks: number;
    totalTasks: number;
    estimatedDuration: string;
    icon: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
}

const PhaseCard = ({ phase, isExpanded, onToggle }: PhaseCardProps) => {
  const getStatusStyles = () => {
    switch (phase.status) {
      case 'completed':
        return 'border-success bg-success/5';
      case 'active':
        return 'border-primary bg-primary/5 shadow-subtle';
      case 'pending':
        return 'border-border bg-card';
      case 'locked':
        return 'border-border bg-muted/30 opacity-60';
      default:
        return 'border-border bg-card';
    }
  };

  const getStatusIcon = () => {
    switch (phase.status) {
      case 'completed':
        return 'CheckCircleIcon';
      case 'active':
        return 'PlayCircleIcon';
      case 'locked':
        return 'LockClosedIcon';
      default:
        return 'ClockIcon';
    }
  };

  const getStatusColor = () => {
    switch (phase.status) {
      case 'completed':
        return 'text-success';
      case 'active':
        return 'text-primary';
      case 'locked':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={`border rounded-lg transition-default ${getStatusStyles()}`}>
      <button
        onClick={onToggle}
        disabled={phase.status === 'locked'}
        className="w-full p-6 text-left focus-ring rounded-lg disabled:cursor-not-allowed"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className={`p-3 rounded-lg ${phase.status === 'active' ? 'bg-primary/10' : 'bg-muted'}`}>
              <Icon 
                name={phase.icon as any} 
                size={24} 
                className={phase.status === 'active' ? 'text-primary' : 'text-muted-foreground'}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-foreground">{phase.name}</h3>
                <Icon 
                  name={getStatusIcon() as any} 
                  size={20} 
                  className={getStatusColor()}
                />
              </div>
              <p className="text-sm text-muted-foreground mb-3">{phase.description}</p>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircleIcon" size={16} className="text-muted-foreground" />
                  <span className="text-foreground font-medium">{phase.completedTasks}/{phase.totalTasks}</span>
                  <span className="text-muted-foreground">tasks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="ClockIcon" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{phase.estimatedDuration}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-3 ml-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{phase.progress}%</p>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
            <Icon 
              name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'} 
              size={20} 
              className="text-muted-foreground"
            />
          </div>
        </div>
        
        {phase.status !== 'locked' && (
          <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  phase.status === 'completed' ? 'bg-success' : 'bg-primary'
                }`}
                style={{ width: `${phase.progress}%` }}
              />
            </div>
          </div>
        )}
      </button>
      
      {isExpanded && phase.status !== 'locked' && (
        <div className="px-6 pb-6 pt-2 border-t border-border">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Key Deliverables</h4>
              <ul className="space-y-2">
                {phase.status === 'completed' && (
                  <>
                    <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="CheckIcon" size={16} className="text-success" />
                      <span>All requirements documented and approved</span>
                    </li>
                    <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="CheckIcon" size={16} className="text-success" />
                      <span>Stakeholder sign-off received</span>
                    </li>
                  </>
                )}
                {phase.status === 'active' && (
                  <>
                    <li className="flex items-center space-x-2 text-sm text-foreground">
                      <Icon name="ArrowRightIcon" size={16} className="text-primary" />
                      <span>Complete functional requirements documentation</span>
                    </li>
                    <li className="flex items-center space-x-2 text-sm text-foreground">
                      <Icon name="ArrowRightIcon" size={16} className="text-primary" />
                      <span>Finalize non-functional requirements</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
            
            {phase.status === 'active' && (
              <div className="flex space-x-3 pt-2">
                <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-default focus-ring">
                  Continue Working
                </button>
                <button className="px-4 py-2 border border-border text-foreground rounded-md text-sm font-medium hover:bg-muted transition-default focus-ring">
                  View Details
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhaseCard;