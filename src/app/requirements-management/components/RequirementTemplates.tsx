'use client';

import Icon from '@/components/ui/AppIcon';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  fields: string[];
}

interface RequirementTemplatesProps {
  templates: Template[];
  onSelectTemplate: (templateId: string) => void;
}

const RequirementTemplates = ({
  templates,
  onSelectTemplate,
}: RequirementTemplatesProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-md flex items-center justify-center">
          <Icon name="DocumentDuplicateIcon" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Requirement Templates</h3>
          <p className="text-sm text-muted-foreground">Start with pre-built templates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className="text-left p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-default focus-ring"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                <Icon name={template.icon as any} size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1">{template.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                <div className="flex flex-wrap gap-1">
                  {template.fields.slice(0, 3).map((field, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground"
                    >
                      {field}
                    </span>
                  ))}
                  {template.fields.length > 3 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                      +{template.fields.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RequirementTemplates;