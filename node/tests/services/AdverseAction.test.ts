import { getAdverseActionsSummary } from "../../src/services/AdverseActionService";
import * as AdverseActionRepository from "../../src/repository/AdverseActionRepository";


jest.mock("../../src/repository/AdverseActionRepository");

describe("AdverseAction Service", () => {
  describe("getCandidatesSummary", () => {
    it("should return candidates summary", async () => {
      const mockQueryParamas = {
        pageNumber: 2,
        pageSize: 10,
        status: "clear",
        sortByDate: "DESC",
      };
      const mockactionsSummary = [
        {
          name: "John",
          status: "clear",
          preNoticeDate: new Date(),
          postNoticeDate: new Date(),
        },
      ];
      const result = {
        data: mockactionsSummary,
        totalCount: 1,
        paging: { pageNumber: 2, pageSize: 10 },
      };

      jest
        .spyOn(AdverseActionRepository, "getAdverseActions")
        .mockResolvedValue(mockactionsSummary);

      const actionsSummary = await getAdverseActionsSummary(mockQueryParamas);

      expect(actionsSummary).toEqual(result);
    });
  });
  it("should return candidates summary by default params", async () => {
    const mockactionsSummary = [
        {
          name: "John",
          status: "clear",
          preNoticeDate: new Date(),
          postNoticeDate: new Date(),
        },
      ];
      const result = {
        data: mockactionsSummary,
        totalCount: 1,
        paging: { pageNumber: 1, pageSize: 10 },
      };

      jest
        .spyOn(AdverseActionRepository, "getAdverseActions")
        .mockResolvedValue(mockactionsSummary);

    const actionsSummary = await getAdverseActionsSummary({});

    expect(actionsSummary).toEqual(result);
  });
});
