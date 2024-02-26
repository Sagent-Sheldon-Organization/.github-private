import authMiddleware from "../../src/middleware/authMiddleware";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UnauthorizedError } from "../../src/error/UnauthorizedError";

// Mocks
jest.mock("jsonwebtoken");
const mockedJwt = jwt as jest.Mocked<typeof jwt>;

describe("authMiddleware", () => {
  let req: any, res: any, next: any;

  beforeEach(() => {
    req = {
      header: jest.fn(),
    };
    res = {};
    next = jest.fn();
  });

  it("should throw UnauthorizedError if Authorization header is missing", () => {
    req.header.mockReturnValue(undefined);

    expect(() => {
      authMiddleware(req, res, next);
    }).toThrow(UnauthorizedError);
    expect(next).not.toHaveBeenCalled();
  });

  it("should throw UnauthorizedError if token is invalid", () => {
    req.header.mockReturnValue("invalid-token");
    mockedJwt.verify.mockImplementation(() => {
      throw new JsonWebTokenError("Invalid token");
    });

    expect(() => {
      authMiddleware(req, res, next);
    }).toThrow(UnauthorizedError);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next with error if token is invalid", () => {
    const error = new Error("Invalid token");
    req.header.mockReturnValue("invalid-token");
    mockedJwt.verify.mockImplementation(() => {
      throw error;
    });

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it("should set user in request and call next() if token is valid", () => {
    const decodedToken = { userId: "user123" };
    req.header.mockReturnValue("valid-token");
    mockedJwt.verify.mockImplementation(() => decodedToken);
    authMiddleware(req, res, next);

    expect(req.user).toEqual(decodedToken);
    expect(next).toHaveBeenCalled();
  });
});
