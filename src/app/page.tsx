
import Link from 'next/link';
import { 
  FileImage, 
  Combine, 
  Zap, 
  Maximize, 
  Scissors, 
  ArrowRight 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';

const tools = [
  {
    id: 'image-to-pdf',
    title: 'Image-to-PDF',
    description: 'Bundle multiple images into a high-quality PDF document.',
    icon: FileImage,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/30',
    href: '/tools/image-to-pdf'
  },
  {
    id: 'merge-pdf',
    title: 'Smart Merger',
    description: 'Combine multiple PDF files into one organized document.',
    icon: Combine,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/30',
    href: '/tools/merge-pdf'
  },
  {
    id: 'compress',
    title: 'Smart Compression',
    description: 'AI-powered reduction preserving visual fidelity.',
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/30',
    href: '/tools/compress'
  },
  {
    id: 'resize',
    title: 'Precision Resizer',
    description: 'Scale and crop images to specific dimensions.',
    icon: Maximize,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/30',
    href: '/tools/resize'
  },
  {
    id: 'decompose',
    title: 'PDF Decomposition',
    description: 'Convert PDF pages back into high-res images.',
    icon: Scissors,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/30',
    href: '/tools/decompose'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <header className="px-6 py-12 text-center relative">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight mb-4">
          DocuPix
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          The all-in-one productivity suite for your document and image processing needs.
        </p>
      </header>

      <main className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.id} href={tool.href} className="group transition-transform hover:-translate-y-1 duration-300">
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow tool-card-gradient overflow-hidden bg-card">
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <div className={`p-3 rounded-xl ${tool.bgColor} ${tool.color}`}>
                    <tool.icon size={28} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-headline group-hover:text-accent transition-colors">
                      {tool.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground mb-4">
                    {tool.description}
                  </CardDescription>
                  <div className="flex items-center text-sm font-semibold text-accent group-hover:translate-x-1 transition-transform">
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border p-4 text-center md:hidden">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center gap-1 text-primary">
            <div className="p-1 rounded-lg bg-secondary text-accent">
               <FileImage size={20} />
            </div>
            <span className="text-[10px] font-bold">Tools</span>
          </Link>
          <div className="text-muted-foreground text-[10px] font-medium">DocuPix v1.1</div>
        </div>
      </footer>
    </div>
  );
}
