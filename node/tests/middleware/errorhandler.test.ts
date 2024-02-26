import errorHandler from '../../src/middleware/errorHandler'; // Update the path accordingly
import { Request, Response, NextFunction } from 'express';

describe('errorHandler', () => {
  let req: Request, res: Response, next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    next = jest.fn();
  });

  it('should respond with status code 500 and default message for internal server error', () => {
    const err = new Error('Internal Server Error');

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  });

  it('should respond with custom status code and message for specific error', () => {
    const statusCode = 404;
    const errorMessage = 'Not Found';
    const err = {
      statusCode: statusCode,
      message: errorMessage,
    };

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      statusCode: 404,
      message: 'Not Found',
    });
  });

  it('should respond with status code 500 and default message if error does not have statusCode property', () => {
    const err = {};

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  });
});
