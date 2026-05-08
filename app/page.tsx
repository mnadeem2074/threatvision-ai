'use client';

import { Shield, Activity, Globe, Zap, TrendingUp, AlertTriangle, ArrowRight, Database } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import ThreatTable from '@/components/ThreatTable';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">Live & Operational</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ThreatVision AI
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Enterprise-grade cyber threat intelligence platform.
          </p>
          
          <SearchBar />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">2.4M+</div>
            <div className="text-xs text-slate-400">Threats Analyzed</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">1,247</div>
            <div className="text-xs text-slate-400">Active Threats</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">5</div>
            <div className="text-xs text-slate-400">Data Sources</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">&lt;200ms</div>
            <div className="text-xs text-slate-400">Response Time</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">Why Choose ThreatVision AI?</h2>
          <p className="text-slate-400">Comprehensive threat intelligence from multiple sources</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Real-time Analysis</h3>
            <p className="text-slate-400">Get instant threat scores from multiple security vendors</p>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Global Coverage</h3>
            <p className="text-slate-400">Access threat data from VirusTotal, AbuseIPDB, and more</p>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Fast & Reliable</h3>
            <p className="text-slate-400">Cached responses for sub-200ms response times</p>
          </div>
        </div>
      </div>

      {/* Live Threat Feed */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Live Threat Feed</h2>
            <p className="text-slate-400">Recently detected threats from our intelligence network</p>
          </div>
        </div>
        <ThreatTable />
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-slate-800/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Start Analyzing Threats Now</h2>
          <p className="text-slate-300">Enter an IP, domain, or file hash above to get instant threat intelligence</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>© 2026 ThreatVision AI. All rights reserved. | Powered by VirusTotal | AbuseIPDB | IPinfo</p>
          <a href="https://github.com/mnadeem2074/threatvision-ai" className="text-blue-400 hover:underline">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
