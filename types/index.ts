export interface ThreatIntel {
  indicator: string;
  type: 'ip' | 'domain' | 'hash';
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastSeen: string;
  firstSeen: string;
  reports: number;
  sources: ThreatSource[];
  location?: GeoLocation;
  tags: string[];
  cached?: boolean;
}

export interface ThreatSource {
  name: string;
  malicious: boolean;
  confidence: number;
  details: string;
}

export interface GeoLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  asn?: string;
  organization?: string;
}

export interface LookupResponse {
  success: boolean;
  data?: ThreatIntel;
  error?: string;
  cached: boolean;
}

export interface RecentThreat {
  indicator: string;
  type: string;
  riskScore: number;
  riskLevel: string;
  lastSeen: string;
  reports: number;
}
