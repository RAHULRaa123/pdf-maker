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
          <p className="text-muted-foreground text-lg">Last Updated: June 2026</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-primary mb-4">
              <ServerOff size={28} />
              <h2 className="text-3xl font-bold m-0">Privacy-Focused File Processing</h2>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              PDF Maker is designed to provide simple online PDF and image tools while keeping user privacy in mind.
              Many file processing tasks are handled directly in the user's browser whenever possible.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Users should avoid uploading or processing highly sensitive documents on any online tool unless they are comfortable with the process.
              We encourage users to review files carefully before sharing or downloading final documents.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="bg-secondary/30 p-8 rounded-3xl space-y-3">
              <Shield className="text-emerald-500" size={32} />
              <h4 className="font-bold text-xl">Information We Collect</h4>
              <p className="text-sm text-muted-foreground">
                PDF Maker does not require users to create an account to use the available tools.
                We do not ask for personal information such as name, phone number, or address to process files.
              </p>
            </div>

            <div className="bg-secondary/30 p-8 rounded-3xl space-y-3">
              <EyeOff className="text-blue-500" size={32} />
              <h4 className="font-bold text-xl">Third-Party Services</h4>
              <p className="text-sm text-muted-foreground">
                We may use third-party services such as hosting, analytics, or advertising services.
                These services may use cookies or similar technologies according to their own policies.
              </p>
            </div>
          </div>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold">Cookies and Local Storage</h3>
            <p className="text-muted-foreground">
              PDF Maker may use browser local storage to save basic preferences such as theme settings.
              Third-party services, including advertising partners, may use cookies to serve and measure ads.
              Users can manage cookies through their browser settings.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold">Advertising</h3>
            <p className="text-muted-foreground">
              PDF Maker may display advertisements through third-party advertising networks such as Google AdSense.
              Advertising partners may use cookies or similar technologies to show relevant ads and measure performance.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold">Browser Security</h3>
            <p className="text-muted-foreground">
              We recommend using a modern and updated browser for better security and performance.
              Users are responsible for choosing which files they process and share online.
            </p>
          </section>

          <section className="space-y-4 pt-12 border-t">
            <h3 className="text-2xl font-bold">Contact Us</h3>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <span className="text-primary font-bold">raa426243@gmail.com</span>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
