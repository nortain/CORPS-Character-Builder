import {ThemePointsContainer} from "../theme-points-container";
import {Subtheme} from "./subtheme";
import {ThemeType} from "../theme-type.enum";

export class SubthemeContainer {


  /**
   * subthemes based on theme type that contain subthemes
   */
  combat: Subtheme[];
  stealth: Subtheme[];
  magic: Subtheme;

  constructor(public themePoints: ThemePointsContainer) {
    this.combat = [];
    this.stealth = [];
    this.magic = null;
  }


  // getAvailableSubthemes(): Subtheme[] {
  //   let result = [];
  //   if (this.getRemainingSubthemePointsToAssign("combat") > 0) {
  //
  //   }
  //   if (this.getRemainingSubthemePointsToAssign("stealth") > 0) {
  //     result.push("stealth");
  //   }
  //   if (this.getRemainingSubthemePointsToAssign("magic") > 0) {
  //     result.push("magic");
  //   }
  //   return result;
  // }

  /**
   * gets the available number of subtheme points for a given theme type
   * @param {"combat" | "stealth" | "magic"} themeType
   * @returns {number}
   */
  getAvailableSubthemePoints(themeType: "combat" | "stealth" | "magic"): number {
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


  private buildNewArray(array: Subtheme[], assignedSub: Subtheme) {
    const newArray = [assignedSub];
    for (const sub of array) {
      if (sub.subthemeName !== assignedSub.subthemeName) {
        newArray.push(sub);
      }
    }
    return newArray;
  }

  /**
   * assigns the given subtheme to the property combat, stealth or magic placeholder if there are enough available themepoints.  If there aren't, nothing happens and an error is logged to the console.  Ideally this should be checked before a call is made.
   * @param {Subtheme} subtheme to be added
   */
  assignSubtheme(subtheme: Subtheme) {
    switch (subtheme.getThemeType()) {
      case ThemeType.Combat: {
        if (this.getAvailableSubthemePoints("combat") < subtheme.getThemeStrength()) {
          this.handleError("There aren't enough available combat theme points to assign the subtheme " + subtheme.getSubthemeFormattedName());
        } else {
          this.combat = this.buildNewArray(this.combat, subtheme);
          break;
        }
      }
      case ThemeType.Stealth: {
        if (this.getAvailableSubthemePoints("stealth") < subtheme.getThemeStrength()) {
          this.handleError("There aren't enough available stealth theme points to assign the subtheme " + subtheme.getSubthemeFormattedName());
        } else {
          this.stealth = this.buildNewArray(this.stealth, subtheme);
          break;
        }
      }
      case ThemeType.Magic: {
        if (this.themePoints.magic.getStrength() < subtheme.getThemeStrength()) {
          this.handleError("There aren't enough available magic theme points to assign the subtheme " + subtheme.getSubthemeFormattedName());
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
