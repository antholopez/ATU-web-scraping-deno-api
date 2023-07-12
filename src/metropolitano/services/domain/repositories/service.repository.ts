import { Service } from "../models/service.ts";

export interface ServiceRepository {
  getAll(key: string): Promise<Service[]>;
}
