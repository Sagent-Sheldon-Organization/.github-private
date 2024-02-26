import { Request, Response } from "express";
import { getAdverseActionsSummary } from "../services/AdverseActionService";

export async function getActionsSummary(
  req: Request,
  res: Response
): Promise<void> {
  const result = await getAdverseActionsSummary(req.query);
  res.status(200).json(result);
}
