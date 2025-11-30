import type { Metadata } from 'next';
import DiagramCreationInteractive from './components/DiagramCreationInteractive';

export const metadata: Metadata = {
  title: 'Diagram Creation - SDLC Navigator',
  description: 'Create and edit software engineering diagrams with AI-powered analysis and validation tools for comprehensive SDLC documentation.',
};

export default function DiagramCreationPage() {
  return <DiagramCreationInteractive />;
}