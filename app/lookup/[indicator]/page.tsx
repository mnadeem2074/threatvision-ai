'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, AlertTriangle, Globe, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import RiskGauge from '@/components/RiskGauge';
import type { ThreatIntel } from '@/types';

export default function LookupPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const indicator = params.indicator as string;
  const type = searchParams.get('type') as 'ip' | 'domain' | 'hash' || 'auto';
  
  const [data, setData] = useState<ThreatIntel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const lookupThreat = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/lookup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ indicator, type })
        });
        
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || 'Failed to lookup indicator');
        }
      } catch (err) {
        setError('Network error. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    lookupThreat();
  }, [indicator, type]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Analyzing threat intelligence...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Lookup Failed</h1>
          <p className="text-slate-400 mb-6">{error || 'Unable to fetch threat intelligence'}</p>
          <Link href="/" className="text-blue-400 hover:text-blue-300 flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Link>
          
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div>
                <div className={`px-3 py-1 rounded-lg text-sm font-mono inline-block ${
                  data.type === 'ip' ? 'bg-blue-500/20 text-blue-400' :
                  data.type === 'domain' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {data.type.toUpperCase()}
                </div>
                <h1 className="text-2xl md:text-3xl font-mono font-bold text-white break-all mt-3">
                  {data.indicator}
                </h1>
                <div className="flex items-center gap-2 mt-2 text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Last analyzed: {new Date(data.lastSeen).toLocaleString()}</span>
                </div>
              </div>
              
              <RiskGauge score={data.riskScore} level={data.riskLevel} size="lg" />
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Threat Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Risk Level</span>
                <span className={`font-semibold ${
                  data.riskLevel === 'critical' ? 'text-red-400' :
                  data.riskLevel === 'high' ? 'text-orange-400' :
                  data.riskLevel === 'medium' ? 'text-yellow-400' :
                  'text-green-400'
                }`}>
                  {data.riskLevel.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Confidence Score</span>
                <span className="font-mono">{Math.round(data.riskScore)}/100</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Total Reports</span>
                <span>{data.reports.toLocaleString()}</span>
              </div>
              {data.location && data.location.city !== 'Unknown' && (
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span className="text-slate-400">Location</span>
                  <span>{data.location.city}, {data.location.country}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-400" />
              Intelligence Sources
            </h3>
            <div className="space-y-3">
              {data.sources.length === 0 ? (
                <p className="text-slate-400 text-center py-4">No threat data available from sources</p>
              ) : (
                data.sources.map((source, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
                    {source.malicious ? (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{source.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          source.malicious ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                        }`}>
                          {source.malicious ? 'Malicious' : 'Clean'} ({Math.round(source.confidence)}%)
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">{source.details}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
