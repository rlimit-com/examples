// Usage: pnpm start (run in the terminal)

import { RateLimit } from '@rlimit/http';

const rlimit = new RateLimit({ namespace: 'example', maximum: 5, interval: '1m' });

const limit = await rlimit.check('script:123'); // => 5/1m
if (!limit.ok) {
  throw new Error('rate limited');
}

console.info(limit)

// continue with application logic that should run at most 5 times per minute
