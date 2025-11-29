import Icon from '@/components/ui/AppIcon';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface AIGuidancePanelProps {
  guidance: {
    title: string;
    recommendations: string[];
    warnings: string[];
    resources: Array<{ title: string; type: string; url: string }>;
  };
}

const AIGuidancePanel = ({ guidance }: AIGuidancePanelProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name="SparklesIcon" size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{guidance.title}</h3>
          <p className="text-sm text-muted-foreground">AI-powered insights for your current phase</p>
        </div>
      </div>
      
      {guidance.recommendations.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="LightBulbIcon" size={18} className="text-success" />
            <span>Recommendations</span>
          </h4>
          <ul className="space-y-2">
            {guidance.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {guidance.warnings.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="ExclamationTriangleIcon" size={18} className="text-warning" />
            <span>Important Considerations</span>
          </h4>
          <ul className="space-y-2">
            {guidance.warnings.map((warning, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <Icon name="ExclamationCircleIcon" size={16} className="text-warning flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {guidance.resources.length > 0 && (
        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="BookOpenIcon" size={18} className="text-primary" />
            <span>Helpful Resources</span>
          </h4>
          <div className="space-y-2">
            {guidance.resources.map((resource, index) => (
              <Button
                key={index}
                variant="outline"
                asChild
                className="w-full justify-between h-auto p-3"
              >
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="DocumentTextIcon" size={16} className="text-muted-foreground" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">{resource.title}</p>
                      <p className="text-xs text-muted-foreground font-normal">{resource.type}</p>
                    </div>
                  </div>
                  <Icon name="ArrowTopRightOnSquareIcon" size={16} className="text-muted-foreground" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default AIGuidancePanel;