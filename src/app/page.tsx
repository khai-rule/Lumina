"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  CheckCircle,
  Share2,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const lightBallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lightBallRef.current) {
      const layers = lightBallRef.current.querySelectorAll(".light-layer");
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
          ease: "power3.out",
          stagger: {
            each: 0.1,
            from: "end",
          },
          delay: 0.2,
        }
      );
    }
  }, []);

  return (
    <main className='min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden'>
      {/* Navigation */}
      <nav className='w-full fixed top-0 left-1/2 -translate-x-1/2 h-[64px] bg-background/80 backdrop-blur-[999px] z-[999]'>
        <div className='max-w-7xl m-auto flex justify-between items-center z-10 h-[64px] px-6'>
          <div className='flex items-center gap-2'>
            <img
              src='/icons/brand-logo.png'
              alt='Lumina Logo'
              className='w-8 h-8 object-contain'
            />
            <span className='text-xl font-bold tracking-tight'>Lumina</span>
          </div>
          <div className='flex gap-6 text-sm font-medium items-center'>
            <Button asChild variant='ghost'>
              <Link href='/login'>Login</Link>
            </Button>
            <Button asChild>
              <Link href='/login'>Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='flex flex-col justify-center py-20 mx-auto w-full relative z-10 h-[85vh] mt-[64px] overflow-hidden'>
        {/* Light Ball Animation */}
        <div
          ref={lightBallRef}
          className='absolute inset-0 -z-10 pointer-events-none overflow-hidden'
        >
          <div className='absolute left-1/2 top-0 h-full w-full -translate-x-1/2'>
            <div className='absolute inset-0 flex h-full justify-center blur-[60px] md:blur-[80px]'>
              <div className='light-layer absolute -bottom-[calc(913px/3)] h-[913px] w-[1568px] rounded-full bg-indigo-200 dark:bg-indigo-700 opacity-100'></div>
              <div className='light-layer absolute -bottom-[calc(913px/2-100px)] h-[913px] w-[1266px] rounded-full bg-blue-400 opacity-100'></div>
              <div className='light-layer absolute -bottom-[calc(913px/2+100px)] h-[913px] w-[1266px] rounded-full bg-violet-300 opacity-100'></div>
              <div className='light-layer absolute -bottom-[calc(933px/2+100px)] h-[933px] w-[1266px] rounded-full bg-fuchsia-300 opacity-100'></div>
              <div className='light-layer absolute -bottom-[calc(692px/2-40px)] h-[692px] w-[1116px] rounded-full bg-pink-600 opacity-100'></div>
              <div className='light-layer absolute -bottom-[calc(560px/2+100px)] h-[560px] w-[981px] rounded-full bg-orange-500 opacity-100'></div>
              <div className='light-layer absolute -bottom-[calc(384px/2-50px)] h-96 w-[812px] rounded-full bg-amber-500 opacity-100'></div>
            </div>
          </div>
        </div>

        <div className='space-y-8 max-w-7xl mx-auto w-full flex flex-col justify-center items-center px-6'>
          <div className='space-y-8 max-w-4xl text-center'>
            <h1 className='text-white text-5xl md:text-7xl font-bold tracking-tight'>
              Build Software <br />
              That Matters.
            </h1>
            <p className='text-white text-balance text-xl mx-auto max-w-2xl'>
              Don&apos;t just write code. Craft solutions. Lumina guides your
              journey from a spark of inspiration to a product that changes
              lives, documenting every meaningful decision along the way.
            </p>
          </div>
          <div className='flex flex-wrap gap-4 pt-4'>
            <Button asChild size='lg' className='text-lg h-14 px-8'>
              <Link href='/project-setup'>
                Start Your Journey <ArrowRight className='w-5 h-5 ml-2' />
              </Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='lg'
              className='text-lg h-14 px-8'
            >
              <Link href='/sample-report'>See the Impact</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='px-6 py-24 bg-white/50 border-t border-border relative z-10'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              More Than Just Tools. A Philosophy.
            </h2>
            <p className='text-muted-foreground max-w-2xl mx-auto'>
              We believe software development is a creative art. Our platform
              empowers you to focus on the &apos;why&apos; while we handle the
              &apos;how&apos;.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-12'>
            <div className='space-y-4 p-6 rounded-xl hover:bg-white transition-colors duration-300 border border-transparent hover:border-border/50 hover:shadow-sm'>
              <div className='w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4 text-primary'>
                <CheckCircle className='w-6 h-6' />
              </div>
              <h3 className='text-xl font-semibold'>Guided Creativity</h3>
              <p className='text-muted-foreground leading-relaxed'>
                AI that understands your vision, suggesting the next best step
                to bring your ideas to life without stifling your flow.
              </p>
            </div>

            <div className='space-y-4 p-6 rounded-xl hover:bg-white transition-colors duration-300 border border-transparent hover:border-border/50 hover:shadow-sm'>
              <div className='w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4 text-primary'>
                <BookOpen className='w-6 h-6' />
              </div>
              <h3 className='text-xl font-semibold'>The Story of Your Build</h3>
              <p className='text-muted-foreground leading-relaxed'>
                Every requirement, every decision, every pivot—captured
                automatically. A living history of how you solved the
                impossible.
              </p>
            </div>

            <div className='space-y-4 p-6 rounded-xl hover:bg-white transition-colors duration-300 border border-transparent hover:border-border/50 hover:shadow-sm'>
              <div className='w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4 text-primary'>
                <FileText className='w-6 h-6' />
              </div>
              <h3 className='text-xl font-semibold'>Share Your Masterpiece</h3>
              <p className='text-muted-foreground leading-relaxed'>
                Turn your development journey into a compelling narrative.
                Generate reports that show clients not just what you built, but
                the care you put into it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className='py-24 px-6 bg-secondary/30 relative z-10'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-16 items-center'>
            <div>
              <h2 className='text-3xl md:text-4xl font-bold mb-6'>
                From Spark to Legacy.
              </h2>
              <div className='space-y-8'>
                {[
                  {
                    step: "01",
                    title: "Envision",
                    desc: "Define the soul of your project. AI helps you ask the right questions to uncover the true needs of your users.",
                  },
                  {
                    step: "02",
                    title: "Create",
                    desc: "Build with purpose. As you code, Lumina silently weaves your technical decisions into a coherent narrative.",
                  },
                  {
                    step: "03",
                    title: "Inspire",
                    desc: "Deliver more than a product. Hand over a story of innovation, complete with the documentation to ensure its longevity.",
                  },
                ].map((item) => (
                  <div key={item.step} className='flex gap-4'>
                    <div className='font-mono text-primary font-bold pt-1'>
                      {item.step}
                    </div>
                    <div>
                      <h4 className='text-lg font-semibold mb-1'>
                        {item.title}
                      </h4>
                      <p className='text-muted-foreground'>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='relative'>
              <div className='absolute inset-0 bg-accent/20 blur-[100px] rounded-full' />
              <div className='relative bg-card border border-border rounded-xl p-6 shadow-lg'>
                <div className='flex justify-between items-center mb-4 border-b border-border pb-4'>
                  <div className='flex gap-2'>
                    <div className='w-3 h-3 rounded-full bg-red-500/50' />
                    <div className='w-3 h-3 rounded-full bg-yellow-500/50' />
                    <div className='w-3 h-3 rounded-full bg-green-500/50' />
                  </div>
                  <div className='text-xs font-mono'>project-report.pdf</div>
                </div>
                <div className='space-y-4 font-mono text-sm'>
                  <div className='flex items-center gap-2 text-primary font-bold'>
                    <ClipboardList className='w-4 h-4' />
                    <span>Project Handover Report</span>
                  </div>
                  <div className='space-y-2 pl-6 border-l-2 border-border'>
                    <div className='text-foreground font-semibold'>
                      1. Executive Summary
                    </div>
                    <div className='text-muted-foreground text-xs'>
                      The project was completed on time and within budget...
                    </div>
                  </div>
                  <div className='space-y-2 pl-6 border-l-2 border-border'>
                    <div className='text-foreground font-semibold'>
                      2. Technical Specifications
                    </div>
                    <div className='text-muted-foreground text-xs'>
                      - Frontend: Next.js 14
                      <br />
                      - Backend: Supabase
                      <br />- Infrastructure: Vercel
                    </div>
                  </div>
                  <div className='flex justify-end pt-2'>
                    <div className='bg-primary/10 text-primary text-xs px-2 py-1 rounded flex items-center gap-1'>
                      <CheckCircle className='w-3 h-3' /> Ready for Export
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Showcase */}
      {/* <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className=" mb-4">Success Stories</h2>
            <p className="text-muted-foreground">See how teams are delivering better software with Lumina.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group relative aspect-video rounded-xl overflow-hidden bg-secondary border border-border">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h4 className="text-white mb-1">Project {i}</h4>
                  <p className="text-white/80">Enterprise ERP Migration</p>
                </div>
                <div className="absolute inset-0 bg-secondary group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className='py-24 px-6 relative overflow-hidden z-10'>
        <div className='absolute inset-0 bg-accent/10' />
        <div className='max-w-4xl mx-auto text-center relative z-10'>
          <h2 className='text-4xl md:text-5xl font-bold mb-6'>
            Ready to build something meaningful?
          </h2>
          <p className='text-xl text-muted-foreground mb-10'>
            Your best work is waiting. Let Lumina help you tell its story.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button asChild size='lg' className='h-14 px-8 text-lg'>
              <Link href='/login'>Begin Your Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='px-6 py-12 border-t border-border mt-auto relative z-10 bg-background'>
        <div className='max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12'>
          <div className='col-span-1 md:col-span-2'>
            <div className='flex items-center gap-2 mb-4'>
              <img
                src='/icons/brand-logo.png'
                alt='Lumina Logo'
                className='w-6 h-6 object-contain'
              />
              <span className='text-lg font-bold'>Lumina</span>
            </div>
            <p className='text-muted-foreground max-w-sm'>
              Empowering developers to build better software, faster. The
              intelligent choice for modern engineering teams.
            </p>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Product</h4>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                <Link
                  href='#'
                  className='hover:text-foreground transition-colors'
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-foreground transition-colors'
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-foreground transition-colors'
                >
                  Changelog
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-foreground transition-colors'
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Company</h4>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                <Link
                  href='#'
                  className='hover:text-foreground transition-colors'
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-foreground transition-colors'
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-foreground transition-colors'
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-foreground transition-colors'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='max-w-7xl mx-auto pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground'>
          <p>© 2025 Lumina Systems Inc. All rights reserved.</p>
          <div className='flex gap-6'>
            <Link href='#' className='hover:text-foreground transition-colors'>
              Privacy Policy
            </Link>
            <Link href='#' className='hover:text-foreground transition-colors'>
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
