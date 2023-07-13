import MetropolitanoRoutes from "./metropolitanoRoutes.ts";
import { cors } from "https://deno.land/x/hono@v3.2.3/middleware.ts";
import { Hono } from "https://deno.land/x/hono@v3.2.3/mod.ts";

const apiRouter = new Hono();

apiRouter.use("/api/*", cors());
apiRouter.get("/api", (c) => {
  return c.text("Scraping ATU API - PERU");
});
apiRouter.route("/api/metropolitano", MetropolitanoRoutes);

export default apiRouter;
