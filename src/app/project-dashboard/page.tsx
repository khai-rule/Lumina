import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import DashboardInteractive, { Project } from './components/DashboardInteractive';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Project Dashboard - Lumina',
  description: 'Manage and track your software development lifecycle projects from a centralized dashboard with progress analytics and AI-powered insights.',
};

export default async function ProjectDashboardPage() {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  let projects: Project[] = [];

  try {
    const { data, error } = await supabase
      .from('Project')
      .select('*, phases:Phase(*)')
      .eq('userId', user.id) // Ensure we only fetch the user's projects
      .order('updatedAt', { ascending: false });

    if (data && !error) {
      projects = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description || '',
        currentPhase: p.phases?.[0]?.name || 'Planning', // simplified logic
        completionPercentage: 0, // TODO: calculate based on phases
        lastModified: new Date(p.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        thumbnail: "https://images.unsplash.com/photo-1635405074683-96d6921a2a68", // placeholder
        thumbnailAlt: 'Project thumbnail',
        status: p.status as any,
        totalPhases: p.phases?.length || 0,
        completedPhases: p.phases?.filter((ph: any) => ph.status === 'completed').length || 0,
      }));
    }
  } catch (e) {
    console.error('Failed to fetch projects:', e);
  }

  return <DashboardInteractive initialProjects={projects} />;
}