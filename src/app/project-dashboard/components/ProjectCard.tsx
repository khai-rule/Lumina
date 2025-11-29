import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Project {
  id: string;
  name: string;
  description: string;
  currentPhase: string;
  completionPercentage: number;
  lastModified: string;
  thumbnail: string;
  thumbnailAlt: string;
  status: 'active' | 'completed' | 'paused';
  totalPhases: number;
  completedPhases: number;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'paused':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'CheckCircleIcon';
      case 'paused':
        return 'PauseIcon';
      default:
        return 'PlayIcon';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle hover:shadow-hover transition-default overflow-hidden">
      {/* Project Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <AppImage
          src={project.thumbnail}
          alt={project.thumbnailAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(project.status)}`}>
            <Icon name={getStatusIcon(project.status) as any} size={12} className="mr-1" />
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-lg mb-1">{project.name}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
          </div>
        </div>

        {/* Current Phase */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Current Phase:</span>
            <span className="text-sm font-medium text-foreground">{project.currentPhase}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress:</span>
            <span className="text-sm font-medium text-foreground">{project.completionPercentage}%</span>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <svg className="transform -rotate-90 w-12 h-12">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  className="text-muted"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - project.completionPercentage / 100)}`}
                  className="text-primary transition-all duration-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-foreground">{project.completionPercentage}%</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {project.completedPhases} of {project.totalPhases} phases
              </p>
              <p className="text-xs text-muted-foreground">Last modified: {project.lastModified}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Link
            href={`/phase-navigation?project=${project.id}`}
            className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-default focus-ring text-center"
          >
            Continue
          </Link>
          <Link
            href={`/project-details?id=${project.id}`}
            className="px-4 py-2 border border-border rounded-md text-sm font-medium text-foreground hover:bg-muted transition-default focus-ring"
          >
            Details
          </Link>
          <button className="p-2 border border-border rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-default focus-ring">
            <Icon name="EllipsisVerticalIcon" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;