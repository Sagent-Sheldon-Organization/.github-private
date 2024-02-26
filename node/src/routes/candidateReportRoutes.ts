import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { validateBodySchemaMiddleware } from "../middleware/validatorMiddleware";
import { candidateReportSchema } from "../utils/Schema";
import { updateCandidateReport } from "../controllers/CandidateReportController";

const router = express.Router();

router.put(
  "/report",
  authMiddleware,
  validateBodySchemaMiddleware(candidateReportSchema),
  updateCandidateReport
);

export default router;
