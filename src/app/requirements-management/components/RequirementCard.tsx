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

interface RequirementCardProps {
  requirement: Requirement;
  onEdit: (requirement: Requirement) => void;
  onDelete: (id: string) => void;
  onViewDetails: (requirement: Requirement) => void;
}

const RequirementCard = ({
  requirement,
  onEdit,
  onDelete,
  onViewDetails,
}: RequirementCardProps) => {
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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'ExclamationCircleIcon';
      case 'high':
        return 'ArrowUpIcon';
      case 'medium':
        return 'MinusIcon';
      default:
        return 'ArrowDownIcon';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:shadow-hover transition-default">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-2">{requirement.title}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2">{requirement.description}</p>
        </div>
        <div className="flex items-center space-x-1 ml-4">
          <button
            onClick={() => onEdit(requirement)}
            className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-default focus-ring"
            title="Edit requirement"
          >
            <Icon name="PencilIcon" size={16} />
          </button>
          <button
            onClick={() => onDelete(requirement.id)}
            className="p-2 rounded-md text-muted-foreground hover:bg-error/10 hover:text-error transition-default focus-ring"
            title="Delete requirement"
          >
            <Icon name="TrashIcon" size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium border ${getPriorityColor(requirement.priority)}`}>
          <Icon name={getPriorityIcon(requirement.priority) as any} size={14} />
          <span className="capitalize">{requirement.priority}</span>
        </span>
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusColor(requirement.status)}`}>
          <span className="capitalize">{requirement.status}</span>
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="UserIcon" size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">Stakeholder:</span>
          <span className="text-foreground font-medium">{requirement.stakeholder}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="CheckCircleIcon" size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">Acceptance Criteria:</span>
          <span className="text-foreground font-medium">{requirement.acceptanceCriteria.length}</span>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(requirement)}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-muted text-foreground rounded-md text-sm font-medium hover:bg-muted/80 transition-default focus-ring"
      >
        <span>View Details</span>
        <Icon name="ArrowRightIcon" size={16} />
      </button>
    </div>
  );
};

export default RequirementCard;