// app/api/lookup/route.ts

import { NextRequest, NextResponse } from 'next/server';
import cache, { CACHE_TTL } from '@/lib/redis';
import { checkVirusTotal } from '@/lib/apis/virustotal';
import { checkAbuseIPDB } from '@/lib/apis/abuseipdb';
import { getIpGeolocation } from '@/lib/apis/ipinfo';
import { ThreatIntel } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { indicator, type } = body;
    
    if (!indicator || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing indicator or type' },
        { status: 400 }
      );
    }
    
    console.log(`🔍 Looking up ${type}: ${indicator}`);
    
    // Check cache first
    const cacheKey = `threat:${type}:${indicator.toLowerCase()}`;
    const cached = await cache.get(cacheKey);
    
    if (cached) {
      console.log(`📦 Cache hit for ${indicator}`);
      return NextResponse.json({ success: true, data: cached, cached: true });
    }
    
    console.log(`🔄 Cache miss for ${indicator}, fetching from APIs...`);
    
    // Fetch from available sources
    let vtResult = null;
    let abuseResult = null;
    let geoResult = null;
    
    if (type === 'ip') {
      // Parallel fetching for IP lookups
      const results = await Promise.allSettled([
        checkVirusTotal(indicator, 'ip'),
        checkAbuseIPDB(indicator),
        getIpGeolocation(indicator)
      ]);
      
      vtResult = results[0].status === 'fulfilled' ? results[0].value : null;
      abuseResult = results[1].status === 'fulfilled' ? results[1].value : null;
      geoResult = results[2].status === 'fulfilled' ? results[2].value : null;
    } else if (type === 'domain') {
      vtResult = await checkVirusTotal(indicator, 'domain');
    } else if (type === 'hash') {
      vtResult = await checkVirusTotal(indicator, 'hash');
    }
    
    // Calculate final risk score (0-100)
    let riskScore = 0;
    let weightSum = 0;
    const sources = [];
    
    if (vtResult) {
      const vtWeight = 0.6;
      riskScore += vtResult.riskScore * vtWeight;
      weightSum += vtWeight;
      sources.push({
        name: 'VirusTotal',
        malicious: vtResult.malicious > 0,
        confidence: vtResult.riskScore,
        details: `${vtResult.malicious} out of ${vtResult.total} engines detected threats`
      });
    }
    
    if (abuseResult) {
      const abuseWeight = 0.4;
      riskScore += abuseResult.abuseConfidenceScore * abuseWeight;
      weightSum += abuseWeight;
      sources.push({
        name: 'AbuseIPDB',
        malicious: abuseResult.abuseConfidenceScore > 25,
        confidence: abuseResult.abuseConfidenceScore,
        details: `${abuseResult.totalReports} reports from ${abuseResult.usageType}`
      });
    }
    
    // Normalize score if we have no sources
    const finalScore = weightSum > 0 ? riskScore / weightSum : 0;
    
    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
    if (finalScore >= 75) riskLevel = 'critical';
    else if (finalScore >= 50) riskLevel = 'high';
    else if (finalScore >= 25) riskLevel = 'medium';
    
    const threatData: ThreatIntel = {
      indicator,
      type: type as any,
      riskScore: Math.min(100, Math.max(0, finalScore)),
      riskLevel,
      lastSeen: new Date().toISOString(),
      firstSeen: new Date().toISOString(),
      reports: abuseResult?.totalReports || 0,
      sources,
      location: geoResult || undefined,
      tags: vtResult?.malicious ? ['malicious'] : []
    };
    
    // Cache the result (even if no data, to avoid repeated API calls)
    const ttl = finalScore > 50 ? CACHE_TTL.HIGH_CONFIDENCE : CACHE_TTL.MEDIUM_CONFIDENCE;
    await cache.setex(cacheKey, ttl, threatData);
    
    console.log(`✅ Lookup complete for ${indicator}: Risk score ${Math.round(finalScore)} (${riskLevel})`);
    
    return NextResponse.json({ success: true, data: threatData, cached: false });
  } catch (error) {
    console.error('❌ Lookup API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
