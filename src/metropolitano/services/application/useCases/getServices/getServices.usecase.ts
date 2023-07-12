import { GetServicesInput } from "./getServices.input.ts";
import { ServiceRepository } from "./../../../domain/repositories/service.repository.ts";
import { chunkArray } from "../../../../../utils/util.ts";
import { Service } from "../../../domain/models/service.ts";
export class GetServicesUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(input: GetServicesInput): Promise<Service[]> {
    const { key, limit, page } = input;
    const services = await this.serviceRepository.getAll(key);

    if (!services.length) return services;

    if (limit && Number(limit) > 0) {
      const setPage = page && Number(page) > 0 ? Number(page) - 1 : 0;
      const setLimit = Number(limit);

      const chunkedServices = chunkArray(services, setLimit);
      return chunkedServices[setPage] || [];
    }

    return services;
  }
}
