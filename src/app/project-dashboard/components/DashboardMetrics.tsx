import Icon from '@/components/ui/AppIcon';

interface Metric {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

interface DashboardMetricsProps {
  metrics: Metric[];
}

const DashboardMetrics = ({ metrics }: DashboardMetricsProps) => {
  const getChangeColor = (changeType: Metric['changeType']) => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (changeType: Metric['changeType']) => {
    switch (changeType) {
      case 'positive':
        return 'ArrowUpIcon';
      case 'negative':
        return 'ArrowDownIcon';
      default:
        return 'MinusIcon';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric) => (
        <div key={metric.id} className="bg-card border border-border rounded-lg p-6 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={metric.icon as any} size={24} className="text-primary" />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor(metric.changeType)}`}>
              <Icon name={getChangeIcon(metric.changeType) as any} size={16} />
              <span>{metric.change}</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;