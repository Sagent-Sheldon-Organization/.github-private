import { Candidate } from "../entities/Candidate";
import { Constants } from "../utils/Constants";
import { CandidateSummary } from "../utils/types";
import { DataSource } from "typeorm";

export async function findCandidateByEmail(
  email: string
): Promise<Candidate | null> {
  return await Candidate.findOne({ where: { email } });
}

export async function createCandidate(candidateData: any): Promise<Candidate> {
  return await Candidate.create(candidateData).save();
}

export async function findCandidateById(id: number): Promise<Candidate | null> {
  return await Candidate.findOne({ where: { id } });
}

export async function fetchCandidatesSummary(
  status: string | null,
  sortOrder: "ASC" | "DESC",
  pageNumber: number,
  pageSize: number,
  datasource:DataSource
): Promise<CandidateSummary[]> {
  let query = Constants.CANDIDATE_SUMMARY_QUERY;

  const params: any[] = [];

  if (status) {
    query += `
      WHERE cr.status = ?`;
    params.push(status);
  }

  query += `
    ORDER BY c.created_at ${sortOrder}
    LIMIT ? OFFSET ?`;

  params.push(pageSize, (pageNumber - 1) * pageSize);

  return await datasource.query<CandidateSummary[]>(query, params);
}
