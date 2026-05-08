'use client';

import { Shield, Activity, Globe, Zap, TrendingUp, AlertTriangle, ArrowRight, Database } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import ThreatTable from '@/components/ThreatTable';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Real-time Analysis',
      description: 'Get instant threat scores and detailed analysis from multiple security vendors',
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-400'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Access threat data from VirusTotal, AbuseIPDB, and multiple intelligence feeds',
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-400'
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Cached responses and optimized API calls for sub-200ms response times',
      bgColor: 'bg-green-500/10',
      iconColor: 'text-green-400'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-slate-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">Live & Operational • 0% Error Rate</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ThreatVision AI
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Enterprise-grade cyber threat intelligence platform. Analyze IPs, domains, and file hashes with advanced threat detection.
          </p>
          
          <SearchBar />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
            <Activity className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">2.4M+</div>
            <div className="text-xs text-slate-400">Threats Analyzed</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
            <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">1,247</div>
            <div className="text-xs text-slate-400">Active Threats</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
            <Database className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">5</div>
            <div className="text-xs text-slate-400">Data Sources</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
            <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">&lt;200ms</div>
            <div className="text-xs text-slate-400">Response Time</div>
          </div>
        </div>
      </div>

      {/* Features Section - PROFESSIONAL CARDS */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Why Choose ThreatVision AI?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Comprehensive threat intelligence from multiple sources, all in one platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Real-time Analysis</h3>
            <p className="text-slate-400">Get instant threat scores and detailed analysis from multiple security vendors</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Global Coverage</h3>
            <p className="text-slate-400">Access threat data from VirusTotal, AbuseIPDB, and multiple intelligence feeds</p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-green-500 transition-all duration-300">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Fast & Reliable</h3>
            <p className="text-slate-400">Cached responses and optimized API calls for sub-200ms response times</p>
          </div>
        </div>
      </div>

      {/* Live Threat Feed */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Live Threat Feed
            </h2>
            <p className="text-slate-400">Recently detected threats from our intelligence network</p>
          </div>
          <Link href="/threats" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <ThreatTable />
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-blue-500/30">
          <h2 className="text-2xl font-bold mb-4 text-white">Start Analyzing Threats Now</h2>
          <p className="text-slate-300 mb-6">Enter an IP, domain, or file hash above to get instant threat intelligence</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="px-3 py-1 bg-slate-800 rounded-full text-slate-300 font-mono border border-slate-700">IP: 8.8.8.8</span>
            <span className="px-3 py-1 bg-slate-800 rounded-full text-slate-300 font-mono border border-slate-700">Domain: example.com</span>
            <span className="px-3 py-1 bg-slate-800 rounded-full text-slate-300 font-mono border border-slate-700">Hash: MD5/SHA256</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-500">© 2026 ThreatVision AI. All rights reserved.</div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="https://github.com/mnadeem2074/threatvision-ai" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-300 transition">GitHub</a>
              <span className="text-slate-600">|</span>
              <span className="text-slate-500">Powered by VirusTotal</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-500">AbuseIPDB</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-500">IPinfo</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
