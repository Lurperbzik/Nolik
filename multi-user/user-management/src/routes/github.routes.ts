import { Router } from "express";
import { checkGitHubRepoService } from "../services/requests/checkRepoExists";
import { HttpException } from "../model/exception";
import { UserManager } from "../User/user.manager";
import { CustomRequest } from "../middleware/auth";
import { authenticate } from "../middleware/auth";
import { CollectionManager } from "../Collection/collection.manager";
import { NextFunction } from "express";

const router = Router();

export const getGitHubRepoService = async (
  req: CustomRequest,
  res: any,
  next: NextFunction
) => {
  let repoOwner = undefined;
  let repoName = undefined;
  const { repo_owner, repo_name } = req.query;
  if (!repo_owner || !repo_name) {
    const { name, owner } = req.body;
    repoOwner = owner;
    repoName = name;
  } else {
    repoOwner = repo_owner;
    repoName = repo_name;
  }
  const userId = req.user;
  if (!repoOwner || !repoName || !userId) {
    return res.status(400).json({ message: "Missing parameters" });
  }
  const apiKey = await UserManager.getInstance().getApiKeyById(
    parseInt(userId)
  );
  if (!apiKey) {
    return res.status(403).json({ message: "Forbidden: No API key found" });
  }

  const collections = await CollectionManager.getInstance().getByUserId({
    userId: parseInt(userId),
  });
  if (collections.some((c) => c.owner === repoOwner && c.name === repoName)) {
    return res
      .status(400)
      .json({ message: "Repository already exists in collections" });
  }
  await checkGitHubRepoService(repoOwner as string, repoName as string, apiKey)
    .then(() => {
      next();
    })
    .catch((error) => {
      if (error instanceof HttpException) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unknown error" });
      }
    });
};

router.get(
  "/exists",
  authenticate,
  getGitHubRepoService,
  async (req: CustomRequest, res) => {
    res.status(200).json({ message: "Repository exists" });
  }
);

export default router;
