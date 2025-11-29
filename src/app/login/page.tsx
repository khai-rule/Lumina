import AuthModal from '@/components/auth/AuthModal';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Login - Lumina',
  description: 'Access your Lumina workspace.',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
      <Link 
        href="/" 
        className="absolute top-8 left-8 text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      
      <div className="w-full max-w-md mb-8 text-center flex flex-col items-center">
        <img src="/icons/brand-logo.png" alt="Lumina Logo" className="w-16 h-16 mb-4 object-contain" />
        <div className="text-2xl font-bold tracking-tight mb-2">Lumina</div>
      </div>

      <AuthModal />
    </main>
  );
}
