import { Constants } from "./Constants";

export const candidateSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    name: { type: "string",minLength:5 },
    dob: { type: "string", format: "date" },
    phone: { type: "string",minLength:5 },
    ssn: { type: "string",minLength:5 },
    zipcode: { type: "string", format: "int64" },
    location: { type: "string",minLength:5 },
    driversLicense: { type: "string",minLength:5 },
  },
  required: [
    "email",
    "name",
    "dob",
    "phone",
    "ssn",
    "zipcode",
    "location",
    "driversLicense",
  ],
  additionalProperties: false,
};

export const actionsSummarypaginationQuerySchema = {
  type: "object",
  properties: {
    pageSize: { type: "string", pattern: Constants.NUMBER_REGEX },
    pageNumber: { type: "string", pattern: Constants.NUMBER_REGEX },
    status: { type: "string", enum: Constants.ACTION_SUMMARY_STATUSES },
    sortByDate: { type: "string", enum: Constants.SORT_ORDER },
  },
  additionalProperties: false,
};

export const candidatesSummarypaginationQuerySchema = {
  type: "object",
  properties: {
    pageSize: { type: "string", pattern: Constants.NUMBER_REGEX },
    pageNumber: { type: "string", pattern: Constants.NUMBER_REGEX },
    status: { type: "string", enum: Constants.CANDIDATES_SUMMARY_STATUSES },
    sortByDate: { type: "string", enum: Constants.SORT_ORDER },
  },
  additionalProperties: false,
};

export const userSchema = {
  type: "object",
  properties: {
    username: { type: "string",minLength: 5 },
    password: { type: "string",minLength: 6 },
  },
  required: ["username", "password"],
  additionalProperties: false,
};

export const candidateReportSchema = {
  type: "object",
  properties: {
    candidateId: { type: "number" },
    adjudication: { type: "string", enum: ["adverseaction", "engage"] },
  },
  required: ["candidateId", "adjudication"],
  additionalProperties: false,
};

export const candidateParamsSchema = {
  type: "object",
  properties: {
    id: { type: "string", pattern: Constants.NUMBER_REGEX },
  },
  required: ["id"],
  additionalProperties: false,
};
