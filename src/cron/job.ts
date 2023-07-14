import { AtuScrapingService } from "./../metropolitano/services/infrastructure/externalServices/atuScrapingService.ts";
import { daily } from "https://deno.land/x/deno_cron@v1.0.0/cron.ts";
import * as log from "https://deno.land/std@0.190.0/log/mod.ts";
import { DenoKVServiceRepository } from "../metropolitano/services/infrastructure/repositories/DenoKVServiceRepository.ts";
import { DenoKVConnection } from "../shared/infrastructure/DenoKVConnection.ts";

const metropolinanoServices = new AtuScrapingService();
const denoKVConnection = new DenoKVConnection();
const metropolinanoServicesRepository = new DenoKVServiceRepository(
  denoKVConnection
);

const setWriteDBData = async () => {
  const date = new Date();
  log.info("Init write db data...");
  const [services] = await Promise.all([
    metropolinanoServices.scrapeServices(),
  ]);
  await metropolinanoServicesRepository.saveAll(services);
  log.info(`End write db data...${date}`);
};
await setWriteDBData();

daily(async () => {
  log.info("Before job instantiation");
  await setWriteDBData();
  log.info("After job instantiation");
});
