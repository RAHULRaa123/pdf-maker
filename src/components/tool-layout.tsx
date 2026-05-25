"use client"

import Link from 'next/link';
import { ArrowLeft, LucideIcon, Home, FileText, Zap, Layers } from 'lucide-react';
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
    <div className="min-h-screen bg-background transition-colors duration-500 pb-24 md:pb-0">
      <header className="glass border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-secondary">
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg text-primary shadow-inner">
                <Icon size={20} />
              </div>
              <h1 className="font-bold text-lg text-foreground tracking-tight hidden sm:block">
                {title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-bold hover:bg-secondary/80 transition-colors">
              <Home size={16} /> Home
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-10 text-center md:text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Icon size={12} /> Productivity Tool
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{title}</h2>
          <p className="text-muted-foreground text-lg">{description}</p>
        </div>
        <div className="relative">
          {children}
        </div>
      </main>

      {/* Bottom Nav for Tools */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden glass border-t border-border/50 px-6 py-3 flex justify-around items-center z-50">
        <Link href="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          <Home size={24} />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/tools/image-to-pdf" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          <FileText size={24} />
          <span className="text-[10px] font-bold">PDF</span>
        </Link>
        <Link href="/tools/compress" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          <Zap size={24} />
          <span className="text-[10px] font-bold">Compress</span>
        </Link>
        <Link href="/tools/resize" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          <Layers size={24} />
          <span className="text-[10px] font-bold">Resize</span>
        </Link>
      </nav>
    </div>
  );
}