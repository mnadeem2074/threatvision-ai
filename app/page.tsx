'use client';

import { TrendingUp, Globe, Zap, Shield, Activity, AlertTriangle, Database, ArrowRight, Sparkles, Lock, Cloud } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import ThreatTable from '@/components/ThreatTable';
import Header from '@/components/Header';
import AnimatedBackground from '@/components/AnimatedBackground';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Real-time Analysis',
      description: 'Get instant threat scores and detailed analysis from multiple security vendors with AI-powered insights.',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Access threat data from VirusTotal, AbuseIPDB, and 70+ antivirus engines worldwide in real-time.',
      gradient: 'from-purple-500 to-pink-400'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Cached responses and optimized API calls deliver sub-200ms response times for instant threat assessment.',
      gradient: 'from-yellow-500 to-orange-400'
    }
  ];

  const stats = [
    { icon: Activity, label: 'Threats Analyzed', value: '2.4M+', color: 'text-blue-400' },
    { icon: AlertTriangle, label: 'Active Threats', value: '1,247', color: 'text-red-400' },
    { icon: Database, label: 'Data Sources', value: '5', color: 'text-purple-400' },
    { icon: Zap, label: 'Response Time', value: '<200ms', color: 'text-yellow-400' }
  ];

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-slate-700">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">Powered by Advanced AI & Real-time Threat Intel</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">ThreatVision AI</span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Enterprise-grade cyber threat intelligence platform. Analyze IPs, domains, and file hashes with advanced threat detection and instant risk scoring.
            </p>
            
            <SearchBar />
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-30 hidden lg:block">
          <Shield className="w-16 h-16 text-blue-500" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-30 hidden lg:block">
          <Lock className="w-16 h-16 text-purple-500" />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-20 hidden lg:block">
          <Cloud className="w-12 h-12 text-cyan-400" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700">
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">Why Choose ThreatVision AI?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Comprehensive threat intelligence from multiple sources, all in one powerful platform</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 transform transition-all duration-300 group-hover:-translate-y-2 group-hover:border-blue-500">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-r ${feature.gradient} bg-opacity-20`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Threat Feed Section */}
      <section id="threat-feed" className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Live Threat Feed</h2>
              <p className="text-slate-400">Recently detected threats from our intelligence network</p>
            </div>
            <Link href="/threats" className="group flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg hover:border-blue-500 transition border border-slate-700">
              <span className="text-blue-400">View all</span>
              <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition" />
            </Link>
          </div>
          
          <ThreatTable />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-12 text-center border border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start Analyzing Threats Now</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">Enter an IP, domain, or file hash above to get instant threat intelligence</p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="px-4 py-2 bg-slate-800/50 rounded-full font-mono text-sm text-slate-300 border border-slate-700">IP: 8.8.8.8</div>
                <div className="px-4 py-2 bg-slate-800/50 rounded-full font-mono text-sm text-slate-300 border border-slate-700">Domain: example.com</div>
                <div className="px-4 py-2 bg-slate-800/50 rounded-full font-mono text-sm text-slate-300 border border-slate-700">Hash: MD5/SHA256</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-800 py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-slate-500">© 2026 ThreatVision AI. All rights reserved.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="https://github.com/mnadeem2074/threatvision-ai" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition">GitHub</a>
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
