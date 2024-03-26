import {
  createUser,
  login,
  getCourses,
  getAuthors,
  getCurrentUser,
} from "../services";

global.fetch = jest.fn();

describe("createUser", () => {
  it("sends a POST request to the correct URL with the provided data", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };

    const responseData = {
      success: true,
      message: "User created successfully",
    };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseData),
    });

    const response = await createUser(userData);

    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response).toEqual(responseData);
  });
});

describe("login", () => {
  it("sends a POST request to the correct URL with the provided data", async () => {
    const loginData = {
      email: "john@example.com",
      password: "password123",
    };

    const responseData = {
      success: true,
      message: "Login successful",
      user: { name: "John Doe", email: "john@example.com" },
    };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseData),
    });

    const response = await login(loginData);

    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response).toEqual(responseData);
  });
});

describe("getCourses", () => {
  it("sends a GET request to the correct URL", async () => {
    const responseData = [
      { id: 1, title: "Course 1", description: "Description 1" },
      { id: 2, title: "Course 2", description: "Description 2" },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseData),
    });

    const response = await getCourses();

    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/courses/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response).toEqual(responseData);
  });
});

describe("getAuthors", () => {
  it("sends a GET request to the correct URL", async () => {
    const responseData = [
      { id: 1, name: "Author 1" },
      { id: 2, name: "Author 2" },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseData),
    });
    const response = await getAuthors();

    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/authors/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(response).toEqual(responseData);
  });
});

describe("getCurrentUser", () => {
  it("sends a GET request to the correct URL with authorization header", async () => {
    const responseData = { name: "John Doe", email: "john@example.com" };
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseData),
    });

    const accessToken = "mockAccessToken";
    const response = await getCurrentUser(accessToken);

    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer mockAccessToken",
      },
    });
    expect(response).toEqual(responseData);
  });
});
