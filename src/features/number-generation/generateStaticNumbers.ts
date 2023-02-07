export const generateStaticNumbersList = (from: number, to: number) => {
  //note: since arrays are zero index based you need add 1 to final range
  const numbersList = new Array(to - from + 1)
    .fill(null)
    .map((value, index) => from + index);

  return numbersList;
};
