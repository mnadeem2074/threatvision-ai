'use client';

import { Shield, Activity, AlertTriangle, Zap, TrendingUp, Globe, Database, Clock } from 'lucide-react';

const stats = [
  {
    title: 'Total Threats',
    value: '2.4M+',
    change: '+12.5%',
    icon: Activity,
    color: 'blue',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-400'
  },
  {
    title: 'Active Threats',
    value: '1,247',
    change: '+8.2%',
    icon: AlertTriangle,
    color: 'red',
    bgColor: 'bg-red-500/10',
    iconColor: 'text-red-400'
  },
  {
    title: 'Data Sources',
    value: '5',
    change: '+2',
    icon: Database,
    color: 'purple',
    bgColor: 'bg-purple-500/10',
    iconColor: 'text-purple-400'
  },
  {
    title: 'Response Time',
    value: '<200ms',
    change: '-15ms',
    icon: Zap,
    color: 'green',
    bgColor: 'bg-green-500/10',
    iconColor: 'text-green-400'
  },
  {
    title: 'Countries',
    value: '150+',
    change: '+12',
    icon: Globe,
    color: 'cyan',
    bgColor: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400'
  },
  {
    title: 'Uptime',
    value: '99.9%',
    change: '+0.1%',
    icon: Clock,
    color: 'emerald',
    bgColor: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400'
  }
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`${stat.bgColor} p-2 rounded-lg`}>
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
            <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
              {stat.change}
            </span>
          </div>
          <div className="text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-xs text-slate-500 mt-1">{stat.title}</div>
        </div>
      ))}
    </div>
  );
}
