'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import ThreatTable from '@/components/ThreatTable';

export default function ThreatsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar />
      
      <main className="ml-64">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="p-2 hover:bg-slate-800 rounded-lg transition">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">All Threats</h1>
              <p className="text-slate-400 mt-1">Complete list of detected threats</p>
            </div>
          </div>
          
          <ThreatTable />
        </div>
      </main>
    </div>
  );
}
