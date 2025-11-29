'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  priority: 'high' | 'medium' | 'low';
}

interface StakeholderFormProps {
  stakeholders: Stakeholder[];
  onUpdate: (stakeholders: Stakeholder[]) => void;
}

const StakeholderForm = ({ stakeholders, onUpdate }: StakeholderFormProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Stakeholder, 'id'>>({
    name: '',
    role: '',
    email: '',
    phone: '',
    priority: 'medium',
  });

  const handleAdd = () => {
    if (!formData.name || !formData.role || !formData.email) return;

    const newStakeholder: Stakeholder = {
      id: Date.now().toString(),
      ...formData,
    };

    onUpdate([...stakeholders, newStakeholder]);
    setFormData({ name: '', role: '', email: '', phone: '', priority: 'medium' });
    setShowAddForm(false);
  };

  const handleEdit = (stakeholder: Stakeholder) => {
    setEditingId(stakeholder.id);
    setFormData({
      name: stakeholder.name,
      role: stakeholder.role,
      email: stakeholder.email,
      phone: stakeholder.phone,
      priority: stakeholder.priority,
    });
    setShowAddForm(true);
  };

  const handleUpdate = () => {
    if (!editingId) return;

    const updated = stakeholders.map((s) =>
      s.id === editingId ? { ...s, ...formData } : s
    );
    onUpdate(updated);
    setEditingId(null);
    setFormData({ name: '', role: '', email: '', phone: '', priority: 'medium' });
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    onUpdate(stakeholders.filter((s) => s.id !== id));
  };

  const getPriorityColor = (priority: Stakeholder['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10 text-error border-error/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start space-x-3">
        <Icon name="UsersIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-foreground font-medium">Stakeholder Identification</p>
          <p className="text-sm text-muted-foreground mt-1">
            Identify key stakeholders who will influence or be affected by the project. This helps in requirement gathering and communication planning.
          </p>
        </div>
      </div>

      {stakeholders.length > 0 && (
        <div className="space-y-3">
          {stakeholders.map((stakeholder) => (
            <div
              key={stakeholder.id}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-subtle transition-default"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-foreground">{stakeholder.name}</h4>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getPriorityColor(
                        stakeholder.priority
                      )}`}
                    >
                      {stakeholder.priority.charAt(0).toUpperCase() + stakeholder.priority.slice(1)} Priority
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stakeholder.role}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Icon name="EnvelopeIcon" size={14} className="mr-1" />
                      {stakeholder.email}
                    </span>
                    {stakeholder.phone && (
                      <span className="flex items-center">
                        <Icon name="PhoneIcon" size={14} className="mr-1" />
                        {stakeholder.phone}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(stakeholder)}
                    className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-default"
                    aria-label="Edit stakeholder"
                  >
                    <Icon name="PencilIcon" size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(stakeholder.id)}
                    className="p-2 rounded-md text-muted-foreground hover:bg-error/10 hover:text-error transition-default"
                    aria-label="Delete stakeholder"
                  >
                    <Icon name="TrashIcon" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!showAddForm ? (
        <Button
          onClick={() => setShowAddForm(true)}
          variant="outline"
          className="w-full h-auto py-8 border-2 border-dashed border-border hover:border-primary hover:bg-muted/50 flex-col gap-2"
        >
          <Icon name="PlusCircleIcon" size={24} />
          <span className="font-medium text-base">Add Stakeholder</span>
        </Button>
      ) : (
        <Card>
          <CardContent className="p-6 space-y-4">
            <h4 className="font-medium text-foreground">
              {editingId ? 'Edit Stakeholder' : 'Add New Stakeholder'}
            </h4>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name <span className="text-error">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Role <span className="text-error">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Product Owner"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email <span className="text-error">*</span>
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Priority Level</label>
                <div className="flex space-x-3">
                  {(['high', 'medium', 'low'] as const).map((priority) => (
                    <Button
                      key={priority}
                      type="button"
                      onClick={() => setFormData({ ...formData, priority })}
                      variant={formData.priority === priority ? (priority === 'high' ? 'destructive' : priority === 'medium' ? 'secondary' : 'default') : 'outline'}
                      className={`flex-1 ${formData.priority === priority && priority === 'medium' ? 'bg-warning text-warning-foreground hover:bg-warning/90' : ''}`}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <Button
                onClick={editingId ? handleUpdate : handleAdd}
                disabled={!formData.name || !formData.role || !formData.email}
                className="flex-1"
              >
                {editingId ? 'Update Stakeholder' : 'Add Stakeholder'}
              </Button>
              <Button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                  setFormData({ name: '', role: '', email: '', phone: '', priority: 'medium' });
                }}
                variant="secondary"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StakeholderForm;