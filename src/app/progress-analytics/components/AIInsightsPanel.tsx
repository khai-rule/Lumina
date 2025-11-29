import Icon from '@/components/ui/AppIcon';

interface Insight {
  id: string;
  type: 'recommendation' | 'risk' | 'optimization';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionLabel?: string;
}

interface AIInsightsPanelProps {
  insights: Insight[];
  onActionClick: (insightId: string) => void;
}

const AIInsightsPanel = ({ insights, onActionClick }: AIInsightsPanelProps) => {
  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'recommendation':
        return 'LightBulbIcon';
      case 'risk':
        return 'ExclamationTriangleIcon';
      case 'optimization':
        return 'SparklesIcon';
    }
  };

  const getInsightColor = (type: Insight['type']) => {
    switch (type) {
      case 'recommendation':
        return 'text-primary bg-primary/10';
      case 'risk':
        return 'text-warning bg-warning/10';
      case 'optimization':
        return 'text-accent bg-accent/10';
    }
  };

  const getPriorityBadge = (priority: Insight['priority']) => {
    const styles = {
      high: 'bg-error/10 text-error',
      medium: 'bg-warning/10 text-warning',
      low: 'bg-success/10 text-success',
    };
    return styles[priority];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">AI-Powered Insights</h3>
          <p className="text-sm text-muted-foreground">Recommendations and optimization opportunities</p>
        </div>
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="SparklesIcon" size={20} className="text-accent" />
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="border border-border rounded-lg p-4 hover:shadow-subtle transition-default"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getInsightColor(insight.type)}`}>
                <Icon name={getInsightIcon(insight.type) as any} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">{insight.title}</h4>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getPriorityBadge(insight.priority)}`}>
                    {insight.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                {insight.actionLabel && (
                  <button
                    onClick={() => onActionClick(insight.id)}
                    className="text-sm text-primary font-medium hover:underline focus-ring"
                  >
                    {insight.actionLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsightsPanel;