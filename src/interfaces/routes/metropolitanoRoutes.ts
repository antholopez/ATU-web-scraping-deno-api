import { DenoKVServiceRepository } from "../../metropolitano/services/infrastructure/repositories/DenoKVServiceRepository.ts";
import { DenoKVConnection } from "../../shared/infrastructure/DenoKVConnection.ts";
import MetropolitanoServicesController from "./../controllers/metropolitanoController.ts";
import { Hono } from "https://deno.land/x/hono@v3.2.3/mod.ts";

const metropolitanoRouter = new Hono();
const denoKVConnection = new DenoKVConnection();
const serviceRepository = new DenoKVServiceRepository(denoKVConnection);
const metropolitanoServicesController = new MetropolitanoServicesController(
  serviceRepository
);

metropolitanoRouter.get("/services", metropolitanoServicesController.getAll);

export default metropolitanoRouter;
