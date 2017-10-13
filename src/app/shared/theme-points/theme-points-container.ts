import {ThemePoint} from "./theme-point";
import {ThemeType} from "./theme-type.enum";
import {ThemeStrength} from "./theme-strength.enum";

export class ThemePointsContainer {

  public combat: ThemePoint;
  public stealth: ThemePoint;
  public magic: ThemePoint;
  public general: ThemePoint;

  constructor(combat?: ThemeStrength, stealth?: ThemeStrength, magic?: ThemeStrength, general?: ThemeStrength) {
    this.combat = new ThemePoint(ThemeType.Combat, combat);
    this.stealth = new ThemePoint(ThemeType.Stealth, stealth);
    this.magic = new ThemePoint(ThemeType.Magic, magic);
    this.general = new ThemePoint(ThemeType.General, general);
  }


  /*Gets the defensive bonus based on theme point distribution*/
  getDefensiveBonus(): Array<ThemeType> {
    return [ThemeType.Stealth];
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
