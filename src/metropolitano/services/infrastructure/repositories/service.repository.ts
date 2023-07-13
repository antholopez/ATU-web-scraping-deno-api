import ServiceRepository from "../../adapter/repositories/service.repository.ts";
import { Service } from "../../domain/models/service.ts";

const kv = await Deno.openKv();

export class ServiceRepositoryImpl implements ServiceRepository {
  async saveAll(data: Service[]): Promise<void> {
    await kv.atomic().set(["services_by_atu", "services"], data).commit();
  }

  async getAll(key: string): Promise<Service[] | null> {
    const { value } = await kv.get<Service[]>(["services_by_atu", key]);
    return value;
  }
}
