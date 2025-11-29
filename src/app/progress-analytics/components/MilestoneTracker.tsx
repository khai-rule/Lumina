import Icon from '@/components/ui/AppIcon';
import { Card } from '@/components/ui/Card';

interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  status: 'completed' | 'on-track' | 'at-risk' | 'overdue';
  completionPercentage: number;
  phase: string;
}

interface MilestoneTrackerProps {
  milestones: Milestone[];
}

const MilestoneTracker = ({ milestones }: MilestoneTrackerProps) => {
  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'on-track':
        return 'bg-primary text-primary-foreground';
      case 'at-risk':
        return 'bg-warning text-warning-foreground';
      case 'overdue':
        return 'bg-error text-error-foreground';
    }
  };

  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return 'CheckCircleIcon';
      case 'on-track':
        return 'ClockIcon';
      case 'at-risk':
        return 'ExclamationTriangleIcon';
      case 'overdue':
        return 'XCircleIcon';
    }
  };

  const getStatusLabel = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'on-track':
        return 'On Track';
      case 'at-risk':
        return 'At Risk';
      case 'overdue':
        return 'Overdue';
    }
  };

  return (
    <Card className="p-6 shadow-subtle">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Milestone Achievement</h3>
        <p className="text-sm text-muted-foreground">Track progress towards key project milestones</p>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="border border-border rounded-lg p-4 hover:shadow-subtle transition-default"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{milestone.title}</h4>
                <p className="text-sm text-muted-foreground">{milestone.phase}</p>
              </div>
              <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium ${getStatusColor(milestone.status)}`}>
                <Icon name={getStatusIcon(milestone.status) as any} size={14} />
                <span>{getStatusLabel(milestone.status)}</span>
              </span>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{milestone.completionPercentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    milestone.status === 'completed' ? 'bg-success' :
                    milestone.status === 'on-track' ? 'bg-primary' :
                    milestone.status === 'at-risk'? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${milestone.completionPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="CalendarIcon" size={16} />
              <span>Due: {milestone.dueDate}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MilestoneTracker;