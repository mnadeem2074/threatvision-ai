// lib/apis/virustotal.ts

import axios from 'axios';

const VT_API_URL = 'https://www.virustotal.com/api/v3';
const API_KEY = process.env.VIRUSTOTAL_API_KEY;

export interface VTAnalysis {
  malicious: number;
  suspicious: number;
  harmless: number;
  undetected: number;
  total: number;
  riskScore: number;
}

export async function checkVirusTotal(indicator: string, type: 'ip' | 'domain' | 'hash'): Promise<VTAnalysis | null> {
  if (!API_KEY) {
    console.log('⚠️ VirusTotal API key not configured');
    return null;
  }
  
  try {
    let endpoint = '';
    switch (type) {
      case 'ip':
        endpoint = `/ip_addresses/${indicator}`;
        break;
      case 'domain':
        endpoint = `/domains/${indicator}`;
        break;
      case 'hash':
        endpoint = `/files/${indicator}`;
        break;
    }
    
    const response = await axios.get(`${VT_API_URL}${endpoint}`, {
      headers: { 'x-apikey': API_KEY },
      timeout: 10000
    });
    
    const attributes = response.data.data.attributes;
    const stats = attributes.last_analysis_stats;
    
    const total = (stats.malicious || 0) + (stats.suspicious || 0) + (stats.harmless || 0) + (stats.undetected || 0);
    const riskScore = total > 0 ? ((stats.malicious + stats.suspicious * 0.5) / total) * 100 : 0;
    
    console.log(`✅ VirusTotal check complete for ${indicator}: ${stats.malicious} malicious detections`);
    
    return {
      malicious: stats.malicious || 0,
      suspicious: stats.suspicious || 0,
      harmless: stats.harmless || 0,
      undetected: stats.undetected || 0,
      total: total,
      riskScore: Math.min(100, Math.max(0, riskScore))
    };
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.log(`ℹ️ Indicator ${indicator} not found in VirusTotal database`);
    } else if (error.response?.status === 429) {
      console.log('⚠️ VirusTotal rate limit exceeded');
    } else {
      console.error('❌ VirusTotal API error:', error.message);
    }
    return null;
  }
}
