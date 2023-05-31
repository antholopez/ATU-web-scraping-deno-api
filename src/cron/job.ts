import {
  daily,
  everyMinute,
} from "https://deno.land/x/deno_cron@v1.0.0/cron.ts";
import * as log from "https://deno.land/std@0.190.0/log/mod.ts";
import { getServices } from "../scraping/index.ts";
const kv = await Deno.openKv();

const setScrapingData = async () => {
  const [services] = await Promise.all([getServices()]);
  await kv.atomic().set(["services", "services"], services).commit();
  log.info("Init scraping data...");
};
await setScrapingData();

log.info("Before job instantiation");
everyMinute(async () => {
  const date = new Date();
  await setScrapingData();
  log.info(`Set scraping data... ${date}`);
});
log.info("After job instantiation");
