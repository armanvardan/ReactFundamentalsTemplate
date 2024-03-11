// Module 3:
// * create selectors

export const getCoursesSelector = (state) => state.courses.value;
export const getAuthorsSelector = (state) => state.authors.value;
export const getUserNameSelector = (state) => {
  console.log("arman0 = ", state.user.name);
  return state.user.name;
};
export const getUserRoleSelector = (state) => null;
export const getUserTokenSelector = (state) => null;
