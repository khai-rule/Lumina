'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';



import ProjectContextHeader from '@/components/common/ProjectContextHeader';
import QuickActionToolbar from '@/components/common/QuickActionToolbar';
import MetricsCard from './MetricsCard';
import PhaseCompletionChart from './PhaseCompletionChart';
import TimelineChart from './TimelineChart';
import AIInsightsPanel from './AIInsightsPanel';
import QualityMetricsChart from './QualityMetricsChart';
import VelocityTracker from './VelocityTracker';
import BottleneckIdentifier from './BottleneckIdentifier';
import MilestoneTracker from './MilestoneTracker';
import ExportReportModal from './ExportReportModal';
import { Card } from '@/components/ui/Card';

interface MetricData {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
}

interface PhaseData {
  phase: string;
  completed: number;
  remaining: number;
  total: number;
}

interface TimelineData {
  date: string;
  planned: number;
  actual: number;
}

interface QualityMetric {
  category: string;
  score: number;
  benchmark: number;
}

interface Insight {
  id: string;
  type: 'recommendation' | 'risk' | 'optimization';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionLabel?: string;
}

interface VelocityData {
  period: string;
  tasksCompleted: number;
  velocity: number;
  trend: 'up' | 'down' | 'stable';
}

interface Bottleneck {
  id: string;
  phase: string;
  issue: string;
  impact: 'high' | 'medium' | 'low';
  blockedTasks: number;
  suggestedAction: string;
}

interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  status: 'completed' | 'on-track' | 'at-risk' | 'overdue';
  completionPercentage: number;
  phase: string;
}

interface ExportOptions {
  includeCharts: boolean;
  includeInsights: boolean;
  includeBottlenecks: boolean;
  includeMilestones: boolean;
  dateRange: string;
}

