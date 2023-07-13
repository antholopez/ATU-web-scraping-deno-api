import { ServiceRepositoryImpl } from "../../metropolitano/services/infrastructure/repositories/service.repository.ts";
import MetropolitanoServicesController from "./../controllers/metropolitanoController.ts";
import { Context, Hono } from "https://deno.land/x/hono@v3.2.3/mod.ts";

const metropolitanoRouter = new Hono();

const serviceRepository = new ServiceRepositoryImpl();
const metropolitanoServicesController = new MetropolitanoServicesController(
  serviceRepository
);

metropolitanoRouter.get("/services", metropolitanoServicesController.getAll);

export default metropolitanoRouter;
