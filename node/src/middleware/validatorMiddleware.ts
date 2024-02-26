import Ajv, { ValidateFunction, ErrorObject } from "ajv";
import { Request, Response, NextFunction } from "express";
import addFormats from "ajv-formats";
import { BadRequestError } from "../error/BadRequestError";

const ajv = new Ajv();
addFormats(ajv);

const validateSchemaMiddleware = (
  schema: object,
  dataExtractor: (req: Request) => any
) => {
  const validate: ValidateFunction = ajv.compile(schema);

  return (req: Request, res: Response, next: NextFunction) => {
    const data = dataExtractor(req);
    const isValid = validate(data);
    if (!isValid) {
      const errors: ErrorObject[] | null | undefined = validate.errors;
      throw new BadRequestError(JSON.stringify(errors));
    }
    next();
  };
};

// Middleware function to validate the request body against the schema
export const validateBodySchemaMiddleware = (schema: object) =>
  validateSchemaMiddleware(schema, (req: Request) => req.body);

// Middleware function to validate the Query Params against the schema
export const validateQuerySchemaMiddleware = (schema: object) =>
  validateSchemaMiddleware(schema, (req: Request) => req.query);

// Middleware function to validate the Path Params against the schema
export const validatePathParamsSchemaMiddleware = (schema: object) =>
  validateSchemaMiddleware(schema, (req: Request) => req.params);
