import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
import { URL_SCRAPING } from "../constants.ts";

export const scrape = async () => {
  const response = await fetch(URL_SCRAPING);
  const html = await response.text();
  return cheerio.load(html);
};

export const cleanText = (text: string) =>
  text
    .replace(/\t|\n|\s:/g, "")
    .replace(/.*:/g, " ")
    .trim();
