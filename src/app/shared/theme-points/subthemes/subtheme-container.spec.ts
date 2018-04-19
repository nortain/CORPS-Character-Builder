import {SubthemeContainer} from './subtheme-container';
import {mockThemePoints} from "../../constants/testing-constants";
import {Subtheme} from "./subtheme";
import {SubthemeTypes} from "./subtheme-types.enum";
import {ThemeStrength} from "../theme-strength.enum";
import {ThemePointsContainer} from "../theme-points-container";

describe('SubthemeContainer', () => {
  let st;
  beforeEach(() => {
    st = new SubthemeContainer(mockThemePoints());
  });
  it('should create an instance', () => {
    expect(new SubthemeContainer(mockThemePoints())).toBeTruthy();
  });

  it('should be able to get available subthemes', () => {
    expect(st.getAvailableSubthemePoints("combat")).toEqual(1);
    st.combat = [new Subtheme(SubthemeTypes.Juggernaut, ThemeStrength.Minor)];
    expect(st.getAvailableSubthemePoints("combat")).toEqual(0);
    expect(st.getAvailableSubthemePoints("stealth")).toEqual(1);
    st.stealth = [new Subtheme(SubthemeTypes.Riposte, ThemeStrength.Greater)];
    expect(st.getAvailableSubthemePoints("stealth")).toEqual(-1);
    expect(st.getAvailableSubthemePoints("magic")).toEqual(1);
    st.magic = new Subtheme(SubthemeTypes.Magent, ThemeStrength.Minor);
    expect(st.getAvailableSubthemePoints("magic")).toEqual(0);

  });

  it('should be able to get the subthemeStrengh of all assigned combat themes', () => {
    st.combat = [new Subtheme(SubthemeTypes.Weapon_Specialization, ThemeStrength.Minor)];
    expect(st.getSubthemeStrength("combat")).toEqual(ThemeStrength.Minor);
    st.combat = [new Subtheme(SubthemeTypes.Weapon_Specialization, ThemeStrength.Minor),
      new Subtheme(SubthemeTypes.Protector, ThemeStrength.Greater)];
    expect(st.getSubthemeStrength("combat")).toEqual(ThemeStrength.Greater);
  });

  it('should be able to assign subthemes', () => {
    const sub = new Subtheme(SubthemeTypes.Evasion, ThemeStrength.Minor);
    st.assignSubtheme(sub);
    expect(st.getSubthemeStrength("stealth")).toEqual(ThemeStrength.Minor);
  });

  it('should not be able to assign more subtheme strength than available theme points', () => {
    const ele = new Subtheme(SubthemeTypes.Elementalist, ThemeStrength.Greater);
    const ward = new Subtheme(SubthemeTypes.Spell_Warden, ThemeStrength.Minor);
    st.assignSubtheme(ele);
    expect(st.getSubthemeStrength("magic")).toEqual(0);
    st.assignSubtheme(ward);
    expect(st.getSubthemeStrength("magic")).toEqual(1);
  });

  it('should be able to assign the same subtheme twice and have the first be replaced by the 2nd', () => {
    const pro = new Subtheme(SubthemeTypes.Protector, ThemeStrength.Minor);
    const pro2 = new Subtheme(SubthemeTypes.Protector, ThemeStrength.Lesser);
    st = new SubthemeContainer(new ThemePointsContainer(3, 0, 0, 1));
    st.assignSubtheme(pro);
    st.assignSubtheme(pro2);
    expect(st.getSubthemeStrength("combat")).toEqual(2);
  });

  it('shoudld be able to assign the same magic subtheme and have the first value replaced by the second', () => {
    const magent = new Subtheme(SubthemeTypes.Magent, ThemeStrength.Minor);
    const warden = new Subtheme(SubthemeTypes.Spell_Warden, ThemeStrength.Minor);
    st.assignSubtheme(magent);
    expect(st.getSubthemeStrength("magic")).toEqual(1);
    st.assignSubtheme(warden);
    expect(st.getSubthemeStrength("magic")).toEqual(1);
    expect(st.magic).toEqual(warden);
  });


});
