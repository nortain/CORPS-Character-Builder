import {ThemeStrength} from "../theme-strength.enum";
import {ThemeType} from "../theme-type.enum";
import {SubthemeTypes} from "./subtheme-types.enum";
import {TitleCasePipe} from "@angular/common";
import {SubthemePipe} from "./subtheme.pipe";
import {SubthemeBonus} from "./subtheme-bonus.enum";
import {Level} from "../../character/level.enum";
import {WeaponCategory} from "../../weapon/weapon-category.enum";
import {SUBTHEME_BONUS} from "../../constants/constants";

export class Subtheme {
  private themeType: ThemeType;
  private maxThemeStrength: ThemeStrength;
  private subthemeName: string;


  constructor(private subtheme: SubthemeTypes, private themeStrength: ThemeStrength, public findWeaknessType?: WeaponCategory.Agile | WeaponCategory.Balanced) {
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

  getSubthemeName(): string {
    const pipe = new SubthemePipe();
    return pipe.transform(this.subthemeName);
  }


  getBonus(rawLevel: Level, optionalBonusName?: SubthemeBonus): number {
    const level = rawLevel - 1;
    switch (this.subthemeName) {
      case this.parseSubtheme(SubthemeTypes.Find_Weakness)[2]: {
        if (!this.findWeaknessType) {
          return 0;
        } else {
          return SUBTHEME_BONUS[this.subthemeName + this.findWeaknessType][this.themeStrength][level];
        }
      }
      case this.parseSubtheme(SubthemeTypes.Weapon_Specialization)[2]: {
        return SUBTHEME_BONUS[this.subthemeName][this.themeStrength][level];
      }
      case this.parseSubtheme(SubthemeTypes.Protector)[2]: {
        if (optionalBonusName !== SubthemeBonus.ProtectorAura
          && optionalBonusName !== SubthemeBonus.Thorns
          && optionalBonusName !== SubthemeBonus.RecoveryValueBonus) {
          return 0;
        } else {
          return SUBTHEME_BONUS[this.subthemeName][this.themeStrength][optionalBonusName][level];
        }
      }
      case this.parseSubtheme(SubthemeTypes.Juggernaut)[2]: {
        if (optionalBonusName !== SubthemeBonus.TempHp
          && optionalBonusName !== SubthemeBonus.DamageResist) {
          return 0;
        } else {
          return SUBTHEME_BONUS[this.subthemeName][this.themeStrength][optionalBonusName][level];
        }
      }
      case this.parseSubtheme(SubthemeTypes.Riposte)[2]: {
        if (optionalBonusName !== SubthemeBonus.IsolationDamage
          && optionalBonusName !== SubthemeBonus.DamageOnMiss) {
          return 0;
        } else {
          return SUBTHEME_BONUS[this.subthemeName][this.themeStrength][optionalBonusName][level];
        }
      }
      case this.parseSubtheme(SubthemeTypes.Evasion)[2]: {
        if (optionalBonusName !== SubthemeBonus.ActiveDefense
          && optionalBonusName !== SubthemeBonus.CriticalDamageReduction) {
          return 0;
        } else {
          return SUBTHEME_BONUS[this.subthemeName][this.themeStrength][optionalBonusName][level];
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

  private setThemeStrength() {
    if (this.themeStrength > this.maxThemeStrength) {
      this.themeStrength = this.maxThemeStrength;
    }
  }
}
