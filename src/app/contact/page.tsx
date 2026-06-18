"use client"

import { FileText, Mail, MessageSquare, Send, MapPin, Globe } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Received",
      description: "Thanks for reaching out. We will review your message as soon as possible.",
    });
  };

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

      <main className="container mx-auto px-6 max-w-7xl py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                Contact <span className="text-primary">PDF Maker</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                Have a question, suggestion, feedback, or issue related to PDF Maker?
                You can contact us using the details below or by using the contact form.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-center">
                <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Email</h4>
                  <p className="text-muted-foreground">raa426243@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-6 items-center">
                <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Platform</h4>
                  <p className="text-muted-foreground">Online Document Processing Platform</p>
                </div>
              </div>

              <div className="flex gap-6 items-center">
                <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                  <Globe size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Availability</h4>
                  <p className="text-muted-foreground">Available worldwide through modern web browsers.</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-3xl border border-border/50 shadow-sm space-y-3">
              <h2 className="text-2xl font-bold">Support Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                PDF Maker is built to help users manage PDF and image files online.
                If you notice a tool issue, broken link, file processing problem, or content error,
                please share the details so we can improve the platform.
              </p>
            </div>
          </div>

          <div className="bg-card p-8 md:p-12 rounded-[3rem] border border-border/50 shadow-2xl relative">
            <div className="absolute -top-6 -right-6 bg-accent p-6 rounded-3xl text-accent-foreground shadow-xl animate-float">
              <MessageSquare size={32} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="Enter your name" required className="h-12 rounded-xl bg-secondary/30" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email address" required className="h-12 rounded-xl bg-secondary/30" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Write your message here..." required className="min-h-[150px] rounded-2xl bg-secondary/30" />
              </div>

              <Button type="submit" className="w-full h-14 rounded-xl text-lg font-bold">
                <Send size={20} className="mr-2" /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
