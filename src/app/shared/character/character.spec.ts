import { Character } from './character';
import {RaceType} from "./race/race-type.enum";

describe('Character', () => {
  it('should create an instance', () => {
    expect(new Character("Bob", RaceType.Gryx)).toBeTruthy();
  });
});
