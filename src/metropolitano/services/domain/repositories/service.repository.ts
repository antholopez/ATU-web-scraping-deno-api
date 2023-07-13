import { Service } from "../models/service.ts";

export default interface ServiceRepository {
  getAll(key: string): Promise<Service[] | null>;
  saveAll(data: Service[]): Promise<void>;
}
