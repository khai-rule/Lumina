"use client"

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';

export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Password requirements
  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains number', met: /[0-9]/.test(password) },
    { label: 'Contains special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const isPasswordValid = requirements.every((req) => req.met);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validation
    if (!isLogin) {
      if (!isPasswordValid) {
        setError('Please meet all password requirements');
        setIsLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/project-dashboard');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setShowSuccess(true);
      }
    } catch (e: any) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Icon name="EnvelopeIcon" size={32} className="text-green-600" />
            </div>
          </div>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We've sent a confirmation link to <strong>{email}</strong>. Please click the link to activate your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => {
              setShowSuccess(false);
              setIsLogin(true);
            }}
            className="w-full"
          >
            Back to Sign In
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-2">
        <CardTitle>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </CardTitle>
        <CardDescription>
          {isLogin ? 'Enter your credentials to access your workspace.' : 'Start your intelligent SDLC journey today.'}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md border border-destructive/20">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute left-3 top-3 text-muted-foreground">
                <Icon name="EnvelopeIcon" size={20} />
              </div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute left-3 top-3 text-muted-foreground">
                <Icon name="LockClosedIcon" size={20} />
              </div>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              >
                {showPassword ? <Icon name="EyeIcon" size={20} /> : <Icon name="EyeSlashIcon" size={20} />}
              </Button>
            </div>
            {!isLogin && (
              <div className="grid grid-cols-1 gap-1 mt-2">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <div className={`w-1.5 h-1.5 rounded-full ${req.met ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                    <span className={req.met ? 'text-green-600' : 'text-muted-foreground'}>{req.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-3 top-3 text-muted-foreground">
                  <Icon name="LockClosedIcon" size={20} />
                </div>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pl-10 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                >
                  {showConfirmPassword ? <Icon name="EyeIcon" size={20} /> : <Icon name="EyeSlashIcon" size={20} />}
                </Button>
              </div>
            </div>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Create Account'} <Icon name="ArrowRightIcon" size={20} className="ml-2" />
              </>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <Button
          variant="link"
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </Button>
      </CardFooter>
    </Card>
  );
}
