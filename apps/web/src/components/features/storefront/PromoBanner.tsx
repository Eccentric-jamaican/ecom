"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function PromoBanner() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Thanks for subscribing!');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="mb-16">
      <div className="relative rounded-2xl overflow-hidden bg-blue-50 dark:bg-[#2a303c] border border-slate-200 dark:border-[#333] flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex-1 space-y-4 text-center md:text-left">
          <span className="text-primary font-bold tracking-wide text-sm-fluid uppercase">Limited Time Offer</span>
          <h2 className="text-h2 font-semibold leading-tight text-[#181411] dark:text-white">Get 20% Off Your First Order</h2>
          <p className="text-body leading-relaxed text-muted-foreground max-w-lg">
            Use code <span className="font-mono bg-white dark:bg-[#111] px-2 py-1 rounded border border-dashed border-gray-400 text-primary font-bold">WELCOME20</span> at checkout to receive your exclusive discount.
          </p>
        </div>
        <div className="relative z-10 w-full md:w-auto flex-shrink-0">
          <form className="flex w-full max-w-sm flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <Input 
                  name="email"
                  className="w-full rounded-lg border-slate-200 dark:border-[#444] bg-white dark:bg-[#111] px-4 py-6 text-sm focus:border-primary focus:ring-primary dark:text-white" 
                  placeholder="Enter your email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address for newsletter"
                  aria-invalid={status === 'error'}
                />
              </div>
              <Button 
                type="submit"
                disabled={status === 'loading'}
                className="whitespace-nowrap h-auto rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
            {(status === 'error' || status === 'success') && (
              <p 
                aria-live="polite" 
                className={`text-xs mt-1 ${status === 'error' ? 'text-red-500' : 'text-green-600 dark:text-green-400 font-medium'}`}
              >
                {message}
              </p>
            )}
          </form>
          <p className="mt-3 text-xs text-center md:text-left text-gray-400">Join our newsletter for more deals.</p>
        </div>
      </div>
    </section>
  );
}
