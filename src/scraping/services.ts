import { Service } from "../interfaces/service.ts";
import { cleanText, scrape } from "./index.ts";

const $ = await scrape();

export const getServices = () => {
  const services = $("ul.sub-group-list").eq(1).text();
  const getServices = services.split("\n");
  const transformServices: Service[] = getServices
    .filter((service) => !!service && service !== "\t\t\t  ")
    .map((service, index) => {
      return {
        id: index + 1,
        name: cleanText(service),
      };
    });

  return transformServices;
};
