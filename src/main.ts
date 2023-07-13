import { Context, Hono } from "https://deno.land/x/hono@v3.2.3/mod.ts";
import {
  logger,
  poweredBy,
} from "https://deno.land/x/hono@v3.2.3/middleware.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import ApiRouter from "./interfaces/routes/index.ts";
import "./cron/job.ts";

const app = new Hono();

app.use("*", logger(), poweredBy());
app.get("/", (c: Context) => {
  return c.json([
    {
      endpoint: "/api",
      description: "API Welcome message",
      parameters: [],
    },
    {
      endpoint: "/api/metropolitano/services",
      description: "Return all ATU metropolitan services",
      parameters: [],
    },
  ]);
});

app.route("/", ApiRouter);
app.showRoutes();

serve(app.fetch);
