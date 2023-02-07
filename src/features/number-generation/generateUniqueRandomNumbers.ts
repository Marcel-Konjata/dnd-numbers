import { generateRandomNumber } from './generateRandomNumber';

export const generateUniqueRandomNumbers = (
  uniqueNumbersCount = 3,
  rangeFromNumber = 1,
  rangeToNumber = 9,
  decimalAllowed = false,
): Array<number> => {
  //note: there must be fill with some value, number null or whatever, otherwise array is not iterable
  const uniqueNumbers = new Array(uniqueNumbersCount).fill(0);

  return uniqueNumbers.reduce((prev, currentValue, index) => {
    let generatedUniqueNumber = generateRandomNumber(
      rangeFromNumber,
      rangeToNumber,
      decimalAllowed,
    );
    if (index === 0) {
      return [...prev, generatedUniqueNumber];
    }

    while (prev.includes(generatedUniqueNumber)) {
      generatedUniqueNumber = generateRandomNumber(
        rangeFromNumber,
        rangeToNumber,
        decimalAllowed,
      );
    }

    return [...prev, generatedUniqueNumber];
  }, []);
};
