// lib/redis.ts

import { Redis } from '@upstash/redis';

// Initialize Redis connection only if environment variables exist
let redis: Redis | null = null;

try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    console.log('✅ Redis connected');
  } else {
    console.log('⚠️ Redis not configured - caching disabled');
  }
} catch (error) {
  console.error('❌ Redis connection failed:', error);
}

// Cache TTL in seconds
export const CACHE_TTL = {
  HIGH_CONFIDENCE: 86400,   // 24 hours for verified threats
  MEDIUM_CONFIDENCE: 43200, // 12 hours
  LOW_CONFIDENCE: 3600,     // 1 hour
  ERROR: 300,               // 5 minutes for errors
};

// Mock cache for development (when Redis is not available)
class MockCache {
  private cache: Map<string, any> = new Map();
  
  async get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;
    if (item.expiry < Date.now()) {
      this.cache.delete(key);
      return null;
    }
    return item.value;
  }
  
  async setex(key: string, ttl: number, value: any) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + (ttl * 1000)
    });
  }
}

export const cache = redis || new MockCache();
export default cache;
