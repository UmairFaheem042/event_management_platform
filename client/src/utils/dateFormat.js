export const formatDate = (eventDate) => {
  const [datePart, timePart] = eventDate.split(" "); // Separate date and time
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);
  const eventDateTime = new Date(year, month - 1, day, hours, minutes);
  const now = new Date();
  const result = eventDateTime < now ? "Passed" : "Upcoming";

  return result;
};

export const convertToDate = (eventDateString) => {
  const [datePart, timePart] = eventDateString.split(" ");
  const [day, month, year] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};
