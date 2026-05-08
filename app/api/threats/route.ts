// app/api/threats/route.ts

import { NextResponse } from 'next/server';
import { RecentThreat } from '@/types';

// Sample threats for demonstration (when APIs aren't configured)
const sampleThreats: RecentThreat[] = [
  { indicator: '185.130.5.253', type: 'ip', riskScore: 87, riskLevel: 'critical', lastSeen: new Date().toISOString(), reports: 234 },
  { indicator: 'malware-domain.com', type: 'domain', riskScore: 92, riskLevel: 'critical', lastSeen: new Date().toISOString(), reports: 567 },
  { indicator: '94.102.61.78', type: 'ip', riskScore: 76, riskLevel: 'high', lastSeen: new Date(Date.now() - 3600000).toISOString(), reports: 89 },
  { indicator: 'd41d8cd98f00b204e9800998ecf8427e', type: 'hash', riskScore: 45, riskLevel: 'medium', lastSeen: new Date(Date.now() - 7200000).toISOString(), reports: 12 },
  { indicator: '45.227.254.3', type: 'ip', riskScore: 68, riskLevel: 'high', lastSeen: new Date(Date.now() - 10800000).toISOString(), reports: 45 },
  { indicator: 'suspicious-site.net', type: 'domain', riskScore: 53, riskLevel: 'medium', lastSeen: new Date(Date.now() - 14400000).toISOString(), reports: 28 },
];

export async function GET() {
  // Return sample threats or real ones if you have a database
  return NextResponse.json({
    success: true,
    data: sampleThreats,
    cached: false
  });
}
