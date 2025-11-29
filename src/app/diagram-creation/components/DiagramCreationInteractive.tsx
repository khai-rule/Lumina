'use client';

import { useState } from 'react';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import ProjectContextHeader from '@/components/common/ProjectContextHeader';
import QuickActionToolbar from '@/components/common/QuickActionToolbar';
import DiagramCanvas from './DiagramCanvas';
import DrawingToolbar from './DrawingToolbar';
import DiagramTemplates from './DiagramTemplates';
import AIAnalysisPanel from './AIAnalysisPanel';
import Icon from '@/components/ui/AppIcon';

const DiagramCreationInteractive = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTool, setSelectedTool] = useState('select');
  const [activeView, setActiveView] = useState<'canvas' | 'templates'>('canvas');
  const [hasDiagramContent, setHasDiagramContent] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);

  const breadcrumbs = [
    { label: 'Projects', path: '/project-dashboard' },
    { label: 'E-Commerce Platform', path: '/project-dashboard' },
    { label: 'Diagram Creation', path: '/diagram-creation' },
  ];

  const quickActions = [
    {
      id: 'save',
      label: 'Save Diagram',
      icon: 'DocumentArrowDownIcon',
      onClick: () => console.log('Save diagram'),
      variant: 'primary' as const,
      disabled: !hasDiagramContent,
    },
    {
      id: 'export',
      label: 'Export',
      icon: 'ArrowDownTrayIcon',
      onClick: () => console.log('Export diagram'),
      disabled: !hasDiagramContent,
    },
    {
      id: 'share',
      label: 'Share',
      icon: 'ShareIcon',
      onClick: () => console.log('Share diagram'),
      disabled: !hasDiagramContent,
    },
  ];

  const handleTemplateSelect = (template: any) => {
    console.log('Template selected:', template);
    setActiveView('canvas');
    setHasDiagramContent(true);
  };

  const handleAnalyze = () => {
    console.log('Analyzing diagram...');
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={setSidebarCollapsed} 
      />
      
      <div className={`transition-layout ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <Header sidebarCollapsed={sidebarCollapsed} />
        
        <main className="pt-16">
          <ProjectContextHeader
            projectName="E-Commerce Platform"
            currentPhase="Design"
            completionPercentage={65}
            breadcrumbs={breadcrumbs}
          />

          <div className="p-6">
            {/* View Toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setActiveView('canvas')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-default ${
                    activeView === 'canvas' ?'bg-background text-foreground shadow-subtle' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="PencilIcon" size={16} />
                  <span>Canvas</span>
                </button>
                <button
                  onClick={() => setActiveView('templates')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-default ${
                    activeView === 'templates' ?'bg-background text-foreground shadow-subtle' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Square3Stack3DIcon" size={16} />
                  <span>Templates</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowAIPanel(!showAIPanel)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-default ${
                    showAIPanel
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="SparklesIcon" size={16} />
                  <span>AI Analysis</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Panel - Tools */}
              {activeView === 'canvas' && (
                <div className="lg:w-auto">
                  <DrawingToolbar
                    selectedTool={selectedTool}
                    onToolSelect={setSelectedTool}
                  />
                </div>
              )}

              {/* Center Content */}
              <div className="flex-1">
                {activeView === 'canvas' ? (
                  <div className="h-[600px] lg:h-[700px]">
                    <DiagramCanvas
                      selectedTool={selectedTool}
                      onDiagramChange={setHasDiagramContent}
                    />
                  </div>
                ) : (
                  <DiagramTemplates onTemplateSelect={handleTemplateSelect} />
                )}
              </div>

              {/* Right Panel - AI Analysis */}
              {showAIPanel && activeView === 'canvas' && (
                <div className="lg:w-auto">
                  <AIAnalysisPanel
                    hasDiagramContent={hasDiagramContent}
                    onAnalyze={handleAnalyze}
                  />
                </div>
              )}
            </div>

            {/* Status Bar */}
            <div className="mt-6 flex items-center justify-between p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Tool: {selectedTool}</span>
                <span>•</span>
                <span>View: {activeView}</span>
                {hasDiagramContent && (
                  <>
                    <span>•</span>
                    <span className="text-success">Diagram created</span>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="InformationCircleIcon" size={16} />
                <span>Use Ctrl+Z to undo, Ctrl+S to save</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      <QuickActionToolbar actions={quickActions} position="bottom-right" />
    </div>
  );
};

export default DiagramCreationInteractive;