'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface ProjectContextHeaderProps {
  projectName: string;
  currentPhase: string;
  completionPercentage: number;
  breadcrumbs?: Array<{ label: string; path: string }>;
}

const ProjectContextHeader = ({
  projectName,
  currentPhase,
  completionPercentage,
  breadcrumbs = [],
}: ProjectContextHeaderProps) => {
  return (
    <div className="bg-card border-b border-border">
      <div className="px-6 py-4">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center space-x-2 text-sm mb-3" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.path} className="flex items-center">
                {index > 0 && (
                  <Icon name="ChevronRightIcon" size={16} className="text-muted-foreground mx-2" />
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.path}
                    className="text-muted-foreground hover:text-foreground transition-default"
                  >
                    {crumb.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        )}

        {/* Project Info */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-xl font-semibold text-foreground">{projectName}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-muted-foreground">Current Phase:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary">
                  {currentPhase}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <p className="text-lg font-semibold text-foreground">{completionPercentage}%</p>
            </div>
            <div className="relative w-16 h-16">
              <svg className="transform -rotate-90 w-16 h-16">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-muted"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - completionPercentage / 100)}`}
                  className="text-primary transition-all duration-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon name="CheckIcon" size={20} className="text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectContextHeader;