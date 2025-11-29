'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface AnalysisResult {
  score: number;
  completeness: number;
  suggestions: string[];
  bestPractices: string[];
  issues: Array<{
    type: 'error' | 'warning' | 'info';
    message: string;
    severity: 'high' | 'medium' | 'low';
  }>;
}

interface AIAnalysisPanelProps {
  hasDiagramContent: boolean;
  onAnalyze: () => void;
}

const AIAnalysisPanel = ({ hasDiagramContent, onAnalyze }: AIAnalysisPanelProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'suggestions' | 'issues'>('overview');

  const mockAnalysisResult: AnalysisResult = {
    score: 85,
    completeness: 78,
    suggestions: [
      'Consider adding more detailed class attributes and methods',
      'Include access modifiers (public, private, protected) for better clarity',
      'Add association labels to describe relationships between classes',
      'Consider using composition instead of aggregation for stronger relationships',
      'Add interface segregation to improve design modularity',
    ],
    bestPractices: [
      'Good use of inheritance hierarchy',
      'Proper naming conventions followed',
      'Clear separation of concerns',
      'Appropriate use of abstract classes',
    ],
    issues: [
      {
        type: 'warning',
        message: 'Missing return types in some method signatures',
        severity: 'medium',
      },
      {
        type: 'info',
        message: 'Consider adding documentation comments',
        severity: 'low',
      },
      {
        type: 'error',
        message: 'Circular dependency detected between User and Order classes',
        severity: 'high',
      },
    ],
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    onAnalyze();
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult(mockAnalysisResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error':
        return 'XCircleIcon';
      case 'warning':
        return 'ExclamationTriangleIcon';
      default:
        return 'InformationCircleIcon';
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-primary';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-error/10 text-error';
      case 'medium':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  return (
    <Card className="w-full lg:w-80 overflow-hidden flex flex-col p-0">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">AI Analysis</h3>
          <Icon name="SparklesIcon" size={20} className="text-primary" />
        </div>
        
        <Button
          onClick={handleAnalyze}
          disabled={!hasDiagramContent || isAnalyzing}
          className="w-full"
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Icon name="MagnifyingGlassIcon" size={16} className="mr-2" />
              <span>Analyze Diagram</span>
            </>
          )}
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {!analysisResult && !isAnalyzing && (
          <div className="p-6 text-center">
            <Icon name="ChartBarIcon" size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              {hasDiagramContent 
                ? 'Click "Analyze Diagram" to get AI-powered insights and suggestions' :'Create a diagram to enable AI analysis'
              }
            </p>
          </div>
        )}

        {isAnalyzing && (
          <div className="p-6 text-center">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-foreground font-medium">Analyzing your diagram...</p>
            <p className="text-muted-foreground text-sm mt-1">This may take a few moments</p>
          </div>
        )}

        {analysisResult && (
          <div className="h-full flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-border">
              {[
                { id: 'overview', name: 'Overview', icon: 'ChartBarIcon' },
                { id: 'suggestions', name: 'Suggestions', icon: 'LightBulbIcon' },
                { id: 'issues', name: 'Issues', icon: 'ExclamationTriangleIcon' },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 rounded-none h-auto py-2 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab.icon as any} size={16} className="mr-1" />
                  <span className="hidden lg:inline">{tab.name}</span>
                </Button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(analysisResult.score)}`}>
                      {analysisResult.score}%
                    </div>
                    <p className="text-muted-foreground text-sm">Overall Score</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Completeness</span>
                        <span className="text-foreground">{analysisResult.completeness}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${analysisResult.completeness}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <h4 className="font-medium text-foreground mb-2">Best Practices</h4>
                      <ul className="space-y-1">
                        {analysisResult.bestPractices.slice(0, 3).map((practice, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <Icon name="CheckIcon" size={16} className="text-success mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{practice}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'suggestions' && (
                <div className="space-y-3">
                  {analysisResult.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-md">
                      <Icon name="LightBulbIcon" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-foreground">{suggestion}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'issues' && (
                <div className="space-y-3">
                  {analysisResult.issues.map((issue, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border border-border rounded-md">
                      <Icon
                        name={getIssueIcon(issue.type) as any}
                        size={16}
                        className={`${getIssueColor(issue.type)} mt-0.5 flex-shrink-0`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-foreground">{issue.message}</p>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSeverityBadge(issue.severity)}`}>
                            {issue.severity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AIAnalysisPanel;