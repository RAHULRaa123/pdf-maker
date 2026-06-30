import Link from 'next/link';
import {
  FileImage,
  Combine,
  Zap,
  Maximize,
  Scissors,
  ArrowRight,
  ShieldCheck,
  Globe,
  Clock,
  FileText,
  Type,
  Lock,
  Image as ImageIcon,
  Crop
} from 'lucide-react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';

import { ThemeToggle } from '@/components/theme-toggle';

const tools = [
  { id: 'image-to-pdf', title: 'Image to PDF', description: 'Convert images into PDF files.', icon: FileImage, color: 'text-blue-500', bgColor: 'bg-blue-500/10', href: '/tools/image-to-pdf' },
  { id: 'merge-pdf', title: 'PDF Merger', description: 'Combine multiple PDFs into one.', icon: Combine, color: 'text-indigo-500', bgColor: 'bg-indigo-500/10', href: '/tools/merge-pdf' },
  { id: 'split-pdf', title: 'Split PDF', description: 'Split PDF into pages.', icon: Scissors, color: 'text-rose-500', bgColor: 'bg-rose-500/10', href: '/tools/decompose' },
  { id: 'pdf-to-image', title: 'PDF to Image', description: 'Convert PDF to images.', icon: ImageIcon, color: 'text-purple-500', bgColor: 'bg-purple-500/10', href: '/tools/pdf-to-image' },
  { id: 'watermark', title: 'Watermark PDF', description: 'Add watermark to PDF.', icon: Type, color: 'text-orange-500', bgColor: 'bg-orange-500/10', href: '/tools/watermark' },
  { id: 'protect', title: 'Protect PDF', description: 'Add password protection.', icon: Lock, color: 'text-cyan-500', bgColor: 'bg-cyan-500/10', href: '/tools/protect' },
  { id: 'crop', title: 'Image Crop', description: 'Crop images easily.', icon: Crop, color: 'text-pink-500', bgColor: 'bg-pink-500/10', href: '/tools/crop' },
  { id: 'compress', title: 'Compress Image', description: 'Reduce image size.', icon: Zap, color: 'text-amber-500', bgColor: 'bg-amber-500/10', href: '/tools/compress' },
  { id: 'resize', title: 'Resize Image', description: 'Resize images instantly.', icon: Maximize, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10', href: '/tools/resize' }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">

      {/* HEADER */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileText className="text-primary" />
          <span className="font-bold text-xl">PDF Maker</span>
        </div>
        <ThemeToggle />
      </header>

      {/* HERO */}
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl md:text-6xl font-bold">
          Free Online <span className="text-primary">PDF Tools</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Convert, merge, compress, and edit PDF files online without uploading your files.
        </p>

        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <span className="flex items-center gap-1 text-sm"><ShieldCheck size={14}/> Secure</span>
          <span className="flex items-center gap-1 text-sm"><Globe size={14}/> No Upload</span>
          <span className="flex items-center gap-1 text-sm"><Clock size={14}/> Fast</span>
        </div>
      </section>

      {/* TOOLS */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
        {tools.map(tool => (
          <Link key={tool.id} href={tool.href}>
            <Card className="hover:shadow-lg transition">
              <CardHeader>
                <div className={`p-2 w-fit rounded ${tool.bgColor}`}>
                  <tool.icon className={tool.color} />
                </div>
                <CardTitle className="mt-3">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{tool.description}</CardDescription>
                <div className="mt-4 text-primary flex items-center gap-1">
                  Open <ArrowRight size={16}/>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {/* SEO CONTENT (IMPORTANT FOR ADSENSE) */}
      <section className="max-w-3xl mx-auto px-6 pb-20 space-y-6">
        <h2 className="text-2xl font-bold">About PDF Maker</h2>
        <p>PDF Maker is a free online tool for PDF and image processing.</p>

        <h2 className="text-2xl font-bold">Features</h2>
        <p>Merge, split, compress, convert and protect PDF files easily.</p>

        <h2 className="text-2xl font-bold">Why use it?</h2>
        <p>No upload required. Everything runs in your browser securely.</p>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 border-t text-sm text-muted-foreground">
        © 2026 PDF Maker
      </footer>

    </div>
  );
}
