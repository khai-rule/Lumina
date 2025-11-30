'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';


import QuickActionToolbar from '@/components/common/QuickActionToolbar';
import DashboardMetrics from './DashboardMetrics';
import ProjectFilters from './ProjectFilters';
import ProjectGrid from './ProjectGrid';
import RecentActivity from './RecentActivity';
import Icon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';

interface FilterOptions {
  phase: string;
  status: string;
  sortBy: string;
  searchQuery: string;
}

export interface Project {
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

interface Metric {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

interface Activity {
  id: string;
  type: 'phase_completed' | 'ai_recommendation' | 'project_created' | 'milestone_reached';
  title: string;
  description: string;
  timestamp: string;
  projectName: string;
  metadata?: {
    phase?: string;
    recommendation?: string;
    milestone?: string;
  };
}

interface DashboardInteractiveProps {
  initialProjects?: Project[];
  initialMetrics?: Metric[];
  initialActivities?: Activity[];
}

const DashboardInteractive = ({ 
  initialProjects = [], 
  initialMetrics = [], 
  initialActivities = [] 
}: DashboardInteractiveProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    phase: 'all',
    status: 'all',
    sortBy: 'lastModified',
    searchQuery: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const projects = initialProjects;




  const filteredProjects = projects.filter((project) => {
    const matchesPhase = filters.phase === 'all' || project.currentPhase.toLowerCase().includes(filters.phase);
    const matchesStatus = filters.status === 'all' || project.status === filters.status;
    const matchesSearch = filters.searchQuery === '' ||
    project.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchesPhase && matchesStatus && matchesSearch;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (filters.sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'progress':
        return b.completionPercentage - a.completionPercentage;
      case 'created':
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      default:
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
    }
  });

  const quickActions = [
  {
    id: 'new-project',
    label: 'New Project',
    icon: 'PlusIcon',
    variant: 'primary' as const,
    onClick: () => {
      if (isHydrated) {
        window.location.href = '/project-setup';
      }
    }
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'ChartBarIcon',
    onClick: () => {
      if (isHydrated) {
        window.location.href = '/progress-analytics';
      }
    }
  }];


  const handleFiltersChange = (newFilters: FilterOptions) => {
    setIsLoading(true);
    setFilters(newFilters);

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-16 bg-muted"></div>
          <div className="flex">
            <div className="w-64 h-screen bg-muted"></div>
            <div className="flex-1 p-6">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {Array.from({ length: 4 }).map((_, i) =>
                <div key={i} className="h-24 bg-muted rounded-lg"></div>
                )}
              </div>
              <div className="h-16 bg-muted rounded-lg mb-6"></div>
              <div className="grid grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) =>
                <div key={i} className="h-96 bg-muted rounded-lg"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">


      <main className="transition-layout">
        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Project Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage and track your SDLC projects from a centralized hub
              </p>
            </div>
            <Button
              asChild
              className="px-6 py-3 font-medium flex items-center space-x-2"
            >
              <Link href="/project-setup">
                <Icon name="PlusIcon" size={20} className="mr-2" />
                <span>Start New Project</span>
              </Link>
            </Button>
          </div>

          {/* Dashboard Metrics */}
          <DashboardMetrics metrics={initialMetrics} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Projects Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Your Projects</h2>
                <span className="text-sm text-muted-foreground">
                  {sortedProjects.length} of {projects.length} projects
                </span>
              </div>
              
              <ProjectFilters onFiltersChange={handleFiltersChange} />
              <ProjectGrid projects={sortedProjects} isLoading={isLoading} />
            </div>

            {/* Activity Sidebar */}
            <div className="lg:col-span-1">
              <RecentActivity activities={initialActivities} />
            </div>
          </div>
        </div>
      </main>

      <QuickActionToolbar actions={quickActions} position="bottom-right" />
    </div>);

};

export default DashboardInteractive;