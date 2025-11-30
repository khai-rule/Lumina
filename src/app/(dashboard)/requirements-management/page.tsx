import type { Metadata } from 'next';


import ProjectContextHeader from '@/components/common/ProjectContextHeader';
import RequirementsInteractive from './components/RequirementsInteractive';

export const metadata: Metadata = {
  title: 'Requirements Management - SDLC Navigator',
  description: 'Systematically gather, document, and validate project requirements using structured methodologies and AI-powered assistance for comprehensive requirement coverage.',
};

export default function RequirementsManagementPage() {
  const breadcrumbs = [
    { label: 'Projects', path: '/project-dashboard' },
    { label: 'E-Commerce Platform', path: '/phase-navigation' },
    { label: 'Requirements Management', path: '/requirements-management' },
  ];

  return (
    <div className="min-h-screen bg-background">

      <div className="">
        <main>
          <ProjectContextHeader
            projectName="E-Commerce Platform"
            currentPhase="Requirements Analysis"
            completionPercentage={35}
            breadcrumbs={breadcrumbs}
          />
          <RequirementsInteractive />
        </main>
      </div>
    </div>
  );
}