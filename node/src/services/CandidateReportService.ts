import { NotFoundError } from "../error/NotFoundError";
import {
  findReportBycandidateId,
  upsertCandidateReport,
} from "../repository/CandidateReportRepository";
import { createAdverseaction } from "../repository/AdverseActionRepository";
import { findCandidateById } from "../repository/CandidateRepository";
import { Constants } from "../utils/Constants";

export async function updateReport(candidateId: number, adjudication: string):Promise<void> {
  const candidate = await findCandidateById(candidateId);
  if (!candidate) {
    throw new NotFoundError("Candidate Not Found");
  }
  const report = await findReportBycandidateId(candidateId);
  if (!report) {
    throw new NotFoundError("Candidate Report Not Found");
  }
  if (
    adjudication.toLowerCase() === Constants.ADVERSE_ACTION &&
    report.adjudication !== Constants.ADVERSE_ACTION
  ) {
    await createAdverseaction({
      status: "scheduled",
      preNoticeDate: new Date(),
      candidate,
    });
  }

  report.adjudication = adjudication;
  await upsertCandidateReport(report);
}
