import { CourtSearch } from "../entities/CourtSearch";

export async function createCourtSearch(searchData: any):Promise<CourtSearch|null> {
  return await CourtSearch.create(searchData).save();
}

export async function findSearchesByCandidateId(id: number):Promise<CourtSearch[]|[]> {
  return await CourtSearch.find({ where: { candidate: { id } } });
}
