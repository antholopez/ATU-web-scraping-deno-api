import { Service } from "./interfaces/service.ts";
import { Hono } from "https://deno.land/x/hono@v3.2.3/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { cleanText, scrape } from "./scraping/utils.ts";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Scraping ATU API");
});

app.get("/services", async (c) => {
  const $ = await scrape();
  const services = $("ul.sub-group-list").eq(1).text();
  const getServices = services.split("\n");
  const transformServices: Service[] = getServices
    .filter((service) => !!service && service !== "\t\t\t  ")
    .map((service, index) => {
      return {
        id: index + 1,
        name: cleanText(service),
      };
    });
  return c.json(transformServices, 200);
});

serve(app.fetch);
