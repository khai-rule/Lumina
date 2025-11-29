import Icon from '@/components/ui/AppIcon';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Activity {
  id: string;
  type: 'phase_completed' | 'ai_recommendation' | 'project_created' | 'milestone_reached';
  title: string;
  description: string;
  timestamp: string;
  projectName: string;
  metadata?: {
    phase?: string;
    recommendation?: string;
    milestone?: string;
  };
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'phase_completed':
        return 'CheckCircleIcon';
      case 'ai_recommendation':
        return 'LightBulbIcon';
      case 'project_created':
        return 'PlusCircleIcon';
      case 'milestone_reached':
        return 'FlagIcon';
      default:
        return 'InformationCircleIcon';
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'phase_completed':
        return 'text-success bg-success/10';
      case 'ai_recommendation':
        return 'text-warning bg-warning/10';
      case 'project_created':
        return 'text-primary bg-primary/10';
      case 'milestone_reached':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Button variant="link" className="text-sm p-0 h-auto">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="ClockIcon" size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-muted/50 transition-default">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                <Icon name={getActivityIcon(activity.type) as any} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{activity.title}</p>
                    <p className="text-muted-foreground text-sm mt-1">{activity.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-muted-foreground">{activity.projectName}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
                {activity.metadata && (
                  <div className="mt-2">
                    {activity.metadata.phase && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                        {activity.metadata.phase}
                      </span>
                    )}
                    {activity.metadata.recommendation && (
                      <p className="text-xs text-muted-foreground mt-1 italic">
                        "{activity.metadata.recommendation}"
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default RecentActivity;