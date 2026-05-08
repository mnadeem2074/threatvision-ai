// components/SearchBar.tsx

'use client';

import { useState } from 'react';
import { Search, Shield, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'auto' | 'ip' | 'domain' | 'hash'>('auto');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const detectType = (input: string): 'ip' | 'domain' | 'hash' => {
    // IP regex
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (ipRegex.test(input)) return 'ip';
    
    // Hash regex (MD5: 32 chars, SHA1: 40, SHA256: 64)
    const hashRegex = /^[a-fA-F0-9]{32,64}$/;
    if (hashRegex.test(input)) return 'hash';
    
    return 'domain';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;
    
    setLoading(true);
    const detectedType = type === 'auto' ? detectType(query) : type;
    
    // Navigate to results page
    router.push(`/lookup/${encodeURIComponent(query)}?type=${detectedType}`);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search IP address, domain, or file hash..."
            className="w-full px-6 py-4 pl-14 pr-36 text-lg bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            disabled={loading}
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
        </div>
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
          {['auto', 'ip', 'domain', 'hash'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t as any)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                type === t
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="ml-2 px-6 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Scanning...
              </>
            ) : (
              'Lookup'
            )}
          </button>
        </div>
      </form>
      
      <div className="flex justify-center gap-6 mt-6 text-sm text-slate-500">
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
  );
}
