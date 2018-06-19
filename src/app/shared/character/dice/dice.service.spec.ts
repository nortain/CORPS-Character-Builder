import {TestBed, inject} from '@angular/core/testing';

import {DiceService} from './dice.service';
import {DiceSize} from "./dice-size.enum";
import {Dice} from "./dice";
import {LevelRange} from "../../spells/enums/level-range.enum";
import {SpellDamageKeyword} from "../../spells/enums/spell-damage-keyword.enum";
import {DamageKeywordModifier} from "../../spells/damage-keyword-modifier";
import {isMetadataSymbolicIfExpression} from "@angular/compiler-cli";

fdescribe('DiceService', () => {
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
      .toEqual("3d12+23");
    expect(diceService.getNumOfDice(DiceSize.d10, 0, 68).printRoll())
      .toEqual("6d10+35");
    expect(diceService.getNumOfDice(DiceSize.d10, 0, 66).printRoll())
      .toEqual("5d10+38");
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
    const result = ["3", "1d10+2", "1d10+6", "1d10+11", "2d10+10",
      "2d10+14", "2d10+19", "3d10+18", "3d10+22", "4d10+21",
      "4d10+26", "4d10+30", "5d10+29", "5d10+34", "5d10+38"];
    const answer = diceService.getArrayOfDice(DiceSize.d10, 3, 66.5, LevelRange.FIFTHTEEN);
    answer.forEach((item: Dice, index: number) => {
      console.log(index + " is the index and roll: ", item.printRoll());
      expect(item.printRoll()).toBe(result[index]);
    });
  });

  it('should be able to build an array of dice from d6s', () => {
    const result = ["1d6", "1d6+3", "1d6+6", "2d6+5", "2d6+8",
      "2d6+10", "3d6+10", "3d6+12", "3d6+15", "4d6+15"];
    const answer = diceService.getArrayOfDice(DiceSize.d6, 4, 29.45, LevelRange.TEN);
    answer.forEach((item: Dice, index: number) => {
      expect(item.printRoll()).toBe(result[index]);
    });

    /**
     * implement the rest of these for the love of god!
     */
    it('should be able to account for the all unique spell damage keywords', () => {
      expect(true).toBeFalsy();
    });

    it('should be able to build an array table from d8s', () => {

    });

    it('should be able to build an array table from d12s', () => {

    });

    it('should be able to build an array table from implment as d8s', () => {

    });

    it('should be able to build an array from minions', () => {

    });
  });

});
