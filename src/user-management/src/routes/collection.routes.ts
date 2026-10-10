import { Router } from "express";
import { authenticate } from "../middleware/auth";
import * as collectionController from "../Collection/collection.controller";
import { getGitHubRepoService } from "../routes/github.routes";

const router = Router();

router.get("/", authenticate, collectionController.getCollections);
router.get("/owned", authenticate, collectionController.getCollections);
router.delete("/", authenticate, collectionController.deleteCollection);
router.post(
  "/",
  authenticate,
  getGitHubRepoService,
  collectionController.createCollection
);

export default router;
