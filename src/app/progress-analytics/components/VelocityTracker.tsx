import Icon from '@/components/ui/AppIcon';
import { Card } from '@/components/ui/Card';

interface VelocityData {
  period: string;
  tasksCompleted: number;
  velocity: number;
  trend: 'up' | 'down' | 'stable';
}

interface VelocityTrackerProps {
  data: VelocityData[];
  averageVelocity: number;
}

const VelocityTracker = ({ data, averageVelocity }: VelocityTrackerProps) => {
  const getTrendIcon = (trend: VelocityData['trend']) => {
    if (trend === 'up') return 'ArrowTrendingUpIcon';
    if (trend === 'down') return 'ArrowTrendingDownIcon';
    return 'MinusIcon';
  };

  const getTrendColor = (trend: VelocityData['trend']) => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <Card className="p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Velocity Tracking</h3>
          <p className="text-sm text-muted-foreground">Task completion rate over time</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Average Velocity</p>
          <p className="text-2xl font-semibold text-foreground">{averageVelocity}</p>
          <p className="text-xs text-muted-foreground">tasks/week</p>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-default"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-lg font-semibold text-primary">{item.velocity}</span>
              </div>
              <div>
                <p className="font-medium text-foreground">{item.period}</p>
                <p className="text-sm text-muted-foreground">{item.tasksCompleted} tasks completed</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name={getTrendIcon(item.trend) as any} size={20} className={getTrendColor(item.trend)} />
              <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                {item.trend === 'stable' ? 'Stable' : item.trend === 'up' ? 'Improving' : 'Declining'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default VelocityTracker;