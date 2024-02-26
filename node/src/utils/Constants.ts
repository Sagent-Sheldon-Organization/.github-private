export class Constants {
  static readonly CANDIDATE_SUMMARY_QUERY = `
    SELECT c.name , c.location, c.created_at AS createdAt, cr.status, cr.adjudication
    FROM candidate c
    JOIN candidate_report cr ON c.id = cr.candidate_id
  `;

  static readonly ADVERSE_ACTIONS_QUERY = `
  SELECT c.name,  a.status, a.pre_notice_date as preNoticeDate,a.post_notice_date as postNoticeDate
  FROM candidate c
  JOIN adverse_action a ON c.id = a.candidate_id`;

  static readonly SAMPLE_CANDIDATE_REPORT_DATA = {
    status: "clear",
    packageType: "Employee Pro",
  };

  static readonly SAMPLE_SEARCH_VALUES_DATA = [
    "SSN Verification",
    "Offender",
    "Criminal",
    "Global Watchlist",
  ];

  static readonly NUMBER_REGEX = "^[0-9]+$";

  static readonly ADVERSE_ACTION = "adverseaction";

  static readonly ENGAGE = "engage";

  static readonly SORT_ORDER = ["ASC", "DESC"];

  static readonly ACTION_SUMMARY_STATUSES = ["pending", "scheduled"];

  static readonly CANDIDATES_SUMMARY_STATUSES = ["clear", "consider"];
}
