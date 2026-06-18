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
            About <span className="text-primary">PDF Maker</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            PDF Maker is a free online document processing platform designed to help users manage PDF and image files quickly, securely, and easily.
          </p>
        </section>

        <section className="space-y-6 text-muted-foreground leading-relaxed text-lg">
          <p>
            Our mission is to provide simple and useful PDF tools for students, teachers, office workers, freelancers, business owners, and everyday users. Many people need to merge PDF files, convert images to PDF, compress images, resize images, crop images, protect documents, or convert PDF pages into images. PDF Maker brings these common tools together in one clean and easy-to-use platform.
          </p>

          <p>
            We understand that document work should not be complicated. Users often need quick solutions for school assignments, job applications, certificates, ID documents, reports, invoices, receipts, and scanned files. PDF Maker is built to make these tasks faster and more organized.
          </p>

          <p>
            Privacy and convenience are important parts of our platform. Wherever possible, our tools are designed to process files directly in the browser. This helps users complete document tasks without installing heavy software or creating an account.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm space-y-4">
            <div className="p-3 bg-blue-500/10 text-blue-500 w-fit rounded-2xl">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-bold">Privacy Focused</h3>
            <p className="text-muted-foreground leading-relaxed">
              PDF Maker is designed with privacy in mind. Many document tasks can be handled directly in the browser, helping users work with files in a safer and more convenient way.
            </p>
          </div>

          <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm space-y-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 w-fit rounded-2xl">
              <Zap size={32} />
            </div>
            <h3 className="text-2xl font-bold">Fast Document Tools</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our tools are created for quick document processing. Users can complete common PDF and image tasks without installing extra software.
            </p>
          </div>

          <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm space-y-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-500 w-fit rounded-2xl">
              <Globe size={32} />
            </div>
            <h3 className="text-2xl font-bold">Works Across Devices</h3>
            <p className="text-muted-foreground leading-relaxed">
              PDF Maker works on laptops, desktops, tablets, and mobile phones. Users can access tools from a browser and manage documents from almost anywhere.
            </p>
          </div>

          <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm space-y-4">
            <div className="p-3 bg-rose-500/10 text-rose-500 w-fit rounded-2xl">
              <Heart size={32} />
            </div>
            <h3 className="text-2xl font-bold">Built for Everyday Users</h3>
            <p className="text-muted-foreground leading-relaxed">
              PDF Maker is made for people who want simple, clean, and useful document tools. The interface is designed to be easy for students, professionals, and general users.
            </p>
          </div>
        </div>

        <section className="bg-primary/5 rounded-[3rem] p-12 text-center space-y-6 border border-primary/10">
          <h2 className="text-3xl font-bold">Start Managing Your Documents Easily</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Use PDF Maker to convert, merge, protect, resize, compress, and organize your PDF and image files in a simple online workspace.
          </p>
          <Button asChild size="lg" className="rounded-2xl px-12 h-14 text-lg">
            <Link href="/">Try the Tools</Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
