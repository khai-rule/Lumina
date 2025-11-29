'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Methodology {
  id: string;
  name: string;
  description: string;
  icon: string;
  phases: string[];
  bestFor: string[];
  considerations: string[];
}

interface MethodologySelectionProps {
  selectedMethodology: string;
  onSelect: (methodologyId: string) => void;
}

const MethodologySelection = ({ selectedMethodology, onSelect }: MethodologySelectionProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const methodologies: Methodology[] = [
    {
      id: 'waterfall',
      name: 'Waterfall',
      description: 'Sequential approach with distinct phases completed one after another',
      icon: 'ArrowDownCircleIcon',
      phases: ['Requirements', 'Design', 'Implementation', 'Testing', 'Deployment', 'Maintenance'],
      bestFor: [
        'Well-defined requirements',
        'Stable project scope',
        'Regulated industries',
        'Fixed budget and timeline',
      ],
      considerations: [
        'Limited flexibility for changes',
        'Late testing phase',
        'Customer sees product at the end',
      ],
    },
    {
      id: 'agile',
      name: 'Agile',
      description: 'Iterative approach with continuous feedback and adaptation',
      icon: 'ArrowPathIcon',
      phases: ['Sprint Planning', 'Development', 'Testing', 'Review', 'Retrospective'],
      bestFor: [
        'Evolving requirements',
        'Customer collaboration',
        'Fast-paced environments',
        'Continuous delivery',
      ],
      considerations: [
        'Requires active stakeholder involvement',
        'Less predictable timelines',
        'Documentation may be lighter',
      ],
    },
    {
      id: 'hybrid',
      name: 'Hybrid',
      description: 'Combines structured planning with iterative development flexibility',
      icon: 'Squares2X2Icon',
      phases: [
        'Initial Planning',
        'Iterative Development',
        'Continuous Testing',
        'Incremental Delivery',
      ],
      bestFor: [
        'Complex projects',
        'Mixed team experience',
        'Partial requirement clarity',
        'Risk mitigation',
      ],
      considerations: [
        'Requires careful balance',
        'Team must understand both approaches',
        'More complex management',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start space-x-3">
        <Icon name="AcademicCapIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-foreground font-medium">Choose Your Methodology</p>
          <p className="text-sm text-muted-foreground mt-1">
            Select the development methodology that best fits your project needs. This will structure your SDLC phases and workflow.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {methodologies.map((methodology) => {
          const isSelected = selectedMethodology === methodology.id;
          const isExpanded = expandedId === methodology.id;

          return (
            <div
              key={methodology.id}
              className={`bg-card border-2 rounded-lg transition-default cursor-pointer ${
                isSelected
                  ? 'border-primary shadow-hover'
                  : 'border-border hover:border-primary/50 hover:shadow-subtle'
              }`}
              onClick={() => onSelect(methodology.id)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon name={methodology.icon as any} size={24} />
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="CheckIcon" size={16} className="text-primary-foreground" />
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">{methodology.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{methodology.description}</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedId(isExpanded ? null : methodology.id);
                  }}
                  className="flex items-center space-x-1 text-sm text-primary hover:underline"
                >
                  <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
                  <Icon
                    name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                    size={16}
                  />
                </button>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Key Phases</h4>
                      <div className="flex flex-wrap gap-2">
                        {methodology.phases.map((phase, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-foreground"
                          >
                            {phase}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Best For</h4>
                      <ul className="space-y-1">
                        {methodology.bestFor.map((item, index) => (
                          <li key={index} className="flex items-start text-xs text-muted-foreground">
                            <Icon name="CheckCircleIcon" size={14} className="text-success mr-1.5 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Considerations</h4>
                      <ul className="space-y-1">
                        {methodology.considerations.map((item, index) => (
                          <li key={index} className="flex items-start text-xs text-muted-foreground">
                            <Icon name="ExclamationCircleIcon" size={14} className="text-warning mr-1.5 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedMethodology && (
        <div className="bg-success/5 border border-success/20 rounded-lg p-4 flex items-start space-x-3">
          <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">
              {methodologies.find((m) => m.id === selectedMethodology)?.name} Selected
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Your project will be structured according to this methodology. You can change this later if needed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MethodologySelection;