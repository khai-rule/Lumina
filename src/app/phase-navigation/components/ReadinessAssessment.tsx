import Icon from '@/components/ui/AppIcon';

interface ReadinessAssessmentProps {
  assessment: {
    overallScore: number;
    readyToProgress: boolean;
    criteria: Array<{
      name: string;
      status: 'passed' | 'warning' | 'failed';
      score: number;
      feedback: string;
    }>;
    recommendations: string[];
  } | null;
  onRequestAssessment: () => void;
  isLoading: boolean;
}

const ReadinessAssessment = ({
  assessment,
  onRequestAssessment,
  isLoading,
}: ReadinessAssessmentProps) => {
  const getStatusIcon = (status: 'passed' | 'warning' | 'failed') => {
    switch (status) {
      case 'passed':
        return 'CheckCircleIcon';
      case 'warning':
        return 'ExclamationTriangleIcon';
      case 'failed':
        return 'XCircleIcon';
    }
  };

  const getStatusColor = (status: 'passed' | 'warning' | 'failed') => {
    switch (status) {
      case 'passed':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'failed':
        return 'text-error';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  if (!assessment) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="ClipboardDocumentCheckIcon" size={32} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Ready for Phase Assessment?
          </h3>
          <p className="text-muted-foreground mb-6">
            Request an AI-powered evaluation to determine if you're ready to progress to the next phase. The assessment will analyze your completed tasks, deliverables, and overall progress.
          </p>
          <button
            onClick={onRequestAssessment}
            disabled={isLoading}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-default focus-ring disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
          >
            {isLoading ? (
              <>
                <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Icon name="SparklesIcon" size={20} />
                <span>Request Phase Assessment</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className={`p-6 ${assessment.readyToProgress ? 'bg-success/5' : 'bg-warning/5'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${assessment.readyToProgress ? 'bg-success/10' : 'bg-warning/10'}`}>
              <Icon
                name={assessment.readyToProgress ? 'CheckBadgeIcon' : 'ExclamationTriangleIcon'}
                size={24}
                className={assessment.readyToProgress ? 'text-success' : 'text-warning'}
              />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Phase Readiness Assessment</h3>
              <p className="text-sm text-muted-foreground">
                {assessment.readyToProgress
                  ? 'You are ready to progress to the next phase' :'Some improvements needed before progressing'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-3xl font-bold ${getScoreColor(assessment.overallScore)}`}>
              {assessment.overallScore}%
            </p>
            <p className="text-xs text-muted-foreground">Overall Score</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="font-medium text-foreground mb-4">Assessment Criteria</h4>
        <div className="space-y-4 mb-6">
          {assessment.criteria.map((criterion, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Icon
                    name={getStatusIcon(criterion.status) as any}
                    size={20}
                    className={getStatusColor(criterion.status)}
                  />
                  <div>
                    <h5 className="font-medium text-foreground">{criterion.name}</h5>
                    <p className="text-sm text-muted-foreground mt-1">{criterion.feedback}</p>
                  </div>
                </div>
                <span className={`text-lg font-semibold ${getScoreColor(criterion.score)}`}>
                  {criterion.score}%
                </span>
              </div>
              <div className="mt-3">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      criterion.status === 'passed' ?'bg-success'
                        : criterion.status === 'warning' ?'bg-warning' :'bg-error'
                    }`}
                    style={{ width: `${criterion.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {assessment.recommendations.length > 0 && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="LightBulbIcon" size={18} className="text-primary" />
              <span>Recommendations for Improvement</span>
            </h4>
            <ul className="space-y-2">
              {assessment.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <Icon name="ArrowRightIcon" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex space-x-3 mt-6">
          {assessment.readyToProgress ? (
            <button className="flex-1 px-6 py-3 bg-success text-success-foreground rounded-md font-medium hover:bg-success/90 transition-default focus-ring flex items-center justify-center space-x-2">
              <Icon name="ArrowRightIcon" size={20} />
              <span>Proceed to Next Phase</span>
            </button>
          ) : (
            <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-default focus-ring">
              Continue Working on Current Phase
            </button>
          )}
          <button
            onClick={onRequestAssessment}
            disabled={isLoading}
            className="px-6 py-3 border border-border text-foreground rounded-md font-medium hover:bg-muted transition-default focus-ring disabled:opacity-50"
          >
            Re-assess
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadinessAssessment;