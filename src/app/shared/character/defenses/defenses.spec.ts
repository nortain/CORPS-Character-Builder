import {Defenses} from './defenses';
import {PhysicalDefenseType} from "./physical-defense-type.enum";


describe('Defenses', () => {
  let defenses: Defenses;

  beforeEach(() => {
    defenses = new Defenses();
  });


  it('should create an instance', () => {
    expect(new Defenses()).toBeTruthy();
  });

  it('should be able to move a defensive type from active to passive', function () {
    expect(defenses.activeDefenses.length).toEqual(0);
    defenses.moveToActive(PhysicalDefenseType.Unarmed);

    expect(defenses.activeDefenses).toContain(PhysicalDefenseType.Unarmed);
  });

  it('should be able to move a defensive type from active to passive', function () {
    defenses.moveToActive(PhysicalDefenseType.Missile);
    expect(defenses.activeDefenses.length).toEqual(1);
    defenses.moveToPassive(PhysicalDefenseType.Missile);
    expect(defenses.activeDefenses.length).toEqual(0);
  });

  it('should not be able to move the same defense from the same array twice', function () {
    defenses.moveToActive(PhysicalDefenseType.Zone);
    defenses.moveToActive(PhysicalDefenseType.Zone);
    expect(defenses.activeDefenses.length).toEqual(1);
  });

  it('should be able to get a value for active defenses', function () {
    expect(defenses.getActiveDefensiveValue()).toEqual(11);
  });

  it('should be able to get a value for passive defenses', function () {
    expect(defenses.getPassiveDefensiveValue()).toEqual(10);
  });


});



