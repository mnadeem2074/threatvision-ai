'use client';

import { TrendingUp, Globe, Zap } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import ThreatTable from '@/components/ThreatTable';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="bg-slate-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-white mb-6">ThreatVision AI</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Enterprise-grade cyber threat intelligence platform.
          </p>
          <SearchBar />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">2.4M+</div>
              <div className="text-slate-400">Threats Analyzed</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-slate-400">Active Threats</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">5</div>
              <div className="text-slate-400">Data Sources</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">&lt;200ms</div>
              <div className="text-slate-400">Response Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose ThreatVision AI?</h2>
            <p className="text-slate-400">Comprehensive threat intelligence from multiple sources</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-time Analysis</h3>
              <p className="text-slate-400">Get instant threat scores from multiple security vendors</p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Global Coverage</h3>
              <p className="text-slate-400">Access threat data from VirusTotal, AbuseIPDB, and more</p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Fast & Reliable</h3>
              <p className="text-slate-400">Cached responses for sub-200ms response times</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Threat Feed */}
      <div className="bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-2">Live Threat Feed</h2>
          <p className="text-slate-400 mb-8">Recently detected threats from our intelligence network</p>
          <ThreatTable />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-slate-800 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Start Analyzing Threats Now</h2>
            <p className="text-slate-300">Enter an IP, domain, or file hash above to get instant threat intelligence</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>© 2026 ThreatVision AI. All rights reserved.</p>
          <a href="https://github.com/mnadeem2074/threatvision-ai" className="text-blue-400 hover:underline">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
