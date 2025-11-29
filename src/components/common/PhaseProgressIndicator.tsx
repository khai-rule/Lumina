'use client';

import Icon from '@/components/ui/AppIcon';

interface Phase {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'pending' | 'locked';
  completionPercentage: number;
  aiAssessment?: 'passed' | 'needs-improvement' | 'pending';
}

interface PhaseProgressIndicatorProps {
  phases: Phase[];
  orientation?: 'horizontal' | 'vertical';
}

const PhaseProgressIndicator = ({
  phases,
  orientation = 'horizontal',
}: PhaseProgressIndicatorProps) => {
  const getStatusColor = (status: Phase['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'active':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getAssessmentIcon = (assessment?: Phase['aiAssessment']) => {
    switch (assessment) {
      case 'passed':
        return 'CheckCircleIcon';
      case 'needs-improvement':
        return 'ExclamationCircleIcon';
      default:
        return 'ClockIcon';
    }
  };

  const getAssessmentColor = (assessment?: Phase['aiAssessment']) => {
    switch (assessment) {
      case 'passed':
        return 'text-success';
      case 'needs-improvement':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  if (orientation === 'vertical') {
    return (
      <div className="space-y-4">
        {phases.map((phase, index) => (
          <div key={phase.id} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-default ${getStatusColor(
                  phase.status
                )}`}
              >
                {index + 1}
              </div>
              {index < phases.length - 1 && (
                <div className="w-0.5 h-12 bg-border mt-2"></div>
              )}
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">{phase.name}</h4>
                {phase.aiAssessment && (
                  <Icon
                    name={getAssessmentIcon(phase.aiAssessment) as any}
                    size={16}
                    className={getAssessmentColor(phase.aiAssessment)}
                  />
                )}
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${phase.completionPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {phase.completionPercentage}% complete
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {phases.map((phase, index) => (
          <div key={phase.id} className="flex flex-col items-center flex-1">
            <div className="relative flex items-center w-full">
              {index > 0 && (
                <div className="flex-1 h-0.5 bg-border">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{
                      width:
                        phases[index - 1].status === 'completed' ? '100%' : '0%',
                    }}
                  ></div>
                </div>
              )}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-default shadow-subtle ${getStatusColor(
                  phase.status
                )}`}
              >
                {phase.status === 'completed' ? (
                  <Icon name="CheckIcon" size={20} />
                ) : (
                  index + 1
                )}
              </div>
              {index < phases.length - 1 && (
                <div className="flex-1 h-0.5 bg-border">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{
                      width: phase.status === 'completed' ? '100%' : '0%',
                    }}
                  ></div>
                </div>
              )}
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm font-medium text-foreground">{phase.name}</p>
              <div className="flex items-center justify-center space-x-1 mt-1">
                <p className="text-xs text-muted-foreground">
                  {phase.completionPercentage}%
                </p>
                {phase.aiAssessment && (
                  <Icon
                    name={getAssessmentIcon(phase.aiAssessment) as any}
                    size={14}
                    className={getAssessmentColor(phase.aiAssessment)}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhaseProgressIndicator;