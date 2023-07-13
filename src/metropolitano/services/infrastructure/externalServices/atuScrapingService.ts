import { cleanText } from "../../../../utils/cleaning.ts";
import { scrape } from "../../../../utils/scraping.ts";
import { Service } from "../../domain/models/service.ts";

export class AtuScrapingService {
  async scrapeServices(): Promise<Service[]> {
    const $ = await scrape();

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
  }
}
