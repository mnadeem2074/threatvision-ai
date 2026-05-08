'use client';

import { Shield, Github, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition"></div>
              <Shield className="w-8 h-8 text-blue-400 relative z-10" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ThreatVision AI</h1>
              <p className="text-xs text-slate-400">Cyber Threat Intelligence</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
            <a href="#threat-feed" className="text-slate-300 hover:text-white transition">Threat Feed</a>
            <a href="https://github.com/mnadeem2074/threatvision-ai" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition flex items-center gap-2">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-slate-700">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
              <a href="#threat-feed" className="text-slate-300 hover:text-white transition">Threat Feed</a>
              <a href="https://github.com/mnadeem2074/threatvision-ai" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition flex items-center gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
