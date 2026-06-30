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
  {
    id: 'image-to-pdf',
    title: 'Image to PDF',
    description: 'Convert multiple photos into a single PDF document.',
    icon: FileImage,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    href: '/tools/image-to-pdf'
  },
  {
    id: 'merge-pdf',
    title: 'PDF Merger',
    description: 'Combine multiple PDFs into one file.',
    icon: Combine,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    href: '/tools/merge-pdf'
  },
  {
    id: 'split-pdf',
    title: 'Split PDF',
    description: 'Extract pages as separate PDFs.',
    icon: Scissors,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    href: '/tools/decompose'
  },
  {
    id: 'pdf-to-image',
    title: 'PDF to Image',
    description: 'Convert PDF pages into images.',
    icon: ImageIcon,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    href: '/tools/pdf-to-image'
  },
  {
    id: 'watermark',
    title: 'Watermark PDF',
    description: 'Add text watermark to PDFs.',
    icon: Type,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    href: '/tools/watermark'
  },
  {
    id: 'protect',
    title: 'Protect PDF',
    description: 'Secure PDF with protection settings.',
    icon: Lock,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    href: '/tools/protect'
  },
  {
    id: 'crop',
    title: 'Image Crop',
    description: 'Crop images easily.',
    icon: Crop,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    href: '/tools/crop'
  },
  {
    id: 'compress',
    title: 'Compress Image',
    description: 'Reduce image size without losing quality.',
    icon: Zap,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    href: '/tools/compress'
  },
  {
    id: 'resize',
    title: 'Resize Image',
    description: 'Resize images to any size.',
    icon: Maximize,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    href: '/tools/resize'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-xl">
            <FileText className="text-white" size={22} />
          </div>
          <span className="text-xl font-bold text-primary">PDF Maker</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="max-w-7xl mx-auto px-6">

        {/* HERO */}
        <section className="text-center py-12 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            All-in-One <span className="text-primary">PDF Tools</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fast, secure, and browser-based document tools. No uploads required.
          </p>

          <div className="flex justify-center gap-4 flex-wrap mt-4">
            <span className="flex items-center gap-2 text-sm">
              <ShieldCheck size={16} /> Privacy
            </span>
            <span className="flex items-center gap-2 text-sm">
              <Globe size={16} /> Offline Processing
            </span>
            <span className="flex items-center gap-2 text-sm">
              <Clock size={16} /> Fast
            </span>
          </div>
        </section>

        {/* TOOLS GRID */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
          {tools.map((tool) => (
            <Link key={tool.id} href={tool.href}>
              <Card className="hover:shadow-lg transition">
                <CardHeader>
                  <div className={`p-3 rounded-xl w-fit ${tool.bgColor}`}>
                    <tool.icon className={tool.color} />
                  </div>
                  <CardTitle className="mt-3">{tool.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription>{tool.description}</CardDescription>

                  <div className="mt-4 text-primary flex items-center gap-2 text-sm font-medium">
                    Open Tool <ArrowRight size={14} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>

      </main>
    </div>
  );
}
