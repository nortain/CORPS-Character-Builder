import { Character } from './character';
import {RaceType} from "./race/race-type.enum";
import {AttributeStrength} from "../attribute/attribute-strength.enum";

describe('Character', () => {
  let bob: Character;

  beforeEach(() => {
    bob = new Character("Bob", RaceType.Gryx);
  });

  it('should create an instance', () => {
    expect(new Character("Bob", RaceType.Gryx)).toBeTruthy();
  });

  it('should be able to get default movement of 6', function () {
    expect(bob.getSpeed()).toEqual(6);
  });

  it('should recognize that a characters movement is increased if they have epic agility', function () {
      bob.attributes.Agility.strength = AttributeStrength.Epic;
      expect(bob.getSpeed()).toEqual(7);
  });
});
