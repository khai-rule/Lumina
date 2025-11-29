'use client';

import { useState, useEffect } from 'react';
import RequirementCategoryPanel from './RequirementCategoryPanel';
import RequirementForm from './RequirementForm';
import RequirementCard from './RequirementCard';
import AIAssistancePanel from './AIAssistancePanel';
import RequirementDetailsModal from './RequirementDetailsModal';
import RequirementTemplates from './RequirementTemplates';
import Icon from '@/components/ui/AppIcon';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

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

interface AISuggestion {
  id: string;
  type: 'missing' | 'improvement' | 'conflict';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  fields: string[];
}

const RequirementsInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeCategory, setActiveCategory] = useState('functional');
  const [showForm, setShowForm] = useState(false);
  const [editingRequirement, setEditingRequirement] = useState<Requirement | undefined>(undefined);
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const categories: Category[] = [
    {
      id: 'functional',
      name: 'Functional Requirements',
      icon: 'CogIcon',
      count: 12,
      color: 'bg-primary',
    },
    {
      id: 'non-functional',
      name: 'Non-Functional Requirements',
      icon: 'ShieldCheckIcon',
      count: 8,
      color: 'bg-accent',
    },
    {
      id: 'business',
      name: 'Business Requirements',
      icon: 'BriefcaseIcon',
      count: 6,
      color: 'bg-warning',
    },
    {
      id: 'technical',
      name: 'Technical Requirements',
      icon: 'CommandLineIcon',
      count: 10,
      color: 'bg-secondary',
    },
  ];

  const mockRequirements: Requirement[] = [
    {
      id: 'req-001',
      title: 'User Authentication System',
      description: 'The system shall provide secure user authentication using email and password with multi-factor authentication support for enhanced security.',
      priority: 'critical',
      status: 'approved',
      acceptanceCriteria: [
        'Users can register with valid email and strong password',
        'Email verification is required before account activation',
        'Multi-factor authentication can be enabled/disabled by users',
        'Failed login attempts are tracked and limited',
      ],
      stakeholder: 'Security Team Lead',
      traceabilityLinks: ['SEC-001', 'AUTH-SPEC-2024'],
      category: 'functional',
      createdAt: 'November 20, 2025',
    },
    {
      id: 'req-002',
      title: 'Project Dashboard Interface',
      description: 'The application shall display a comprehensive dashboard showing project overview, phase progress, recent activities, and quick action buttons.',
      priority: 'high',
      status: 'review',
      acceptanceCriteria: [
        'Dashboard loads within 2 seconds',
        'All project metrics are displayed accurately',
        'Quick actions are accessible from dashboard',
        'Dashboard is responsive across all devices',
      ],
      stakeholder: 'Product Manager',
      traceabilityLinks: ['UI-001', 'DASH-SPEC-2024'],
      category: 'functional',
      createdAt: 'November 21, 2025',
    },
    {
      id: 'req-003',
      title: 'System Performance Standards',
      description: 'The system shall maintain response times under 200ms for 95% of requests and support concurrent users up to 10,000 without degradation.',
      priority: 'high',
      status: 'approved',
      acceptanceCriteria: [
        'API response time is under 200ms for 95th percentile',
        'System handles 10,000 concurrent users',
        'Database queries are optimized',
        'Caching mechanisms are implemented',
      ],
      stakeholder: 'Technical Architect',
      traceabilityLinks: ['PERF-001', 'TECH-SPEC-2024'],
      category: 'non-functional',
      createdAt: 'November 19, 2025',
    },
    {
      id: 'req-004',
      title: 'Data Backup and Recovery',
      description: 'The system shall perform automated daily backups with point-in-time recovery capability and maintain backup retention for 90 days.',
      priority: 'critical',
      status: 'approved',
      acceptanceCriteria: [
        'Automated backups run daily at scheduled time',
        'Backup completion is verified and logged',
        'Recovery time objective (RTO) is under 4 hours',
        'Recovery point objective (RPO) is under 24 hours',
      ],
      stakeholder: 'Infrastructure Manager',
      traceabilityLinks: ['DR-001', 'BACKUP-SPEC-2024'],
      category: 'non-functional',
      createdAt: 'November 18, 2025',
    },
    {
      id: 'req-005',
      title: 'Revenue Tracking and Reporting',
      description: 'The system shall track project revenue, costs, and profitability with automated monthly reporting to stakeholders.',
      priority: 'medium',
      status: 'draft',
      acceptanceCriteria: [
        'Revenue data is captured accurately',
        'Cost allocation is tracked per project',
        'Monthly reports are generated automatically',
        'Reports include profitability analysis',
      ],
      stakeholder: 'Finance Director',
      traceabilityLinks: ['FIN-001', 'REPORT-SPEC-2024'],
      category: 'business',
      createdAt: 'November 22, 2025',
    },
    {
      id: 'req-006',
      title: 'API Integration Framework',
      description: 'The system shall provide RESTful API endpoints with OAuth 2.0 authentication for third-party integrations.',
      priority: 'high',
      status: 'review',
      acceptanceCriteria: [
        'API endpoints follow REST conventions',
        'OAuth 2.0 authentication is implemented',
        'API documentation is comprehensive',
        'Rate limiting is enforced',
      ],
      stakeholder: 'Integration Specialist',
      traceabilityLinks: ['API-001', 'INT-SPEC-2024'],
      category: 'technical',
      createdAt: 'November 23, 2025',
    },
  ];

  const aiSuggestions: AISuggestion[] = [
    {
      id: 'sug-001',
      type: 'missing',
      title: 'Missing Security Requirement',
      description: 'Consider adding a requirement for data encryption at rest and in transit to ensure comprehensive security coverage.',
      impact: 'high',
      category: 'non-functional',
    },
    {
      id: 'sug-002',
      type: 'improvement',
      title: 'Enhance Acceptance Criteria',
      description: 'The acceptance criteria for "User Authentication System" could be more specific about password complexity requirements.',
      impact: 'medium',
      category: 'functional',
    },
    {
      id: 'sug-003',
      type: 'conflict',
      title: 'Potential Conflict Detected',
      description: 'The performance requirement conflicts with the data backup schedule. Consider adjusting backup timing to off-peak hours.',
      impact: 'high',
      category: 'non-functional',
    },
  ];

  const templates: Template[] = [
    {
      id: 'temp-001',
      name: 'User Story Template',
      description: 'Standard user story format with acceptance criteria',
      category: 'functional',
      icon: 'UserIcon',
      fields: ['As a', 'I want to', 'So that', 'Acceptance Criteria'],
    },
    {
      id: 'temp-002',
      name: 'Performance Requirement',
      description: 'Template for system performance specifications',
      category: 'non-functional',
      icon: 'BoltIcon',
      fields: ['Metric', 'Target Value', 'Measurement Method', 'Acceptance Threshold'],
    },
    {
      id: 'temp-003',
      name: 'Security Requirement',
      description: 'Template for security and compliance requirements',
      category: 'non-functional',
      icon: 'ShieldCheckIcon',
      fields: ['Security Control', 'Threat Model', 'Compliance Standard', 'Validation Method'],
    },
    {
      id: 'temp-004',
      name: 'Business Rule',
      description: 'Template for business logic and rules',
      category: 'business',
      icon: 'BriefcaseIcon',
      fields: ['Rule Name', 'Condition', 'Action', 'Exception Handling'],
    },
  ];

  const filteredRequirements = mockRequirements.filter((req) => {
    const matchesCategory = req.category === activeCategory;
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || req.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    
    return matchesCategory && matchesSearch && matchesPriority && matchesStatus;
  });

  const handleSaveRequirement = (requirement: Partial<Requirement>) => {
    console.log('Saving requirement:', requirement);
    setShowForm(false);
    setEditingRequirement(undefined);
  };

  const handleEditRequirement = (requirement: Requirement) => {
    setEditingRequirement(requirement);
    setShowForm(true);
  };

  const handleDeleteRequirement = (id: string) => {
    console.log('Deleting requirement:', id);
  };

  const handleViewDetails = (requirement: Requirement) => {
    setSelectedRequirement(requirement);
  };

  const handleApplySuggestion = (suggestionId: string) => {
    console.log('Applying suggestion:', suggestionId);
  };

  const handleDismissSuggestion = (suggestionId: string) => {
    console.log('Dismissing suggestion:', suggestionId);
  };

  const handleSelectTemplate = (templateId: string) => {
    console.log('Selected template:', templateId);
    setShowForm(true);
  };

  const handleExport = () => {
    console.log('Exporting requirements');
  };

  if (!isHydrated) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Icon name="ArrowPathIcon" size={48} className="mx-auto text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Loading requirements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
      {/* Left Panel - Categories */}
      <div className="w-full lg:w-64 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-border overflow-y-auto">
        <RequirementCategoryPanel
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Search and Filters */}
          <Card className="p-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1 relative">
                <Icon
                  name="MagnifyingGlassIcon"
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10"
                />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search requirements..."
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="h-10 px-4 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-default appearance-none pr-8"
                  >
                    <option value="all">All Priorities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <Icon name="ChevronDownIcon" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="h-10 px-4 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-default appearance-none pr-8"
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="review">In Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <Icon name="ChevronDownIcon" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
                <Button
                  variant="outline"
                  onClick={handleExport}
                  className="flex items-center space-x-2"
                >
                  <Icon name="ArrowDownTrayIcon" size={18} />
                  <span className="hidden lg:inline">Export</span>
                </Button>
              </div>
            </div>
          </Card>

          {/* AI Assistance Panel */}
          <AIAssistancePanel
            suggestions={aiSuggestions}
            onApplySuggestion={handleApplySuggestion}
            onDismissSuggestion={handleDismissSuggestion}
          />

          {/* Templates Section */}
          {!showForm && filteredRequirements.length === 0 && (
            <RequirementTemplates
              templates={templates}
              onSelectTemplate={handleSelectTemplate}
            />
          )}

          {/* Requirement Form */}
          {showForm && (
            <Card className="p-6">
              <RequirementForm
                requirement={editingRequirement}
                categoryId={activeCategory}
                onSave={handleSaveRequirement}
                onCancel={() => {
                  setShowForm(false);
                  setEditingRequirement(undefined);
                }}
              />
            </Card>
          )}

          {/* Requirements List */}
          {!showForm && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  {categories.find(c => c.id === activeCategory)?.name}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({filteredRequirements.length} requirement{filteredRequirements.length !== 1 ? 's' : ''})
                  </span>
                </h3>
                <Button
                  onClick={() => setShowForm(true)}
                  className="flex items-center space-x-2"
                >
                  <Icon name="PlusIcon" size={18} />
                  <span>Add Requirement</span>
                </Button>
              </div>

              {filteredRequirements.length === 0 ? (
                <Card className="p-12 text-center">
                  <Icon name="DocumentTextIcon" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h4 className="text-lg font-semibold text-foreground mb-2">No Requirements Found</h4>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery || filterPriority !== 'all' || filterStatus !== 'all' ?'Try adjusting your filters or search query' :'Get started by adding your first requirement or using a template'}
                  </p>
                  <Button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center space-x-2"
                  >
                    <Icon name="PlusIcon" size={20} />
                    <span>Add First Requirement</span>
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredRequirements.map((requirement) => (
                    <RequirementCard
                      key={requirement.id}
                      requirement={requirement}
                      onEdit={handleEditRequirement}
                      onDelete={handleDeleteRequirement}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Requirement Details Modal */}
      {selectedRequirement && (
        <RequirementDetailsModal
          requirement={selectedRequirement}
          onClose={() => setSelectedRequirement(undefined)}
          onEdit={handleEditRequirement}
        />
      )}
    </div>
  );
};

export default RequirementsInteractive;