
"use client"

import Link from 'next/link';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function ToolLayout({ title, description, icon: Icon, children }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="bg-secondary p-2 rounded-lg text-accent">
                <Icon size={20} />
              </div>
              <h1 className="font-headline font-bold text-lg text-primary truncate max-w-[150px] md:max-w-none">
                {title}
              </h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2 text-foreground">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {children}
      </main>
    </div>
  );
}
