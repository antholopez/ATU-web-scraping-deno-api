import { daily } from "https://deno.land/x/deno_cron@v1.0.0/cron.ts";
import * as log from "https://deno.land/std@0.190.0/log/mod.ts";
import { getServices } from "../scraping/index.ts";
import { setDataATU } from "../utils/db.ts";

const setWriteDBData = async () => {
  log.info("Init write db data...");
  const [services] = await Promise.all([getServices()]);
  await setDataATU({ services });
  log.info("End write db data...");
};
await setWriteDBData();

daily(async () => {
  log.info("Before job instantiation");
  const date = new Date();
  await setWriteDBData();
  log.info(`Set write db data... ${date}`);
  log.info("After job instantiation");
});
