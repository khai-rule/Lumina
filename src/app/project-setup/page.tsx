import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProjectSetupInteractive from './components/ProjectSetupInteractive';

export const metadata: Metadata = {
  title: 'Project Setup - Lumina',
  description: 'Configure your software project with comprehensive setup wizard including basic information, stakeholder identification, methodology selection, requirements gathering, and document management for structured SDLC progression.',
};

export default async function ProjectSetupPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <ProjectSetupInteractive />;
}