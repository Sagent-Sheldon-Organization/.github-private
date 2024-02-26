import { Request, Response, NextFunction } from "express";
import * as CandidateService from "../../src/services/CandidateService";
import {
  createCandidate,
  getCandidate,
  getSummary,
} from "../../src/controllers/CandidateController";
import { Candidate } from "../../src/entities/Candidate";
import { CandidateReport } from "../../src/entities/CandidateReport";

describe("Candidate Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createCandidate", () => {
    it("should create a new candidate", async () => {
      const mockCandidateData = { name: "John Doe", email: "john@example.com" };
      const mockNewCandidate = { id: 1, ...mockCandidateData };
      req.body = mockCandidateData;
      // Mock the service function
      jest
        .spyOn(CandidateService, "createNewCandidate")
        .mockResolvedValue(mockNewCandidate as Candidate);
      await createCandidate(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockNewCandidate);
    });

  });

  describe("getCandidate", () => {
    it("should get a candidate by ID", async () => {
      const mockCandidateId = "1";
      const mockCandidate = {
        candidate: new Candidate(),
        candidateReport: new CandidateReport(),
        courtSearches: [],
      };
      jest
        .spyOn(CandidateService, "getCandidateById")
        .mockResolvedValue(mockCandidate);
      // Mock the request parameters
      req.params = { id: mockCandidateId };

      await getCandidate(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCandidate);
    });
  });

  describe("getSummary", () => {
    it("should get candidates summary", async () => {
      const mockCandidateSummary = {
        data: [],
        totalCount: 1,
        paging: { pageNumber: 2, pageSize: 10 },
      };

      jest
        .spyOn(CandidateService, "getCandidatesSummary")
        .mockResolvedValue(mockCandidateSummary);
      // Mock request query
      req.query = { status: "Active" };

      await getSummary(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCandidateSummary);
    });
  });
});
