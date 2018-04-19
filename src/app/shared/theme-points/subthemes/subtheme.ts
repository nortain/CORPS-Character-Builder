import {ThemeStrength} from "../theme-strength.enum";
import {ThemeType} from "../theme-type.enum";
import {SubthemeTypes} from "./subtheme-types.enum";
import {SubthemePipe} from "./subtheme.pipe";
import {SubthemeBonus} from "./subtheme-bonus.enum";
import {Level} from "../../character/level.enum";
import {WeaponCategory} from "../../weapon/weapon-category.enum";
import {SUBTHEME_BONUS} from "../../constants/constants";

export class Subtheme {
  themeType: ThemeType;
  maxThemeStrength: ThemeStrength;
  subthemeName: string;


  constructor(public subtheme: SubthemeTypes, public themeStrength: ThemeStrength) {
    const values = this.parseSubtheme(subtheme);
    this.assignValues(values);
    this.setThemeStrength();

  }

  parseSubtheme(subtheme: SubthemeTypes) {
    const values = subtheme.split(",");
    return values;
  }

  getThemeStrength(): ThemeStrength {
    return this.themeStrength;
  }

  getMaxThemeStrength(): ThemeStrength {
    return this.maxThemeStrength;
  }

  /**
   * returns the themetype associated with this subtheme
   * @returns {ThemeType}
   */
  getThemeType(): ThemeType {
    return this.themeType;
  }

  /**
   * returns a formated version of the subtheme name where _ is replaced with a space
   * @returns {string}
   */
  getSubthemeFormattedName(): string {
    const pipe = new SubthemePipe();
    return pipe.transform(this.subthemeName);
  }

  /**
   * returns the unformated version of the sub theme name, this will match the enum key
   * @returns {string}
   */
  getSubthemeName() {
    return this.subthemeName;
  }


  getBonus(rawLevel: Level, bonusName: SubthemeBonus): number {
    const level = rawLevel - 1;
    switch (this.subthemeName) {
      case this.parseSubtheme(SubthemeTypes.Find_Weakness)[2]: {
        if (bonusName !== SubthemeBonus.Agile
        && bonusName !== SubthemeBonus.Balanced) {
          return 0;
        } else {
          return SUBTHEME_BONUS[this.subthemeName][this.themeStrength][bonusName][level];
        }
      }
      case this.parseSubtheme(SubthemeTypes.Weapon_Specialization)[2]: {
        return SUBTHEME_BONUS[this.subthemeName][this.themeStrength][level];
      }
      case this.parseSubtheme(SubthemeTypes.Protector)[2]: {
        if (bonusName !== SubthemeBonus.ProtectorAura
          && bonusName !== SubthemeBonus.Thorns
          && bonusName !== SubthemeBonus.RecoveryValueBonus) {
          return 0;
        } else {
          return SUBTHEME_BONUS[this.subthemeName][this.themeStrength][bonusName][level];
        }
      }
      case this.parseSubtheme(SubthemeTypes.Juggernaut)[2]: {
        if (bonusName !== SubthemeBonus.TempHp
          && bonusName !== SubthemeBonus.DamageResist) {
          return 0;
        } else {
          return SUBTHEME_BONUS[this.subthemeName][this.themeStrength][bonusName][level];
        }
      }
      case this.parseSubtheme(SubthemeTypes.Riposte)[2]: {
        if (bonusName !== SubthemeBonus.IsolationDamage
          && bonusName !== SubthemeBonus.DamageOnMiss) {
          return 0;
        } else {
          return SUBTHEME_BONUS[this.subthemeName][this.themeStrength][bonusName][level];
        }
      }
      case this.parseSubtheme(SubthemeTypes.Evasion)[2]: {
        if (bonusName !== SubthemeBonus.ActiveDefense
          && bonusName !== SubthemeBonus.CriticalDamageReduction) {
          return 0;
        } else {
          return SUBTHEME_BONUS[this.subthemeName][this.themeStrength][bonusName][level];
        }
      }
      default: {
        return 0;
      }
    }
  }

  private assignValues(values: string[]) {
    this.themeType = ThemeType[values[0]];
    this.maxThemeStrength = ThemeStrength[values[1]];
    this.subthemeName = values[2];
  }

  /**
   * sets the strength of the sub them to be no higher than the max theme strength.
   */
  private setThemeStrength() {
    if (this.themeStrength > this.maxThemeStrength) {
      this.themeStrength = this.maxThemeStrength;
    }
  }
}
