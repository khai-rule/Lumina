'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import ProjectContextHeader from '@/components/common/ProjectContextHeader';
import PhaseProgressIndicator from '@/components/common/PhaseProgressIndicator';
import QuickActionToolbar from '@/components/common/QuickActionToolbar';
import PhaseCard from './PhaseCard';
import TaskChecklist from './TaskChecklist';
import AIGuidancePanel from './AIGuidancePanel';
import ReadinessAssessment from './ReadinessAssessment';
import PhaseTimeline from './PhaseTimeline';
import { Card } from '@/components/ui/Card';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
}

interface Phase {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'active' | 'pending' | 'locked';
  progress: number;
  completedTasks: number;
  totalTasks: number;
  estimatedDuration: string;
  icon: string;
}

const PhaseNavigationInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<string | null>('requirements');
  const [isAssessing, setIsAssessing] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const phases: Phase[] = [
    {
      id: 'requirements',
      name: 'Requirements Analysis',
      description: 'Gather and document functional and non-functional requirements from stakeholders',
      status: 'active',
      progress: 65,
      completedTasks: 13,
      totalTasks: 20,
      estimatedDuration: '2-3 weeks',
      icon: 'DocumentTextIcon',
    },
    {
      id: 'design',
      name: 'System Design',
      description: 'Create architectural designs, database schemas, and UI/UX mockups',
      status: 'pending',
      progress: 0,
      completedTasks: 0,
      totalTasks: 15,
      estimatedDuration: '3-4 weeks',
      icon: 'PencilSquareIcon',
    },
    {
      id: 'implementation',
      name: 'Implementation',
      description: 'Develop the system according to design specifications and coding standards',
      status: 'locked',
      progress: 0,
      completedTasks: 0,
      totalTasks: 25,
      estimatedDuration: '6-8 weeks',
      icon: 'CodeBracketIcon',
    },
    {
      id: 'testing',
      name: 'Testing & QA',
      description: 'Perform comprehensive testing including unit, integration, and user acceptance tests',
      status: 'locked',
      progress: 0,
      completedTasks: 0,
      totalTasks: 18,
      estimatedDuration: '2-3 weeks',
      icon: 'BeakerIcon',
    },
    {
      id: 'deployment',
      name: 'Deployment',
      description: 'Deploy the system to production environment and monitor initial performance',
      status: 'locked',
      progress: 0,
      completedTasks: 0,
      totalTasks: 10,
      estimatedDuration: '1-2 weeks',
      icon: 'RocketLaunchIcon',
    },
  ];

  const progressPhases = phases.map((phase) => ({
    id: phase.id,
    name: phase.name,
    status: phase.status,
    completionPercentage: phase.progress,
    aiAssessment: phase.status === 'completed' ? ('passed' as const) : undefined,
  }));

  const currentTasks: Task[] = [
    {
      id: 'task-1',
      title: 'Conduct stakeholder interviews',
      description: 'Schedule and complete interviews with all key stakeholders to understand their needs and expectations',
      completed: true,
      priority: 'high',
      estimatedTime: '3 days',
    },
    {
      id: 'task-2',
      title: 'Document functional requirements',
      description: 'Create comprehensive documentation of all functional requirements using standard templates',
      completed: true,
      priority: 'high',
      estimatedTime: '5 days',
    },
    {
      id: 'task-3',
      title: 'Define non-functional requirements',
      description: 'Specify performance, security, scalability, and other non-functional requirements',
      completed: false,
      priority: 'high',
      estimatedTime: '2 days',
    },
    {
      id: 'task-4',
      title: 'Create use case diagrams',
      description: 'Develop detailed use case diagrams for all major system functionalities',
      completed: false,
      priority: 'medium',
      estimatedTime: '3 days',
    },
    {
      id: 'task-5',
      title: 'Validate requirements with stakeholders',
      description: 'Review and get approval on documented requirements from all stakeholders',
      completed: false,
      priority: 'high',
      estimatedTime: '2 days',
    },
  ];

  const aiGuidance = {
    title: 'Requirements Phase Guidance',
    recommendations: [
      'Consider conducting a second round of stakeholder interviews to clarify ambiguous requirements',
      'Add more specific acceptance criteria for each functional requirement',
      'Document assumptions and constraints that may impact the design phase',
      'Create a requirements traceability matrix to track requirement changes',
    ],
    warnings: [
      'Some non-functional requirements lack specific measurable criteria',
      'Ensure all stakeholders have reviewed and approved the requirements document',
      'Consider edge cases and error scenarios in your use case documentation',
    ],
    resources: [
      {
        title: 'Requirements Engineering Best Practices',
        type: 'Article',
        url: '#',
      },
      {
        title: 'Use Case Diagram Tutorial',
        type: 'Video',
        url: '#',
      },
      {
        title: 'Requirements Template Library',
        type: 'Template',
        url: '#',
      },
    ],
  };

  const mockAssessment = {
    overallScore: 72,
    readyToProgress: false,
    criteria: [
      {
        name: 'Requirements Documentation',
        status: 'passed' as const,
        score: 85,
        feedback: 'Comprehensive documentation with clear functional requirements',
      },
      {
        name: 'Stakeholder Approval',
        status: 'warning' as const,
        score: 60,
        feedback: 'Pending approval from 2 key stakeholders',
      },
      {
        name: 'Use Case Coverage',
        status: 'warning' as const,
        score: 70,
        feedback: 'Main scenarios covered, but edge cases need more detail',
      },
      {
        name: 'Non-Functional Requirements',
        status: 'failed' as const,
        score: 45,
        feedback: 'Missing specific performance metrics and security requirements',
      },
    ],
    recommendations: [
      'Complete non-functional requirements with specific, measurable criteria',
      'Obtain formal sign-off from all stakeholders before proceeding',
      'Add detailed edge case scenarios to use case documentation',
      'Create a requirements traceability matrix for better tracking',
    ],
  };

  const handleTaskToggle = (taskId: string) => {
    if (!isHydrated) return;
    console.log('Toggle task:', taskId);
  };

  const handleAddNote = (taskId: string) => {
    if (!isHydrated) return;
    console.log('Add note to task:', taskId);
  };

  const handleRequestAssessment = () => {
    if (!isHydrated) return;
    setIsAssessing(true);
    setTimeout(() => {
      setIsAssessing(false);
      setShowAssessment(true);
    }, 2000);
  };

  const handlePhaseClick = (phaseId: string) => {
    if (!isHydrated) return;
    const phase = phases.find((p) => p.id === phaseId);
    if (phase && phase.status !== 'locked') {
      setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
    }
  };

  const quickActions = [
    {
      id: 'requirements',
      label: 'Requirements',
      icon: 'DocumentTextIcon',
      onClick: () => {
        if (isHydrated) window.location.href = '/requirements-management';
      },
      variant: 'secondary' as const,
    },
    {
      id: 'diagrams',
      label: 'Create Diagram',
      icon: 'PresentationChartLineIcon',
      onClick: () => {
        if (isHydrated) window.location.href = '/diagram-creation';
      },
      variant: 'secondary' as const,
    },
    {
      id: 'analytics',
      label: 'View Analytics',
      icon: 'ChartBarIcon',
      onClick: () => {
        if (isHydrated) window.location.href = '/progress-analytics';
      },
      variant: 'secondary' as const,
    },
  ];

  const breadcrumbs = [
    { label: 'Projects', path: '/project-dashboard' },
    { label: 'E-Commerce Platform', path: '/project-dashboard' },
    { label: 'Phase Navigation', path: '/phase-navigation' },
  ];

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading phase navigation...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={setSidebarCollapsed}
      />
      <Header sidebarCollapsed={sidebarCollapsed} />

      <main
        className={`transition-layout pt-16 ${
          sidebarCollapsed ? 'lg:ml-sidebar-collapsed' : 'lg:ml-sidebar'
        }`}
      >
        <ProjectContextHeader
          projectName="E-Commerce Platform"
          currentPhase="Requirements Analysis"
          completionPercentage={42}
          breadcrumbs={breadcrumbs}
        />

        <div className="p-6 lg:p-8 space-y-8">
          {/* Phase Progress Overview */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Project Phase Progress
            </h2>
            <PhaseProgressIndicator
              phases={progressPhases}
              orientation="horizontal"
            />
          </Card>

          {/* Phase Timeline */}
          <PhaseTimeline phases={phases} onPhaseClick={handlePhaseClick} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Phase Cards */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                SDLC Phases
              </h2>
              {phases.map((phase) => (
                <PhaseCard
                  key={phase.id}
                  phase={phase}
                  isExpanded={expandedPhase === phase.id}
                  onToggle={() => handlePhaseClick(phase.id)}
                />
              ))}
            </div>

            {/* Right Column - AI Guidance */}
            <div className="space-y-6">
              <AIGuidancePanel guidance={aiGuidance} />
            </div>
          </div>

          {/* Active Phase Tasks */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Current Phase Tasks
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Requirements Analysis - 13 of 20 tasks completed
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">65%</p>
                <p className="text-xs text-muted-foreground">Complete</p>
              </div>
            </div>
            <TaskChecklist
              tasks={currentTasks}
              onTaskToggle={handleTaskToggle}
              onAddNote={handleAddNote}
            />
          </Card>

          {/* Readiness Assessment */}
          <ReadinessAssessment
            assessment={showAssessment ? mockAssessment : null}
            onRequestAssessment={handleRequestAssessment}
            isLoading={isAssessing}
          />
        </div>

        <QuickActionToolbar actions={quickActions} position="bottom-right" />
      </main>
    </div>
  );
};

export default PhaseNavigationInteractive;