import { fetchData } from "../fetch";
import { HttpException } from "../../model/exception";

export const deleteCollectionService = async (
  collection_url: string
): Promise<null> => {
  const url = "http://localhost:8000/api/collections";
  const method = "DELETE";
  try {
    const body = JSON.stringify({
      url: collection_url,
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
