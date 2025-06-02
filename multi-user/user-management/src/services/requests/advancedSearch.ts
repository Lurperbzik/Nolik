import { fetchData } from "../fetch";
import { HttpException } from "../../model/exception";

export interface AdvacedSearchProps {
  collection_url: string;
  issue: string;
  limit: number;
  required_words: string;
  accepted_deviation: number;
  min_num_comments: number;
  state: string;
}

export const advancedSearch = async (options: AdvacedSearchProps) => {
  const path = "/api/advanced-issue-similarity";
  const method = "POST";
  const body = JSON.stringify(options);
  try {
    const response = await fetchData({ path, method, body });
    return response;
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new HttpException("Unknown error", 500);
    }
  }
};
