export const getString = (value: string | number) => {
  if (typeof value === "string") {
    return value;
  }
  return String(value);
};
export const getNumber = (value: string | number) => {
  if (typeof value === "string") {
    return Number(value);
  }
  return value;
};
