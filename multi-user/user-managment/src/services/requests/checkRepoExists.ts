import { fetchData } from "../fetch";
import { HttpException } from "../../model/exception";

export const checkGitHubRepoService = async (
  owner: string,
  repo: string
): Promise<null> => {
  const url = `http://localhost:8000/api/github/exists?repo_owner=${encodeURIComponent(owner)}&repo_name=${encodeURIComponent(repo)}`;
  const method = "GET";
  try {
    await fetchData({ url, method });
    return null;
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new HttpException("Unknown error", 500);
    }
  }
};
