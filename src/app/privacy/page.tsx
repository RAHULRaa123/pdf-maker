
import { FileText, Shield, EyeOff, Lock, ServerOff } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background hero-gradient pb-24 md:pb-0">
      <header className="px-6 pt-12 pb-8 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-xl shadow-lg">
            <FileText className="text-primary-foreground" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-primary">PDF Maker</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-6 max-w-4xl py-12 md:py-20">
        <div className="space-y-8 mb-16 text-center">
          <h1 className="text-5xl font-bold tracking-tighter">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg">Last Updated: February 2026</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-primary mb-4">
              <ServerOff size={28} />
              <h2 className="text-3xl font-bold m-0">Zero Upload Policy</h2>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              This is the most important part of our privacy policy: <strong>We do not upload your documents or images to any server.</strong> 
              All file processing, conversion, merging, and compression happens locally on your computer using your web browser's built-in processing capabilities.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="bg-secondary/30 p-8 rounded-3xl space-y-3">
              <Shield className="text-emerald-500" size={32} />
              <h4 className="font-bold text-xl">Data Collection</h4>
              <p className="text-sm text-muted-foreground">We do not collect personal information, email addresses, or document metadata. No tracking scripts are used on document processing pages.</p>
            </div>
            <div className="bg-secondary/30 p-8 rounded-3xl space-y-3">
              <EyeOff className="text-blue-500" size={32} />
              <h4 className="font-bold text-xl">Third Parties</h4>
              <p className="text-sm text-muted-foreground">We do not share any information with third parties because we don't have your data in the first place.</p>
            </div>
          </div>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold">Cookies and Local Storage</h3>
            <p className="text-muted-foreground">
              We use standard browser Local Storage only to save your theme preference (Light/Dark mode). This data stays on your device and is not sent to us. We do not use tracking or advertising cookies.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold">Browser Security</h3>
            <p className="text-muted-foreground">
              Since all operations are performed locally, your documents are protected by your browser's security sandbox. We recommend using a modern, updated browser for the best security and performance.
            </p>
          </section>

          <section className="space-y-4 pt-12 border-t">
            <h3 className="text-2xl font-bold">Contact Us</h3>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at <span className="text-primary font-bold">privacy@pdfmaker.app</span>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
