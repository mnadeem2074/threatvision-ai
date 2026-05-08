'use client';

import { Shield, TrendingUp, AlertTriangle, Clock, Eye, Copy, Check } from 'lucide-react';
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
  const [copied, setCopied] = useState<string | null>(null);

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const stats = [
    { label: 'Total Threats', value: '2.4M+', change: '+12.5%', icon: TrendingUp, color: '#3b82f6' },
    { label: 'Active Threats', value: '1,247', change: '+8.2%', icon: AlertTriangle, color: '#ef4444' },
    { label: 'Data Sources', value: '5', change: '+2', icon: Shield, color: '#8b5cf6' },
    { label: 'Response Time', value: '<200ms', change: '-15ms', icon: Clock, color: '#10b981' },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-400 bg-red-400/10';
      case 'high': return 'text-orange-400 bg-orange-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-green-400 bg-green-400/10';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ip': return 'bg-blue-400/10 text-blue-400';
      case 'domain': return 'bg-purple-400/10 text-purple-400';
      default: return 'bg-emerald-400/10 text-emerald-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      {/* Top Bar */}
      <div className="border-b border-[#1a1a2e] bg-[#0f0f1a]/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-500" />
              <div>
                <h1 className="text-xl font-semibold text-white">ThreatVision AI</h1>
                <p className="text-xs text-gray-500">Threat Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Real-time threat monitoring and analysis</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[#1a1a2e] rounded-xl p-5 border border-[#2d2d44] hover:border-blue-500/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search Section */}
        <div className="bg-[#1a1a2e] rounded-xl p-6 border border-[#2d2d44] mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Threat Lookup</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter IP, domain, or file hash..."
              className="flex-1 px-4 py-2.5 bg-[#0f0f1a] border border-[#2d2d44] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition">
              Lookup
            </button>
          </div>
          <div className="flex gap-3 mt-3">
            <span className="text-xs text-gray-500">Examples:</span>
            <code className="text-xs text-gray-400 bg-[#0f0f1a] px-2 py-0.5 rounded">8.8.8.8</code>
            <code className="text-xs text-gray-400 bg-[#0f0f1a] px-2 py-0.5 rounded">google.com</code>
            <code className="text-xs text-gray-400 bg-[#0f0f1a] px-2 py-0.5 rounded">d41d8cd98f00b204e9800998ecf8427e</code>
          </div>
        </div>

        {/* Threats Table */}
        <div className="bg-[#1a1a2e] rounded-xl border border-[#2d2d44] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#2d2d44]">
            <h2 className="text-lg font-semibold text-white">Recent Threats</h2>
            <p className="text-xs text-gray-500 mt-1">Live threats detected in the last 24 hours</p>
          </div>
          
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading threats...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#15152a] border-b border-[#2d2d44]">
                  <tr className="text-left text-xs text-gray-500">
                    <th className="px-6 py-3 font-medium">INDICATOR</th>
                    <th className="px-6 py-3 font-medium">TYPE</th>
                    <th className="px-6 py-3 font-medium">RISK</th>
                    <th className="px-6 py-3 font-medium">REPORTS</th>
                    <th className="px-6 py-3 font-medium">LAST SEEN</th>
                    <th className="px-6 py-3 font-medium">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2d2d44]">
                  {threats.map((threat) => (
                    <tr key={threat.indicator} className="hover:bg-[#15152a] transition">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-white">{threat.indicator}</span>
                          <button
                            onClick={() => copyToClipboard(threat.indicator)}
                            className="opacity-0 group-hover:opacity-100 transition"
                          >
                            {copied === threat.indicator ? (
                              <Check className="w-3 h-3 text-green-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-gray-500 hover:text-gray-300" />
                            )}
                          </button>
                        </div>
                       </td>
                      <td className="px-6 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(threat.type)}`}>
                          {threat.type.toUpperCase()}
                        </span>
                       </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRiskColor(threat.riskLevel)}`}>
                            {threat.riskLevel.toUpperCase()} {Math.round(threat.riskScore)}%
                          </span>
                        </div>
                       </td>
                      <td className="px-6 py-3 text-sm text-gray-400">{threat.reports.toLocaleString()}</td>
                      <td className="px-6 py-3 text-sm text-gray-500">{new Date(threat.lastSeen).toLocaleString()}</td>
                      <td className="px-6 py-3">
                        <Link
                          href={`/lookup/${encodeURIComponent(threat.indicator)}?type=${threat.type}`}
                          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Details
                        </Link>
                       </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
