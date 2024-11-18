export const prettyNumber = (num: number) => {
  if (num / 1000 > 1) {
    return Math.round(num / 1000) + "K";
  }
  return num;
};
