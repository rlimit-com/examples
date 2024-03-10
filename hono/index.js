import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { RateLimit } from "@rlimit/http";

const app = new Hono();
const rlimit = new RateLimit({
	namespace: "example",
	maximum: 5,
	interval: "10s",
});

const rateLimitMiddleware = async (c, next) => {
	// use x-forwarded-for or x-real-ip if available
	const identifier =
		c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "anon";

	// check if the request is within the limit
	const limit = await rlimit.check(identifier);
	console.info(limit);

	if (!limit.ok) {
		return c.text("too many requests", 429);
	}

	await next();
};

app.use(rateLimitMiddleware);

app.get("/", (c) => {
	return c.json({ message: "Hello Bun!" });
});

serve(app);
