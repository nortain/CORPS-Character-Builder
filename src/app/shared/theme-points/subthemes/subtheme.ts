import {ThemeStrength} from "../theme-strength.enum";
import {ThemeType} from "../theme-type.enum";
import {SubthemeTypes} from "./subtheme-types.enum";
import {SubthemePipe} from "./subtheme.pipe";
import {SubthemeBonus} from "./subtheme-bonus.enum";
import {Level} from "../../character/level.enum";
import {WeaponCategory} from "../../weapon/weapon-category.enum";
import {SUBTHEME_BONUS} from "../../constants/constants";
import {Spell} from "../../spells/spell";

export class Subtheme {
  themeType: ThemeType;
  maxThemeStrength: ThemeStrength;
  subthemeName: string;
  pipe: SubthemePipe;


  constructor(public subtheme: SubthemeTypes, public themeStrength = ThemeStrength.None) {
    this.pipe = new SubthemePipe();
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
    return this.pipe.transform(this.subthemeName);
  }

  /**
   * returns the unformated version of the sub theme name, this will match the enum key
   * @returns {string}
   */
  getSubthemeName() {
    return this.subthemeName;
  }

  /**
   * This will return a collection of spells for the given subtheme if the theme has spells
   * @returns {Spell[]}
   */
  getSpellList(): Spell[] {
    if (SUBTHEME_BONUS[this.subthemeName]["Spells"]) {
      return SUBTHEME_BONUS[this.subthemeName].Spells();
    } else {
      return null;
    }
  }

  private resolveBonus(level: Level, bonusName: SubthemeBonus) {
    let result;
    const hasThemeName = SUBTHEME_BONUS[this.subthemeName];
    if (hasThemeName
      && hasThemeName[this.themeStrength]
      && hasThemeName[this.themeStrength][bonusName]) {
      result = SUBTHEME_BONUS[this.subthemeName][this.themeStrength][bonusName][level];
    } else {
      result = 0;
    }
    return result;
  }

  /**
   * Gets the bonus of a subtheme for a given level.  For magic themes this returns 0 because there are no implict bonuses for merely picking a magic subtheme.
   * @param {Level} rawLevel
   * @param {SubthemeBonus} bonusName
   * @returns {number}
   */
  getBonus(rawLevel: Level, bonusName: SubthemeBonus): number {
    const level = rawLevel - 1;
    return this.resolveBonus(level, bonusName);
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
