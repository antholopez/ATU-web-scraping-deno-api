import {
  daily,
  everyMinute,
} from "https://deno.land/x/deno_cron@v1.0.0/cron.ts";
import { getServices } from "../scraping/index.ts";
const kv = await Deno.openKv();

const setScrapingData = async () => {
  const [services] = await Promise.all([getServices()]);
  await kv.atomic().set(["services", "services"], services).commit();
  console.log("Init scraping data...");
};
await setScrapingData();

console.log("Before job instantiation");
everyMinute(async () => {
  const date = new Date();
  await setScrapingData();
  console.log("Set scraping data...", date);
});
console.log("After job instantiation");
