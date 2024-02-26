import { Request, Response, NextFunction } from "express";
import * as AdverseActionService from "../../src/services/AdverseActionService";
import {
  getActionsSummary
} from "../../src/controllers/AdverseActionController";


describe("AdverseAction Controller", () => {
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


  describe("getSummary", () => {
    it("should get AdverseActions summary", async () => {
      const mockAdverseActionsSummary = {
        data: [],
        totalCount: 1,
        paging: { pageNumber: 2, pageSize: 10 },
      };

      jest
        .spyOn(AdverseActionService, "getAdverseActionsSummary")
        .mockResolvedValue(mockAdverseActionsSummary);
      // Mock request query
      req.query = { status: "Active" };

      await getActionsSummary(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAdverseActionsSummary);
    });
  });
});
