import Link from 'next/link';
import { ArrowRight, Cpu, Layers, Activity } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <nav className="w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-tight">Lumina</div>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/login" className="hover:opacity-70 transition-opacity">Login</Link>
          <Link href="/signup" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center px-6 py-20 max-w-7xl mx-auto w-full">
        <div className="max-w-4xl space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
            The Intelligent Way <br />
            <span className="text-muted-foreground">to Build Software.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            Lumina guides you from concept to launch with AI-powered precision. 
            An invisible interface for your most visible work.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              href="/project-setup" 
              className="bg-primary text-primary-foreground px-8 py-4 text-lg font-medium rounded-lg hover:opacity-90 transition-all flex items-center gap-2"
            >
              Start a Project <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-4 text-lg font-medium rounded-lg border border-input hover:bg-secondary/20 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 bg-white/50 border-t border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="space-y-4 p-6 rounded-xl hover:bg-white transition-colors duration-300">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold">AI Assistant</h3>
            <p className="text-muted-foreground leading-relaxed">
              Your partner in every phase. From generating requirements to debugging code, Lumina is always there.
            </p>
          </div>
          
          <div className="space-y-4 p-6 rounded-xl hover:bg-white transition-colors duration-300">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold">Phase Tracking</h3>
            <p className="text-muted-foreground leading-relaxed">
              Seamless transitions from planning to deploy. Keep your team aligned with structured workflows.
            </p>
          </div>

          <div className="space-y-4 p-6 rounded-xl hover:bg-white transition-colors duration-300">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold">Real-time Insights</h3>
            <p className="text-muted-foreground leading-relaxed">
              Live data on your project's pulse. Identify bottlenecks before they become blockers.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto flex justify-between items-end">
          <div>
            <div className="text-2xl font-bold mb-2">Lumina</div>
            <p className="text-sm text-muted-foreground">© 2024 Lumina Systems.</p>
          </div>
          <div className="text-sm text-muted-foreground">
            Designed with <span className="text-primary">♥</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
