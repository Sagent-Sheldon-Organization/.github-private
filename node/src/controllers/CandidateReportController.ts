import { Request, Response } from "express";
import { updateReport } from "../services/CandidateReportService";

export async function updateCandidateReport(req: Request, res: Response):Promise<void> {
  const { candidateId, adjudication } = req.body;
  await updateReport(candidateId, adjudication);
  res.sendStatus(204);
}
