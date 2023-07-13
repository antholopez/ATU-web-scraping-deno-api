import { Service } from "../metropolitano/services/domain/models/service.ts";

export const chunkArray = (array: Service[], chunkSize: number) => {
  const chunks: Service[][] = [];
  let index = 0;

  while (index < array.length) {
    chunks.push(array.slice(index, index + chunkSize));
    index += chunkSize;
  }

  return chunks;
};
