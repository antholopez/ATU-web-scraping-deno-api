import { DenoKVConnection } from "./../../../../shared/infrastructure/DenoKVConnection.ts";
import ServiceRepository from "../../adapter/repositories/service.repository.ts";
import { Service } from "../../domain/models/service.ts";

const KEY1 = "services_by_atu";
const KEY2 = "services";

export class DenoKVServiceRepository implements ServiceRepository {
  constructor(private readonly denoKV: DenoKVConnection) {}

  async saveAll(data: Service[]): Promise<void> {
    await this.denoKV.set([KEY1, KEY2], data);
  }

  async getAll(): Promise<Service[] | null> {
    return await this.denoKV.get<Service[]>([KEY1, KEY2]);
  }
}
