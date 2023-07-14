const kv = await Deno.openKv();

export class DenoKVConnection {
  async set(key: string[], value: unknown) {
    return await kv.set(key, value);
  }

  async get<T = unknown>(key: string[]) {
    const { value } = await kv.get(key);
    return value as T;
  }
}
