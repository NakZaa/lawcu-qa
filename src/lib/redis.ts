import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPTASH_REDIS_REST_URL!,
  token: process.env.UPTASH_REDIS_REST_TOKEN!
})
