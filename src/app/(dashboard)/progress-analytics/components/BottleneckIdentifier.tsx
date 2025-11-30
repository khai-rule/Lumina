import Icon from '@/components/ui/AppIcon';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Bottleneck {
  id: string;
  phase: string;
  issue: string;
  impact: 'high' | 'medium' | 'low';
  blockedTasks: number;
  suggestedAction: string;
}

interface BottleneckIdentifierProps {
  bottlenecks: Bottleneck[];
  onResolveClick: (bottleneckId: string) => void;
}

const BottleneckIdentifier = ({ bottlenecks, onResolveClick }: BottleneckIdentifierProps) => {
  const getImpactColor = (impact: Bottleneck['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-error/10 text-error border-error/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
    }
  };

  const getImpactIcon = (impact: Bottleneck['impact']) => {
    switch (impact) {
      case 'high':
        return 'ExclamationCircleIcon';
      case 'medium':
        return 'ExclamationTriangleIcon';
      case 'low':
        return 'InformationCircleIcon';
    }
  };

  return (
    <Card className="p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Bottleneck Identification</h3>
          <p className="text-sm text-muted-foreground">Issues blocking project progress</p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-error/10 text-error rounded-md">
          <Icon name="ExclamationTriangleIcon" size={16} />
          <span className="text-sm font-medium">{bottlenecks.length} Active</span>
        </div>
      </div>

      <div className="space-y-4">
        {bottlenecks.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircleIcon" size={48} className="mx-auto text-success mb-3" />
            <p className="text-muted-foreground">No bottlenecks detected</p>
          </div>
        ) : (
          bottlenecks.map((bottleneck) => (
            <div
              key={bottleneck.id}
              className={`border-2 rounded-lg p-4 ${getImpactColor(bottleneck.impact)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <Icon name={getImpactIcon(bottleneck.impact) as any} size={24} />
                  <div>
                    <h4 className="font-semibold mb-1">{bottleneck.phase}</h4>
                    <p className="text-sm opacity-90">{bottleneck.issue}</p>
                  </div>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-background/50 rounded">
                  {bottleneck.impact.toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mb-3 text-sm">
                <div className="flex items-center space-x-1">
                  <Icon name="ClockIcon" size={16} />
                  <span>{bottleneck.blockedTasks} tasks blocked</span>
                </div>
              </div>

              <div className="bg-background/30 rounded-md p-3 mb-3">
                <p className="text-xs font-medium mb-1">Suggested Action:</p>
                <p className="text-sm">{bottleneck.suggestedAction}</p>
              </div>

              <Button
                variant="secondary"
                onClick={() => onResolveClick(bottleneck.id)}
                className="w-full bg-background hover:bg-background/80"
              >
                Mark as Resolved
              </Button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default BottleneckIdentifier;