// Module 3:
// * create selectors

export const getCoursesSelector = (state) => state.courses.value;
export const getAuthorsSelector = (state) => state.authors.value;
export const getUserNameSelector = (state) => state.user.name;
export const getUserRoleSelector = (state) => state.user.role;
export const getUserTokenSelector = (state) => state.user.token;
