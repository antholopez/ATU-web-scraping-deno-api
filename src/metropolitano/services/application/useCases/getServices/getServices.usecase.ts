import { GetServicesInput } from "./getServices.input.ts";
import { chunkArray } from "../../../../../utils/chunking.ts";
import { Service } from "../../../domain/models/service.ts";
import ServiceRepository from "../../../adapter/repositories/service.repository.ts";
export class GetServicesUseCase {
  constructor(readonly serviceRepository: ServiceRepository) {}

  async execute(input: GetServicesInput): Promise<Service[]> {
    const { key, limit, page } = input;
    const services = await this.serviceRepository.getAll(key);

    if (!services) return [];

    if (limit && Number(limit) > 0) {
      const setPage = page && Number(page) > 0 ? Number(page) - 1 : 0;
      const setLimit = Number(limit);

      const chunkedServices = chunkArray(services, setLimit);
      return chunkedServices[setPage] || [];
    }

    return services;
  }
}
