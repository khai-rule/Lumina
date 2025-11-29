'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface AISuggestion {
  id: string;
  type: 'missing' | 'improvement' | 'conflict';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
}

interface AIAssistancePanelProps {
  suggestions: AISuggestion[];
  onApplySuggestion: (suggestionId: string) => void;
  onDismissSuggestion: (suggestionId: string) => void;
}

const AIAssistancePanel = ({
  suggestions,
  onApplySuggestion,
  onDismissSuggestion,
}: AIAssistancePanelProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'missing':
        return 'ExclamationTriangleIcon';
      case 'improvement':
        return 'LightBulbIcon';
      case 'conflict':
        return 'ExclamationCircleIcon';
      default:
        return 'InformationCircleIcon';
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'missing':
        return 'text-warning';
      case 'improvement':
        return 'text-primary';
      case 'conflict':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-error/10 text-error border-error/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-secondary/10 text-secondary border-secondary/20';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted transition-default focus-ring"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
            <Icon name="SparklesIcon" size={20} className="text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">AI Assistance</h3>
            <p className="text-sm text-muted-foreground">
              {suggestions.length} suggestion{suggestions.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>
        <Icon
          name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
          size={20}
          className="text-muted-foreground"
        />
      </button>

      {isExpanded && (
        <div className="border-t border-border">
          {suggestions.length === 0 ? (
            <div className="p-8 text-center">
              <Icon name="CheckCircleIcon" size={48} className="mx-auto text-success mb-3" />
              <p className="text-foreground font-medium mb-1">All Clear!</p>
              <p className="text-sm text-muted-foreground">
                No suggestions at this time. Your requirements look comprehensive.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border max-h-96 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="p-4 hover:bg-muted/50 transition-default">
                  <div className="flex items-start space-x-3">
                    <Icon
                      name={getSuggestionIcon(suggestion.type) as any}
                      size={20}
                      className={`flex-shrink-0 mt-0.5 ${getSuggestionColor(suggestion.type)}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground text-sm">{suggestion.title}</h4>
                        <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getImpactBadge(suggestion.impact)}`}>
                          {suggestion.impact}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onApplySuggestion(suggestion.id)}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-medium hover:bg-primary/90 transition-default focus-ring"
                        >
                          <Icon name="CheckIcon" size={14} />
                          <span>Apply</span>
                        </button>
                        <button
                          onClick={() => onDismissSuggestion(suggestion.id)}
                          className="flex items-center space-x-1 px-3 py-1.5 border border-input text-foreground rounded-md text-xs font-medium hover:bg-muted transition-default focus-ring"
                        >
                          <Icon name="XMarkIcon" size={14} />
                          <span>Dismiss</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIAssistancePanel;