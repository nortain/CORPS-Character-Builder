import { FirstLetterOnlyPipe } from './first-letter-only.pipe';

describe('FirstLetterOnlyPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstLetterOnlyPipe();
    expect(pipe).toBeTruthy();
  });

  it('should be able to pull each capital letter', () => {
    const pipe = new FirstLetterOnlyPipe();
    const testString = "WowYouAreAwesome";
    const resultString = "WYAA";
    expect(pipe.transform(testString)).toBe(resultString);
  });

  it('should be able to pull each capital letter when seperated by spaces', () => {
    const pipe = new FirstLetterOnlyPipe();
    const testString = "Is That what you Were Thinking?";
    const resultString = "ITWT";
    expect(pipe.transform(testString)).toBe(resultString);
  });
});
