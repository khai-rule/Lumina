'use client';

import Link from 'next/link';
import { ArrowRight, Cpu, Layers, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Home() {
  const lightBallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lightBallRef.current) {
      const layers = lightBallRef.current.querySelectorAll('.light-layer');
      gsap.fromTo(
        layers,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.8,
          ease: 'power3.out',
          stagger: {
            each: 0.1,
            from: 'end',
          },
          delay: 0.2,
        }
      );
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Navigation */}
      <nav className="w-full fixed top-0 left-1/2 -translate-x-1/2 h-[64px] bg-background/80 backdrop-blur-[999px] z-[999]">
      <div className='max-w-7xl m-auto flex justify-between items-center z-10 h-[64px]'>

        <div className="flex items-center gap-2">
          <img src="/icons/brand-logo.png" alt="Lumina Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold tracking-tight">Lumina</span>
        </div>
        <div className="flex gap-6 text-sm font-medium items-center">
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col justify-center py-20  mx-auto w-full relative z-10 h-[85vh] mt-[64px] overflow-hidden">
        {/* Light Ball Animation */}
        <div ref={lightBallRef} className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2">
            <div className="absolute inset-0 flex h-full justify-center blur-[60px] md:blur-[80px]">
              <div className="light-layer absolute -bottom-[calc(913px/3)] h-[913px] w-[1568px] rounded-full bg-indigo-200 dark:bg-indigo-700 opacity-100"></div>
              <div className="light-layer absolute -bottom-[calc(913px/2-100px)] h-[913px] w-[1266px] rounded-full bg-blue-400 opacity-100"></div>
              <div className="light-layer absolute -bottom-[calc(913px/2+100px)] h-[913px] w-[1266px] rounded-full bg-violet-300 opacity-100"></div>
              <div className="light-layer absolute -bottom-[calc(933px/2+100px)] h-[933px] w-[1266px] rounded-full bg-fuchsia-300 opacity-100"></div>
              <div className="light-layer absolute -bottom-[calc(692px/2-40px)] h-[692px] w-[1116px] rounded-full bg-pink-600 opacity-100"></div>
              <div className="light-layer absolute -bottom-[calc(560px/2+100px)] h-[560px] w-[981px] rounded-full bg-orange-500 opacity-100"></div>
              <div className="light-layer absolute -bottom-[calc(384px/2-50px)] h-96 w-[812px] rounded-full bg-amber-500 opacity-100"></div>
            </div>
          </div>
        </div>
        
        <div className="space-y-8 max-w-7xl mx-auto  w-full flex flex-col justify-center items-center">
          <div className='space-y-8 max-w-3xl text-center'>
          <h1  className="text-white">
            The Intelligent Way <br />
            to Build Software.
          </h1>
          <p className="text-white text-balance">
            Lumina guides you from concept to launch with AI-powered precision. 
            An invisible interface for your most visible work.
          </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button asChild size="lg" className="text-lg h-14 px-8">
              <Link href="/project-setup">
                Start a Project <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg h-14 px-8">
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 bg-white/50 border-t border-border relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="space-y-4 p-6 rounded-xl hover:bg-white transition-colors duration-300">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3>AI Assistant</h3>
            <p className="text-muted-foreground leading-relaxed">
              Your partner in every phase. From generating requirements to debugging code, Lumina is always there.
            </p>
          </div>
          
          <div className="space-y-4 p-6 rounded-xl hover:bg-white transition-colors duration-300">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3>Phase Tracking</h3>
            <p className="text-muted-foreground leading-relaxed">
              Seamless transitions from planning to deploy. Keep your team aligned with structured workflows.
            </p>
          </div>

          <div className="space-y-4 p-6 rounded-xl hover:bg-white transition-colors duration-300">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3>Real-time Insights</h3>
            <p className="text-muted-foreground leading-relaxed">
              Live data on your project's pulse. Identify bottlenecks before they become blockers.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border mt-auto relative z-10">
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
