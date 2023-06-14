import { Hono } from "https://deno.land/x/hono@v3.2.3/mod.ts";
import {
  cors,
  logger,
  poweredBy,
} from "https://deno.land/x/hono@v3.2.3/middleware.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import {} from "./cron/job.ts";
import { getServiceATU } from "./utils/db.ts";

const app = new Hono();

app.use("*", logger(), poweredBy());
app.use("/api/*", cors());

app.get("/api", (c) => {
  return c.text("Scraping ATU API - PERU");
});

app.get("/api/services", async (c) => {
  const services = await getServiceATU("services");
  return c.json(services, 200);
});

serve(app.fetch);
