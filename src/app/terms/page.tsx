
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
          <p className="text-muted-foreground text-lg">Effective Date: February 2026</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-primary mb-4">
              <Scale size={28} />
              <h2 className="text-3xl font-bold m-0">Agreement to Terms</h2>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              By accessing or using PDF Maker, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-bold">1. Use of Service</h3>
            <div className="bg-secondary/30 p-6 rounded-2xl border border-border/50">
               <ul className="space-y-3 m-0 list-none p-0">
                 <li className="flex gap-3 text-muted-foreground">
                   <CheckCircle className="text-emerald-500 shrink-0" size={20} />
                   PDF Maker provides document conversion, merging, and image tools.
                 </li>
                 <li className="flex gap-3 text-muted-foreground">
                   <CheckCircle className="text-emerald-500 shrink-0" size={20} />
                   The service is provided "as is" and "as available".
                 </li>
                 <li className="flex gap-3 text-muted-foreground">
                   <CheckCircle className="text-emerald-500 shrink-0" size={20} />
                   You are responsible for the documents you process using the tool.
                 </li>
               </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold">2. Intellectual Property</h3>
            <p className="text-muted-foreground">
              The content, features, and functionality of PDF Maker (excluding documents provided by users) are the exclusive property of PDF Maker. Our trademarks and branding may not be used without prior written permission.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold">3. Limitation of Liability</h3>
            <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/20 flex gap-4">
              <AlertCircle className="text-amber-500 shrink-0" size={24} />
              <p className="text-sm text-muted-foreground m-0 leading-relaxed">
                In no event shall PDF Maker be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the service, including but not limited to loss of data or document corruption.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold">4. Changes to Terms</h3>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. We will notify users of any changes by updating the "Effective Date" at the top of this page. Your continued use of the service after such changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="space-y-4 pt-12 border-t">
            <h3 className="text-2xl font-bold">5. Governing Law</h3>
            <p className="text-muted-foreground">
              These terms are governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
