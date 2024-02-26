import express from "express";
import {
  createCandidate,
  getCandidate,
  getSummary,
} from "../controllers/CandidateController";
import authMiddleware from "../middleware/authMiddleware";
import {
  validateBodySchemaMiddleware,
  validatePathParamsSchemaMiddleware,
  validateQuerySchemaMiddleware,
} from "../middleware/validatorMiddleware";
import {
  candidateParamsSchema,
  candidateSchema,
  candidatesSummarypaginationQuerySchema,
} from "../utils/Schema";

const router = express.Router();

// POST /api/candidates
router.post(
  "/candidates",
  authMiddleware,
  validateBodySchemaMiddleware(candidateSchema),
  createCandidate
);

router.get(
  "/candidate/:id",
  authMiddleware,
  validatePathParamsSchemaMiddleware(candidateParamsSchema),
  getCandidate
);

router.get(
  "/candidates",
  authMiddleware,
  validateQuerySchemaMiddleware(candidatesSummarypaginationQuerySchema),
  getSummary
);

export default router;
