import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { search, advancedSearch } from "../controller/search.controller";

const router = Router();
router.post("/issue-similarity", authenticate, search);
router.post("/advanced-issue-similarity", authenticate, advancedSearch);

export default router;
