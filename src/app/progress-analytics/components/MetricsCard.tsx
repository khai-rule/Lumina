import Icon from '@/components/ui/AppIcon';
import { Card } from '@/components/ui/Card';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
}

const MetricsCard = ({ title, value, change, changeLabel, icon, trend }: MetricsCardProps) => {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'ArrowTrendingUpIcon';
    if (trend === 'down') return 'ArrowTrendingDownIcon';
    return 'MinusIcon';
  };

  return (
    <Card className="p-6 shadow-subtle hover:shadow-hover transition-default">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-semibold text-foreground">{value}</p>
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={icon as any} size={24} className="text-primary" />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Icon name={getTrendIcon() as any} size={16} className={getTrendColor()} />
        <span className={`text-sm font-medium ${getTrendColor()}`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
        <span className="text-sm text-muted-foreground">{changeLabel}</span>
      </div>
    </Card>
  );
};

export default MetricsCard;