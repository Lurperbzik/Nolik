import { Router } from "express";
import { authenticate } from "../middleware/auth";
import * as collectionController from "../controller/collection.controller";

const router = Router();

router.get("/", authenticate, collectionController.getCollections);
router.delete("/", authenticate, collectionController.deleteCollection);
router.post("/", authenticate, collectionController.createCollection);

export default router;
