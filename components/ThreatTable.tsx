// components/ThreatTable.tsx

'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Copy, Check, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Threat {
  indicator: string;
  type: string;
  riskScore: number;
  riskLevel: string;
  lastSeen: string;
  reports: number;
}

export default function ThreatTable() {
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
      if (data.success) {
        setThreats(data.data);
      }
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
    const styles = {
      low: 'bg-green-500/20 text-green-400 border-green-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      critical: 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse'
    };
    return styles[level as keyof typeof styles] || styles.low;
  };

  if (loading) {
    return (
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-8 text-center">
          <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2 animate-pulse" />
          <p className="text-slate-400">Loading threat feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800/80 border-b border-slate-700">
            <tr className="text-left text-slate-400 text-sm">
              <th className="px-6 py-4 font-medium">Indicator</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Risk Score</th>
              <th className="px-6 py-4 font-medium">Reports</th>
              <th className="px-6 py-4 font-medium">Last Seen</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {threats.map((threat) => (
              <tr key={threat.indicator} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-white">
                  {threat.indicator.length > 40 ? threat.indicator.substring(0, 40) + '...' : threat.indicator}
                 </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs font-mono text-slate-300">
                    {threat.type}
                  </span>
                 </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskBadge(threat.riskLevel, threat.riskScore)}`}>
                    {Math.round(threat.riskScore)}% - {threat.riskLevel.toUpperCase()}
                  </span>
                 </td>
                <td className="px-6 py-4 text-slate-300">
                  {threat.reports.toLocaleString()}
                 </td>
                <td className="px-6 py-4 text-slate-400 text-sm">
                  {new Date(threat.lastSeen).toLocaleString()}
                 </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(threat.indicator)}
                      className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
                      title="Copy indicator"
                    >
                      {copied === threat.indicator ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    <Link
                      href={`/lookup/${encodeURIComponent(threat.indicator)}?type=${threat.type}`}
                      className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
                      title="View details"
                    >
                      <ExternalLink className="w-4 h-4 text-slate-400 hover:text-blue-400 transition-colors" />
                    </Link>
                  </div>
                 </td>
               </tr>
            ))}
          </tbody>
         </table>
      </div>
    </div>
  );
}
