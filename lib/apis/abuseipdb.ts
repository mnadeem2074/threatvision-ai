// lib/apis/abuseipdb.ts

import axios from 'axios';

const ABUSEIPDB_API_URL = 'https://api.abuseipdb.com/api/v2';
const API_KEY = process.env.ABUSEIPDB_API_KEY;

export interface AbuseIPDBResult {
  abuseConfidenceScore: number;
  countryCode: string;
  usageType: string;
  isp: string;
  domain: string;
  totalReports: number;
  lastReportedAt: string;
}

export async function checkAbuseIPDB(ip: string): Promise<AbuseIPDBResult | null> {
  if (!API_KEY) {
    console.log('⚠️ AbuseIPDB API key not configured');
    return null;
  }
  
  try {
    const response = await axios.get(`${ABUSEIPDB_API_URL}/check`, {
      params: {
        ipAddress: ip,
        maxAgeInDays: 90,
        verbose: true
      },
      headers: {
        'Key': API_KEY,
        'Accept': 'application/json'
      },
      timeout: 10000
    });
    
    const data = response.data.data;
    
    console.log(`✅ AbuseIPDB check complete for ${ip}: ${data.abuseConfidenceScore}% confidence`);
    
    return {
      abuseConfidenceScore: data.abuseConfidenceScore,
      countryCode: data.countryCode,
      usageType: data.usageType || 'Unknown',
      isp: data.isp,
      domain: data.domain,
      totalReports: data.totalReports,
      lastReportedAt: data.lastReportedAt
    };
  } catch (error: any) {
    if (error.response?.status === 429) {
      console.log('⚠️ AbuseIPDB rate limit exceeded');
    } else {
      console.error('❌ AbuseIPDB API error:', error.message);
    }
    return null;
  }
}
