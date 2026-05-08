// app/page.tsx

'use client';

import { useState } from 'react';
import { Shield, Activity, Globe, Zap, ArrowRight, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import ThreatTable from '@/components/ThreatTable';
import Link from 'next/link';

export default function Home() {
  const [showDemo, setShowDemo] = useState(true);

  const stats = [
    { label: 'Threats Analyzed', value: '2.4M+', icon: Activity, color: 'blue' },
    { label: 'Active Threats', value: '1,247', icon: AlertTriangle, color: 'red' },
    { label: 'Data Sources', value: '5', icon: Globe, color: 'purple' },
    { label: 'Response Time', value: '<200ms', icon: Zap, color: 'green' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-slate-700">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">Powered by AI & Real-time Threat Intel</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                ThreatVision AI
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Real-time cyber threat intelligence platform. Analyze IPs, domains, and file hashes with advanced threat detection.
            </p>
          </div>
          
          {/* Search Bar */}
          <SearchBar />
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
                <stat.icon className={`w-6 h-6 mx-auto mb-2 text-${stat.color}-400`} />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose ThreatVision AI?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Comprehensive threat intelligence from multiple sources, all in one platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Analysis</h3>
            <p className="text-slate-400">Get instant threat scores and detailed analysis from multiple security vendors</p>
          </div>
          
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
            <p className="text-slate-400">Access threat data from VirusTotal, AbuseIPDB, and multiple intelligence feeds</p>
          </div>
          
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-green-500/50 transition-all">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
            <p className="text-slate-400">Cached responses and optimized API calls for sub-200ms response times</p>
          </div>
        </div>
      </div>
      
      {/* Live Threats Feed */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Live Threat Feed</h2>
            <p className="text-slate-400">Recently detected threats from our intelligence network</p>
          </div>
          <Link href="/threats" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <ThreatTable />
      </div>
      
      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 text-center border border-blue-500/30">
          <h2 className="text-2xl font-bold mb-4">Start Analyzing Threats Now</h2>
          <p className="text-slate-300 mb-6">Enter an IP, domain, or file hash above to get instant threat intelligence</p>
          <div className="flex justify-center gap-3 text-sm text-slate-400">
            <span className="px-3 py-1 bg-slate-800 rounded">IP: 8.8.8.8</span>
            <span className="px-3 py-1 bg-slate-800 rounded">Domain: example.com</span>
            <span className="px-3 py-1 bg-slate-800 rounded">Hash: MD5/SHA256</span>
          </div>
        </div>
      </div>
    </div>
  );
}
