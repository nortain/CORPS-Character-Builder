import {Race} from "./race";
import {RaceType} from "./race-type.enum";
import {VisionType} from "./vision-type.enum";
import {MagicDefenseType} from "../../magic-defense/magic-defense-type.enum";
import {NON_HUMAN_AVAILABLE_ATTRIBUTE_POINTS} from "../../constants";

describe('Race', () => {
  let elf, human, dwarf, prim, fey, halfling, orc, elder;

  beforeEach(() => {
    elf = new Race(RaceType.Altwani);
    human = new Race(RaceType.Human);
    dwarf = new Race(RaceType.Burman);
    prim = new Race(RaceType.Primental);
    fey = new Race(RaceType.Feydra);
    halfling = new Race(RaceType.Halfling);
    orc = new Race(RaceType.Gryx);
    elder = new Race(RaceType.Elder);
  });

  it('should create an instance of race', () => {
    expect(new Race(RaceType.Gryx)).toBeTruthy();
  });

  it('should be able to create a level 4 burman who has a recovery bonus of 2', () => {
    const burman = new Race(RaceType.Burman, 4);
    expect(burman.recoveryBonus).toEqual(2);
  });

  it('should be able to create a a few different characters with different vision types', () => {
    expect(human.vision).toBe(VisionType.Normal);
    expect(elf.vision).toBe(VisionType.Low);
    expect(dwarf.vision).toBe(VisionType.Star);
  });

  it('should be able to figure out what a race\s magicical defensive bonus is', () => {
    expect(fey.magicDefenseBonus).toBe(MagicDefenseType.Reflex);
    expect(halfling.magicDefenseBonus).toBe(MagicDefenseType.Fortitude);
    expect(dwarf.magicDefenseBonus).toBe(MagicDefenseType.Will);
  });

  it('should be able to determine what a race\'s starting attribute points are', () => {
    expect(human.availableAttributePoints).toEqual(6);
    expect(elder.availableAttributePoints).toEqual(NON_HUMAN_AVAILABLE_ATTRIBUTE_POINTS);
    expect(halfling.availableAttributePoints).toEqual(NON_HUMAN_AVAILABLE_ATTRIBUTE_POINTS);
    expect(orc.availableAttributePoints).toEqual(NON_HUMAN_AVAILABLE_ATTRIBUTE_POINTS);

  });

  // TODO need to finish adding unit tests to ensure that the races are being created correctly
});
