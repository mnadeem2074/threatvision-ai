// lib/apis/ipinfo.ts

import axios from 'axios';

const IPINFO_API_URL = 'https://ipinfo.io';
const API_KEY = process.env.IPINFO_API_KEY;

export async function getIpGeolocation(ip: string) {
  if (!API_KEY) {
    console.log('⚠️ IPinfo API key not configured');
    return null;
  }
  
  try {
    const response = await axios.get(`${IPINFO_API_URL}/${ip}/json`, {
      params: { token: API_KEY },
      timeout: 5000
    });
    
    const data = response.data;
    const [lat, lon] = data.loc?.split(',') || [0, 0];
    
    return {
      city: data.city || 'Unknown',
      country: data.country || 'Unknown',
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      asn: data.org?.split(' ')[0] || null,
      organization: data.org || null
    };
  } catch (error: any) {
    console.error('❌ IPinfo API error:', error.message);
    return null;
  }
}
