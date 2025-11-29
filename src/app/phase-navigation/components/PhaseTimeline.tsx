import Icon from '@/components/ui/AppIcon';

interface Phase {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'pending' | 'locked';
  progress: number;
}

interface PhaseTimelineProps {
  phases: Phase[];
  onPhaseClick: (phaseId: string) => void;
}

const PhaseTimeline = ({ phases, onPhaseClick }: PhaseTimelineProps) => {
  const getStatusColor = (status: Phase['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'active':
        return 'bg-primary text-primary-foreground';
      case 'pending':
        return 'bg-muted text-muted-foreground';
      case 'locked':
        return 'bg-muted/50 text-muted-foreground';
    }
  };

  const getConnectorColor = (currentStatus: Phase['status'], nextStatus: Phase['status']) => {
    if (currentStatus === 'completed') return 'bg-success';
    if (currentStatus === 'active' && nextStatus === 'pending') return 'bg-gradient-to-r from-primary to-muted';
    return 'bg-muted';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="font-semibold text-foreground mb-6">SDLC Phase Timeline</h3>
      
      {/* Desktop Timeline */}
      <div className="hidden lg:block">
        <div className="relative">
          <div className="flex items-center justify-between">
            {phases.map((phase, index) => (
              <div key={phase.id} className="flex flex-col items-center flex-1">
                <div className="relative flex items-center w-full">
                  {index > 0 && (
                    <div className="flex-1 h-1 -ml-2">
                      <div className={`h-full ${getConnectorColor(phases[index - 1].status, phase.status)}`} />
                    </div>
                  )}
                  <button
                    onClick={() => onPhaseClick(phase.id)}
                    disabled={phase.status === 'locked'}
                    className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm transition-default shadow-subtle hover:shadow-hover focus-ring disabled:cursor-not-allowed ${getStatusColor(
                      phase.status
                    )}`}
                  >
                    {phase.status === 'completed' ? (
                      <Icon name="CheckIcon" size={24} />
                    ) : phase.status === 'locked' ? (
                      <Icon name="LockClosedIcon" size={20} />
                    ) : (
                      index + 1
                    )}
                  </button>
                  {index < phases.length - 1 && (
                    <div className="flex-1 h-1 -mr-2">
                      <div className={`h-full ${getConnectorColor(phase.status, phases[index + 1].status)}`} />
                    </div>
                  )}
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm font-medium text-foreground">{phase.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{phase.progress}% complete</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile Timeline */}
      <div className="lg:hidden space-y-4">
        {phases.map((phase, index) => (
          <div key={phase.id}>
            <button
              onClick={() => onPhaseClick(phase.id)}
              disabled={phase.status === 'locked'}
              className="w-full flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted transition-default focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-default ${getStatusColor(phase.status)}`}>
                {phase.status === 'completed' ? (
                  <Icon name="CheckIcon" size={20} />
                ) : phase.status === 'locked' ? (
                  <Icon name="LockClosedIcon" size={18} />
                ) : (
                  index + 1
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{phase.name}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex-1 bg-muted rounded-full h-1.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        phase.status === 'completed' ? 'bg-success' : 'bg-primary'
                      }`}
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{phase.progress}%</span>
                </div>
              </div>
              <Icon name="ChevronRightIcon" size={20} className="text-muted-foreground" />
            </button>
            {index < phases.length - 1 && (
              <div className="flex justify-center py-2">
                <div className="w-0.5 h-6 bg-border" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhaseTimeline;