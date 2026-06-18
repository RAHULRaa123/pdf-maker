```tsx
import { FileText, Scale, CheckCircle, AlertCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

export default function TermsPage() {
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
          <h1 className="text-5xl font-bold tracking-tighter">Terms & Conditions</h1>
          <p className="text-muted-foreground text-lg">Effective Date: June 2026</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-primary mb-4">
              <Scale size={28} />
              <h2 className="text-3xl font-bold m-0">Agreement to Terms</h2>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              By accessing or using PDF Maker, you agree to be bound by these Terms and Conditions.
              If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-bold">1. Use of Service</h3>
            <div className="bg-secondary/30 p-6 rounded-2xl border border-border/50">
              <ul className="space-y-3 m-0 list-none p-0">
                <li className="flex gap-3 text-muted-foreground">
                  <CheckCircle className="text-emerald-500 shrink-0" size={20} />
                  PDF Maker provides PDF, image conversion, compression, and document management tools.
                </li>
                <li className="flex gap-3 text-muted-foreground">
                  <CheckCircle className="text-emerald-500 shrink-0" size={20} />
                  The service is provided "as is" and "as available".
                </li>
                <li className="flex gap-3 text-muted-foreground">
                  <CheckCircle className="text-emerald-500 shrink-0" size={20} />
                  Users are responsible for the files they upload, process, or download.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold">2. Intellectual Property</h3>
            <p className="text-muted-foreground">
              The content, design, branding, and functionality of PDF Maker
              (excluding files uploaded by users) belong to PDF Maker and may not be copied
              or redistributed without permission.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold">3. Limitation of Liability</h3>
            <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/20 flex gap-4">
              <AlertCircle className="text-amber-500 shrink-0" size={24} />
              <p className="text-sm text-muted-foreground m-0 leading-relaxed">
                PDF Maker is not responsible for any loss of files, data corruption,
                processing errors, or other damages that may occur while using the service.
                Users should always keep backup copies of important documents.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold">4. Changes to Terms</h3>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time.
              Continued use of the service after updates means acceptance of the revised terms.
            </p>
          </section>

          <section className="space-y-4 pt-12 border-t">
            <h3 className="text-2xl font-bold">5. Governing Law</h3>
            <p className="text-muted-foreground">
              These terms are governed by applicable laws and regulations.
            </p>
          </section>

          <section className="space-y-4 pt-12 border-t">
            <h3 className="text-2xl font-bold">Contact Information</h3>
            <p className="text-muted-foreground">
              If you have questions regarding these Terms and Conditions,
              you may contact us at:
              <strong> raa426243@gmail.com</strong>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
```
