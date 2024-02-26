import { Request, Response, NextFunction } from "express";
import * as CandidateReportService from "../../src/services/CandidateReportService";
import { updateCandidateReport } from "../../src/controllers/CandidateReportController";

describe("CandidateReport Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: {} };
    res = {
      sendStatus: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("updateCandidateReport", () => {
    it("should update Report", async () => {
      const mockBody = { candidateId: 1, adjudication: "adverseaction" };
      req.body = mockBody;
      // Mock the service function
      jest
        .spyOn(CandidateReportService, "updateReport")
        .mockResolvedValue();
      await updateCandidateReport(req as Request, res as Response);

      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

  });
});
