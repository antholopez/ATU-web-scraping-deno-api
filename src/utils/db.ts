import { DataATU, Service } from "./../interfaces/service.ts";
const kv = await Deno.openKv();

export const setDataATU = async (data: DataATU) => {
  await kv
    .atomic()
    .set(["services_by_atu", "services"], data.services)
    .commit();
};

export const getServiceATU = async (key: string) => {
  const { value } = await kv.get<Service[]>(["services_by_atu", key]);
  return value;
};
