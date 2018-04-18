import {ThemePointsContainer} from "../theme-points-container";
import {Subtheme} from "./subtheme";
import {ThemeType} from "../theme-type.enum";

export class SubthemeContainer {

  combat: Subtheme[];
  stealth: Subtheme[];
  magic: Subtheme;

  constructor(private themePoints: ThemePointsContainer) {
    this.combat = [];
    this.stealth = [];
    this.magic = null;
  }

  /**
   * gets the available number of subtheme points for a given theme type
   * @param {"combat" | "stealth" | "magic"} themeType
   * @returns {number}
   */
  getAvailableSubthemes(themeType: "combat" | "stealth" | "magic"): number {
    return this.themePoints[themeType].getStrength() - this.getSubthemeStrength(themeType);
  }

  /**
   * gets the current strength or number of theme points assigned to one of available subthemes.
   * @param {"combat" | "stealth" | "magic"} themeType
   * @returns {number}
   */
  getSubthemeStrength(themeType: "combat" | "stealth" | "magic"): number {
    let total = 0;
    if (themeType === "magic") {
      if (this.magic) {
        total = this[themeType].getThemeStrength();
      }
    } else {
      for (const sub of this[themeType]) {
        total += sub.getThemeStrength();
      }
    }
    return total;
  }

  /**
   * assigns the given subtheme to the property combat, stealth or magic placeholder if there are enough available themepoints.  If there aren't, nothing happens and an error is logged to the console.  Ideally this should be checked before a call is made.
   * @param {Subtheme} subtheme to be added
   */
  assignSubtheme(subtheme: Subtheme) {
    switch (subtheme.getThemeType()) {
      case ThemeType.Combat: {
        if (this.getAvailableSubthemes("combat") < subtheme.getThemeStrength()) {
          this.handleError("There aren't enough available combat theme points to assign the subtheme " + subtheme.getSubthemeName());
        } else {
          this.combat = [...this.combat, subtheme];
          break;
        }
      }
      case ThemeType.Stealth: {
        if (this.getAvailableSubthemes("stealth") < subtheme.getThemeStrength()) {
          this.handleError("There aren't enough available stealth theme points to assign the subtheme " + subtheme.getSubthemeName());
        } else {
          this.stealth = [...this.stealth, subtheme];
          break;
        }
      }
      case ThemeType.Magic: {
        if (this.getAvailableSubthemes("magic") < subtheme.getThemeStrength()) {
          this.handleError("There aren't enough available magic theme points to assign the subtheme " + subtheme.getSubthemeName());
        } else {
          this.magic = subtheme;
          break;
        }

      }
      default: // do nothing
        break;
    }
  }

  handleError(msg: string) {
    console.error(msg);
  }


}
