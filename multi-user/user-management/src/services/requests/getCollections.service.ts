import { fetchData } from "../fetch";
import { HttpException } from "../../model/exception";

export interface CollectionService {
  name: string;
  owner: string;
  platform: string;
  url: string;
  status: string;
}

export const getCollectionsService = async (): Promise<CollectionService[]> => {
  const path = "/api/collections";
  const method = "GET";
  try {
    const response = await fetchData({ path, method });
    return response as CollectionService[];
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new HttpException("Unknown error", 500);
    }
  }
};
