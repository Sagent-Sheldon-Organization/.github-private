import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UnauthorizedError } from "../error/UnauthorizedError";

interface AuthRequest extends Request {
  user?: string | object;
}
const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
):void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new UnauthorizedError("Authorization Header is missing");
  }

  try {
    const decoded = jwt.verify(token, "secret-key");
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new UnauthorizedError("Invalid Token");
    }
    next(error);
  }
};

export default authMiddleware;
