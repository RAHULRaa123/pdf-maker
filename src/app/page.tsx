
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
  Lock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

const tools = [
  {
    id: 'image-to-pdf',
    title: 'Image to PDF',
    description: 'Convert multiple photos into a single professional PDF document.',
    icon: FileImage,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    href: '/tools/image-to-pdf'
  },
  {
    id: 'merge-pdf',
    title: 'PDF Merger',
    description: 'Combine different PDF files into one neatly organized document.',
    icon: Combine,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    href: '/tools/merge-pdf'
  },
  {
    id: 'decompose',
    title: 'Split PDF',
    description: 'Extract every page of a PDF as separate high-quality files.',
    icon: Scissors,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    href: '/tools/decompose'
  },
  {
    id: 'watermark',
    title: 'Watermark PDF',
    description: 'Add custom text watermarks to protect your intellectual property.',
    icon: Type,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    href: '/tools/watermark'
  },
  {
    id: 'protect',
    title: 'Protect PDF',
    description: 'Secure your documents with metadata protection and flattening.',
    icon: Lock,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    href: '/tools/protect'
  },
  {
    id: 'compress',
    title: 'Image Compress',
    description: 'Reduce file size by up to 90% without losing visual clarity.',
    icon: Zap,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    href: '/tools/compress'
  },
  {
    id: 'resize',
    title: 'Smart Resizer',
    description: 'Scale images to perfect dimensions for any platform.',
    icon: Maximize,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    href: '/tools/resize'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background hero-gradient transition-colors duration-500 pb-24 md:pb-0">
      <header className="px-6 pt-12 pb-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
            <FileText className="text-primary-foreground" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-primary">PDF Maker</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-6 max-w-7xl">
        <section className="text-center py-12 md:py-20 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground max-w-4xl mx-auto leading-[1.1]">
            Document Productivity, <span className="text-primary">Redefined.</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Professional PDF tools, fast and secure. No cloud uploads, all processing happens locally in your browser.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full text-sm font-medium">
               <ShieldCheck size={16} className="text-primary" /> Privacy Focused
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full text-sm font-medium">
               <Globe size={16} className="text-primary" /> 100% Client-Side
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full text-sm font-medium">
               <Clock size={16} className="text-primary" /> Instant Processing
             </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {tools.map((tool) => (
            <Link key={tool.id} href={tool.href} className="group outline-none">
              <Card className="h-full border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 tool-card-gradient overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <tool.icon size={120} />
                </div>
                <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                  <div className={`p-4 rounded-2xl ${tool.bgColor} ${tool.color} transition-transform duration-300 group-hover:scale-110 shadow-inner`}>
                    <tool.icon size={28} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold">
                      {tool.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground mb-6 leading-relaxed">
                    {tool.description}
                  </CardDescription>
                  <div className="flex items-center text-sm font-bold text-primary group-hover:translate-x-2 transition-transform duration-300">
                    Open Tool <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden glass border-t border-border/50 px-6 py-3 flex justify-around items-center z-50">
        <Link href="/" className="flex flex-col items-center gap-1 text-primary">
          <FileText size={24} />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/tools/image-to-pdf" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          <FileImage size={24} />
          <span className="text-[10px] font-bold">PDF</span>
        </Link>
        <Link href="/tools/merge-pdf" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          <Combine size={24} />
          <span className="text-[10px] font-bold">Merge</span>
        </Link>
        <Link href="/tools/watermark" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          <Type size={24} />
          <span className="text-[10px] font-bold">Mark</span>
        </Link>
        <Link href="/tools/compress" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          <Zap size={24} />
          <span className="text-[10px] font-bold">Shrink</span>
        </Link>
      </nav>
    </div>
  );
}
