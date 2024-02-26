import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { validateQuerySchemaMiddleware } from "../middleware/validatorMiddleware";
import { actionsSummarypaginationQuerySchema } from "../utils/Schema";
import { getActionsSummary } from "../controllers/AdverseActionController";

const router = express.Router();

router.get(
  "/actions",
  authMiddleware,
  validateQuerySchemaMiddleware(actionsSummarypaginationQuerySchema),
  getActionsSummary
);
export default router;
