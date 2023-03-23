export const compareDate = (d1, d2) => {
  if (d1.getYear() !== d2.getYear()) return d1.getYear() - d2.getYear();
  if (d1.getMonth() !== d2.getMonth()) return d1.getMonth() - d2.getMonth();
  return d1.getDate() - d2.getDate();
};

export const offsetDate = (date) => {
  return offsetDateObj(date).toISOString().slice(0, 10);
}

export const offsetDateObj = (date) => {
  const copy = new Date(date);
  copy.setTime(copy.getTime() - copy.getTimezoneOffset()*60_000);
  return copy;
}