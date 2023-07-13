import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
const URL_SCRAPING = "https://portal.atu.gob.pe/QR/";

export const scrape = async () => {
  const response = await fetch(URL_SCRAPING);
  const html = await response.text();
  return cheerio.load(html);
};
