import {
  findCandidateByEmail,
  createCandidate,
  findCandidateById,
  fetchCandidatesSummary,
} from "../repository/CandidateRepository";
import {
  upsertCandidateReport,
  findReportBycandidateId,
} from "../repository/CandidateReportRepository";
import {
  createCourtSearch,
  findSearchesByCandidateId,
} from "../repository/CourtSearchRepository";
import { ConflictError } from "../error/ConflictError";
import { Constants } from "../utils/Constants";
import { NotFoundError } from "../error/NotFoundError";
import { CandidateInfo, CandidateSummary, CandidatesSummaryResponse } from "../utils/types";
import { Candidate } from "../entities/Candidate";
import { AppDataSource } from "../datasource/database";

export async function createNewCandidate(candidateData: any):Promise<Candidate> {
  const { email } = candidateData;
  const candidateExists = await findCandidateByEmail(email);
  if (candidateExists) {
    throw new ConflictError("Candidate already exists with given email");
  }

  const newCandidate = await createCandidate(candidateData);
  await upsertCandidateReport({
    ...Constants.SAMPLE_CANDIDATE_REPORT_DATA,
    candidate: newCandidate,
  });

  for (const searchValue of Constants.SAMPLE_SEARCH_VALUES_DATA) {
    await createCourtSearch({
      search: searchValue,
      status: "clear",
      date: new Date(),
      candidate: newCandidate,
    });
  }
  return newCandidate;
}

export async function getCandidateById(id: string):Promise<CandidateInfo> {
  const candidate = await findCandidateById(parseInt(id));
  if (!candidate) {
    throw new NotFoundError("candidate not found with given Id");
  }
  const candidateReport = await findReportBycandidateId(candidate.id);
  const courtSearches = await findSearchesByCandidateId(candidate.id);
  return { candidate, candidateReport, courtSearches };
}

export async function getCandidatesSummary(
  queryParamas: any
): Promise<CandidatesSummaryResponse> {
  const { pageNumber, pageSize, status, sortByDate } = queryParamas;
  const parsedPageNumber = pageNumber ? parseInt(pageNumber) : 1;
  const parsedPageSize = pageSize ? parseInt(pageSize) : 10;
  const sortOrder = sortByDate || "DESC";

  const data: CandidateSummary[] = await fetchCandidatesSummary(
    status,
    sortOrder,
    parsedPageNumber,
    parsedPageSize,
    AppDataSource
  );

  return {
    totalCount: data.length,
    data,
    paging: {
      pageNumber: parsedPageNumber,
      pageSize: parsedPageSize,
    },
  };
}
