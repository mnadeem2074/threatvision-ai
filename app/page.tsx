'use client';

import { useState, useEffect } from 'react';
import { Shield, TrendingUp, AlertTriangle, Clock, Eye, Copy, Check, Activity, Globe, PieChart, Server, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, AreaChart, Area, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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

  // Chart data
  const threatActivityData = [
    { time: '4 AM', threats: 120, active: 85 },
    { time: '8 AM', threats: 280, active: 190 },
    { time: '12 PM', threats: 450, active: 320 },
    { time: '4 PM', threats: 380, active: 270 },
    { time: '8 PM', threats: 210, active: 145 },
    { time: '12 AM', threats: 95, active: 65 },
    { time: '4 AM', threats: 75, active: 50 },
  ];

  const indicatorData = [
    { name: 'IP Address', value: 1200000, percentage: 50.0, color: '#ef4444' },
    { name: 'Domain', value: 850000, percentage: 35.4, color: '#3b82f6' },
    { name: 'Hash', value: 234000, percentage: 9.8, color: '#10b981' },
    { name: 'URL', value: 116000, percentage: 4.8, color: '#f59e0b' },
  ];

  const riskDistribution = [
    { level: 'Critical', count: 87, percentage: 3.6, color: '#ef4444' },
    { level: 'High', count: 545, percentage: 22.7, color: '#f97316' },
    { level: 'Medium', count: 1200, percentage: 50.0, color: '#eab308' },
    { level: 'Low', count: 567, percentage: 23.7, color: '#22c55e' },
  ];

  const stats = [
    { label: 'Total Threats', value: '2.4M+', change: '+12.5%', vs: 'vs last 24h', icon: TrendingUp, color: '#3b82f6' },
    { label: 'Active Threats', value: '1,247', change: '+8.2%', vs: 'vs last 24h', icon: AlertTriangle, color: '#ef4444' },
    { label: 'Data Sources', value: '5', change: '+2', vs: 'vs yesterday', icon: Database, color: '#8b5cf6' },
    { label: 'Response Time', value: '<200ms', change: '-15ms', vs: 'vs yesterday', icon: Clock, color: '#10b981' },
  ];

  const getRiskBadge = (level: string, score: number) => {
    const styles = {
      critical: 'bg-red-500/20 text-red-500 border-red-500/30',
      high: 'bg-orange-500/20 text-orange-500 border-orange-500/30',
      medium: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
      low: 'bg-green-500/20 text-green-500 border-green-500/30',
    };
    return styles[level as keyof typeof styles] || styles.low;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ip': return '🔴';
      case 'domain': return '🔵';
      case 'hash': return '🟡';
      default: return '⚪';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-[#1a1a2e] bg-[#0a0a0f]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ThreatVision AI</h1>
                <p className="text-xs text-gray-500">Threat Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a2e] rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Real-time threat monitoring and analysis</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[#12121a] rounded-xl p-5 border border-[#1a1a2e] hover:border-blue-500/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-2">
                {stat.change} {stat.vs}
              </div>
              <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Threat Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-[#12121a] rounded-xl p-6 border border-[#1a1a2e]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">Threat Activity</h3>
                <p className="text-xs text-gray-500 mt-1">Last 24 Hours</p>
              </div>
              <button className="text-blue-500 text-sm hover:text-blue-400 transition flex items-center gap-1">
                View full report <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={threatActivityData}>
                <defs>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#4a4a5a" fontSize={12} />
                <YAxis stroke="#4a4a5a" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #2d2d44', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="threats" stroke="#3b82f6" fill="url(#colorThreats)" strokeWidth={2} name="Total Threats" />
                <Area type="monotone" dataKey="active" stroke="#ef4444" fill="url(#colorActive)" strokeWidth={2} name="Active Threats" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-400">Total Threats</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-400">Active Threats</span>
              </div>
            </div>
          </div>

          {/* Risk Distribution */}
          <div className="bg-[#12121a] rounded-xl p-6 border border-[#1a1a2e]">
            <h3 className="text-white font-semibold mb-2">Risk Distribution</h3>
            <p className="text-xs text-gray-500 mb-4">By severity level</p>
            <div className="space-y-3">
              {riskDistribution.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{item.level}</span>
                    <span className="text-white">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-[#1a1a2e] rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Threat Lookup */}
        <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-xl p-6 border border-blue-500/20 mb-8">
          <h3 className="text-white font-semibold mb-2">Quick Threat Lookup</h3>
          <p className="text-sm text-gray-400 mb-4">Lookup IP, domain, URL, hash or other indicators</p>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter IP, domain, URL, hash, or indicator..."
              className="flex-1 px-4 py-3 bg-[#0a0a0f] border border-[#1a1a2e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition">
              Lookup
            </button>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="text-xs text-gray-500">Examples:</span>
            <code className="text-xs text-gray-400 bg-[#0a0a0f] px-2 py-1 rounded">8.8.8.8</code>
            <code className="text-xs text-gray-400 bg-[#0a0a0f] px-2 py-1 rounded">malware-domain.com</code>
            <code className="text-xs text-gray-400 bg-[#0a0a0f] px-2 py-1 rounded">d41d8cd98f00b204e9800998ecf8427e</code>
            <code className="text-xs text-gray-400 bg-[#0a0a0f] px-2 py-1 rounded">185.130.5.253</code>
          </div>
        </div>

        {/* Two Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Global Threat Map Placeholder */}
          <div className="bg-[#12121a] rounded-xl p-6 border border-[#1a1a2e]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">Global Threat Map</h3>
                <p className="text-xs text-gray-500 mt-1">Live threat detections around the world</p>
              </div>
              <button className="text-blue-500 text-sm hover:text-blue-400 transition flex items-center gap-1">
                View full map <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg h-48 flex items-center justify-center border border-[#1a1a2e]">
              <div className="text-center">
                <Globe className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Interactive threat map coming soon</p>
              </div>
            </div>
          </div>

          {/* Top Indicators */}
          <div className="bg-[#12121a] rounded-xl p-6 border border-[#1a1a2e]">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-blue-500" />
              <h3 className="text-white font-semibold">Top Indicators by Type</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">Distribution of detected indicators</p>
            <ResponsiveContainer width="100%" height={180}>
              <RePieChart>
                <Pie
                  data={indicatorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {indicatorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #2d2d44' }} />
              </RePieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {indicatorData.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-400">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium">{item.percentage}%</span>
                    <span className="text-gray-500 text-xs">{item.value.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Threats Table */}
        <div className="bg-[#12121a] rounded-xl border border-[#1a1a2e] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1a1a2e]">
            <h3 className="text-white font-semibold">Recent Threats</h3>
            <p className="text-xs text-gray-500 mt-1">Live threats detected in the last 24 hours</p>
          </div>
          
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading threats...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0f0f17] border-b border-[#1a1a2e]">
                  <tr className="text-left text-xs text-gray-500">
                    <th className="px-6 py-3 font-medium">INDICATOR</th>
                    <th className="px-6 py-3 font-medium">TYPE</th>
                    <th className="px-6 py-3 font-medium">RISK</th>
                    <th className="px-6 py-3 font-medium">REPORTS</th>
                    <th className="px-6 py-3 font-medium">LAST SEEN</th>
                    <th className="px-6 py-3 font-medium">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1a2e]">
                  {threats.map((threat) => (
                    <tr key={threat.indicator} className="hover:bg-[#0f0f17] transition">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{getTypeIcon(threat.type)}</span>
                          <span className="font-mono text-sm text-white">{threat.indicator}</span>
                          <button
                            onClick={() => copyToClipboard(threat.indicator)}
                            className="hover:bg-[#1a1a2e] p-1 rounded transition"
                          >
                            {copied === threat.indicator ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3 text-gray-500" />
                            )}
                          </button>
                        </div>
                        </td>
                      <td className="px-6 py-3">
                        <span className="text-xs text-gray-400">{threat.type.toUpperCase()}</span>
                        </td>
                      <td className="px-6 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskBadge(threat.riskLevel, threat.riskScore)}`}>
                          {threat.riskLevel.toUpperCase()} {Math.round(threat.riskScore)}%
                        </span>
                        </td>
                      <td className="px-6 py-3 text-sm text-gray-400">{threat.reports.toLocaleString()}</td>
                      <td className="px-6 py-3 text-sm text-gray-500">{new Date(threat.lastSeen).toLocaleString()}</td>
                      <td className="px-6 py-3">
                        <Link
                          href={`/lookup/${encodeURIComponent(threat.indicator)}?type=${threat.type}`}
                          className="text-blue-500 hover:text-blue-400 text-sm transition"
                        >
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

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#1a1a2e]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <span>Uptime: 99.98%</span>
            </div>
            <div className="text-center">
              <p>ThreatVision AI protects your digital world</p>
              <p className="text-xs mt-1">© 2026 ThreatVision AI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
