import type { Metadata } from 'next';
import ProjectSetupInteractive from './components/ProjectSetupInteractive';

export const metadata: Metadata = {
  title: 'Project Setup - SDLC Navigator',
  description: 'Configure your software project with comprehensive setup wizard including basic information, stakeholder identification, methodology selection, requirements gathering, and document management for structured SDLC progression.',
};

export default function ProjectSetupPage() {
  return <ProjectSetupInteractive />;
}