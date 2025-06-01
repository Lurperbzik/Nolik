import { fetchData } from "../fetch";
import { HttpException } from "../../model/exception";

interface Collection {
  name: string;
  owner: string;
  platform: string;
  url: string;
  status: string;
}

export const createCollectionService = async (
  collection: Collection,
  apiKey: string | null
): Promise<null> => {
  const url = "http://localhost:8000/api/collection";
  const method = "POST";
  try {
    const body = JSON.stringify({
      ...collection,
      api_key: apiKey,
    });
    await fetchData({ url, method, body });
    return null;
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new HttpException("Unknown error", 500);
    }
  }
};
