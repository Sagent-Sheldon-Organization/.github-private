import { Request, Response, NextFunction } from "express";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
):void {
  const statusCode: number = err.statusCode || 500;
  res.status(statusCode).json({
    statusCode: statusCode,
    message: err.message || "Internal Server Error",
  });
}

export default errorHandler;
