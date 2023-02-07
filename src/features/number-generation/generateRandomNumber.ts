/**
 * @description generates random number in range, default is 1-9
 * @param decimalAllowed allows you to get result as float, by default is disabled
 * @param rangeFromNumber accepts all number format, recommended is int format
 * @param rangeToNumber accepts all number format, recommended is int format
 * */
export const generateRandomNumber = (
  rangeFromNumber = 1,
  rangeToNumber = 9,
  decimalAllowed = false,
) => {
  const randomInRange =
    Math.random() * (rangeToNumber - rangeFromNumber) + rangeFromNumber;
  if (decimalAllowed) {
    return randomInRange;
  }

  return Math.floor(randomInRange);
};
