import { AppDataSource } from "../datasource/database";
import { getAdverseActions } from "../repository/AdverseActionRepository";
import {
  AdverseActionsSummary,
  AdverseActionsSummaryResponse,
} from "../utils/types";

export async function getAdverseActionsSummary(
  queryParamas: any
): Promise<AdverseActionsSummaryResponse> {
  const { pageNumber, pageSize, status, sortByDate } = queryParamas;
  const parsedPageNumber = pageNumber ? parseInt(pageNumber) : 1;
  const parsedPageSize = pageSize ? parseInt(pageSize) : 10;
  const sortOrder = sortByDate || "DESC";

  const data: AdverseActionsSummary[] = await getAdverseActions(
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
