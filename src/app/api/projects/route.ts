import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { projectInfo } = body;

    // 1. Create Project
    const { data: project, error: projectError } = await supabase
      .from('Project')
      .insert({
        name: projectInfo.projectName,
        description: projectInfo.description,
        userId: user.id,
        status: 'active',
      })
      .select()
      .single();

    if (projectError) throw projectError;

    // 2. Create Default Phases
    const defaultPhases = [
      'Requirements Analysis',
      'Design & Prototyping',
      'Implementation',
      'Testing & QA',
      'Deployment',
      'Maintenance'
    ];

    const phasesData = defaultPhases.map(name => ({
      name,
      projectId: project.id,
      status: 'pending'
    }));

    // Set first phase to active
    phasesData[0].status = 'active';

    const { error: phasesError } = await supabase
      .from('Phase')
      .insert(phasesData);

    if (phasesError) throw phasesError;

    return NextResponse.json({ project }, { status: 201 });

  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
