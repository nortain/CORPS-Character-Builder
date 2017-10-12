import {ThemeStrength} from "./theme-strength.enum";

export class ThemePoint {
  constructor(private combat = ThemeStrength.None,
              private stealth = ThemeStrength.None,
              private magic = ThemeStrength.None,
              private general = ThemeStrength.None) {}

  getMagic(): ThemeStrength {
    return this.magic;
  }

  setMagic(themeStrength: ThemeStrength) {
    this.magic = themeStrength;
  }

  getCombat(): ThemeStrength {
    return this.combat;
  }

  setCombat(themeStrength: ThemeStrength) {
    this.combat = themeStrength;
  }

  getStealth(): ThemeStrength {
    return this.stealth;
  }

  setStealth(themeStrength: ThemeStrength) {
    this.stealth = themeStrength;
  }

  getGeneral(): ThemeStrength {
    return this.general;
  }

  setGeneral(themeStrength: ThemeStrength) {
    if (themeStrength > ThemeStrength.Minor) {
      this.general = ThemeStrength.Minor;
    } else {
      this.magic = themeStrength;
    }

  }
}
