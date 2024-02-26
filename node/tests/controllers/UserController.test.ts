import { Request, Response, NextFunction } from "express";
import * as UserController from "../../src/controllers/UserController";
import * as UserService from "../../src/services/UserService";

describe("User Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("signup", () => {
    it("should create a new user successfully", async () => {
      req.body = { username: "testuser", password: "testpassword" };

      // Mock the UserService.signup function
      jest.spyOn(UserService, "signup").mockResolvedValue({ ...req.body });

      await UserController.signup(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 201,
        message: "User created successfully",
      });
    });
  });

  describe("signin", () => {
    it("should sign in a user successfully", async () => {
      req.body = { username: "testuser", password: "testpassword" };

      // Mock the UserService.signin function
      jest.spyOn(UserService, "signin").mockResolvedValueOnce("mockedToken");

      await UserController.signin(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: "mockedToken" });
    });


  });
});
