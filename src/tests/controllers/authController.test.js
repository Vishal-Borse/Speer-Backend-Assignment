

const request = require("supertest");
const app = require("../../index"); // Update the path accordingly
const userModel = require("../../models/userModel"); // Update the path accordingly
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../../models/userModel");

describe("Signup API", () => {
  it("should create a new user and return a token", async () => {
    const userMock = {
      username: "testuser",
      email: "test@example.com",
      password: "testpassword",
    };

    // Mock the existing user check to return null (user does not exist)
    userModel.findOne = jest.fn().mockReturnValue(null);

    // Mock bcrypt.hash to return a hashed password
    bcrypt.hash = jest.fn().mockReturnValue("hashedPassword");

    // Mock userModel.create to return a new user
    userModel.create = jest.fn().mockReturnValue({
      _id: "mockedUserId",
      email: userMock.email,
      password: "hashedPassword",
      username: userMock.username,
    });

    // Mock jwt.sign to return a token
    jwt.sign = jest.fn().mockReturnValue("mockedToken");

    // Call the signup API endpoint
    const response = await request(app).post("/api/auth/signup").send(userMock);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token", "mockedToken");
  });

  it("should return an error when the user already exists", async () => {
    const userMock = {
      username: "existinguser",
      email: "existing@example.com",
      password: "existingpassword",
    };

    // Mock the existing user check to return an existing user
    userModel.findOne = jest.fn().mockReturnValue({
      _id: "existingUserId",
      email: userMock.email,
      password: "existingPassword",
      username: userMock.username,
    });

    // Call the signup API endpoint
    const response = await request(app).post("/api/auth/signup").send(userMock);

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "User already exists");
  });
});

describe("Signin API", () => {
  it("should sign in a user and return a token", async () => {
    const userMock = {
      email: "test@example.com",
      password: "testpassword",
    };

    // Mock the userModel.findOne to return a user
    userModel.findOne.mockResolvedValue({
      _id: "mockedUserId",
      email: userMock.email,
      password: await bcrypt.hash(userMock.password, 10), // Hashed password
    });

    jwt.sign = jest.fn().mockReturnValue("mockedToken");

    // Call the signin API endpoint
    const response = await request(app).post("/api/auth/signin").send(userMock);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
  });

  it("should return an error when the user is not found", async () => {
    const userMock = {
      email: "nonexistent@example.com",
      password: "nonexistentpassword",
    };

    // Mock the userModel.findOne to return null (user not found)
    userModel.findOne.mockResolvedValue(null);

    // Call the signin API endpoint
    const response = await request(app).post("/api/auth/signin").send(userMock);

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "User not found!");
  });

  it("should return an error for invalid credentials", async () => {
    const userMock = {
      email: "test@example.com",
      password: "invalidpassword",
    };

    // Mock the userModel.findOne to return a user
    userModel.findOne.mockResolvedValue({
      _id: "mockedUserId",
      email: userMock.email,
      password: await bcrypt.hash("correctpassword", 10), // Correct hashed password
    });

    // Call the signin API endpoint
    const response = await request(app).post("/api/auth/signin").send(userMock);

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid Credentials! ");
  });
});
