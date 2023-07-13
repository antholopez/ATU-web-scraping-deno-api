import { Context } from "https://deno.land/x/hono@v3.2.3/mod.ts";
import { GetServicesUseCase } from "./../../metropolitano/services/application/useCases/getServices/getServices.usecase.ts";
import { ServiceRepositoryImpl } from "../../metropolitano/services/infrastructure/repositories/service.repository.ts";

class MetropolitanoServicesController {
  constructor(private serviceRepository: ServiceRepositoryImpl) {}

  getAll = async (context: Context) => {
    const { page, limit } = context.req.query();
    const input = {
      key: "services",
      page,
      limit,
    };
    const getServicesUseCase = new GetServicesUseCase(this.serviceRepository);
    const services = await getServicesUseCase.execute(input);
    return context.json(services, 200);
  };
}

export default MetropolitanoServicesController;
