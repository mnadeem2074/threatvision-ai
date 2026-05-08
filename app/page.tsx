'use client';

import { Search, Bell, Settings, User, Shield } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import StatsCards from '@/components/StatsCards';
import ModernThreatTable from '@/components/ModernThreatTable';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search threats, IPs, domains..."
                  className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-80"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                <Bell className="w-5 h-5 text-slate-400" />
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                <Settings className="w-5 h-5 text-slate-400" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-white">Security Team</p>
                  <p className="text-xs text-slate-500">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Threat Intelligence Dashboard</h1>
            <p className="text-slate-400 mt-1">Real-time monitoring and threat analysis</p>
          </div>

          {/* Quick Search */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl p-6 border border-blue-500/20">
              <h2 className="text-lg font-semibold text-white mb-3">Quick Threat Lookup</h2>
              <SearchBar />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mb-8">
            <StatsCards />
          </div>

          {/* Recent Threats Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-white">Recent Threats</h2>
                <p className="text-sm text-slate-500">Live threats detected in the last 24 hours</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-slate-400">Live Feed</span>
                </div>
              </div>
            </div>
            <ModernThreatTable />
          </div>
        </div>
      </main>
    </div>
  );
}
