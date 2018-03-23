import { Character } from './character';
import {RaceType} from "./race/race-type.enum";
import {AttributeStrength} from "../attribute/attribute-strength.enum";
import {ArmorType} from "../armor/armor-type.enum";
import {Armor} from "../armor/armor";
import {STARTING_INITIATIVE, STARTING_MOVEMENT} from "../constants/constants";
import {ThemeStrength} from "../theme-points/theme-strength.enum";
import {Weapon} from "../weapon/weapon";
import {WeaponClass} from "../weapon/weapon-class.enum";
import {WeaponCategory} from "../weapon/weapon-category.enum";

describe('Character', () => {
  let bob: Character;

  beforeEach(() => {
    bob = new Character("Bob", RaceType.Gryx);
  });

  it('should create an instance', () => {
    expect(new Character("Bob", RaceType.Gryx)).toBeTruthy();
  });

  it('should be able to get default movement of 6', function () {
    expect(bob.getSpeed()).toEqual(STARTING_MOVEMENT);
  });

  it('should recognize that a characters movement is increased if they have epic agility', function () {
      bob.attributes.Agility.strength = AttributeStrength.Epic;
      expect(bob.getSpeed()).toEqual(7);
  });

  it('should reduce a characters speed when they are wearing really heavy ass armor', () => {
    bob.armor = new Armor(ArmorType.HeavyArmor, "Platemail");
    expect(bob.getSpeed()).toEqual(5);
  });

  it('should be able to get the starting initiative for a character', () => {
    expect(bob.getInitiative()).toEqual(STARTING_INITIATIVE);
  });

  it('should be get modified initiative when attributes are modified', () => {
    bob.attributes.Quickness.strength = AttributeStrength.Heroic;
    expect(bob.getInitiative()).toEqual(5, "heroic qu gives init 5");
    bob.attributes.Quickness.strength = AttributeStrength.Champion;
    expect(bob.getInitiative()).toEqual(8, "champion qu gives init 8");
    bob.attributes.Quickness.strength = AttributeStrength.Epic;
    expect(bob.getInitiative()).toEqual(9, "epic qu gives init 9");
    bob.attributes.Quickness.strength = AttributeStrength.Legendary;
    expect(bob.getInitiative()).toEqual(10, "legendary qu gives init 10");
    bob.attributes.Intuition.strength = AttributeStrength.Champion;
    expect(bob.getInitiative()).toEqual(14);
  });

  it('should get modified initiative as a result of having theme points in stealth', function () {
    bob.themePoints.stealth.setStrength(ThemeStrength.Minor);
    expect(bob.getInitiative()).toEqual(2);
    bob.themePoints.stealth.setStrength(ThemeStrength.Greater);
    expect(bob.getInitiative()).toEqual(6);
  });

  it('should be able to get primary damage of a character', function () {
    bob.attributes.Brawn.strength = AttributeStrength.Normal;
    expect(bob.getWeaponDamage(0)).toBe("2d6+1", "unarmed weapon");
    bob.attributes.Brawn.strength = AttributeStrength.Champion;
    expect(bob.getWeaponDamage(0)).toBe("2d6+5", "unarmed with some brawn");
    bob.weapons[0] = new Weapon("Crossbow", WeaponClass.Ranged, WeaponCategory.Simple);
    expect(bob.getWeaponDamage(0)).toBe("2d6+2", "with a simple ranged weapon");
  });

  it('should be able to see attribute bonus based off of selected race of character', function () {

  });

  it('should be able to assign an attribute', function () {

  });

  it('should be prevented from adding an attribute point if no points are available', function () {

  });



});