const ProgressAnalyticsInteractive = () => {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('last-month');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const metricsData: MetricData[] = [
    {
      title: 'Overall Progress',
      value: '68%',
      change: 12,
      changeLabel: 'vs last week',
      icon: 'ChartBarIcon',
      trend: 'up',
    },
    {
      title: 'Tasks Completed',
      value: 142,
      change: 8,
      changeLabel: 'this week',
      icon: 'CheckCircleIcon',
      trend: 'up',
    },
    {
      title: 'Active Bottlenecks',
      value: 3,
      change: -2,
      changeLabel: 'resolved',
      icon: 'ExclamationTriangleIcon',
      trend: 'down',
    },
    {
      title: 'Quality Score',
      value: '85/100',
      change: 5,
      changeLabel: 'improvement',
      icon: 'SparklesIcon',
      trend: 'up',
    },
  ];

  const phaseCompletionData: PhaseData[] = [
    { phase: 'Requirements', completed: 45, remaining: 5, total: 50 },
    { phase: 'Design', completed: 32, remaining: 18, total: 50 },
    { phase: 'Development', completed: 28, remaining: 42, total: 70 },
    { phase: 'Testing', completed: 15, remaining: 35, total: 50 },
    { phase: 'Deployment', completed: 0, remaining: 30, total: 30 },
  ];

  const timelineData: TimelineData[] = [
    { date: '11/01', planned: 15, actual: 12 },
    { date: '11/05', planned: 28, actual: 25 },
    { date: '11/10', planned: 42, actual: 38 },
    { date: '11/15', planned: 55, actual: 52 },
    { date: '11/20', planned: 68, actual: 68 },
    { date: '11/25', planned: 80, actual: 75 },
  ];

  const qualityMetrics: QualityMetric[] = [
    { category: 'Code Quality', score: 85, benchmark: 80 },
    { category: 'Documentation', score: 78, benchmark: 85 },
    { category: 'Test Coverage', score: 92, benchmark: 90 },
    { category: 'Performance', score: 88, benchmark: 85 },
    { category: 'Security', score: 82, benchmark: 90 },
    { category: 'Maintainability', score: 86, benchmark: 80 },
  ];

  const aiInsights: Insight[] = [
    {
      id: '1',
      type: 'recommendation',
      title: 'Increase Test Coverage',
      description: 'Current test coverage is 92%, but critical modules in the authentication system need additional unit tests to reach 95% coverage.',
      priority: 'high',
      actionLabel: 'View Test Report',
    },
    {
      id: '2',
      type: 'risk',
      title: 'Timeline Deviation Detected',
      description: 'Development phase is running 5% behind schedule. Consider allocating additional resources or adjusting scope to meet the deadline.',
      priority: 'medium',
      actionLabel: 'Review Timeline',
    },
    {
      id: '3',
      type: 'optimization',
      title: 'Optimize Documentation Process',
      description: 'Documentation completion is lagging. Implementing automated documentation tools could improve efficiency by 30%.',
      priority: 'low',
      actionLabel: 'Explore Tools',
    },
  ];

  const velocityData: VelocityData[] = [
    { period: 'Week 1', tasksCompleted: 18, velocity: 18, trend: 'stable' },
    { period: 'Week 2', tasksCompleted: 22, velocity: 22, trend: 'up' },
    { period: 'Week 3', tasksCompleted: 25, velocity: 25, trend: 'up' },
    { period: 'Week 4', tasksCompleted: 23, velocity: 23, trend: 'down' },
  ];

  const bottlenecks: Bottleneck[] = [
    {
      id: '1',
      phase: 'Development',
      issue: 'API Integration Delays',
      impact: 'high',
      blockedTasks: 12,
      suggestedAction: 'Schedule meeting with backend team to resolve API endpoint issues and establish clear integration timeline.',
    },
    {
      id: '2',
      phase: 'Testing',
      issue: 'Test Environment Instability',
      impact: 'medium',
      blockedTasks: 8,
      suggestedAction: 'Allocate DevOps resources to stabilize test environment infrastructure and implement automated health checks.',
    },
    {
      id: '3',
      phase: 'Design',
      issue: 'Pending Stakeholder Approval',
      impact: 'low',
      blockedTasks: 3,
      suggestedAction: 'Follow up with stakeholders for design review approval to unblock UI implementation tasks.',
    },
  ];

  const milestones: Milestone[] = [
    {
      id: '1',
      title: 'Requirements Phase Complete',
      dueDate: '11/15/2025',
      status: 'completed',
      completionPercentage: 100,
      phase: 'Requirements',
    },
    {
      id: '2',
      title: 'Design Mockups Approved',
      dueDate: '11/30/2025',
      status: 'on-track',
      completionPercentage: 75,
      phase: 'Design',
    },
    {
      id: '3',
      title: 'Core Features Development',
      dueDate: '12/20/2025',
      status: 'at-risk',
      completionPercentage: 45,
      phase: 'Development',
    },
    {
      id: '4',
      title: 'Testing Phase Complete',
      dueDate: '01/10/2026',
      status: 'on-track',
      completionPercentage: 30,
      phase: 'Testing',
    },
  ];

  const quickActions = [
    {
      id: 'export',
      label: 'Export Report',
      icon: 'ArrowDownTrayIcon',
      onClick: () => setIsExportModalOpen(true),
      variant: 'primary' as const,
    },
    {
      id: 'refresh',
      label: 'Refresh Data',
      icon: 'ArrowPathIcon',
      onClick: () => {
        console.log('Refreshing analytics data...');
      },
      variant: 'secondary' as const,
    },
  ];

  const handleInsightAction = (insightId: string) => {
    console.log('Insight action clicked:', insightId);
  };

  const handleResolveBottleneck = (bottleneckId: string) => {
    console.log('Resolving bottleneck:', bottleneckId);
  };

  const handleExport = (format: string, options: ExportOptions) => {
    console.log('Exporting report:', format, options);
  };

  if (!isHydrated) {
    return (
      <div className="flex h-screen bg-background">
        <div className="w-sidebar bg-card border-r border-border"></div>
        <div className="flex-1">
          <div className="h-16 bg-background border-b border-border"></div>
          <div className="p-6">
            <Card className="animate-pulse space-y-4 p-6">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-muted rounded"></div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">


      <div className="flex-1 flex flex-col transition-layout">
        <main className="flex-1 overflow-y-auto">
          <ProjectContextHeader
            projectName="E-Commerce Platform"
            currentPhase="Development"
            completionPercentage={68}
            breadcrumbs={[
              { label: 'Projects', path: '/project-dashboard' },
              { label: 'E-Commerce Platform', path: '/project-dashboard' },
              { label: 'Analytics', path: '/progress-analytics' },
            ]}
          />

          <div className="p-6 space-y-6">
            {/* Date Range Filter */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-foreground mb-1">Progress Analytics</h1>
                <p className="text-muted-foreground">Comprehensive project tracking and performance insights</p>
              </div>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="px-4 py-2 border border-border rounded-md text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-quarter">Last Quarter</option>
                <option value="all-time">All Time</option>
              </select>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metricsData.map((metric, index) => (
                <MetricsCard key={index} {...metric} />
              ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PhaseCompletionChart data={phaseCompletionData} />
              <TimelineChart data={timelineData} />
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QualityMetricsChart data={qualityMetrics} />
              <VelocityTracker data={velocityData} averageVelocity={22} />
            </div>

            {/* AI Insights and Bottlenecks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AIInsightsPanel insights={aiInsights} onActionClick={handleInsightAction} />
              <BottleneckIdentifier bottlenecks={bottlenecks} onResolveClick={handleResolveBottleneck} />
            </div>

            {/* Milestone Tracker */}
            <MilestoneTracker milestones={milestones} />
          </div>
        </main>

        <QuickActionToolbar actions={quickActions} position="bottom-right" />
      </div>

      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />
    </div>
  );
};

export default ProgressAnalyticsInteractive;