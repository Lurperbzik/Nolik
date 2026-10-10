import { search as searchRequest } from "../services/requests/search";
import { advancedSearch as advancedSearchRequest } from "../services/requests/advancedSearch";
import { Model } from "../model/search";
import { HttpException } from "../model/exception";

export const search = async (req: any, res: any) => {
  const { collection_url, issue } = req.body;
  const userId = req.user;
  try {
    const model = new Model();
    await model.validateIssueRequest(userId, { collection_url, issue });

    const response = await searchRequest(collection_url, issue);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof HttpException) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const advancedSearch = async (req: any, res: any) => {
  const {
    collection_url,
    issue,
    limit,
    required_words,
    accepted_deviation,
    min_num_comments,
    state,
  } = req.body;
  const userId = req.user;

  try {
    const model = new Model();
    await model.validateIssueRequest(userId, { collection_url, issue });

    const response = await advancedSearchRequest({
      collection_url,
      issue,
      limit,
      required_words,
      accepted_deviation,
      min_num_comments,
      state,
    });
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof HttpException) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
