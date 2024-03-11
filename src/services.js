export const createUser = async (data) => {
  // write your code here
  const url = "http://localhost:4000/register";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  //const responseData = await response.json();
  return await response.json();
};

export const login = async (data) => {
  // write your code here
  const url = "http://localhost:4000/login";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  //const responseData = await response.json();
  return await response.json();
};

export const getCourses = async () => {
  const url = "http://localhost:4000/courses/all";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const getAuthors = async () => {
  const url = "http://localhost:4000/authors/all";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const getCurrentUser = async () => {
  // write your code here
};

export const updateCourseService = async () => {
  // write your code here
};

export const logout = async () => {
  // write your code here
};

export const deleteCourseService = async () => {
  // write your code here
};

export const createCourse = async () => {
  // write your code here
};

export const createAuthor = async () => {
  // write your code here
};
