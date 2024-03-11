export const formatCreationDate = (date) => {
  if (date?.length > 0) {
    date = date.split("/").join(".");
  }
  return date;
};
