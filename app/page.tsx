'use client';

import { Shield, TrendingUp, Globe, Zap, AlertTriangle, Database, ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Threat {
  indicator: string;
  type: string;
  riskScore: number;
  riskLevel: string;
  lastSeen: string;
  reports: number;
}

export default function Home() {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThreats();
    const interval = setInterval(fetchThreats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchThreats = async () => {
    try {
      const response = await fetch('/api/threats');
      const data = await response.json();
      if (data.success) setThreats(data.data);
    } catch (error) {
      console.error('Failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-500 bg-red-500/10';
      case 'high': return 'text-orange-500 bg-orange-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      default: return 'text-green-500 bg-green-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-slate-300">Powered by AI & Real-time Threat Intel</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ThreatVision AI
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Enterprise-grade cyber threat intelligence platform. Analyze IPs, domains, and file hashes with advanced threat detection.
          </p>
          
          <div className="flex justify-center gap-6 text-sm text-slate-500 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Live Threat Feed</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Powered by VirusTotal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
            <div className="text-3xl font-bold text-white">2.4M+</div>
            <div className="text-sm text-slate-400">Threats Analyzed</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
            <div className="text-3xl font-bold text-white">1,247</div>
            <div className="text-sm text-slate-400">Active Threats</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
            <div className="text-3xl font-bold text-white">5</div>
            <div className="text-sm text-slate-400">Data Sources</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
            <div className="text-3xl font-bold text-white">&lt;200ms</div>
            <div className="text-sm text-slate-400">Response Time</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Why Choose ThreatVision AI?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Comprehensive threat intelligence from multiple sources, all in one powerful platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Analysis</h3>
            <p className="text-slate-400">Get instant threat scores and detailed analysis from multiple security vendors with AI-powered insights.</p>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Global Coverage</h3>
            <p className="text-slate-400">Access threat data from VirusTotal, AbuseIPDB, and 70+ antivirus engines worldwide.</p>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-slate-400">Cached responses deliver sub-200ms response times for instant threat assessment.</p>
          </div>
        </div>
      </div>

      {/* Live Threat Feed */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Live Threat Feed</h2>
            <p className="text-slate-400 text-sm">Recently detected threats from our intelligence network</p>
          </div>
          <Link href="/threats" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {loading ? (
          <div className="bg-slate-800/30 rounded-xl p-8 text-center text-slate-400">Loading threats...</div>
        ) : (
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 border-b border-slate-700">
                  <tr className="text-left text-sm text-slate-400">
                    <th className="px-6 py-3 font-medium">Indicator</th>
                    <th className="px-6 py-3 font-medium">Type</th>
                    <th className="px-6 py-3 font-medium">Risk Score</th>
                    <th className="px-6 py-3 font-medium">Reports</th>
                    <th className="px-6 py-3 font-medium">Last Seen</th>
                    <th className="px-6 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {threats.map((threat) => (
                    <tr key={threat.indicator} className="hover:bg-slate-800/30">
                      <td className="px-6 py-3 font-mono text-sm text-white">{threat.indicator}</td>
                      <td className="px-6 py-3">
                        <span className="text-xs text-slate-400">{threat.type}</span>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(threat.riskLevel)}`}>
                          {Math.round(threat.riskScore)}% - {threat.riskLevel.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-slate-400">{threat.reports}</td>
                      <td className="px-6 py-3 text-sm text-slate-500">{new Date(threat.lastSeen).toLocaleString()}</td>
                      <td className="px-6 py-3">
                        <Link href={`/lookup/${encodeURIComponent(threat.indicator)}?type=${threat.type}`} className="text-blue-400 hover:text-blue-300 text-sm">
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-slate-800/30 rounded-2xl p-8 text-center border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-3">Start Analyzing Threats Now</h2>
          <p className="text-slate-400 mb-4">Enter an IP, domain, or file hash above to get instant threat intelligence</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-500">
            <span className="px-3 py-1 bg-slate-800 rounded-full">IP: 8.8.8.8</span>
            <span className="px-3 py-1 bg-slate-800 rounded-full">Domain: example.com</span>
            <span className="px-3 py-1 bg-slate-800 rounded-full">Hash: MD5/SHA256</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>© 2026 ThreatVision AI. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="https://github.com/mnadeem2074/threatvision-ai" target="_blank" className="hover:text-blue-400">GitHub</a>
            <span>|</span>
            <span>Powered by VirusTotal</span>
            <span>|</span>
            <span>AbuseIPDB</span>
            <span>|</span>
            <span>IPinfo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
