'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Copy, Check, Eye } from 'lucide-react';
import Link from 'next/link';

interface Threat {
  indicator: string;
  type: string;
  riskScore: number;
  riskLevel: string;
  lastSeen: string;
  reports: number;
}

export default function ModernThreatTable() {
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
      console.error('Failed to fetch threats:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const getRiskBadge = (level: string, score: number) => {
    switch (level) {
      case 'critical':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">CRITICAL</span>;
      case 'high':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">HIGH</span>;
      case 'medium':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">MEDIUM</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">LOW</span>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      ip: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      domain: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      hash: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    };
    return colors[type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  if (loading) {
    return (
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 p-12 text-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 bg-slate-700 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-slate-700 rounded w-32 mx-auto"></div>
        </div>
        <p className="text-slate-500 mt-4">Loading threats...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800/50">
              <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Indicator</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Risk Score</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Reports</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Last Seen</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {threats.map((threat) => (
              <tr key={threat.indicator} className="hover:bg-slate-800/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-white">{threat.indicator}</span>
                    <button
                      onClick={() => copyToClipboard(threat.indicator)}
                      className="opacity-0 group-hover:opacity-100 transition"
                    >
                      {copied === threat.indicator ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-500 hover:text-slate-300" />
                      )}
                    </button>
                  </div>
                 </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getTypeBadge(threat.type)}`}>
                    {threat.type.toUpperCase()}
                  </span>
                 </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getRiskBadge(threat.riskLevel, threat.riskScore)}
                    <span className="text-sm font-mono text-white">{Math.round(threat.riskScore)}%</span>
                  </div>
                 </td>
                <td className="px-6 py-4 text-sm text-slate-400">{threat.reports.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{new Date(threat.lastSeen).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/lookup/${encodeURIComponent(threat.indicator)}?type=${threat.type}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white text-sm transition"
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
    </div>
  );
}
