export const formatCreationDate = (date) => {
  // write your solution here
  if (date.length > 0) {
    date = date.split("/").join(".");
  }
  return date;
};
