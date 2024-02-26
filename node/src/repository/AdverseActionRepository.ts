import { DataSource } from "typeorm";
import { AdverseAction } from "../entities/AdverseAction";
import { Constants } from "../utils/Constants";
import { AdverseActionsSummary } from "../utils/types";

export async function createAdverseaction(adverseactionData: any) {
  return await AdverseAction.create(adverseactionData).save();
}

export async function getAdverseActions(
  status: string | null,
  sortOrder: "ASC" | "DESC",
  pageNumber: number,
  pageSize: number,
  datasource:DataSource
):Promise<AdverseActionsSummary[]> {
  let query = Constants.ADVERSE_ACTIONS_QUERY;

  const params: any[] = [];

  if (status) {
    query += `
        WHERE a.status = ?`;
    params.push(status);
  }

  query += `
    ORDER BY a.pre_notice_date ${sortOrder}
    LIMIT ? OFFSET ?`;

  params.push(pageSize, (pageNumber - 1) * pageSize);

  return await datasource.query<AdverseActionsSummary[]>(query, params);
}
