import { Hono } from "npm:hono@3.2.3";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const app = new Hono();

app.get("/", (c) => c.text("Hello Deno!"));

serve(app.fetch);
