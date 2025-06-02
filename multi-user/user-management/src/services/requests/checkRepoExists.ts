import { HttpException } from "../../model/exception";

export const checkGitHubRepoService = async (
  owner: string,
  repo: string,
  apiKey: string
): Promise<null> => {
  const url = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const method = "GET";

  try {
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new HttpException("Repository not found", 404);
      }
      throw new HttpException(
        `GitHub API error: ${response.statusText}`,
        response.status
      );
    }

    return null;
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new HttpException("Unknown error", 500);
    }
  }
};
