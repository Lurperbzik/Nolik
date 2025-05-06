import { fetchData } from "../fetch";
import { HttpException } from "../../model/exception";
import { Collection } from "../../model/collection";

export const createCollectionService = async (
  collection: Collection
): Promise<null> => {
  const url = "http://localhost:8000/api/collection";
  const method = "POST";
  try {
    const body = JSON.stringify(collection);
    console.log("Creating collection with body:", body);
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
