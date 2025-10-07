export const isToday = (dob) => {
  const d = new Date(dob);
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth()
  );
};  