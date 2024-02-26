import { Request, Response } from "express";
import {
  createNewCandidate,
  getCandidateById,
  getCandidatesSummary,
} from "../services/CandidateService";

export async function createCandidate(req: Request, res: Response):Promise<void> {
  const candidateData = req.body;
  const newCandidate = await createNewCandidate(candidateData);
  res.status(201).json(newCandidate);
}

export async function getCandidate(req: Request, res: Response):Promise<void> {
  const { id } = req.params;
  const candidate = await getCandidateById(id);
  res.status(200).json(candidate);
}

export async function getSummary(req: Request, res: Response):Promise<void> {
  const candidateSummary = await getCandidatesSummary(req.query);
  res.status(200).json(candidateSummary);
}
