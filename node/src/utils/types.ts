import { Candidate } from "../entities/Candidate";
import { CandidateReport } from "../entities/CandidateReport";
import { CourtSearch } from "../entities/CourtSearch";

export type CandidateSummary = {
    name: string;
    location: string;
    createdAt: Date;
    status: string;
    adjudication: string;
  };

export  type PagingInfo = {
    pageNumber: number;
    pageSize: number;
  }
  
export  type CandidatesSummaryResponse = {
    totalCount: number;
    data: CandidateSummary[];
    paging: PagingInfo;
  }

export type CandidateInfo = {
    candidate:Candidate;
    candidateReport:CandidateReport|null;
    courtSearches:CourtSearch[]
  };

export type AdverseActionsSummary = {
    name: string;
    status: string;
    preNoticeDate: Date;
    postNoticeDate: Date;
  };

export type AdverseActionsSummaryResponse = {
  totalCount: number;
  data: AdverseActionsSummary[];
  paging: PagingInfo;
  };  