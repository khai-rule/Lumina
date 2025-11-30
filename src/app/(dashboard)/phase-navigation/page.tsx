import type { Metadata } from 'next';
import PhaseNavigationInteractive from './components/PhaseNavigationInteractive';

export const metadata: Metadata = {
  title: 'Phase Navigation - SDLC Navigator',
  description: 'Navigate through software development lifecycle phases with step-by-step guidance, task management, and AI-powered readiness assessment for seamless phase transitions.',
};

export default function PhaseNavigationPage() {
  return <PhaseNavigationInteractive />;
}