import {Injectable} from '@angular/core';
import {DiceSize} from "./dice-size.enum";
import {Dice} from "./dice";
import {LevelRange} from "../../spells/enums/level-range.enum";
import {DamageKeywordModifier} from "../../spells/damage-keyword-modifier";
import {SpellDamageKeyword} from "../../spells/enums/spell-damage-keyword.enum";
import {SpellKeyword} from "../../spells/enums/spell-keywords.enum";

@Injectable()
export class DiceService {

  readonly minimumDamageModifier = .15;

  constructor() {
  }

  getDieAverage(diceSize: DiceSize): number {
    if (diceSize === DiceSize.None) {
      return 0;
    } else {
      return diceSize / 2 + .5;
    }
  }

  getDieStatic(diceSize: DiceSize): number {
    switch (diceSize) {
      case DiceSize.d6:
        return 5;
      case DiceSize.d8:
        return 6;
      case DiceSize.d10:
        return 7;
      case DiceSize.d12:
        return 8;
      default:
        return 1;
    }
  }

  /**
   * gets the number of dice needed for a particular spell
   * @param {DiceSize} diceSize
   * @param {number} modifier
   * @param {number} damage
   * @returns {any}
   */
  getNumOfDice(diceSize: DiceSize, modifier: number, damage: number): Dice {
    let numOfDice = 0;
    let totalModifierValue = 0;
    modifier += this.getDieStatic(diceSize);
    const dieAverage = this.getDieAverage(diceSize);
    if (damage < 1) {
      return null;
    } else if (damage < dieAverage) {
      return new Dice(0, DiceSize.None, damage);
    } else if (diceSize === DiceSize.None) {
      return new Dice(0, DiceSize.None, damage);
    }
    do {
      damage -= dieAverage;
      numOfDice++;
      damage -= modifier;
      totalModifierValue += modifier;
    } while (damage >= dieAverage && numOfDice < 9);
    totalModifierValue += damage;
    return new Dice(numOfDice, diceSize, totalModifierValue);
  }

  /**
   * gets the remainder damage value to determine if there is roll over
   * @param {DiceSize} diceSize
   * @param {number} modifier
   * @param {number} damage
   * @returns {number}
   */
  getRemainder(diceSize: DiceSize, modifier: number, damage: number) {
    const dieAverage = this.getDieAverage(diceSize);
    const numOfDice: Dice = this.getNumOfDice(diceSize, modifier, damage);
    const remainder = damage - (numOfDice.numOfDice.value() * dieAverage);
    return Math.round(remainder % 1);
  }

  getArrayOfDice(diceSize: DiceSize, minDamage: number, maxDamage: number, levelRange: LevelRange, modifier = 0, damageKeyword: SpellDamageKeyword | SpellKeyword): Dice[] {
    const damageModifier = new DamageKeywordModifier(damageKeyword);
    const adjustedModifier = modifier + damageModifier.staticDieMod;
    minDamage = this.getAdjustedValue(diceSize, minDamage, modifier, damageModifier, false);
    maxDamage = this.getAdjustedValue(diceSize, maxDamage, modifier, damageModifier, true);
    const average = (maxDamage - minDamage) / (levelRange - 1);
    const diceArray: Dice[] = [this.getNumOfDice(diceSize, adjustedModifier, minDamage)];
    for (let i = 1; i < levelRange; i++) {
      const damageValue = (average * i) + minDamage;
      diceArray.push(this.getNumOfDice(diceSize, adjustedModifier, damageValue));
    }
    return diceArray;
  }


  getAdjustedValue(diceSize: DiceSize, damageValue: number, adjustedModifier: number, damageModifier: DamageKeywordModifier, isMax: boolean): number {
    let adjustedDamageValue;
    const maxMinDamageModifier = isMax ? damageModifier.maxAdj : damageModifier.minAdj;
    if (diceSize === DiceSize.None) {
      adjustedDamageValue = Math.round(damageValue + maxMinDamageModifier - this.minimumDamageModifier);
    } else {
      const remainder = this.getRemainder(diceSize, adjustedModifier, damageValue);
      adjustedDamageValue = Math.floor(damageValue + maxMinDamageModifier + remainder / 2);
    }
    return adjustedDamageValue;
  }
}
