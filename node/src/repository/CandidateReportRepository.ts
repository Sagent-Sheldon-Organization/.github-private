import { CandidateReport } from "../entities/CandidateReport";

export async function upsertCandidateReport(reportData: any):Promise<CandidateReport> {
  return await CandidateReport.create(reportData).save();
}

export async function findReportBycandidateId(id: number):Promise<CandidateReport|null> {
  return await CandidateReport.findOne({
    where: { candidate: { id } },
  });
}
