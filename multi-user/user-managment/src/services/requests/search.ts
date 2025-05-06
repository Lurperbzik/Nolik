import { fetchData } from "../fetch";
import { HttpException } from "../../model/exception";

export const search = async (collectionUrl: string, issue: string) => {
  const url = "http://localhost:8000/api/issue-similarity";
  const method = "POST";
  const body = JSON.stringify({
    collection_url: collectionUrl,
    issue: issue,
  });

  try {
    const response = await fetchData({ url, method, body });
    return response;
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new HttpException("Unknown error", 500);
    }
  }
};
