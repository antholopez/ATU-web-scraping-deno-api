import { daily } from "https://deno.land/x/deno_cron@v1.0.0/cron.ts";
import * as log from "https://deno.land/std@0.190.0/log/mod.ts";
import { getServices } from "../scraping/index.ts";
import { writeDBFile } from "../db/index.ts";

const setWriteDBData = async () => {
  const [services] = await Promise.all([getServices()]);
  await writeDBFile("services", services);
  log.info("Init write db data...");
};
await setWriteDBData();

log.info("Before job instantiation");
daily(async () => {
  const date = new Date();
  await setWriteDBData();
  log.info(`Set write db data... ${date}`);
});
log.info("After job instantiation");
