
import { FileText, ShieldCheck, Zap, Globe, Heart } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background hero-gradient pb-24 md:pb-0">
      <header className="px-6 pt-12 pb-8 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <FileText className="text-primary-foreground" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-primary">PDF Maker</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-6 max-w-4xl py-12 md:py-20 space-y-16">
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Our Mission is <span className="text-primary">Privacy.</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            PDF Maker was born from a simple realization: document processing shouldn't mean sacrificing your data. Most online tools upload your sensitive files to their servers—we don't.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm space-y-4">
            <div className="p-3 bg-blue-500/10 text-blue-500 w-fit rounded-2xl">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-bold">Local-First Architecture</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every single operation, from PDF merging to image compression, happens inside your browser. We never see your files, because they never leave your device.
            </p>
          </div>
          <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm space-y-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 w-fit rounded-2xl">
              <Zap size={32} />
            </div>
            <h3 className="text-2xl font-bold">Unmatched Speed</h3>
            <p className="text-muted-foreground leading-relaxed">
              Without the need for uploads and downloads to a remote server, our tools are instant. The processing power of your modern browser is all we need.
            </p>
          </div>
          <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm space-y-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-500 w-fit rounded-2xl">
              <Globe size={32} />
            </div>
            <h3 className="text-2xl font-bold">Universal Access</h3>
            <p className="text-muted-foreground leading-relaxed">
              PDF Maker is a Progressive Web App. It works on your phone, tablet, and desktop—even offline once loaded. Truly universal productivity.
            </p>
          </div>
          <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm space-y-4">
            <div className="p-3 bg-rose-500/10 text-rose-500 w-fit rounded-2xl">
              <Heart size={32} />
            </div>
            <h3 className="text-2xl font-bold">User Centric</h3>
            <p className="text-muted-foreground leading-relaxed">
              No ads, no accounts, no distractions. Just the tools you need to get the job done, packaged in a beautiful, modern interface.
            </p>
          </div>
        </div>

        <section className="bg-primary/5 rounded-[3rem] p-12 text-center space-y-6 border border-primary/10">
          <h2 className="text-3xl font-bold">Join 100,000+ happy users</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ready to experience the future of document productivity? Stop uploading your life and start making PDFs the smart way.
          </p>
          <Button asChild size="lg" className="rounded-2xl px-12 h-14 text-lg">
            <Link href="/">Try the Tools</Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
