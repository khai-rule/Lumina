'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
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
}

const DashboardInteractive = ({ initialProjects = [] }: DashboardInteractiveProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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

  const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React frontend and Node.js backend, featuring user authentication, payment processing, and inventory management.',
    currentPhase: 'Requirements Analysis',
    completionPercentage: 35,
    lastModified: 'Nov 25, 2024',
    thumbnail: "https://images.unsplash.com/photo-1635405074683-96d6921a2a68",
    thumbnailAlt: 'Modern e-commerce website interface displayed on laptop screen with shopping cart and product listings',
    status: 'active',
    totalPhases: 6,
    completedPhases: 2
  },
  {
    id: '2',
    name: 'Task Management App',
    description: 'Collaborative task management application with real-time updates, team collaboration features, and advanced project tracking capabilities.',
    currentPhase: 'Design & Prototyping',
    completionPercentage: 68,
    lastModified: 'Nov 24, 2024',
    thumbnail: "https://images.unsplash.com/photo-1609188343737-366b8dc25152",
    thumbnailAlt: 'Clean task management dashboard showing project boards, task cards, and progress indicators on computer screen',
    status: 'active',
    totalPhases: 6,
    completedPhases: 4
  },
  {
    id: '3',
    name: 'Learning Management System',
    description: 'Comprehensive LMS platform for online education with course creation tools, student progress tracking, and interactive learning modules.',
    currentPhase: 'Testing & QA',
    completionPercentage: 92,
    lastModified: 'Nov 23, 2024',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_15ac06e37-1764145722023.png",
    thumbnailAlt: 'Online learning platform interface showing course modules, video player, and student dashboard on tablet device',
    status: 'active',
    totalPhases: 6,
    completedPhases: 5
  },
  {
    id: '4',
    name: 'Healthcare Portal',
    description: 'Patient management system for healthcare providers with appointment scheduling, medical records, and telemedicine capabilities.',
    currentPhase: 'Deployment',
    completionPercentage: 100,
    lastModified: 'Nov 22, 2024',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1204d2a6c-1764145720151.png",
    thumbnailAlt: 'Healthcare management system interface displaying patient records, appointment calendar, and medical data charts',
    status: 'completed',
    totalPhases: 6,
    completedPhases: 6
  },
  {
    id: '5',
    name: 'Financial Dashboard',
    description: 'Real-time financial analytics dashboard with data visualization, reporting tools, and automated insights for business intelligence.',
    currentPhase: 'Planning',
    completionPercentage: 15,
    lastModified: 'Nov 21, 2024',
    thumbnail: "https://images.unsplash.com/photo-1583373325529-501e03a3a8e7",
    thumbnailAlt: 'Financial analytics dashboard showing charts, graphs, and data visualization on multiple monitor setup',
    status: 'paused',
    totalPhases: 6,
    completedPhases: 1
  },
  {
    id: '6',
    name: 'Social Media Platform',
    description: 'Modern social networking platform with real-time messaging, content sharing, and community building features for enhanced user engagement.',
    currentPhase: 'Implementation',
    completionPercentage: 45,
    lastModified: 'Nov 20, 2024',
    thumbnail: "https://images.unsplash.com/photo-1652841236281-576b8cacee20",
    thumbnailAlt: 'Social media platform interface showing news feed, user profiles, and messaging features on smartphone screen',
    status: 'active',
    totalPhases: 6,
    completedPhases: 3
  }];

  const projects = initialProjects.length > 0 ? initialProjects : mockProjects;


  const mockMetrics: Metric[] = [
  {
    id: '1',
    label: 'Total Projects',
    value: '12',
    change: '+2 this month',
    changeType: 'positive',
    icon: 'FolderIcon'
  },
  {
    id: '2',
    label: 'Completed Phases',
    value: '48',
    change: '+8 this week',
    changeType: 'positive',
    icon: 'CheckCircleIcon'
  },
  {
    id: '3',
    label: 'Active Projects',
    value: '8',
    change: 'No change',
    changeType: 'neutral',
    icon: 'PlayIcon'
  },
  {
    id: '4',
    label: 'AI Recommendations',
    value: '24',
    change: '+6 today',
    changeType: 'positive',
    icon: 'LightBulbIcon'
  }];


  const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'phase_completed',
    title: 'Requirements Phase Completed',
    description: 'Successfully completed requirements gathering for E-Commerce Platform',
    timestamp: '2 hours ago',
    projectName: 'E-Commerce Platform',
    metadata: {
      phase: 'Requirements Analysis'
    }
  },
  {
    id: '2',
    type: 'ai_recommendation',
    title: 'AI Improvement Suggestion',
    description: 'AI suggests adding user acceptance criteria to current requirements',
    timestamp: '4 hours ago',
    projectName: 'Task Management App',
    metadata: {
      recommendation: 'Consider adding more detailed user acceptance criteria for better testing coverage'
    }
  },
  {
    id: '3',
    type: 'milestone_reached',
    title: 'Project Milestone Reached',
    description: '75% completion milestone achieved for Learning Management System',
    timestamp: '1 day ago',
    projectName: 'Learning Management System',
    metadata: {
      milestone: '75% Completion'
    }
  },
  {
    id: '4',
    type: 'project_created',
    title: 'New Project Created',
    description: 'Financial Dashboard project has been initialized',
    timestamp: '2 days ago',
    projectName: 'Financial Dashboard'
  }];


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
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={setSidebarCollapsed} />

      <Header sidebarCollapsed={sidebarCollapsed} />
      
      <main className={`transition-layout ${sidebarCollapsed ? 'ml-sidebar-collapsed' : 'ml-sidebar'} mt-16`}>
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
          <DashboardMetrics metrics={mockMetrics} />

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
              <RecentActivity activities={mockActivities} />
            </div>
          </div>
        </div>
      </main>

      <QuickActionToolbar actions={quickActions} position="bottom-right" />
    </div>);

};

export default DashboardInteractive;