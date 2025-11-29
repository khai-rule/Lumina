'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Requirement {
  id: string;
  type: 'functional' | 'non-functional' | 'constraint';
  title: string;
  description: string;
  priority: 'must-have' | 'should-have' | 'nice-to-have';
}

interface RequirementsGatheringProps {
  requirements: Requirement[];
  onUpdate: (requirements: Requirement[]) => void;
}

const RequirementsGathering = ({ requirements, onUpdate }: RequirementsGatheringProps) => {
  const [activeTab, setActiveTab] = useState<'functional' | 'non-functional' | 'constraint'>('functional');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Requirement, 'id'>>({
    type: 'functional',
    title: '',
    description: '',
    priority: 'must-have',
  });

  const handleAdd = () => {
    if (!formData.title || !formData.description) return;

    const newRequirement: Requirement = {
      id: Date.now().toString(),
      ...formData,
      type: activeTab,
    };

    onUpdate([...requirements, newRequirement]);
    setFormData({ type: activeTab, title: '', description: '', priority: 'must-have' });
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    onUpdate(requirements.filter((r) => r.id !== id));
  };

  const filteredRequirements = requirements.filter((r) => r.type === activeTab);

  const getPriorityColor = (priority: Requirement['priority']) => {
    switch (priority) {
      case 'must-have':
        return 'bg-error/10 text-error border-error/20';
      case 'should-have':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const tabs = [
    { id: 'functional' as const, label: 'Functional', icon: 'CogIcon' },
    { id: 'non-functional' as const, label: 'Non-Functional', icon: 'ChartBarIcon' },
    { id: 'constraint' as const, label: 'Constraints', icon: 'ShieldCheckIcon' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start space-x-3">
        <Icon name="DocumentTextIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-foreground font-medium">Initial Requirements</p>
          <p className="text-sm text-muted-foreground mt-1">
            Document your initial requirements. These will be refined throughout the SDLC process. Categorize them as functional features, non-functional qualities, or project constraints.
          </p>
        </div>
      </div>

      <div className="border-b border-border">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-default ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon as any} size={18} />
              <span>{tab.label}</span>
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {requirements.filter((r) => r.type === tab.id).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filteredRequirements.length > 0 && (
        <div className="space-y-3">
          {filteredRequirements.map((requirement) => (
            <div
              key={requirement.id}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-subtle transition-default"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-foreground">{requirement.title}</h4>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getPriorityColor(
                        requirement.priority
                      )}`}
                    >
                      {requirement.priority.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{requirement.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(requirement.id)}
                  className="ml-4 p-2 rounded-md text-muted-foreground hover:bg-error/10 hover:text-error transition-default"
                  aria-label="Delete requirement"
                >
                  <Icon name="TrashIcon" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-muted border-2 border-dashed border-border rounded-lg text-muted-foreground hover:bg-muted/50 hover:border-primary hover:text-primary transition-default"
        >
          <Icon name="PlusCircleIcon" size={20} />
          <span className="font-medium">Add {tabs.find(t => t.id === activeTab)?.label} Requirement</span>
        </button>
      ) : (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h4 className="font-medium text-foreground">Add New Requirement</h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Title <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., User Authentication System"
                className="w-full px-4 py-2.5 bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-default"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description <span className="text-error">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the requirement in detail..."
                rows={3}
                className="w-full px-4 py-2.5 bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-default resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
              <div className="flex space-x-3">
                {(['must-have', 'should-have', 'nice-to-have'] as const).map((priority) => (
                  <button
                    key={priority}
                    onClick={() => setFormData({ ...formData, priority })}
                    className={`flex-1 px-4 py-2.5 rounded-md font-medium text-sm transition-default ${
                      formData.priority === priority
                        ? priority === 'must-have' ?'bg-error text-error-foreground'
                          : priority === 'should-have' ?'bg-warning text-warning-foreground' :'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    {priority.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={handleAdd}
              disabled={!formData.title || !formData.description}
              className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-default disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Requirement
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setFormData({ type: activeTab, title: '', description: '', priority: 'must-have' });
              }}
              className="px-4 py-2.5 bg-muted text-foreground rounded-md font-medium hover:bg-muted/50 transition-default"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequirementsGathering;