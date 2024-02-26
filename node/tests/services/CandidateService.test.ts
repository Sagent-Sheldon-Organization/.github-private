import {
  createNewCandidate,
  getCandidateById,
  getCandidatesSummary,
} from "../../src/services/CandidateService";
import * as CandidateRepository from "../../src/repository/CandidateRepository";
import * as CandidateReportRepository from "../../src/repository/CandidateReportRepository";
import * as CourtSearchRepository from "../../src/repository/CourtSearchRepository";
import { ConflictError } from "../../src/error/ConflictError";
import { NotFoundError } from "../../src/error/NotFoundError";
import { Constants } from "../../src/utils/Constants";
import { Candidate } from "../../src/entities/Candidate";
import { CandidateReport } from "../../src/entities/CandidateReport";
import { CourtSearch } from "../../src/entities/CourtSearch";

jest.mock("../../src/repository/CandidateRepository");
jest.mock("../../src/repository/CandidateReportRepository");
jest.mock("../../src/repository/CourtSearchRepository");

describe("Candidate Service", () => {
  describe("createNewCandidate", () => {
    it("should create a new candidate", async () => {
      const candidateData = { email: "test@example.com" };
      const mockCandidate = { id: 1, ...candidateData };
      const mockCandidateReport = {
        id: 1,
        ...Constants.SAMPLE_CANDIDATE_REPORT_DATA,
      };
      const mockSearchValues = Constants.SAMPLE_SEARCH_VALUES_DATA.map(
        (value) => ({
          search: value,
          status: "clear",
          date: expect.any(Date),
          candidate: mockCandidate,
        })
      );

      const findCandidateByEmailSpy = jest.spyOn(
        CandidateRepository,
        "findCandidateByEmail"
      );
      findCandidateByEmailSpy.mockResolvedValue(null);

      const createCandidateSpy = jest.spyOn(
        CandidateRepository,
        "createCandidate"
      );
      createCandidateSpy.mockResolvedValue(mockCandidate as Candidate);

      const upsertCandidateReportSpy = jest.spyOn(
        CandidateReportRepository,
        "upsertCandidateReport"
      );
      upsertCandidateReportSpy.mockResolvedValue(
        mockCandidateReport as CandidateReport
      );

      const createCourtSearchSpy = jest.spyOn(
        CourtSearchRepository,
        "createCourtSearch"
      );
      createCourtSearchSpy.mockResolvedValueOnce(
        mockSearchValues[0] as CourtSearch
      );
      createCourtSearchSpy.mockResolvedValueOnce(
        mockSearchValues[1] as CourtSearch
      );
      // Additional mocks for other searches...

      const newCandidate = await createNewCandidate(candidateData);

      expect(findCandidateByEmailSpy).toHaveBeenCalledWith(candidateData.email);
      expect(createCandidateSpy).toHaveBeenCalledWith(candidateData);
      expect(upsertCandidateReportSpy).toHaveBeenCalledWith({
        ...Constants.SAMPLE_CANDIDATE_REPORT_DATA,
        candidate: mockCandidate,
      });
      expect(createCourtSearchSpy).toHaveBeenCalledWith({
        search: Constants.SAMPLE_SEARCH_VALUES_DATA[0],
        status: "clear",
        date: expect.any(Date),
        candidate: mockCandidate,
      });
      expect(createCourtSearchSpy).toHaveBeenCalledWith({
        search: Constants.SAMPLE_SEARCH_VALUES_DATA[1],
        status: "clear",
        date: expect.any(Date),
        candidate: mockCandidate,
      });
      // Additional expectations for other searches...
      expect(newCandidate).toEqual(mockCandidate);

      // Restore spies
      findCandidateByEmailSpy.mockRestore();
      createCandidateSpy.mockRestore();
      upsertCandidateReportSpy.mockRestore();
      createCourtSearchSpy.mockRestore();
    });

    it("should throw ConflictError if candidate exists with given email", async () => {
      const candidateData = { email: "test@example.com" };
      jest
        .spyOn(CandidateRepository, "findCandidateByEmail")
        .mockResolvedValue(new Candidate());

      await expect(createNewCandidate(candidateData)).rejects.toThrowError(
        ConflictError
      );
    });
  });

  describe("getCandidateById", () => {
    it("should get candidate by ID", async () => {
      const mockCandidateId = "1";
      const mockCandidate = { id: mockCandidateId, name: "John Doe" };
      const mockCandidateReport = { id: 1, ...Constants.SAMPLE_CANDIDATE_REPORT_DATA };
      const mockCourtSearches = [{ id: 1, search: "search1" }];

      jest
        .spyOn(CandidateRepository, "findCandidateById")
        .mockResolvedValue(new Candidate());
      jest
        .spyOn(CandidateReportRepository, "findReportBycandidateId")
        .mockResolvedValue(new CandidateReport());
      jest
        .spyOn(CourtSearchRepository, "findSearchesByCandidateId")
        .mockResolvedValue([]);

      const candidateDetails = await getCandidateById(mockCandidateId);

      expect(candidateDetails).not.toBeNull;
    });

    it("should throw NotFoundError if candidate with given ID does not exist", async () => {
      const mockCandidateId = "1";
      jest
        .spyOn(CandidateRepository, "findCandidateById")
        .mockResolvedValue(null);

      await expect(getCandidateById(mockCandidateId)).rejects.toThrowError(
        NotFoundError
      );
    });
  });

  describe("getCandidatesSummary", () => {
    it("should return candidates summary", async () => {
      const mockQueryParamas = {
        pageNumber: 2,
        pageSize: 10,
        status: "clear",
        sortByDate: "DESC",
      };
      const mockCandidatesSummary = [
        {
          name: "John",
          location: "calfornia",
          status: "clear",
          adjudication: "adverseaction",
          createdAt: new Date(),
        },
      ];
      const result = {
        data: mockCandidatesSummary,
        totalCount: 1,
        paging: { pageNumber: 2, pageSize: 10 },
      };

      jest
        .spyOn(CandidateRepository, "fetchCandidatesSummary")
        .mockResolvedValue(mockCandidatesSummary);

      const candidatesSummary = await getCandidatesSummary(mockQueryParamas);

      expect(candidatesSummary).toEqual(result);
    });
  });

  describe("getCandidatesSummary by Default Query Params", () => {
    it("should return candidates summary", async () => {
      const mockCandidatesSummary = [
        {
          name: "John",
          location: "calfornia",
          status: "clear",
          adjudication: "adverseaction",
          createdAt: new Date(),
        },
      ];
      const result = {
        data: mockCandidatesSummary,
        totalCount: 1,
        paging: { pageNumber: 1, pageSize: 10 },
      };
      jest
        .spyOn(CandidateRepository, "fetchCandidatesSummary")
        .mockResolvedValue(mockCandidatesSummary);

      const candidatesSummary = await getCandidatesSummary({});

      expect(candidatesSummary).toEqual(result);
    });
  });
});
