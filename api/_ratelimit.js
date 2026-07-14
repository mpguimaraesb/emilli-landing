const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function upstashCommand(...parts) {
  const url = `${UPSTASH_URL}/${parts.map(encodeURIComponent).join('/')}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
  });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(data.error || `Upstash error ${res.status}`);
  return data.result;
}

async function incrWithExpiry(key, windowSeconds) {
  const count = await upstashCommand('INCR', key);
  if (count === 1) await upstashCommand('EXPIRE', key, String(windowSeconds));
  return count;
}

// Checks a per-IP hourly limit and a global daily budget for /api/chat.
// Fails open (allows the request) if Upstash isn't configured or errors —
// a misconfigured or momentarily-down rate limiter shouldn't take the
// whole demo offline.
async function checkChatRateLimit(ip) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return { allowed: true };

  const ipLimit = Number(process.env.CHAT_RATE_LIMIT_PER_IP_HOUR) || 20;
  const dailyLimit = Number(process.env.CHAT_RATE_LIMIT_DAILY) || 300;

  const now = new Date().toISOString();
  const hourKey = `ratelimit:chat:ip:${ip}:${now.slice(0, 13)}`;
  const dayKey = `ratelimit:chat:global:${now.slice(0, 10)}`;

  try {
    // Check the per-IP gate first — a request blocked here should never
    // touch the shared daily budget, or one spammy IP could exhaust it
    // for everyone else without a single call actually reaching Anthropic.
    const ipCount = await incrWithExpiry(hourKey, 3600);
    if (ipCount > ipLimit) return { allowed: false, reason: 'ip' };

    const dayCount = await incrWithExpiry(dayKey, 86400);
    if (dayCount > dailyLimit) return { allowed: false, reason: 'global' };

    return { allowed: true };
  } catch (err) {
    console.error('Rate limit check failed, failing open:', err);
    return { allowed: true };
  }
}

module.exports = { checkChatRateLimit };
