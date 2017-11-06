import {Race} from "./race";
import {RaceType} from "./race-type.enum";

fdescribe('Race', () => {
  it('should create an instance of race', () => {
    expect(new Race(RaceType.Gryx)).toBeTruthy();
  });

  it('should be able to create a level 4 burman who has a recovery bonus of 2', () => {
    expect(new Race(RaceType.Burman, 4).recoveryBonus).toEqual(2);
  });
});
