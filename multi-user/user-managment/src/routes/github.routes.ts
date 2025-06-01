import { Router } from "express";
import { checkGitHubRepoService } from "../services/requests/checkRepoExists";
import { HttpException } from "../model/exception";
import { UserManager } from "../User/user.manager";
import { CustomRequest } from "../middleware/auth";
import { authenticate } from "../middleware/auth";
import { CollectionManager } from "../Collection/collection.manager";

const router = Router();

router.get("/exists", authenticate, async (req: CustomRequest, res) => {
  const { repo_owner, repo_name } = req.query;
  const userId = req.user;
  if (!repo_owner || !repo_name || !userId) {
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
  if (collections.some((c) => c.owner === repo_owner && c.name === repo_name)) {
    return res
      .status(400)
      .json({ message: "Repository already exists in collections" });
  }
  checkGitHubRepoService(repo_owner as string, repo_name as string, apiKey)
    .then(() => {
      res.status(200).json({ message: "Repository exists" });
    })
    .catch((error) => {
      if (error instanceof HttpException) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unknown error" });
      }
    });
});

export default router;
