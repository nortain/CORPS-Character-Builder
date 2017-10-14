import {ThemePoint} from "./theme-point";
import {ThemeType} from "./theme-type.enum";
import {ThemeStrength} from "./theme-strength.enum";
import {MagicDefenseType} from "../magic-defense/magic-defense-type.enum";

export class ThemePointsContainer {

  combat: ThemePoint;
  stealth: ThemePoint;
  magic: ThemePoint;
  general: ThemePoint;


  constructor(combat?: ThemeStrength, stealth?: ThemeStrength, magic?: ThemeStrength, general?: ThemeStrength) {
    this.combat = new ThemePoint(ThemeType.Combat, combat);
    this.stealth = new ThemePoint(ThemeType.Stealth, stealth);
    this.magic = new ThemePoint(ThemeType.Magic, magic);
    this.general = new ThemePoint(ThemeType.General, general);

  }

  getTotalThemePoints(currentNumberOfTheme: number = 0): number {
    return this.combat.getStrength() + this.stealth.getStrength() + this.magic.getStrength() + this.general.getStrength() - currentNumberOfTheme;
  }

  /*Gets the defensive bonus based on theme point distribution*/
  getDefensiveBonus(): Array<MagicDefenseType> {
    const result = [];
    for (const type of this.getStrongestThemePoints()) {
      if (type === ThemeType.Combat) {
        result.push(MagicDefenseType.Fortitude);
      } else if (type === ThemeType.Stealth) {
        result.push(MagicDefenseType.Reflex);
      } else if (type === ThemeType.Magic) {
        result.push(MagicDefenseType.Will);
      }
    }
    return result;
  }

  getStrongestThemePoints(): Array<ThemeType> {
    const results = [];
    if (this.combat.getStrength() >= this.stealth.getStrength() && this.combat.getStrength() >= this.magic.getStrength()) {
      results.push(ThemeType.Combat);
    }
    if (this.stealth.getStrength() >= this.combat.getStrength() && this.stealth.getStrength() >= this.magic.getStrength()) {
      results.push(ThemeType.Stealth);
    }
    if (this.magic.getStrength() >= this.combat.getStrength() && this.magic.getStrength() >= this.stealth.getStrength()) {
      results.push(ThemeType.Magic);
    }
    return results;
  }
}
