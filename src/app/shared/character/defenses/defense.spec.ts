import {Defense} from './defense';
import {PhysicalDefenseType} from "./physical-defense-type.enum";


describe('Defense', () => {
  let defenses: Defense;

  beforeEach(() => {
    defenses = new Defense();
  });


  it('should create an instance', () => {
    expect(new Defense()).toBeTruthy();
  });

  it('should be able to move a defensive type from active to passive', () => {
    expect(defenses.activeDefenses.length).toEqual(0);
    defenses.moveToActive(PhysicalDefenseType.Unarmed);

    expect(defenses.activeDefenses).toContain(PhysicalDefenseType.Unarmed);
  });

  it('should be able to move a defensive type from active to passive', () => {
    defenses.moveToActive(PhysicalDefenseType.Missile);
    expect(defenses.activeDefenses.length).toEqual(1);
    defenses.moveToPassive(PhysicalDefenseType.Missile);
    expect(defenses.activeDefenses.length).toEqual(0);
  });

  it('should not be able to move the same defense from the same array twice', () => {
    defenses.moveToActive(PhysicalDefenseType.Zone);
    defenses.moveToActive(PhysicalDefenseType.Zone);
    expect(defenses.activeDefenses.length).toEqual(1);
  });

  it('should be able to get a value for active defenses', () => {
    expect(defenses.getActiveDefensiveValue()).toEqual(11);
  });

  it('should be able to get a value for passive defenses', () => {
    expect(defenses.getPassiveDefensiveValue()).toEqual(10);
  });

  it('should be able to add and remove a bonus to a characters active defense', () => {
    defenses.setBonusForDefense("awesome", 1, true);
    expect(defenses.getActiveDefensiveValue()).toEqual(12);
    defenses.setBonusForDefense("awesome", 0, true);
    expect(defenses.getActiveDefensiveValue()).toEqual(11);
  });

  it('should be able to add and remove a bonus from a characters passive defense', () => {
    defenses.setBonusForDefense("awesome", 1, false);
    expect(defenses.getPassiveDefensiveValue()).toEqual(11);
    defenses.setBonusForDefense("awesome", 0, false);
    expect(defenses.getPassiveDefensiveValue()).toEqual(10);
  });

  it('should be able to change armor types', () => {

  });

  it('should be able to account for armor bonuses from attributes', () => {

  });

  


});



