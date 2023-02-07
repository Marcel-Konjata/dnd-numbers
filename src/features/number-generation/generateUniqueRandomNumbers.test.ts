import { generateUniqueRandomNumbers } from './generateUniqueRandomNumbers';

describe('generate array of unique numbers', () => {
  test('test generation of 3 different random numbers', () => {
    //preparation
    const generatedRandomNumbers = generateUniqueRandomNumbers();

    //assertion
    expect(generatedRandomNumbers).toHaveLength(3);
  });
});
