import {ThemePoint} from "./theme-point";
import {ThemeStrength} from "./theme-strength.enum";
import {ThemeType} from "./theme-type.enum";

export class ThemePointsContainer {

  constructor(public combat: ThemePoint,
              public stealth: ThemePoint,
              public magic: ThemePoint,
              public general: ThemePoint) { }


  /*Gets the defensive bonus based on theme point distribution*/
  getDefensiveBonus(): ThemeType {
    return ThemeType.Stealth;
  }
}
