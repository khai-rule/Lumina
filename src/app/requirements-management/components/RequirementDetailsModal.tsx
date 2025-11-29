'use client';

import Icon from '@/components/ui/AppIcon';

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
  createdAt: string;
}

interface RequirementDetailsModalProps {
  requirement: Requirement;
  onClose: () => void;
  onEdit: (requirement: Requirement) => void;
}

const RequirementDetailsModal = ({
  requirement,
  onClose,
  onEdit,
}: RequirementDetailsModalProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-error/10 text-error border-error/20';
      case 'high':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'medium':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-secondary/10 text-secondary border-secondary/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success/10 text-success border-success/20';
      case 'review':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'rejected':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-foreground/50 z-modal"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-lg shadow-active w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Requirement Details</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-default focus-ring"
            >
              <Icon name="XMarkIcon" size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Title and Badges */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{requirement.title}</h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium border ${getPriorityColor(requirement.priority)}`}>
                  <span className="capitalize">{requirement.priority} Priority</span>
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium border ${getStatusColor(requirement.status)}`}>
                  <span className="capitalize">{requirement.status}</span>
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-muted text-muted-foreground border border-border">
                  {requirement.category}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                <Icon name="DocumentTextIcon" size={18} className="text-muted-foreground" />
                <span>Description</span>
              </h4>
              <p className="text-muted-foreground leading-relaxed">{requirement.description}</p>
            </div>

            {/* Stakeholder */}
            <div>
              <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                <Icon name="UserIcon" size={18} className="text-muted-foreground" />
                <span>Assigned Stakeholder</span>
              </h4>
              <p className="text-foreground">{requirement.stakeholder}</p>
            </div>

            {/* Acceptance Criteria */}
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                <Icon name="CheckCircleIcon" size={18} className="text-muted-foreground" />
                <span>Acceptance Criteria</span>
              </h4>
              <ul className="space-y-2">
                {requirement.acceptanceCriteria.map((criterion, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="CheckIcon" size={14} className="text-success" />
                    </div>
                    <span className="text-muted-foreground flex-1">{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Traceability Links */}
            {requirement.traceabilityLinks.length > 0 && (
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                  <Icon name="LinkIcon" size={18} className="text-muted-foreground" />
                  <span>Traceability Links</span>
                </h4>
                <div className="space-y-2">
                  {requirement.traceabilityLinks.map((link, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-primary hover:underline cursor-pointer">
                      <Icon name="ArrowTopRightOnSquareIcon" size={16} />
                      <span>{link}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="ClockIcon" size={16} />
                <span>Created: {requirement.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-input rounded-md text-foreground hover:bg-muted transition-default focus-ring"
            >
              Close
            </button>
            <button
              onClick={() => {
                onEdit(requirement);
                onClose();
              }}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-default focus-ring"
            >
              Edit Requirement
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequirementDetailsModal;