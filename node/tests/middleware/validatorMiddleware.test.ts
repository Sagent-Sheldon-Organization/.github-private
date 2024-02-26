import {
    validateBodySchemaMiddleware,
    validateQuerySchemaMiddleware,
    validatePathParamsSchemaMiddleware,
  } from '../../src/middleware/validatorMiddleware'; // Update the path accordingly
  import { BadRequestError } from '../../src/error/BadRequestError';
  
  // Mock Express request, response, and next function
  const mockRequest = () => {
    const req: any = {};
    req.body = jest.fn().mockReturnValue({});
    req.query = jest.fn().mockReturnValue({});
    req.params = jest.fn().mockReturnValue({});
    return req;
  };
  
  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  
  const mockNext = jest.fn();
  
  // Test cases for validateBodySchemaMiddleware
describe('validateBodySchemaMiddleware', () => {
  test('should call next() if request body is valid', () => {
    const schema = { type: 'object', properties: { name: { type: 'string' } } };
    const req = mockRequest();
    const res = mockResponse();

    req.body = { name: 'John Doe' };

    validateBodySchemaMiddleware(schema)(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  test('should throw BadRequestError if request body is invalid', () => {
    const schema = { type: 'object', properties: { name: { type: 'string' } },required:['name'] };
    const req = mockRequest();
    const res = mockResponse();

    req.body = { age: 25 }; // Missing required 'name' field

    expect(() => {
      validateBodySchemaMiddleware(schema)(req, res, mockNext);
    }).toThrow(BadRequestError);
  });
});

// Test cases for validateQuerySchemaMiddleware
describe('validateQuerySchemaMiddleware', () => {
  test('should call next() if query parameters are valid', () => {
    const schema = { type: 'object', properties: { page: { type: 'number' } } ,required:['page']};
    const req = mockRequest();
    const res = mockResponse();

    req.query = { page: 1 };

    validateQuerySchemaMiddleware(schema)(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  test('should throw BadRequestError if query parameters are invalid', () => {
    const schema = { type: 'object', properties: { page: { type: 'number' } } ,required:['page']};
    const req = mockRequest();
    const res = mockResponse();

    req.query = { page: 'invalid' }; // 'page' should be a number

    expect(() => {
      validateQuerySchemaMiddleware(schema)(req, res, mockNext);
    }).toThrow(BadRequestError);
  });
});

// Test cases for validatePathParamsSchemaMiddleware
describe('validatePathParamsSchemaMiddleware', () => {
  test('should call next() if path parameters are valid', () => {
    const schema = { type: 'object', properties: { id: { type: 'string' } } };
    const req = mockRequest();
    const res = mockResponse();

    req.params = { id: '123' };

    validatePathParamsSchemaMiddleware(schema)(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  test('should throw BadRequestError if path parameters are invalid', () => {
    const schema = { type: 'object', properties: { id: { type: 'string' } },required:['id'] };
    const req = mockRequest();
    const res = mockResponse();

    req.params = { id: 123 }; // 'id' should be a string

    expect(() => {
      validatePathParamsSchemaMiddleware(schema)(req, res, mockNext);
    }).toThrow(BadRequestError);
  });
});