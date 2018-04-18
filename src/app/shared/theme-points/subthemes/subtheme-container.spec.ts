import {SubthemeContainer} from './subtheme-container';
import {mockThemePoints} from "../../constants/testing-constants";
import {Subtheme} from "./subtheme";
import {SubthemeTypes} from "./subtheme-types.enum";
import {ThemeStrength} from "../theme-strength.enum";

describe('SubthemeContainer', () => {
  let st;
  beforeEach(() => {
    st = new SubthemeContainer(mockThemePoints());
  });
  it('should create an instance', () => {
    expect(new SubthemeContainer(mockThemePoints())).toBeTruthy();
  });

  it('should be able to get available subthemes', () => {
    expect(st.getAvailableSubthemes("combat")).toEqual(1);
    st.combat = [new Subtheme(SubthemeTypes.Juggernaut, ThemeStrength.Minor)];
    expect(st.getAvailableSubthemes("combat")).toEqual(0);
    expect(st.getAvailableSubthemes("stealth")).toEqual(1);
    st.stealth = [new Subtheme(SubthemeTypes.Riposte, ThemeStrength.Greater)];
    expect(st.getAvailableSubthemes("stealth")).toEqual(-1);
    expect(st.getAvailableSubthemes("magic")).toEqual(1);
    st.magic = new Subtheme(SubthemeTypes.Magent, ThemeStrength.Minor);
    expect(st.getAvailableSubthemes("magic")).toEqual(0);

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
    const ele = new Subtheme(SubthemeTypes.Elementalist, ThemeStrength.Minor); // autos to Greater
    const ward = new Subtheme(SubthemeTypes.Spell_Warden, ThemeStrength.Minor);
    st.assignSubtheme(ele);
    expect(st.getSubthemeStrength("magic")).toEqual(0);
    st.assignSubtheme(ward);
    expect(st.getSubthemeStrength("magic")).toEqual(1);
  });
});
