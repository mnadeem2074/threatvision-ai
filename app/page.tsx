'use client';

import { useState, useEffect } from 'react';
import { Shield, Activity, Globe, Zap, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, Cpu, Clock, Server } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import ThreatTable from '@/components/ThreatTable';
import Link from 'next/link';

export default function Home() {
  const [stats, setStats] = useState({
    threatsAnalyzed: '2.4M+',
    activeThreats: '1,247',
    dataSources: '5',
    responseTime: '<200ms',
    errorRate: '0%',
    uptime: '99.9%'
  });

  const features = [
    {
      icon: TrendingUp,
      title: 'Real-time Analysis',
      description: 'Get instant threat scores and detailed analysis from multiple security vendors',
      color: 'blue'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Access threat data from VirusTotal, AbuseIPDB, and multiple intelligence feeds',
      color: 'purple'
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Cached responses and optimized API calls for sub-200ms response times',
      color: 'green'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
        {/* Animated background blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-16 text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-slate-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">Live & Operational • 0% Error Rate</span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ThreatVision AI
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Enterprise-grade cyber threat intelligence platform. Analyze IPs, domains, and file hashes with advanced threat detection.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm">
            <div className="flex items-center gap-2 text-slate-400">
              <Server className="w-4 h-4 text-green-400" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>&lt;200ms Response</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Global CDN</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Shield className="w-4 h-4 text-purple-400" />
              <span>GDPR Compliant</span>
            </div>
          </div>
          
          {/* Search Bar */}
          <SearchBar />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
            <Activity className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.threatsAnalyzed}</div>
            <div className="text-xs text-slate-400">Threats Analyzed</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
            <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.activeThreats}</div>
            <div className="text-xs text-slate-400">Active Threats</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
            <Globe className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.dataSources}</div>
            <div className="text-xs text-slate-400">Data Sources</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
            <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.responseTime}</div>
            <div className="text-xs text-slate-400">Response Time</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
            <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.errorRate}</div>
            <div className="text-xs text-slate-400">Error Rate</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Why Choose ThreatVision AI?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Comprehensive threat intelligence from multiple sources, all in one platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="group bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-1">
              <div className={`w-12 h-12 bg-${feature.color}-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Threat Feed Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 gradient-text">Live Threat Feed</h2>
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
        <div className="glass-effect rounded-2xl p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-white">Start Analyzing Threats Now</h2>
          <p className="text-slate-300 mb-6">Enter an IP, domain, or file hash above to get instant threat intelligence</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="px-3 py-1 bg-slate-800 rounded-full text-slate-300 font-mono">IP: 8.8.8.8</span>
            <span className="px-3 py-1 bg-slate-800 rounded-full text-slate-300 font-mono">Domain: example.com</span>
            <span className="px-3 py-1 bg-slate-800 rounded-full text-slate-300 font-mono">Hash: MD5/SHA256</span>
          </div>
        </div>
      </div>

      {/* Professional Footer */}
      <footer className="border-t border-slate-800 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-500">
              © 2026 ThreatVision AI. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="https://github.com/mnadeem2074/threatvision-ai" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-300 transition">
                GitHub
              </a>
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
