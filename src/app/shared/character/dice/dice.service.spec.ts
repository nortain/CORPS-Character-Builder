import {TestBed, inject} from '@angular/core/testing';

import {DiceService} from './dice.service';
import {DiceSize} from "./dice-size.enum";
import {Dice} from "./dice";
import {LevelRange} from "../../spells/enums/level-range.enum";
import {SpellDamageKeyword} from "../../spells/enums/spell-damage-keyword.enum";
import {DamageKeywordModifier} from "../../spells/damage-keyword-modifier";
import {SpellKeyword} from "../../spells/enums/spell-keywords.enum";

describe('DiceService', () => {
  let diceService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiceService]
    });
  });

  beforeEach(inject([DiceService], (svc: DiceService) => {
    diceService = svc;
  }));

  it('should be created', inject([DiceService], (service: DiceService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to return the correct dice value for a given dice size', () => {
    expect(diceService.getDieAverage(DiceSize.d6)).toEqual(3.5);
    expect(diceService.getDieAverage(DiceSize.d10)).toEqual(5.5);
    expect(diceService.getDieAverage(DiceSize.d12)).toEqual(6.5);
    expect(diceService.getDieAverage(DiceSize.None)).toEqual(0);
  });

  it('should be able to get a die static for a given die', () => {
    expect(diceService.getDieStatic(DiceSize.d6)).toEqual(5);
    expect(diceService.getDieStatic(DiceSize.d10)).toEqual(7);
    expect(diceService.getDieStatic(DiceSize.d12)).toEqual(8);
    expect(diceService.getDieStatic(DiceSize.None)).toEqual(1);
  });

  it('should be able to get numOfDice given a damage value, modifier and diceSize', () => {
    expect(diceService.getNumOfDice(DiceSize.d6, 0, 12.46632124).printRoll())
      .toEqual("2d6+5");
    expect(diceService.getNumOfDice(DiceSize.d8, 0, 43).printRoll())
      .toEqual("4d8+25");
    expect(diceService.getNumOfDice(DiceSize.d12, 0, 43).printRoll())
      .toEqual("3d12+24");
    expect(diceService.getNumOfDice(DiceSize.d10, 0, 68).printRoll())
      .toEqual("6d10+35");
    expect(diceService.getNumOfDice(DiceSize.d10, 0, 66).printRoll())
      .toEqual("5d10+39");
  });

  it('should be able to get the remainder for a give the dv, modifier and dice size', () => {
    expect(diceService.getRemainder(DiceSize.d6, 0, 12.46632124)).toEqual(0, "test 1");
    expect(diceService.getRemainder(DiceSize.d6, 0, 43)).toEqual(1, "test 2");
    expect(diceService.getRemainder(DiceSize.d8, 0, 43)).toEqual(0, "test 3");
    expect(diceService.getRemainder(DiceSize.d8, 0, 43.5)).toEqual(1, "test 4");
    expect(diceService.getRemainder(DiceSize.d12, 0, 43)).toEqual(1, "test 5");
    expect(diceService.getRemainder(DiceSize.d10, 0, 68)).toEqual(0, "test 6");
    expect(diceService.getRemainder(DiceSize.d10, 0, 66.49)).toEqual(1, "test 7");
    expect(diceService.getRemainder(DiceSize.d10, 0, 66.5)).toEqual(0, "test 8");
  });

  it('should be able to get the adjusted value for a particular dice', () => {
    const result = 66;
    const damModifier = new DamageKeywordModifier(SpellDamageKeyword.Shadow);
    expect(diceService.getAdjustedValue(DiceSize.d10, 66.5, 0, damModifier, true)).toBe(result);
  });

  it('should be able to get the adjusted value for 3.6', () => {
    const result = 4;
    const damModifier = new DamageKeywordModifier(SpellDamageKeyword.Shadow);
    expect(diceService.getAdjustedValue(DiceSize.d10, 3.6, 0, damModifier, false)).toBe(result);
  });

  it('should be able to turn a min, max level range into an array of dice', () => {
    const result = ["3", "1d10+2", "1d10+7", "1d10+11", "2d10+10",
      "2d10+15", "2d10+19", "3d10+18", "3d10+23", "4d10+22",
      "4d10+26", "4d10+31", "5d10+30", "5d10+34", "5d10+39"];
    const answer = diceService.getArrayOfDice(DiceSize.d10, 3, 66.5, LevelRange.FIFTHTEEN);
    answer.forEach((item: Dice, index: number) => {
      console.log(index + " is the index and roll: ", item.printRoll());
      expect(item.printRoll()).toBe(result[index]);
    });
  });

  it('should be able to build an array of dice from d6s', () => {
    const result = ["1d6+1", "1d6+3", "1d6+6", "2d6+5", "2d6+8",
      "2d6+11", "3d6+10", "3d6+13", "3d6+16", "4d6+15"];
    const answer = diceService.getArrayOfDice(DiceSize.d6, 4, 29.45, LevelRange.TEN);
    answer.forEach((item: Dice, index: number) => {
      expect(item.printRoll()).toBe(result[index]);
    });
  });

  it('should be able to account for the poison spell damage keywords when building a dice array', () => {
    const result = ["4", "1d10+3", "1d10+8", "1d10+12", '2d10+12',
      "2d10+16", "3d10+15", "3d10+20", "3d10+25", "4d10+24",
      "4d10+28", "4d10+33", "5d10+32", "5d10+37", "6d10+36"];
    const answer = diceService.getArrayOfDice(DiceSize.d10, 3, 66.5, LevelRange.FIFTHTEEN, SpellDamageKeyword.Poison);
    answer.forEach((item: Dice, index: number) => {
      expect(item.printRoll()).toBe(result[index]);
    });
  });

  it('should be able to account for the force spell damage keywords when building a dice array', () => {
    const result = ["4", "1d10+3", "1d10+8", "1d10+12", '2d10+11',
      "2d10+16", "2d10+20", "3d10+19", "3d10+24", "3d10+28",
      "4d10+27", "4d10+32", "4d10+36", "4d10+41", "5d10+40"];
    const answer = diceService.getArrayOfDice(DiceSize.d10, 3, 66.5, LevelRange.FIFTHTEEN, SpellDamageKeyword.Force);
    answer.forEach((item: Dice, index: number) => {
      expect(item.printRoll()).toBe(result[index]);
    });
  });

  it('should be able to account for the acid spell damage keywords when building a dice array', () => {
    const innerTest = diceService.getRemainder(DiceSize.d10, -1, 66.5);
    expect(innerTest).toEqual(1);
    const result = ["3", "1d10+2", "1d10+7", "1d10+11", '2d10+10',
      "2d10+15", "3d10+14", "3d10+19", "3d10+23", "4d10+22",
      "4d10+27", "5d10+26", "5d10+30", "5d10+35", "6d10+34"];
    const answer = diceService.getArrayOfDice(DiceSize.d10, 3, 66.5, LevelRange.FIFTHTEEN, SpellDamageKeyword.Acid);
    answer.forEach((item: Dice, index: number) => {
      expect(item.printRoll()).toBe(result[index]);
    });
  });

  it('should be able to account for the psychic spell damage keywords when building a dice array', () => {
    const result = ["4", "1d10+6", "2d10+7", "2d10+14", '3d10+16',
      "3d10+23", "4d10+24", "4d10+31", "5d10+33", "5d10+40"];
    const answer = diceService.getArrayOfDice(DiceSize.d10, 3, 66.5, LevelRange.TEN, SpellDamageKeyword.Psychic);
    answer.forEach((item: Dice, index: number) => {
      expect(item.printRoll()).toBe(result[index]);
    });
  });

  it('should be able to account for the wild spell damage keywords when building a dice array', () => {
    const result = ["3", "1d10+4", "1d10+11", "2d10+13", '3d10+14',
      "3d10+21", "4d10+22", "4d10+29", "5d10+31", "5d10+38"];
    const answer = diceService.getArrayOfDice(DiceSize.d10, 3, 66.5, LevelRange.TEN, SpellDamageKeyword.Wild);
    answer.forEach((item: Dice, index: number) => {
      expect(item.printRoll()).toBe(result[index]);
    });
  });

  it('should be able to account for the heat spell damage keywords when building a dice array', () => {
    const result = ["3", "1d10+4", "1d10+11", "2d10+12", '2d10+19',
      "3d10+20", "4d10+22", "4d10+28", "5d10+30", "5d10+37"];
    const answer = diceService.getArrayOfDice(DiceSize.d10, 3, 66.5, LevelRange.TEN, SpellDamageKeyword.Heat);
    answer.forEach((item: Dice, index: number) => {
      expect(item.printRoll()).toBe(result[index]);
    });
  });

  it('should be able to account for the implement damage keywords when building a dice array', () => {
    const result = ["3", "1d10+5", "2d10+6", "2d10+13", '3d10+15',
      "4d10+16", "5d10+18", "5d10+25", "6d10+26", "7d10+28"];
    const answer = diceService.getArrayOfDice(DiceSize.d10, 3, 66.5, LevelRange.TEN, SpellKeyword.Implement);
    answer.forEach((item: Dice, index: number) => {
      expect(item.printRoll()).toBe(result[index]);
    });
  });

  it('should be able to account for the cold damage keywords when building a dice array', () => {
    const result = ["3", "1d10+5", "1d10+12", "2d10+13", '2d10+20',
      "3d10+22", "3d10+29", "4d10+31", "4d10+38", "5d10+40"];
    const answer = diceService.getArrayOfDice(DiceSize.d10, 3, 66.5, LevelRange.TEN, SpellDamageKeyword.Cold);
    answer.forEach((item: Dice, index: number) => {
      expect(item.printRoll()).toBe(result[index]);
    });
  });

  it('should be able to build an array table from d8s', () => {
    const result = ["1d8+3", "1d8+10", "2d8+12", "3d8+15", '3d8+22',
      "4d8+25", "5d8+28", "6d8+31", "6d8+38", "7d8+41"];
    const answer = diceService.getArrayOfDice(DiceSize.d8, 7, 72.4, LevelRange.TEN, SpellDamageKeyword.Shadow);
    answer.forEach((item: Dice, index: number) => {
      expect(item.printRoll()).toBe(result[index]);
    });
  });

  it('should be able to build an array table from d12s', () => {
    const result = ["1d12+1", "1d12+8", "2d12+8", "2d12+16", '3d12+16',
      "3d12+24", "4d12+24", "4d12+32", "5d12+32", "5d12+40"];
    const answer = diceService.getArrayOfDice(DiceSize.d12, 7, 72.4, LevelRange.TEN, SpellDamageKeyword.Shadow);
    answer.forEach((item: Dice, index: number) => {
      expect(item.printRoll()).toBe(result[index]);
    });
  });

  it('should be able to build an array table from implements as d8s', () => {
    const result = ["1d8+3", "2d8+5", "3d8+8", "4d8+11", '5d8+13',
      "6d8+16", "7d8+19", "8d8+22", "9d8+24", "9d8+32"];
    const answer = diceService.getArrayOfDice(DiceSize.d8, 7, 72.4, LevelRange.TEN, SpellKeyword.Implement);
    answer.forEach((item: Dice, index: number) => {
      expect(item.printRoll()).toBe(result[index]);
    });
  });

  it('should be able to build an array from minions', () => {
    const result = ["7/11", "14/21", "21/32", "29/44", '36/54',
      "43/65", "50/75", "58/87", "65/98", "72/108"];
    const answer = diceService.getArrayOfDice(DiceSize.None, 7, 72.4, LevelRange.TEN, SpellKeyword.Minion);
    answer.forEach((item: Dice, index: number) => {
      expect(item.printMinionRoll(index + 1)).toBe(result[index]);
    });
  });

  it('should be able to build an array from minions with a monster modifier of 2', () => {
    const result = ["9/14", "16/24", "23/33", "30/44", '36/54',
      "43/63", "50/74", "57/84", "64/93", "71/104"];
    const answer = diceService.getArrayOfDice(DiceSize.None, 7, 64, LevelRange.TEN, SpellKeyword.Minion);
    answer.forEach((item: Dice, index: number) => {
      expect(item.printMinionRoll(index + 1, 2)).toBe(result[index]);
    });
  });

});
