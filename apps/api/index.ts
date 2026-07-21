import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("compute-e2e-multi-app api: ok"));
app.get("/health", (c) => c.json({ ok: true, app: "api" }));

// Compute's framework-led port mapping routes Hono apps to 3000; bind there so
// the deployed app is reachable (PORT is not injected on the customer-app path).
const port = Number(process.env.PORT ?? 3000);
serve({ fetch: app.fetch, port });
console.info(`compute-e2e-multi-app api listening on :${port}`);
