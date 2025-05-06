import { Router } from "express";
import { checkGitHubRepoService } from "../services/requests/checkRepoExists";
import { HttpException } from "../model/exception";

const router = Router();

router.get("/exists", (req, res) => {
  const { repo_owner, repo_name } = req.query;
  if (!repo_owner || !repo_name) {
    return res.status(400).json({ message: "Missing parameters" });
  }
  checkGitHubRepoService(repo_owner as string, repo_name as string)
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
