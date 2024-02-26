import * as UserService from "../../src/services/UserService";
import * as UserRepository from "../../src/repository/UserRepository";
import { ConflictError } from "../../src/error/ConflictError";
import { UnauthorizedError } from "../../src/error/UnauthorizedError";
import jwt from "jsonwebtoken";
import { User } from "../../src/entities/User";

// Mocking the UserRepository functions
jest.mock("../../src/repository/UserRepository", () => ({
  findByUsername: jest.fn(),
  createUser: jest.fn(),
}));
const signMock = jest.spyOn(jwt, 'sign') as jest.MockedFunction<typeof jwt.sign>;

// Mocking the jwt.sign function
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("UserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("signup", () => {
    it("should create a new user successfully", async () => {
      const username = "testuser";
      const password = "testpassword";

      // Mocking the UserRepository.findByUsername to return null, indicating no existing user
      jest.spyOn(UserRepository, "findByUsername").mockResolvedValueOnce(null);

      // Mocking the UserRepository.createUser to return a value
      const user = new User();
      user.username = username;
      user.password = password;
      jest
        .spyOn(UserRepository, "createUser")
        .mockResolvedValueOnce(user);

      await expect(UserService.signup(username, password)).resolves.toEqual({
        username,
        password,
      });

      // Verifying that UserRepository.findByUsername is called with the correct username
      expect(UserRepository.findByUsername).toHaveBeenCalledWith(username);

      // Verifying that UserRepository.createUser is called with the correct username and password
      expect(UserRepository.createUser).toHaveBeenCalledWith(
        username,
        password
      );
    });

    it("should throw ConflictError if user already exists", async () => {
      const username = "existinguser";
      const password = "testpassword";
      const user = new User();
      user.username = username;
      user.password = password;
      // Mocking the UserRepository.findByUsername to return an existing user
      jest
        .spyOn(UserRepository, "findByUsername")
        .mockResolvedValueOnce(user);

      await expect(UserService.signup(username, password)).rejects.toThrow(
        ConflictError
      );

      // Verifying that UserRepository.findByUsername is called with the correct username
      expect(UserRepository.findByUsername).toHaveBeenCalledWith(username);

      // Verifying that UserRepository.createUser is not called
      expect(UserRepository.createUser).not.toHaveBeenCalled();
    });
  });

  describe("signin", () => {
    it("should sign in a user successfully", async () => {
      const username = "testuser";
      const password = "testpassword";
      const user = new User();
      user.username = username;
      user.password = password;
      // Mocking the UserRepository.findByUsername to return the user
      jest.spyOn(UserRepository, "findByUsername").mockResolvedValueOnce(user);

      // Mocking user.verifyPassword to return true
      user.verifyPassword = jest.fn().mockResolvedValueOnce(true);

      // Mocking the jwt.sign function to return a token
      const token = "mockedToken";
      jest.spyOn(jwt, 'sign').mockImplementation(()=>token);

      await expect(UserService.signin(username, password)).resolves.toEqual(
        token
      );

      // Verifying that UserRepository.findByUsername is called with the correct username
      expect(UserRepository.findByUsername).toHaveBeenCalledWith(username);

      // Verifying that user.verifyPassword is called with the correct password
      expect(user.verifyPassword).toHaveBeenCalledWith(password);

      // Verifying that jwt.sign is called with the correct parameters
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: user.id, username: user.username },
        "secret-key",
        { expiresIn: "1h" }
      );
    });

    it("should throw UnauthorizedError if user does not exist or password is incorrect", async () => {
      const username = "nonexistentuser";
      const password = "incorrectpassword";
      const user = new User();
      user.username = username;
      user.password = password;
      // Mocking the UserRepository.findByUsername to return null, indicating no existing user
      jest.spyOn(UserRepository, "findByUsername").mockResolvedValueOnce(user);

      await expect(UserService.signin(username, password)).rejects.toThrow(
        UnauthorizedError
      );

      // Verifying that UserRepository.findByUsername is called with the correct username
      expect(UserRepository.findByUsername).toHaveBeenCalledWith(username);

      // Verifying that user.verifyPassword is not called

      // Verifying that jwt.sign is not called
      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });
});
