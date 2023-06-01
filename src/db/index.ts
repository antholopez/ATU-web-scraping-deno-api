import path from "https://deno.land/std@0.177.0/node/path.ts";
import process from "https://deno.land/std@0.177.0/node/process.ts";
import * as log from "https://deno.land/std@0.190.0/log/mod.ts";

const DB_PATH = path.join(process.cwd(), "./src/db/");

export const writeDBFile = async (dbName: string, data: any) => {
  log.info("db path: ", DB_PATH);
  return await Deno.writeTextFile(
    `${DB_PATH}/${dbName}.json`,
    JSON.stringify(data, null, 2)
  );
};

export const readDBFile = async (dbName: string) => {
  const res = await Deno.readTextFile(`${DB_PATH}/${dbName}.json`);
  return JSON.parse(res);
};
