import { chunkArray } from "./util.ts";
import { DataATU, Service } from "./../interfaces/service.ts";
const kv = await Deno.openKv();

export const setDataATU = async (data: DataATU) => {
  await kv
    .atomic()
    .set(["services_by_atu", "services"], data.services)
    .commit();
};

export const getServiceATU = async (
  key: string,
  page?: string,
  limit?: string
) => {
  const { value } = await kv.get<Service[]>(["services_by_atu", key]);
  if (!value) return [];

  if (limit && Number(limit) > 0) {
    const setPage = page && Number(page) > 0 ? Number(page) - 1 : 0;
    const setLimit = Number(limit);

    const chunkedServices = chunkArray(value, setLimit);
    return chunkedServices[setPage] || [];
  }

  return value;
};
