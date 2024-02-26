import {BadRequestError} from "../../src/error/BadRequestError"
import {ConflictError} from "../../src/error/ConflictError"
import {NotFoundError} from "../../src/error/NotFoundError"
import {UnauthorizedError} from "../../src/error/UnauthorizedError"

describe('BadRequestError', () => {
  it('should create an instance with correct message and status code', () => {
    // Define a test message
    const errorMessage = 'Bad request error message';

    // Create a new instance of BadRequestError
    const error = new BadRequestError(errorMessage);

    // Verify that the error has the correct properties
    expect(error.message).toBe(errorMessage);
    expect(error.name).toBe('BadRequestError');
    expect(error.statusCode).toBe(400);
  });
});

describe('ConflictError', () => {
    it('should create an instance with correct message and status code', () => {
      // Define a test message
      const errorMessage = 'Conflict error message';
  
      // Create a new instance of ConflictError
      const error = new ConflictError(errorMessage);
  
      // Verify that the error has the correct properties
      expect(error.message).toBe(errorMessage);
      expect(error.name).toBe('ConflictError');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('NotFoundError', () => {
    it('should create an instance with correct message and status code', () => {
      // Define a test message
      const errorMessage = 'NotFoundError error message';
  
      // Create a new instance of NotFoundError
      const error = new NotFoundError(errorMessage);
  
      // Verify that the error has the correct properties
      expect(error.message).toBe(errorMessage);
      expect(error.name).toBe('NotFoundError');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('UnauthorizedError', () => {
    it('should create an instance with correct message and status code', () => {
      // Define a test message
      const errorMessage = 'UnauthorizedError error message';
  
      // Create a new instance of UnauthorizedError
      const error = new UnauthorizedError(errorMessage);
  
      // Verify that the error has the correct properties
      expect(error.message).toBe(errorMessage);
      expect(error.name).toBe('UnauthorizedError');
      expect(error.statusCode).toBe(401);
    });
  });
  