import { updateReport } from "../../src/services/CandidateReportService";
import * as CandidateRepository from "../../src/repository/CandidateRepository";
import * as CandidateReportRepository from "../../src/repository/CandidateReportRepository";
import * as AdverseActionRepository from "../../src/repository/AdverseActionRepository";
import { ConflictError } from "../../src/error/ConflictError";
import { Constants } from "../../src/utils/Constants";
import { Candidate } from "../../src/entities/Candidate";
import { CandidateReport } from "../../src/entities/CandidateReport";
import { CourtSearch } from "../../src/entities/CourtSearch";
import { NotFoundError } from "../../src/error/NotFoundError";

jest.mock("../../src/repository/CandidateReportRepository");
jest.mock("../../src/repository/AdverseActionRepository");
jest.mock("../../src/repository/CandidateRepository");

describe("updateReport", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw NotFoundError if candidate is not found", async () => {
    jest
      .spyOn(CandidateRepository, "findCandidateById")
      .mockResolvedValue(null);
    await expect(updateReport(1, Constants.ADVERSE_ACTION)).rejects.toThrow(
      NotFoundError
    );
    expect(CandidateRepository.findCandidateById).toHaveBeenCalledWith(1);
  });

  it("should throw NotFoundError if candidate report is not found", async () => {
    jest
      .spyOn(CandidateRepository, "findCandidateById")
      .mockResolvedValue(new Candidate());
    jest
      .spyOn(CandidateReportRepository, "findReportBycandidateId")
      .mockResolvedValue(null);

    await expect(updateReport(1, Constants.ADVERSE_ACTION)).rejects.toThrow(
      NotFoundError
    );
    expect(
      CandidateReportRepository.findReportBycandidateId
    ).toHaveBeenCalledWith(1);
  });

  it("should create adverse action if adjudication is adverse and report adjudication is not adverse", async () => {
    const mockCandidate = new Candidate();
    const mockReport = new CandidateReport();

    jest
      .spyOn(CandidateRepository, "findCandidateById")
      .mockResolvedValue(mockCandidate);
    jest
      .spyOn(CandidateReportRepository, "findReportBycandidateId")
      .mockResolvedValue(mockReport);

    await updateReport(1, Constants.ADVERSE_ACTION);

    expect(AdverseActionRepository.createAdverseaction).toHaveBeenCalledWith({
      status: "scheduled",
      preNoticeDate: expect.any(Date),
      candidate: mockCandidate,
    });
    expect(CandidateReportRepository.upsertCandidateReport).toHaveBeenCalledWith({
      ...mockReport,
      adjudication: Constants.ADVERSE_ACTION,
    });
  });

  it('should update report adjudication if adjudication is not adverse', async () => {
    const mockCandidate = new Candidate();
    const mockReport = new CandidateReport();
    mockReport.adjudication = Constants.ADVERSE_ACTION
    jest
      .spyOn(CandidateRepository, "findCandidateById")
      .mockResolvedValue(mockCandidate);
    jest
      .spyOn(CandidateReportRepository, "findReportBycandidateId")
      .mockResolvedValue(mockReport);

    await updateReport(1, Constants.ENGAGE);

    expect(AdverseActionRepository.createAdverseaction).not.toHaveBeenCalledWith({
      status: "scheduled",
      preNoticeDate: expect.any(Date),
      candidate: mockCandidate,
    });
    expect(CandidateReportRepository.upsertCandidateReport).toHaveBeenCalledWith({
      ...mockReport,
      adjudication: Constants.ENGAGE,
    });
});
})