import AuthModal from '@/components/auth/AuthModal';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

export const metadata = {
  title: 'Login - Lumina',
  description: 'Access your Lumina workspace.',
};

import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
      <Button 
        variant="ghost" 
        asChild 
        className="absolute top-8 left-8 text-muted-foreground hover:text-foreground"
      >
        <Link href="/">
          <Icon name="ArrowLeftIcon" size={16} className="mr-2" /> Back to Home
        </Link>
      </Button>
      
      <div className="w-full max-w-md mb-8 text-center flex flex-col items-center">
        <AppImage src="/icons/brand-logo.png" alt="Lumina Logo" className="w-16 h-16 mb-4 object-contain" />
        <div className="text-heading-2 mb-2">Lumina</div>
      </div>

      <AuthModal />
    </main>
  );
}
