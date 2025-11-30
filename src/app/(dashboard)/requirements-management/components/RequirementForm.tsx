'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

interface Requirement {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'draft' | 'review' | 'approved' | 'rejected';
  acceptanceCriteria: string[];
  stakeholder: string;
  traceabilityLinks: string[];
  category: string;
}

interface RequirementFormProps {
  requirement?: Requirement;
  categoryId: string;
  onSave: (requirement: Partial<Requirement>) => void;
  onCancel: () => void;
}

const RequirementForm = ({
  requirement,
  categoryId,
  onSave,
  onCancel,
}: RequirementFormProps) => {
  const [formData, setFormData] = useState<Partial<Requirement>>({
    title: requirement?.title || '',
    description: requirement?.description || '',
    priority: requirement?.priority || 'medium',
    status: requirement?.status || 'draft',
    acceptanceCriteria: requirement?.acceptanceCriteria || [''],
    stakeholder: requirement?.stakeholder || '',
    traceabilityLinks: requirement?.traceabilityLinks || [],
    category: categoryId,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.stakeholder?.trim()) {
      newErrors.stakeholder = 'Stakeholder assignment is required';
    }
    
    const validCriteria = formData.acceptanceCriteria?.filter(c => c.trim());
    if (!validCriteria || validCriteria.length === 0) {
      newErrors.acceptanceCriteria = 'At least one acceptance criterion is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const addAcceptanceCriterion = () => {
    setFormData({
      ...formData,
      acceptanceCriteria: [...(formData.acceptanceCriteria || []), ''],
    });
  };

  const updateAcceptanceCriterion = (index: number, value: string) => {
    const updated = [...(formData.acceptanceCriteria || [])];
    updated[index] = value;
    setFormData({ ...formData, acceptanceCriteria: updated });
  };

  const removeAcceptanceCriterion = (index: number) => {
    const updated = formData.acceptanceCriteria?.filter((_, i) => i !== index);
    setFormData({ ...formData, acceptanceCriteria: updated });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-error text-error-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {requirement ? 'Edit Requirement' : 'New Requirement'}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground"
        >
          <Icon name="XMarkIcon" size={20} />
        </Button>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
          Requirement Title *
        </label>
        <Input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={errors.title ? 'border-error' : ''}
          placeholder="Enter a clear, concise requirement title"
        />
        {errors.title && (
          <p className="text-error text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
          Description *
        </label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className={`resize-none ${errors.description ? 'border-error' : ''}`}
          placeholder="Provide detailed description of the requirement"
        />
        {errors.description && (
          <p className="text-error text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Priority and Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-foreground mb-2">
            Priority Level *
          </label>
          <select
            id="priority"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
            className="w-full px-4 py-2.5 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-default"
          >
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-foreground mb-2">
            Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            className="w-full px-4 py-2.5 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-default"
          >
            <option value="draft">Draft</option>
            <option value="review">In Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Stakeholder */}
      <div>
        <label htmlFor="stakeholder" className="block text-sm font-medium text-foreground mb-2">
          Assigned Stakeholder *
        </label>
        <Input
          type="text"
          id="stakeholder"
          value={formData.stakeholder}
          onChange={(e) => setFormData({ ...formData, stakeholder: e.target.value })}
          className={errors.stakeholder ? 'border-error' : ''}
          placeholder="Enter stakeholder name or role"
        />
        {errors.stakeholder && (
          <p className="text-error text-sm mt-1">{errors.stakeholder}</p>
        )}
      </div>

      {/* Acceptance Criteria */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-foreground">
            Acceptance Criteria *
          </label>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={addAcceptanceCriterion}
            className="flex items-center space-x-1 text-primary hover:text-primary/80 hover:bg-primary/10"
          >
            <Icon name="PlusIcon" size={16} />
            <span>Add Criterion</span>
          </Button>
        </div>
        <div className="space-y-2">
          {formData.acceptanceCriteria?.map((criterion, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Input
                type="text"
                value={criterion}
                onChange={(e) => updateAcceptanceCriterion(index, e.target.value)}
                className="flex-1"
                placeholder={`Acceptance criterion ${index + 1}`}
              />
              {formData.acceptanceCriteria && formData.acceptanceCriteria.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => removeAcceptanceCriterion(index)}
                  className="text-error hover:bg-error/10 hover:text-error"
                >
                  <Icon name="TrashIcon" size={18} />
                </Button>
              )}
            </div>
          ))}
        </div>
        {errors.acceptanceCriteria && (
          <p className="text-error text-sm mt-1">{errors.acceptanceCriteria}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
        <Button
          variant="outline"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
        >
          {requirement ? 'Update Requirement' : 'Save Requirement'}
        </Button>
      </div>
    </form>
  );
};

export default RequirementForm;