import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Store } from "@rlimit/storage";

import honoRateLimiter from "hono-rate-limiter";

const limiter = honoRateLimiter.rateLimiter({
	windowMs: 60 * 1000, // 1 minute
	limit: 20, // Limit each key (from keyGenerator) to 20 requests per `window` (here, per 1 minute)
	standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	keyGenerator: () => "<unique_key>", // Method to generate custom identifiers for clients, default to IP address
	store: new Store({
		namespace: "example", // your rlimit.com namespace
	}),
});

const app = new Hono();

app.use(limiter);

app.get("/", (c) => {
	// your application logic here
	return c.json({ message: "Hello Hono!" });
});

serve(app);
