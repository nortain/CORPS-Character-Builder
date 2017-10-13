import {ThemePointsContainer} from "./theme-points-container";
import {ThemeType} from "./theme-type.enum";
import {ThemeStrength} from "./theme-strength.enum";

describe('', () => {
  let thc;
  beforeEach(() => {
    thc = new ThemePointsContainer();
  });

  it('should be able to make theme points container', () => {
    expect(thc).toBeDefined();
  });

  it('should be able up which magical defense when they are tied', () => {
    expect(thc.getStrongestThemePoints()).toContain(ThemeType.Combat);
    expect(thc.getStrongestThemePoints()).toContain(ThemeType.Stealth);
    expect(thc.getStrongestThemePoints()).toContain(ThemeType.Magic);
    expect(thc.getStrongestThemePoints()).not.toContain(ThemeType.General);
  });

  it('should be able to get the top 2 magic bonus defenses when only 2 are tied', () => {
    thc.magic.setStrength(ThemeStrength.Lesser);
    thc.stealth.setStrength(ThemeStrength.Lesser);
    expect(thc.getStrongestThemePoints()).toContain(ThemeType.Stealth);
    expect(thc.getStrongestThemePoints()).not.toContain(ThemeType.Combat);
  });

  it('should be able to determine which magic bonus has the most strength and therefore gets the bonus magical defense', () => {
    thc.magic.setStrength(ThemeStrength.Minor);
    expect(thc.getStrongestThemePoints()).toContain(ThemeType.Magic);
    expect(thc.getStrongestThemePoints()).not.toContain(ThemeType.Stealth);
  });
});
