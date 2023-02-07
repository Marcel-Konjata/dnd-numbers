import { generateStaticNumbersList } from './generateStaticNumbers';

describe('test static number generator', () => {
  test('basic usecase from 1-9 will return array of length 9 and correct values', () => {
    const expectedResult = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const generatedValues = generateStaticNumbersList(1, 9);

    expect(generatedValues).toHaveLength(9);
    expect(generatedValues).toEqual(expectedResult);
  });

  test('basic usecase from 2-12 will return array of length 11 and correct values', () => {
    const expectedResult = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const generatedValues = generateStaticNumbersList(2, 12);

    expect(generatedValues).toHaveLength(11);
    expect(generatedValues).toEqual(expectedResult);
  });
});
