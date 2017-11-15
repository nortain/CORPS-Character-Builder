import {Race} from "./race";
import {RaceType} from "./race-type.enum";
import {VisionType} from "./vision-type.enum";
import {MagicDefenseType} from "../../magic-defense/magic-defense-type.enum";
import {NON_HUMAN_AVAILABLE_ATTRIBUTE_POINTS, STARTING_PLAYER_RACES} from "../../constants";

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
    expect(human.recoveryBonus).toEqual(0);
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

  it('should be able to determine what the bonus power points are', () => {
    expect(human.powerPointBonus).toEqual(1);
    expect(dwarf.powerPointBonus).toEqual(0);
    expect(fey.powerPointBonus).toEqual(0);
  });

  it('should be able to get skill point bonus', () => {
    expect(human.skillPointBonus).toEqual(1);
    expect(orc.skillPointBonus).toEqual(0);
    expect(elf.skillPointBonus).toEqual(0);
  });

  it('should be able to determine if a race has racial restrictions', () => {
    expect(halfling.racialRestriction).toBe("Can't use two handed melee weapons");
    expect(elder.racialRestriction).toBe("");
    expect(prim.racialRestriction).toBe("");
  });

  it('should be able to get formatted text for a dwarf\'s virile recovery', () => {
    expect(dwarf.formatText(dwarf.passiveBonuses[0].value)).toBe("Increase your recovery value by 1");
  });

  it('should be able to get a dwarf\'s tough as nails bonus in a formatted version for at level 5', () => {
    const burman = new Race(RaceType.Burman, 5);
    expect(burman.formatText(burman.activeBonuses[0].value)).toContain("minor action you gain 11 temporary hit points and");
  });

  it(' should be able to format text of the elder\'s active bonus resistance of the ancients', () => {
    expect(elder.formatText(elder.activeBonuses[0].value)).toBe("As a minor action you can remove all decaying effects on you and reduce your ongoing by 5");
  });

  it('should be able to format text when the bonus is a string', () => {
    expect(fey.formatText(fey.activeBonuses[0].value)).toBe("As a minor action you gain advantage to the first roll of an attack or spell cast this turn.  You also increase the damage inflicted to all targets by 1 extra damage die.");
  });

  it('should be able to format text for a primental\'s elemental resistance', () => {
    // todo fill me in
  });
});
