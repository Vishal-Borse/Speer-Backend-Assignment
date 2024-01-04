const jwt = require("jsonwebtoken");
const authMiddleware = require("../../middleware/auth");

// Mocks
jest.mock("jsonwebtoken");

describe("Auth Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    // Mock request, response, and next function
    req = {
      headers: {
        authorization: "Bearer mockToken",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should set userId in request and call next if valid token is provided", () => {
    // Mock jwt.verify to return a user object
    const user = { id: "mockUserId" };
    jwt.verify.mockReturnValueOnce(user);

    // Call the middleware
    authMiddleware(req, res, next);

    // Assertions
    expect(req.userId).toBe("mockUserId");
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should return 401 and send 'Unauthorized User' message if no token is provided", () => {
    // Remove authorization header from the request
    delete req.headers.authorization;

    // Call the middleware
    authMiddleware(req, res, next);

    // Assertions
    expect(req.userId).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized User" });
  });

  it("should return 401 and send 'Unauthorized User' message if jwt.verify throws an error", () => {
    // Mock jwt.verify to throw an error
    jwt.verify.mockImplementationOnce(() => {
      throw new Error("Simulated verify error");
    });

    // Call the middleware
    authMiddleware(req, res, next);

    // Assertions
    expect(req.userId).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized User" });
  });
});
