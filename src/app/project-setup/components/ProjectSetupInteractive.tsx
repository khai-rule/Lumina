'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import QuickActionToolbar from '@/components/common/QuickActionToolbar';
import SetupWizardProgress from './SetupWizardProgress';
import ProjectBasicInfoForm from './ProjectBasicInfoForm';
import StakeholderForm from './StakeholderForm';
import MethodologySelection from './MethodologySelection';
import RequirementsGathering from './RequirementsGathering';
import DocumentUpload from './DocumentUpload';
import Icon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface SetupStep {
  id: string;
  label: string;
  description: string;
  icon: string;
}

interface ProjectBasicInfo {
  projectName: string;
  description: string;
  startDate: string;
  estimatedEndDate: string;
  budget: string;
  teamSize: string;
}

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  priority: 'high' | 'medium' | 'low';
}

interface Requirement {
  id: string;
  type: 'functional' | 'non-functional' | 'constraint';
  title: string;
  description: string;
  priority: 'must-have' | 'should-have' | 'nice-to-have';
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
}

const ProjectSetupInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>('');

  const [projectInfo, setProjectInfo] = useState<ProjectBasicInfo>({
    projectName: '',
    description: '',
    startDate: '',
    estimatedEndDate: '',
    budget: '',
    teamSize: '',
  });

  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [selectedMethodology, setSelectedMethodology] = useState('');
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    setIsHydrated(true);
    
    // Load saved data from localStorage
    const savedData = localStorage.getItem('projectSetupData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setProjectInfo(parsed.projectInfo || projectInfo);
        setStakeholders(parsed.stakeholders || []);
        setSelectedMethodology(parsed.methodology || '');
        setRequirements(parsed.requirements || []);
        setUploadedFiles(parsed.files || []);
        setCurrentStep(parsed.currentStep || 0);
        setLastSaved(parsed.lastSaved || '');
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    // Auto-save functionality
    const saveData = () => {
      const dataToSave = {
        projectInfo,
        stakeholders,
        methodology: selectedMethodology,
        requirements,
        files: uploadedFiles,
        currentStep,
        lastSaved: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      localStorage.setItem('projectSetupData', JSON.stringify(dataToSave));
      setLastSaved(dataToSave.lastSaved);
    };

    const autoSaveTimer = setTimeout(saveData, 2000);
    return () => clearTimeout(autoSaveTimer);
  }, [isHydrated, projectInfo, stakeholders, selectedMethodology, requirements, uploadedFiles, currentStep]);

  const steps: SetupStep[] = [
    {
      id: 'basic-info',
      label: 'Basic Info',
      description: 'Project details',
      icon: 'InformationCircleIcon',
    },
    {
      id: 'stakeholders',
      label: 'Stakeholders',
      description: 'Key people',
      icon: 'UsersIcon',
    },
    {
      id: 'methodology',
      label: 'Methodology',
      description: 'SDLC approach',
      icon: 'AcademicCapIcon',
    },
    {
      id: 'requirements',
      label: 'Requirements',
      description: 'Initial needs',
      icon: 'DocumentTextIcon',
    },
    {
      id: 'documents',
      label: 'Documents',
      description: 'Upload files',
      icon: 'CloudArrowUpIcon',
    },
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return projectInfo.projectName && projectInfo.description && projectInfo.startDate && projectInfo.estimatedEndDate;
      case 1:
        return stakeholders.length > 0;
      case 2:
        return selectedMethodology !== '';
      case 3:
        return requirements.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1 && canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsSaving(true);
    
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectInfo,
          stakeholders,
          methodology: selectedMethodology,
          requirements,
          files: uploadedFiles,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      // Clear local storage
      localStorage.removeItem('projectSetupData');
      localStorage.setItem('projectSetupCompleted', 'true');
      
      router.push('/project-dashboard');
    } catch (error) {
      console.error('Error creating project:', error);
      // Ideally show an error message to the user here
      setIsSaving(false);
    }
  };

  const quickActions = [
    {
      id: 'save-draft',
      label: 'Save Draft',
      icon: 'DocumentArrowDownIcon',
      onClick: () => {
        const dataToSave = {
          projectInfo,
          stakeholders,
          methodology: selectedMethodology,
          requirements,
          files: uploadedFiles,
          currentStep,
          lastSaved: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        localStorage.setItem('projectSetupData', JSON.stringify(dataToSave));
        setLastSaved(dataToSave.lastSaved);
      },
      variant: 'secondary' as const,
    },
    {
      id: 'cancel',
      label: 'Cancel',
      icon: 'XMarkIcon',
      onClick: () => router.push('/project-dashboard'),
      variant: 'secondary' as const,
    },
  ];

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project setup...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={setSidebarCollapsed} />
      <Header sidebarCollapsed={sidebarCollapsed} />

      <main
        className={`pt-16 transition-layout ${
          sidebarCollapsed ? 'lg:pl-sidebar-collapsed' : 'lg:pl-sidebar'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-foreground">Project Setup</h1>
              {lastSaved && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="CheckCircleIcon" size={16} className="text-success" />
                  <span>Last saved at {lastSaved}</span>
                </div>
              )}
            </div>
            <p className="text-muted-foreground">
              Configure your project to begin your SDLC journey with AI-powered guidance
            </p>
          </div>

          {/* Wizard Progress */}
          <SetupWizardProgress currentStep={currentStep} steps={steps} />

          {/* Step Content */}
          <Card className="mb-6">
            <CardContent className="p-6 lg:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {steps[currentStep].label}
                </h2>
                <p className="text-muted-foreground">{steps[currentStep].description}</p>
              </div>

              {currentStep === 0 && (
                <ProjectBasicInfoForm data={projectInfo} onUpdate={setProjectInfo} />
              )}
              {currentStep === 1 && (
                <StakeholderForm stakeholders={stakeholders} onUpdate={setStakeholders} />
              )}
              {currentStep === 2 && (
                <MethodologySelection
                  selectedMethodology={selectedMethodology}
                  onSelect={setSelectedMethodology}
                />
              )}
              {currentStep === 3 && (
                <RequirementsGathering requirements={requirements} onUpdate={setRequirements} />
              )}
              {currentStep === 4 && (
                <DocumentUpload files={uploadedFiles} onUpdate={setUploadedFiles} />
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="secondary"
              className="px-6 py-6 text-base"
            >
              <Icon name="ChevronLeftIcon" size={20} className="mr-2" />
              Previous
            </Button>

            <div className="flex items-center space-x-3">
              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleComplete}
                  disabled={!canProceed() || isSaving}
                  className="px-6 py-6 text-base bg-success hover:bg-success/90 text-success-foreground"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-success-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                      Completing...
                    </>
                  ) : (
                    <>
                      <Icon name="CheckCircleIcon" size={20} className="mr-2" />
                      Complete Setup
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="px-6 py-6 text-base"
                >
                  Next
                  <Icon name="ChevronRightIcon" size={20} className="ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Help Text */}
          {!canProceed() && (
            <div className="mt-4 bg-warning/5 border border-warning/20 rounded-lg p-4 flex items-start space-x-3">
              <Icon name="ExclamationTriangleIcon" size={20} className="text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                Please complete all required fields before proceeding to the next step.
              </p>
            </div>
          )}
        </div>
      </main>

      <QuickActionToolbar actions={quickActions} position="bottom-right" />
    </div>
  );
};

export default ProjectSetupInteractive;