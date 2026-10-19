/**
 * Lightweight in-memory rate limiter (sliding window per client key).
 *
 * On serverless platforms each instance keeps its own memory, so this is a
 * first line of defence rather than a global guarantee. For stronger
 * protection enable Cloudflare Turnstile (see DEPLOYMENT.md), which is
 * verified on every submission.
 */
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;
const MAX_KEYS = 5000;

const hits = new Map<string, number[]>();

export function rateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return { allowed: false, retryAfterSeconds: Math.ceil((WINDOW_MS - (now - recent[0])) / 1000) };
  }
  recent.push(now);
  hits.set(key, recent);

  // Bound memory use.
  if (hits.size > MAX_KEYS) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
      if (hits.size <= MAX_KEYS * 0.8) break;
    }
  }
  return { allowed: true, retryAfterSeconds: 0 };
}
