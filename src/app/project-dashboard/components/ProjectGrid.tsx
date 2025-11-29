import ProjectCard from './ProjectCard';
import { Button } from '@/components/ui/Button';

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

interface ProjectGridProps {
  projects: Project[];
  isLoading?: boolean;
}

const ProjectGrid = ({ projects, isLoading = false }: ProjectGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg shadow-subtle overflow-hidden animate-pulse">
            <div className="h-48 bg-muted"></div>
            <div className="p-6">
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded mb-4 w-3/4"></div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded"></div>
              </div>
              <div className="flex space-x-2">
                <div className="flex-1 h-8 bg-muted rounded"></div>
                <div className="w-16 h-8 bg-muted rounded"></div>
                <div className="w-10 h-8 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
        <p className="text-muted-foreground mb-6">Get started by creating your first SDLC project</p>
        <Button className="px-6 py-3 font-medium">
          Start New Project
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectGrid;