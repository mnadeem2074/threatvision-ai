'use client';

import { Shield, Activity, AlertTriangle, Database, Zap, Settings, HelpCircle, BarChart3, Globe, Clock } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/' },
  { icon: Activity, label: 'Threat Feed', href: '/threats' },
  { icon: AlertTriangle, label: 'Alerts', href: '/alerts' },
  { icon: Database, label: 'Data Sources', href: '/sources' },
  { icon: Globe, label: 'Global Map', href: '/map' },
  { icon: Clock, label: 'History', href: '/history' },
];

const bottomItems = [
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help', href: '/help' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900/95 border-r border-slate-800 backdrop-blur-sm z-50">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className="font-bold text-lg text-white">ThreatVision</h1>
              <p className="text-xs text-slate-500">AI Security</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-500/10 text-blue-400 border-l-2 border-blue-500'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Menu */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          {bottomItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-white transition-all"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
