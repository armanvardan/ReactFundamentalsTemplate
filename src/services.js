export const createUser = async (data) => {
  const url = "http://localhost:4000/register";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const login = async (data) => {
  const url = "http://localhost:4000/login";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
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

export const getCurrentUser = async (accessToken) => {
  const url = "http://localhost:4000/users/me";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
  return await response.json();
};

export const updateCourseService = async (course) => {
  const url = `http://localhost:4000/courses/${course.id}`;
  const accessToken = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(course),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
  return await response.json();
};

export const logout = async () => {
  const url = "http://localhost:4000/logout";
  const accessToken = localStorage.getItem("token");
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
};

export const deleteCourseService = async (courseId) => {
  const url = `http://localhost:4000/courses/${courseId}`;
  const accessToken = localStorage.getItem("token");
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
};

export const createCourse = async (data) => {
  const url = "http://localhost:4000/courses/add";
  const accessToken = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
  return await response.json();
};

export const createAuthor = async (author) => {
  const url = "http://localhost:4000/authors/add";
  const accessToken = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(author),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
  return await response.json();
};
