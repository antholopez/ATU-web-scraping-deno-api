import { Hono } from "https://deno.land/x/hono@v3.2.3/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
const kv = await Deno.openKv();

const app = new Hono();
import {} from "./cron/job.ts";

app.get("/", (c) => {
  return c.text("Scraping ATU API");
});

app.get("/services", async (c) => {
  const { value: services } = await kv.get(["services", "services"]);
  return c.json(services, 200);
});

serve(app.fetch);
