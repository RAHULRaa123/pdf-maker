
"use client"

import Link from 'next/link';
import { FileText, Github, Twitter, Mail, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 pt-16 pb-24 md:pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4 col-span-1 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <FileText className="text-primary-foreground" size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight">PDF Maker</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The world's fastest, most secure browser-based document toolkit. 
              No uploads. No cloud. Total privacy.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </Link>
              <Link href="mailto:support@pdfmaker.app" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground text-sm transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Our Mission</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Security</h4>
            <div className="bg-secondary/50 p-4 rounded-2xl space-y-2">
               <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase">
                 <Shield size={14} /> Encrypted
               </div>
               <p className="text-[10px] text-muted-foreground leading-tight">
                 Your documents never leave your device. All processing happens locally within your browser context.
               </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs font-medium">
            &copy; 2026 PDF Maker. Built for productivity and privacy.
          </p>
          <div className="flex gap-6">
            <span className="text-[10px] font-bold uppercase text-muted-foreground/50 tracking-[0.2em]">Open Source</span>
            <span className="text-[10px] font-bold uppercase text-muted-foreground/50 tracking-[0.2em]">V1.0.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
