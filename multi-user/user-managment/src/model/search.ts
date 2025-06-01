import { CollectionManager } from "../Collection/collection.manager";
import { HttpException } from "./exception";
export interface IssueRequest {
  collection_url: string;
  issue: string;
}

export interface AdvacedIssueRequest {
  collection_url: string;
  issue: string;
  limit: number;
  required_words: string[];
  accepted_deviation: number;
  min_num_comments: number;
  state: string;
}

export class Model {
  public async validateIssueRequest(
    userId: string,
    issueRequest?: IssueRequest,
    AdvacedIssueRequest?: AdvacedIssueRequest
  ): Promise<void> {
    const data: IssueRequest | AdvacedIssueRequest | undefined =
      issueRequest || AdvacedIssueRequest;
    if (!data) {
      throw new Error("Invalid request");
    }
    const collectionModel = CollectionManager.getInstance();
    const collections = await collectionModel.getByUserId({
      userId: Number(userId),
    });
    const collection = collections.find(
      (collection) => collection.url === data.collection_url
    );
    if (!collection) {
      throw new HttpException("Collection not found", 404);
    }
  }
}
